import About from "@/components/modules/HomePage/About/About";
import CommonBanner from "./CommonBanner";
import AboutUs from "@/components/modules/About/AboutUs/AboutUs";
import bannerImg from '@/assets/images/about-banner-bg.png';
import OurTeam from "@/components/modules/HomePage/OurTeam";
export default function AboutPage() {
  return (
    <>
      <div className="">
        <CommonBanner
          title="About DropX"
        description="Driven by technology, delivering with care. We are redefining the future of global logistics one parcel at a time."
          image={bannerImg}
        />
        <About></About>
        <AboutUs></AboutUs>
        <OurTeam></OurTeam>
      </div>
    </>
  );
}
