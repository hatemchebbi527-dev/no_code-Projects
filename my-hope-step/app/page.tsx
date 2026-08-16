import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import SocialProof from "@/components/SocialProof"
import Pricing from "@/components/Pricing"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      {/* Sections suivantes à venir */}
    </main>
  )
}
