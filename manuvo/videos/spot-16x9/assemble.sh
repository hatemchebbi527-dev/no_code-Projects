#!/bin/bash
# Assemble the six MANUVO scenes into one spot with 0.5s crossfades.
#
# xfade offsets are cumulative: each one is measured on the growing output, not
# on the incoming clip, so every crossfade shortens the timeline by its own
# duration and the next offset has to account for all the earlier ones.
set -euo pipefail

cd "$(dirname "$0")/clips"

T=0.5                    # crossfade length
OUT=../manuvo_spot.mp4

d1=5.041667; d2=3.666667; d3=5.041667; d4=7.000000; d5=5.041667; d6=7.000000

o1=$(python3 -c "print(f'{$d1-$T:.6f}')")
r1=$(python3 -c "print(f'{$d1+$d2-$T:.6f}')")
o2=$(python3 -c "print(f'{$r1-$T:.6f}')")
r2=$(python3 -c "print(f'{$r1+$d3-$T:.6f}')")
o3=$(python3 -c "print(f'{$r2-$T:.6f}')")
r3=$(python3 -c "print(f'{$r2+$d4-$T:.6f}')")
o4=$(python3 -c "print(f'{$r3-$T:.6f}')")
r4=$(python3 -c "print(f'{$r3+$d5-$T:.6f}')")
o5=$(python3 -c "print(f'{$r4-$T:.6f}')")
TOTAL=$(python3 -c "print(f'{$r4+$d6-$T:.6f}')")
FOUT=$(python3 -c "print(f'{$TOTAL-0.8:.6f}')")

echo "offsets: $o1 $o2 $o3 $o4 $o5"
echo "total:   $TOTAL s"

# Normalise every input so xfade sees identical streams.
N="fps=24,scale=1920:1080:force_original_aspect_ratio=decrease,\
pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p"

ffmpeg -v error -stats \
  -i scene1.mp4 -i scene2_FIXED.mp4 -i scene3.mp4 \
  -i scene5_FIXED.mp4 -i scene7.mp4 -i scene9_FIXED.mp4 \
  -filter_complex "
    [0:v]$N[v0];[1:v]$N[v1];[2:v]$N[v2];
    [3:v]$N[v3];[4:v]$N[v4];[5:v]$N[v5];

    [v0][v1]xfade=transition=fade:duration=$T:offset=$o1[x1];
    [x1][v2]xfade=transition=fade:duration=$T:offset=$o2[x2];
    [x2][v3]xfade=transition=fade:duration=$T:offset=$o3[x3];
    [x3][v4]xfade=transition=fade:duration=$T:offset=$o4[x4];
    [x4][v5]xfade=transition=fade:duration=$T:offset=$o5[x5];
    [x5]fade=t=in:st=0:d=0.5,fade=t=out:st=$FOUT:d=0.8[vout];

    [0:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a0];
    [1:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a1];
    [2:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a2];
    [3:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a3];
    [4:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a4];
    [5:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a5];
    [a0][a1]acrossfade=d=$T[y1];
    [y1][a2]acrossfade=d=$T[y2];
    [y2][a3]acrossfade=d=$T[y3];
    [y3][a4]acrossfade=d=$T[y4];
    [y4][a5]acrossfade=d=$T[aout]
  " \
  -map "[vout]" -map "[aout]" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 192k \
  "$OUT" -y

echo
ffprobe -v error -show_entries format=duration,size \
  -show_entries stream=codec_name,width,height,r_frame_rate \
  -of default=noprint_wrappers=1 "$OUT"
