import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </>
  );
}
