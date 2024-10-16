import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialSection from "@/components/TestimonialSection";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import Instructors from "@/components/Instructors";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {/* <h1 className="text-center text-3xl">Sohail Shaikh</h1> */}
      <HeroSection />
      <FeaturedSection />
      <WhyChooseUs />
      <TestimonialSection />
      <UpcomingWebinars />
      <Instructors />
    </main>
  );
}
