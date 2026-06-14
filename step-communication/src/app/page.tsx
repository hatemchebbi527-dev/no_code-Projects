import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhatWeDo />
      <FeaturedProjects />
      <WhyUs />
      <Testimonials />
      <FinalCta />
    </>
  );
}
