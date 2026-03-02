import { Ship, Plane, Warehouse, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "SEA TRANSPORTATION",
      description: "Intrinsically exploit e-business imperative with emerging human capital.",
      icon: <Ship className="w-8 h-8 text-[#FA4318]" />,
      // Fixed: New reliable Cargo Ship image
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2070&auto=format&fit=crop", 
      like: "/service/sea-transportation"
    },
    {
      id: 2,
      title: "AIR TRANSPORTATION",
      description: "Intrinsically exploit e-business imperative with emerging human capital.",
      icon: <Plane className="w-8 h-8 text-[#FA4318]" />,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
      like: "/service/air-transportation"
    },
    {
      id: 3,
      title: "WAREHOUSING",
      description: "Intrinsically exploit e-business imperative with emerging human capital.",
      icon: <Warehouse className="w-8 h-8 text-[#FA4318]" />,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      like: "/service/warehousing"
    },
  ];

  return (
    // Section BG: Gray-50 (Light) -> Gray-950 (Dark)
    <section className="relative py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      
      {/* Background Split: 
          Light Mode: Bottom 1/3 is Dark Navy (#111827)
          Dark Mode: Bottom 1/3 is Black (to contrast with the gray-950 body) 
      */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#111827]  z-0 transition-colors duration-300"></div>

      <div className="main-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block border border-[#FA4318] px-4 py-1 rounded-full mb-4 bg-white dark:bg-gray-800">
            <span className="text-[#FA4318] text-sm font-bold uppercase tracking-wider">
              SERVICES
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] dark:text-white mb-6 uppercase transition-colors">
            OUR SERVICE FOR YOU
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg transition-colors">
            Quickly optimize cooperative models for long-term high-impact ROI. Dynamically drive innovative e-commerce and distributed paradigms.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              // Card BG: White (Light) -> Gray-800 (Dark)
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Icon Circle: White (Light) -> Gray-700 (Dark) */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg border-2 border-transparent group-hover:border-[#FA4318] transition-colors duration-300 z-10">
                  {service.icon}
                </div>
                
                {/* Decorative Triangle/Notch: Matches Card BG (White or Gray-800) */}
                <div 
                  className="absolute -bottom-1 left-0 right-0 h-12 bg-white dark:bg-gray-800 transition-colors duration-300" 
                  style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
                ></div>
              </div>

              {/* Content Area */}
              <div className="p-8 pt-4">
                <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-3 uppercase group-hover:text-[#FA4318] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 mb-6 leading-relaxed transition-colors">
                  {service.description}
                </p>
                
                {/* Read More Button */}
                <Link to={service.like} className="flex items-center gap-2 text-sm font-bold text-[#111827] dark:text-gray-200 uppercase cursor-pointer hover:text-[#FA4318] dark:hover:text-[#FA4318] transition-colors group/btn">
                  <span>Read More</span>
                  <span className="bg-[#FA4318] rounded-full p-1 text-white group-hover/btn:translate-x-1 transition-transform">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;