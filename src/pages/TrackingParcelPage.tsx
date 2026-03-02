
import CommonBanner from "./CommonBanner"
import ParcelTracking from "@/components/modules/Parcel/TrackingParcel"

import bannerImg from '@/assets/images/about-banner-bg.png';
const TrackingParcelPage = () => {
  return (
    <div>
      <CommonBanner
        title="Track Your Shipment"
        description="Stay updated on your parcel's journey in real-time. Enter your tracking ID to get instant status updates from pickup to delivery."
        image={bannerImg}
      ></CommonBanner>
      <ParcelTracking></ParcelTracking>
    </div>
  )
}

export default TrackingParcelPage