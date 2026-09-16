import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import HomeWindows from "@/components/HomeWindows"
import FeaturedOffers from "@/components/FeaturedOffers"
import SocialProof from "@/components/SocialProof"
import Faq from "@/components/Faq"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HomeWindows />
      <FeaturedOffers />
      <SocialProof />
      <Faq />
      <Footer />
    </main>
  )
}
