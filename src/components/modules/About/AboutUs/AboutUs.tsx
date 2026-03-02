import { CheckCircle, ArrowRight, Globe } from 'lucide-react';
import about from '../../../../assets/images/who-we-are.jpg'; // Ensure this path is correct
import { Link } from 'react-router';

const AboutUs = () => {
  const features = [
    "Real-Time Tracking Mechanism",
    "Secure & Insured Handling",
    "Global & Local Destination Reach",
    "24/7 Customer Support System"
  ];

  return (
    <section className="py-8 md:py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="main-container 8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* === Left Side: Image Composition === */}
           <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA4318]/10 text-[#FA4318] text-xs font-bold uppercase tracking-wider mb-4">
               <Globe size={14} />
               Who We Are
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] dark:text-white leading-tight mb-6">
              We Provide Full Range <br />
              <span className="text-[#FA4318]">Global Logistics</span> Solutions
            </h2>

            <p className="text-gray-500 dark:text-gray-400  leading-relaxed mb-6">
              DropX is dedicated to making shipping fast, safe, and convenient. Whether you're sending documents or heavy cargo, we bridge the gap between distances with technology-driven logistics.
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 border-l-4 border-gray-200 dark:border-gray-800 pl-4 italic">
              "Trust us to handle your shipments while you focus on what matters most. We ensure efficiency from pickup to delivery."
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#FA4318]/20 flex items-center justify-center text-[#FA4318]">
                    <CheckCircle size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[#111827] dark:text-gray-200 font-medium text-sm md:text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
           <Link to="/contact">
            <button className="group cursor-pointer flex items-center gap-2 bg-[#111827] dark:bg-white text-white dark:text-[#111827] px-8 py-3.5 rounded font-bold transition-all hover:bg-[#FA4318] dark:hover:bg-[#FA4318] hover:text-white dark:hover:text-white shadow-lg hover:shadow-[#FA4318]/30">
              Contact Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
           </Link>
          </div>

          {/* === Right Side: Content === */}
         
          <div className="relative group">
            {/* Background Decor */}
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 bg-[#FA4318]/10 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-gray-100 dark:bg-gray-800 rounded-2xl -z-10"></div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src={about}
                alt="Logistics Team"
                className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute bottom-8 left-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl border-l-4 border-[#FA4318] max-w-[200px] hidden md:block">
              <h4 className="text-3xl font-extrabold text-[#111827] dark:text-white mb-1">
                10M+
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Parcels delivered successfully worldwide.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutUs;