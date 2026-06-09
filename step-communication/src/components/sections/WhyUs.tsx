import {
  Lightbulb,
  Award,
  Globe2,
  TrendingUp,
  Gem,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    icon: Lightbulb,
    title: "Creatività senza compromessi",
    description:
      "Idee non convenzionali che rompono il rumore di fondo e restano impresse nella memoria del pubblico.",
  },
  {
    icon: Award,
    title: "Eccellenza nell'esecuzione",
    description:
      "Una macchina organizzativa rodata in vent'anni: ogni dettaglio in scena è progettato e presidiato.",
  },
  {
    icon: Globe2,
    title: "Copertura nazionale",
    description:
      "Dalla Riviera a tutta Italia: gestiamo eventi multi-tappa con logistica e partner sul territorio.",
  },
  {
    icon: TrendingUp,
    title: "Risultati misurabili",
    description:
      "KPI chiari dall'inizio. Engagement, lead e ROI tracciati per dimostrare l'impatto sul business.",
  },
  {
    icon: Gem,
    title: "Esperienza cliente premium",
    description:
      "Un unico partner, una sola regia. Relazione diretta, trasparente e dedicata dall'idea al post-evento.",
  },
];

export function WhyUs() {
  return (
    <section id="perche" className="py-24 sm:py-32 lg:py-40">
      <div className="container-wide">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Colonna sinistra */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Perché Step Communication"
              title={
                <>
                  Non organizziamo
                  <br /> eventi. Costruiamo
                  <br /> <span className="text-gradient-accent">vantaggio competitivo.</span>
                </>
              }
              intro="Dal 2005 aiutiamo i brand a connettersi con le persone attraverso esperienze che generano engagement, visibilità e crescita reale."
            />
          </div>

          {/* Colonna destra */}
          <div className="flex flex-col">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <Reveal key={reason.title} delay={i * 0.06}>
                  <div className="group flex gap-6 border-b border-line py-7 first:pt-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-fg">
                        {reason.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-fg-muted">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
