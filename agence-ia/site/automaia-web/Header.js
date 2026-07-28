.bg {
  position: fixed;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
  /* opacité globale très basse : reste discret, ne gêne pas la lecture */
  opacity: 0.05;
}

.snippet {
  position: absolute;
  margin: 0;
  font-family: "SFMono-Regular", "Menlo", "Consolas", monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #16B8A6;
  white-space: pre;
  will-change: transform;
}

/* Chaque bloc dérive et tourne lentement, dans un sens différent.
   ease-in-out + alternate = mouvement fluide qui s'inverse en douceur. */
.s1 { top: 6%;  left: 4%;  animation: drift1 64s ease-in-out infinite alternate; }
.s2 { top: 18%; right: 6%; animation: drift2 78s ease-in-out infinite alternate; }
.s3 { top: 46%; left: 10%; animation: drift3 70s ease-in-out infinite alternate; }
.s4 { top: 58%; right: 9%; animation: drift4 84s ease-in-out infinite alternate; }
.s5 { bottom: 8%; left: 6%; animation: drift5 72s ease-in-out infinite alternate; }
.s6 { bottom: 14%; right: 14%; animation: drift6 90s ease-in-out infinite alternate; }

@keyframes drift1 {
  from { transform: translate(0, 0) rotate(-10deg); }
  to   { transform: translate(60px, 80px) rotate(12deg); }
}
@keyframes drift2 {
  from { transform: translate(0, 0) rotate(14deg); }
  to   { transform: translate(-70px, 60px) rotate(-8deg); }
}
@keyframes drift3 {
  from { transform: translate(0, 0) rotate(6deg); }
  to   { transform: translate(80px, -50px) rotate(-14deg); }
}
@keyframes drift4 {
  from { transform: translate(0, 0) rotate(-12deg); }
  to   { transform: translate(-60px, -70px) rotate(10deg); }
}
@keyframes drift5 {
  from { transform: translate(0, 0) rotate(8deg); }
  to   { transform: translate(70px, -40px) rotate(-10deg); }
}
@keyframes drift6 {
  from { transform: translate(0, 0) rotate(-6deg); }
  to   { transform: translate(-80px, -60px) rotate(14deg); }
}

@media (max-width: 768px) {
  .snippet { font-size: 12px; }
  .bg { opacity: 0.04; }
}

@media (prefers-reduced-motion: reduce) {
  .s1, .s2, .s3, .s4, .s5, .s6 { animation: none; }
}
