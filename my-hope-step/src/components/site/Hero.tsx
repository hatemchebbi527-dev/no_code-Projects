"use client";

import { ArrowRight, Star, ShieldCheck, Compass } from "lucide-react";
import { HERO_VIDEO_URL, HERO_POSTER } from "@/lib/hero-media";
import { HeroScenery } from "./HeroScenery";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export function Hero() {
  const hasVideo = Boolean(HERO_VIDEO_URL);
  const hasPoster = Boolean(HERO_POSTER);
  const hasMedia = hasVideo || hasPoster;

  return (
    <ScrollExpandMedia
      mediaType={hasVideo ? "video" : "image"}
      mediaSrc={hasVideo ? HERO_VIDEO_URL : (hasPoster ? HERO_POSTER : "")}
      posterSrc={hasPoster ? HERO_POSTER : undefined}
      bgFallback={<HeroScenery />}
      mediaFallback={!hasMedia ? <HeroScenery /> : undefined}
      title="Votre prochain voyage pensé à la main"
      date="My Hope Step"
      scrollToExpand="Scrollez pour découvrir"
      textBlend
    >
      <HeroContent />
    </ScrollExpandMedia>
  );
}

function HeroContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-4 py-1.5 text-sm font-medium text-ink">
          <Compass className="h-4 w-4 text-primary" />
          Agence de voyage en ligne
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-ink leading-tight">
          Des itinéraires sur mesure,{" "}
          <span className="text-primary">sans stress et au meilleur prix.</span>
        </h2>

        <p className="text-lg text-muted leading-relaxed max-w-2xl">
          On construit des itinéraires sur mesure, on négocie les prix, et on
          gère la logistique. Vous n&apos;avez plus qu&apos;à faire vos valises.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="#pricing"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
        >
          Planifier mon voyage
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#destinations"
          className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-8 py-3.5 font-medium text-ink transition-colors hover:bg-surface-alt"
        >
          Voir les destinations
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
        <span className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <strong className="text-ink">4,9/5</strong> sur 1 200 avis
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Paiement sécurisé &amp; annulation flexible
        </span>
      </div>
    </div>
  );
}
