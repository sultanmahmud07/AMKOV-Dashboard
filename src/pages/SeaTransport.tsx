import React from 'react';
import { Link } from 'react-router'; // or 'react-router' depending on your version
import { 
  Ship, 
  Anchor, 
  Container, 
  Globe, 
  CheckCircle, 
  FileText, 
  Phone, 
  ArrowRight 
} from 'lucide-react'; // Your reusable banner
import seaBannerImg from '@/assets/images/about-banner-bg.png'; // Add banner image
import seaDetailImg from '@/assets/images/about-banner-bg.png'; // Add detail image
import CommonBanner from '@/pages/CommonBanner';
const SeaTransport = () => {
  
  // Sidebar Service Links
  const otherServices = [
    { name: "Air Freight", link: "/" },
    { name: "Road Transport", link: "/" },
    { name: "Sea Transportation", link: "/", active: true },
    { name: "Warehousing", link: "/" },
    { name: "Packaging", link: "/" },
  ];

  // Key Benefits Data
  const benefits = [
    { icon: <Container />, title: "FCL & LCL Options", desc: "Full Container Load (FCL) or Less than Container Load (LCL) to suit your volume." },
    { icon: <Globe />, title: "Global Port Coverage", desc: "Direct connections to over 500 major ports worldwide." },
    { icon: <Anchor />, title: "Customs Clearance", desc: "We handle all documentation, tariffs, and port regulations for you." },
    { icon: <Ship />, title: "Project Cargo", desc: "Specialized handling for oversized, heavy, or complex machinery." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 pb-20">
      
      {/* 1. Page Banner */}
      <CommonBanner 
        title="Sea Transportation" 
        description="Reliable, cost-effective ocean freight solutions for your global shipping needs."
        image={seaBannerImg}
      />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* === LEFT COLUMN: MAIN CONTENT === */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[400px]">
              <img 
                src={seaDetailImg} 
                alt="Container Ship" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Overview Text */}
            <div>
              <h2 className="text-3xl font-bold text-[#111827] dark:text-white mb-4">
                Global Ocean Freight Solutions
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                When cost-effectiveness and volume are your priorities, our Sea Transportation service is the ideal choice. We provide a comprehensive range of ocean freight services that ensure your cargo reaches any continent safely and on time. Whether you are shipping a single pallet or multiple containers, DropX offers flexible sailing schedules and competitive rates.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Our team of logistics experts manages the entire process—from booking cargo space to arranging pickup, handling port documentation, and ensuring final delivery. We partner with the world's leading shipping lines to guarantee capacity and reliability.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {benefits.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#FA4318] transition-colors group">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#FA4318] shadow-sm mb-4 group-hover:bg-[#FA4318] group-hover:text-white transition-colors">
                    {React.cloneElement(item.icon as React.ReactElement,)}
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
                How It Works
              </h3>
              <ul className="space-y-4">
                {[
                  "Cargo Pick-up from your warehouse or supplier.",
                  "Consolidation & Container Loading at the port of origin.",
                  "Export Customs Clearance & Documentation.",
                  "Ocean Transit via premium shipping lines.",
                  "Arrival, Import Clearance & Final Delivery."
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
              <p className="text-gray-400 text-sm mb-4">Get detailed pricing and service specifications.</p>
              <button className="text-white font-bold uppercase text-xs tracking-wider border-b-2 border-[#FA4318] pb-1 hover:text-[#FA4318] transition-colors">
                Download PDF
              </button>
            </div>

            {/* 3. Contact Widget */}
            <div className="bg-[#FA4318] rounded-xl p-8 text-white text-center shadow-xl shadow-orange-500/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Phone size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Need Help?</h4>
              <p className="text-white/80 mb-6 text-sm">
                Speak with a sea freight expert to get a custom quote.
              </p>
              <a href="tel:+8801327357894" className="block w-full bg-white text-[#FA4318] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                +880 132 735 7894
              </a>
              <a href="mailto:dev.mrshimul@gmail.com" className="block mt-4 text-sm hover:underline">
                dev.mrshimul@gmail.com
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SeaTransport;