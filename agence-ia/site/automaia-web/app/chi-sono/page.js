import Link from "next/link";
import Image from "next/image";
import { chiSono } from "@/lib/content";
import Reveal from "@/components/Reveal";
import styles from "./chi-sono.module.css";

export const metadata = {
  title: "Chi sono e come lavoro",
  description:
    "Il metodo AutomaIA in 3 passi: audit gratuito, automazione su misura, controllo sempre nelle Sue mani. Nessun gergo tecnico, soluzioni concrete.",
  alternates: { canonical: "/chi-sono" },
  openGraph: {
    title: "Chi sono e come lavoro",
    description:
      "Il metodo AutomaIA in 3 passi: audit gratuito, automazione su misura, Lei resta al comando.",
    url: "/chi-sono",
  },
};

export default function ChiSonoPage() {
  return (
    <>
      {/* INTRO con foto fondatore */}
      <section className="section">
        <div className={`container ${styles.intro}`}>
          <Reveal variant="scale" className={styles.foto}>
            <Image
              src="/fondatore.jpg"
              alt="Il fondatore di AutomaIA"
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Chi sono</span>
            <h1>{chiSono.title}</h1>
            <p className="lead mt-24">{chiSono.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* METODO */}
      <section className="section section--light">
        <div className="container">
          <div className="title-block center">
