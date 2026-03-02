
import FAQ from "@/components/modules/HomePage/FAQ/FAQ"
import CommonBanner from "./CommonBanner"
import bannerImg from '@/assets/images/about-banner-bg.png';

const FAQPage = () => {
  return (
    <div>
      <CommonBanner
        title="Frequently Asked Questions"
        description="Have questions? We have answers. Browse through our most common queries regarding shipping, tracking, payments, and account management."
        image={bannerImg}
      ></CommonBanner>
      <FAQ></FAQ>
    </div>
  )
}

export default FAQPage