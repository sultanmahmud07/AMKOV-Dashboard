import About from "@/components/modules/HomePage/About/About";
import FAQ from "@/components/modules/HomePage/FAQ/FAQ";
import HeroSlider from "@/components/modules/HomePage/HeroSlider";
import Newsletter from "@/components/modules/HomePage/Newsletter";
import OurAchievement from "@/components/modules/HomePage/OurAchivment/OurAchivment";
import OurPrice from "@/components/modules/HomePage/OurPirce";
import OurServices from "@/components/modules/HomePage/OurServices";
import OurTeam from "@/components/modules/HomePage/OurTeam";
import Testimonials from "@/components/modules/HomePage/Testimonials";
import WhyChooseUs from "@/components/modules/HomePage/WhyChooseUs";

export default function Homepage() {
  return (
    <div>
      <HeroSlider />
      <About></About>
      <WhyChooseUs/>
      <OurServices />
      <OurPrice></OurPrice>
      <OurAchievement></OurAchievement>
      <Testimonials />
      <OurTeam></OurTeam>
      <Newsletter/>
      <FAQ></FAQ>
    </div>
  );
}
