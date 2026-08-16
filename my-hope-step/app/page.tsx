import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import SocialProof from "@/components/SocialProof"
import Pricing from "@/components/Pricing"
import Faq from "@/components/Faq"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  )
}
