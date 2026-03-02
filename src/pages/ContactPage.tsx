
import CommonBanner from "./CommonBanner"
import ContactForm from "@/components/modules/Contact/ContactForm"
import bannerImg from '@/assets/images/about-banner-bg.png';

const ContactPage = () => {
  return (
    <div>
         <CommonBanner
          title="Contact Support"
          description="We are here to help you 24/7. Reach out to us for any parcel related queries."
          image={bannerImg}
        />
        <ContactForm></ContactForm>
    </div>
  )
}

export default ContactPage