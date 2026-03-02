import React from 'react';
import { Link } from 'react-router'; // Ensure correct router import
import { 
  Plane, 
  Clock, 
  Package, 
  ShieldCheck, 
  CheckCircle, 
  FileText, 
  ArrowRight,
  Globe
} from 'lucide-react'; 
import airBannerImg from '@/assets/images/about-banner-bg.png'; 
import airDetailImg from '@/assets/images/about-banner-bg.png'; 
import CommonBanner from './CommonBanner';

const AirTransport = () => {
  
  // Sidebar Service Links (Air Freight is Active)
  const otherServices = [
    { name: "Air Freight", link: "/services/air", active: true },
    { name: "Road Transport", link: "/services/road" },
    { name: "Sea Transportation", link: "/services/sea" },
    { name: "Warehousing", link: "/services/warehousing" },
    { name: "Packaging", link: "/services/packaging" },
  ];

  // Key Benefits Data for Air Transport
  const benefits = [
    { 
      icon: <Clock />, 
      title: "Fastest Delivery", 
      desc: "Standard, Express, and Next-Flight-Out options for urgent shipments." 
    },
    { 
      icon: <Globe />, 
      title: "Global Reach", 
      desc: "Access to 200+ countries via our partner airline networks." 
    },
    { 
      icon: <ShieldCheck />, 
      title: "High Security", 
      desc: "Enhanced security protocols for high-value and sensitive cargo." 
    },
    { 
      icon: <Package />, 
      title: "Door-to-Door", 
      desc: "Seamless pickup and final mile delivery directly to the recipient." 
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 pb-20">
      
      {/* 1. Page Banner */}
      <CommonBanner 
        title="Air Transportation" 
        description="Speed, security, and global reach. The fastest way to move your cargo worldwide."
        image={airBannerImg}
      />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* === LEFT COLUMN: MAIN CONTENT === */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[400px] relative group">
              <img 
                src={airDetailImg} 
                alt="Air Cargo Plane" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Optional overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Overview Text */}
            <div>
              <h2 className="text-3xl font-bold text-[#111827] dark:text-white mb-4">
                Fast & Reliable Air Freight Services
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                When time is critical, DropX Air Freight is your best solution. We specialize in moving time-sensitive cargo across the globe with speed and precision. Whether you need to ship urgent documents, perishable goods, or high-value electronics, our air network ensures your shipment arrives on schedule.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                We offer a range of service levels from "Next Flight Out" for emergencies to "Consolidated Air Freight" for cost savings. Our dedicated team handles all customs documentation and compliance, ensuring a smooth transit through international airports.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {benefits.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#FA4318] transition-colors group">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#FA4318] shadow-sm mb-4 group-hover:bg-[#FA4318] group-hover:text-white transition-colors">
                    {React.cloneElement(item.icon as React.ReactElement, )}
                  </div>
                  <h4 className="text-lg font-bold text-[#111827] dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* How It Works List */}
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-6">
                Air Freight Process
              </h3>
              <ul className="space-y-4">
                {[
                  "Immediate pickup and transfer to the nearest airport.",
                  "Weight & volume verification and security screening.",
                  "Air Waybill (AWB) preparation and customs filing.",
                  "Priority loading onto the aircraft.",
                  "Arrival handling and expedited final delivery."
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-[#FA4318] mt-1 shrink-0" size={20} />
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* === RIGHT COLUMN: SIDEBAR === */}
          <div className="space-y-8">
            
            {/* 1. Services Navigation */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                Our Services
              </h3>
              <ul className="space-y-2">
                {otherServices.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.link}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all font-medium ${
                        service.active 
                          ? "bg-[#FA4318] text-white shadow-md" 
                          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#FA4318] hover:text-white"
                      }`}
                    >
                      {service.name}
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Download Brochure */}
            <div className="bg-[#111827] rounded-xl p-8 text-white relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FA4318] rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <FileText size={40} className="text-[#FA4318] mb-4" />
              <h4 className="text-xl font-bold mb-2">Download Brochure</h4>
              <p className="text-gray-400 text-sm mb-4">Get air freight rates and service tiers.</p>
              <button className="text-white font-bold uppercase text-xs tracking-wider border-b-2 border-[#FA4318] pb-1 hover:text-[#FA4318] transition-colors">
                Download PDF
              </button>
            </div>

            {/* 3. Contact Widget */}
            <div className="bg-[#FA4318] rounded-xl p-8 text-white text-center shadow-xl shadow-orange-500/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Plane size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Urgent Cargo?</h4>
              <p className="text-white/80 mb-6 text-sm">
                Call our 24/7 Air Freight desk for immediate booking.
              </p>
              <a href="tel:+8801327357894" className="block w-full bg-white text-[#FA4318] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                +880 132 735 7894
              </a>
              <a href="mailto:air@dropx.com" className="block mt-4 text-sm hover:underline">
                air@dropx.com
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AirTransport;