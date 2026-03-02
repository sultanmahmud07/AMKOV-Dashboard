import { Ship, Clock, ShieldCheck } from 'lucide-react'; // Assuming you're using lucide-react for icons
import whyChooseUsImage from '../../../assets/images/why-choos-img.jpg'; // Update the path as necessary
const WhyChooseUs = () => {
  const features = [
    {
      icon: <Ship className="w-6 h-6 text-[#FA4318]" />,
      title: "FAST TRANSPORTION SERVICE",
      description: "Enhance interactive metrics for reliable services. Proactively unleash fully researched.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#FA4318]" />,
      title: "24/7 ONLINE SUPPORT",
      description: "Enhance interactive metrics for reliable services. Proactively unleash fully researched.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FA4318]" />,
      title: "SAFETY AND RELIABILITY",
      description: "Enhance interactive metrics for reliable services. Proactively unleash fully researched.",
    },
  ];

  const stats = [
    { count: "2000+", title: "PROJECT COMPLETE", description: "Conveniently impact front-end niches via maintainable." },
    { count: "100+", title: "BEST EMPLOYEES", description: "Conveniently impact front-end niches via maintainable." },
    { count: "450+", title: "WORLDWIDE CLIENTS", description: "Conveniently impact front-end niches via maintainable." },
    { count: "80+", title: "WORLD AWARDS", description: "Conveniently impact front-end niches via maintainable." },
  ];

  return (
    <section className="py-16 bg-[#111827] text-white">
      <div className="main-container ">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column - Text & Features */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <span className="text-[#FA4318] font-bold block mb-2">WHY CHOOSE US</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">WHY CHOOSE FOR US</h2>
              <p className="text-gray-400">
                Dramatically enhance interactive metrics for reliable services. Proactively unleash fully researched e-commerce.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:w-1/2">
            <img 
              src={whyChooseUsImage}
              alt="Cargo Ship" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center border-t border-gray-700 pt-12">
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-[#FA4318] mb-2">{stat.count}</h3>
              <p className="font-semibold mb-2">{stat.title}</p>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;