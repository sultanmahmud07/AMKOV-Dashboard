import { Users, Target, ShieldCheck, Clock } from 'lucide-react'; // npm install lucide-react
import about from '../../../assets/images/who-we-are-img.png';

const TeamInfo = () => {
  
  // Core values derived from your text
  const coreValues = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Efficiency",
      desc: "Fast, reliable, and hassle-free delivery routes."
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Security",
      desc: "Every parcel is handled with care and insured."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Real-Time",
      desc: "Live tracking keeps you informed at every step."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Customer First",
      desc: "Tireless support to ensure your satisfaction."
    }
  ];

  return (
    <section className="py-10 md:py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="main-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* === Left: Image Composition === */}
          <div className="relative order-2 lg:order-1">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-3/4 h-full bg-gray-100 dark:bg-gray-800 rounded-3xl -z-10 transform translate-x-4 -translate-y-4"></div>
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <img
                src={about}
                alt="Parcel Delivery Team"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl border-l-4 border-[#FA4318] max-w-xs animate-fadeInUp">
              <div className="flex items-center gap-4">
                <div className="bg-[#FA4318]/10 p-3 rounded-full text-[#FA4318]">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#111827] dark:text-white">500+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Expert Team Members</p>
                </div>
              </div>
            </div>
          </div>

          {/* === Right: Content === */}
          <div className="order-1 lg:order-2">
            <span className="inline-block py-1 px-3 rounded-full bg-[#FA4318]/10 text-[#FA4318] text-xs font-bold uppercase tracking-wider mb-4">
              Who We Are
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] dark:text-white leading-tight mb-6">
              Delivering Parcels <br />
              <span className="text-[#FA4318]">Safely & Efficiently</span>
            </h2>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              We are a dedicated team committed to making parcel delivery fast, reliable, and hassle-free. From creating shipments to final delivery, we provide a seamless experience that keeps you informed.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {coreValues.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center group-hover:bg-[#FA4318] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111827] dark:text-white text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Quote / Highlight */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="italic text-gray-600 dark:text-gray-300 font-medium">
                "We understand the value of trust. That's why we treat every package as if it were our own."
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamInfo;