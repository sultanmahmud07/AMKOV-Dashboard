
import { Package, Users, Truck, MapPin } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const OurAchievement = () => {
  // Setup intersection observer to detect when section is visible
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the component is visible
    triggerOnce: true, // Only count once per page load
  });

  const data = [
    {
      id: 1,
      title: "Parcels Delivered",
      icon: <Package className="w-8 h-8 text-[#FA4318]" />,
      number: 1.2, // Use raw number for calculation
      suffix: "M+", // Add suffix for display
      decimals: 1, // 1.2 needs 1 decimal place
    },
    {
      id: 2,
      title: "Active Customers",
      icon: <Users className="w-8 h-8 text-[#FA4318]" />,
      number: 85,
      suffix: "K+",
      decimals: 0,
    },
    {
      id: 3,
      title: "Delivery Partners",
      icon: <Truck className="w-8 h-8 text-[#FA4318]" />,
      number: 12,
      suffix: "K+",
      decimals: 0,
    },
    {
      id: 4,
      title: "Cities Covered",
      icon: <MapPin className="w-8 h-8 text-[#FA4318]" />,
      number: 150,
      suffix: "+",
      decimals: 0,
    }
  ];

  return (
    <section 
      ref={ref} // Attach the observer ref here
      className="relative w-full py-20 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      
      {/* Heavy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/95 via-[#111827]/90 to-black/80"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        
        {/* Header Section */}
        <div className="mb-12">
            <span className="text-[#FA4318] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                Our Achievement
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase">
                Trusted by Millions
            </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group">
              
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                {item.icon}
              </div>

              {/* Animated Number */}
              <h3 className="text-3xl md:text-5xl font-extrabold text-white">
                {inView ? (
                  <CountUp 
                    start={0} 
                    end={item.number} 
                    duration={2.5} // Animation takes 2.5 seconds
                    decimals={item.decimals}
                    suffix={item.suffix}
                  />
                ) : (
                  <span>0{item.suffix}</span> // Fallback before scroll
                )}
              </h3>

              <h6 className="text-gray-400 text-xs md:text-xs font-semibold uppercase tracking-widest group-hover:text-white transition-colors">
                {item.title}
              </h6>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default OurAchievement;