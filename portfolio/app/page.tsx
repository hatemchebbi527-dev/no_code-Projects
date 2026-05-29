import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CodeBackground from "@/components/CodeBackground";

export default function Home() {
  return (
    <>
      <CodeBackground />
      <Reveal />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
