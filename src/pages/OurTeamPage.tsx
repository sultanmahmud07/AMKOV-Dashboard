import TeamInfo from "@/components/modules/OurTeam/TeamInfo"
import CommonBanner from "./CommonBanner"
import bannerImg from '@/assets/images/about-banner-bg.png';
import OurTeam from "@/components/modules/HomePage/OurTeam";
const OurTeamPage = () => {
  return (
    <div>
      <CommonBanner
        title="Meet The Team"
        description="Behind every successful delivery is a team of dedicated experts. We are logistics pros, tech innovators, and customer care specialists working for you."
         image={bannerImg}
      ></CommonBanner>
      <TeamInfo></TeamInfo>
      <OurTeam></OurTeam>
    </div>
  )
}

export default OurTeamPage;