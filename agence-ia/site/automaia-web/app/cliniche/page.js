import Link from "next/link";
import Image from "next/image";
import { cliniche } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./cliniche.module.css";

export const metadata = {
  title: "Automazione per cliniche veterinarie e mediche",
  description:
    "Prenotazioni online, promemoria automatici e accoglienza anche in inglese per la Sua clinica, attivi 24/7. Riduca le assenze e non perda più richieste fuori orario.",
  alternates: { canonical: "/cliniche" },
  openGraph: {
    title: "Automazione per cliniche veterinarie e mediche",
    description:
      "Prenotazioni online, promemoria automatici e assistenza 24/7 per la Sua clinica.",
    url: "/cliniche",
  },
};

export default function ClinichePage() {
  return (
    <>
      {/* HERO scuro con foto */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <span className="eyebrow">{cliniche.hero.eyebrow}</span>
            <h1>{cliniche.hero.title}</h1>
            <p className="lead mt-24">{cliniche.hero.subtitle}</p>
            <div className="mt-32">
              <Link href={cliniche.hero.cta.href} className="btn">
                {cliniche.hero.cta.label}
              </Link>
            </div>
