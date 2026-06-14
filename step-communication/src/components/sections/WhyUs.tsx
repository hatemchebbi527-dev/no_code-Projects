import {
  Target,
  Users,
  Radio,
  Trophy,
  TrendingUp,
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
    icon: Target,
    title: "Specializzazione 100% sport",
    description:
      "Viviamo di sport ogni giorno: conosciamo dinamiche, pubblico e linguaggio di ogni disciplina.",
  },
  {
    icon: Users,
    title: "Un network di 900+ aziende",
    description:
      "Un patrimonio di contatti che mettiamo a disposizione per trovare lo sponsor giusto, più in fretta.",
  },
  {
    icon: Radio,
    title: "40 milioni di utenti al mese",
    description:
      "Un network di siti dedicati ai tifosi che amplifica la visibilità dei tuoi progetti.",
  },
  {
    icon: Trophy,
    title: "Esperienza multisport",
    description:
      "Oltre 100 progetti nel calcio di Serie A e B, basket, rugby, tennis e motorsport.",
  },
  {
    icon: TrendingUp,
    title: "Risultati misurabili",
    description:
      "Lavoriamo su KPI chiari e monitoriamo costantemente performance e ritorno dell'investimento.",
  },
];

export function WhyUs() {
  return (
    <section id="perche" className="py-24 sm:py-32 lg:py-40">
      <div className="container-wide">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Perché 7 Sport Agency"
              title={
                <>
                  Non vendiamo spazi.
                  <br /> Costruiamo{" "}
                  <span className="italic text-gradient-accent">valore.</span>
                </>
              }
              intro="Da oltre 10 anni colleghiamo le aziende al mondo dello sport con format di sponsorizzazione che generano visibilità, engagement e crescita reale."
            />
          </div>

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
