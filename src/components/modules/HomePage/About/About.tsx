
import { Link } from 'react-router';
import { Target, Eye, ArrowRight } from 'lucide-react'; // npm install lucide-react
import about1 from '../../../../assets/images/about-1.png'
import about2 from '../../../../assets/images/about-2.png'
import aboutIcon from '../../../../assets/images/delivery-icon.png'

const About = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="main-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-10 items-center">
          
          {/* === Left Side: Image Composition === */}
          <div className="relative">
            {/* Decorative Background Shape */}
            <div className="absolute top-4 left-4 w-full h-full bg-gray-100 dark:bg-gray-800 rounded-2xl -z-10 transform translate-x-4 translate-y-4"></div>
            
            <div className="relative z-10">
                {/* Main Image */}
                <img
                  src={about1} // Use your variable: src={about1}
                  alt="Logistics Operation"
                  className="w-full md:w-5/6 rounded-2xl shadow-xl object-cover h-[400px] md:h-[500px] hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Secondary Overlapping Image */}
                <div className="absolute -bottom-12 right-0 md:right-8 w-3/5 rounded-2xl  dark:border-gray-950 shadow-2xl overflow-hidden group">
                 
                  <img
                    src={about2} // Use your variable: src={about2}
                    alt="Delivery Team"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Floating Icon Badge */}
                <div className="absolute top-12 -left-6 md:-left-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce-slow">
                   <div className="bg-[#FA4318]/10 p-3 rounded-full">
                      <img 
                        src={aboutIcon} 
                        alt="Icon" 
                        className="w-12 h-12 object-contain"
                      />
                   </div>
                </div>
            </div>
          </div>

          {/* === Right Side: Content === */}
          <div>
            {/* Header */}
            <div className="mb-3">
                <div className="inline-block border border-[#FA4318] px-4  rounded-full mb-4">
                    <span className="text-[#FA4318] text-xs font-bold uppercase tracking-wider">
                        Welcome to DropX
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] dark:text-white mb-3 leading-tight">
                    Reliable Delivery <br />
                    <span className="text-[#FA4318]">Across the Nation</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                    Experience fast, secure, and affordable parcel services. From documents to heavy shipments, 
                    we ensure your deliveries reach the right place at the right time with real-time tracking.
                </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Mission */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-[#FA4318] hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#FA4318] p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
                            <Target size={20} />
                        </div>
                        <h5 className="font-bold text-xl text-[#111827] dark:text-white">Our Mission</h5>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        To simplify parcel delivery with technology-driven solutions and trusted logistics support.
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-[#FA4318] hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#FA4318] p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
                            <Eye size={20} />
                        </div>
                        <h5 className="font-bold text-xl text-[#111827] dark:text-white">Our Vision</h5>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        To become the most reliable and customer-friendly courier service globally.
                    </p>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-5 mb-8">
                {/* Item 1 */}
                <div>
                    <div className="flex justify-between mb-2 font-bold text-[#111827] dark:text-gray-200">
                        <span>On-Time Delivery</span>
                        <span className="text-[#FA4318]">95%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FA4318] rounded-full relative" style={{ width: '95%' }}>
                             {/* Shimmer Effect */}
                             <div className="absolute inset-0 bg-white/30 w-full h-full animate-shimmer"></div>
                        </div>
                    </div>
                </div>
                
                {/* Item 2 */}
                <div>
                    <div className="flex justify-between mb-2 font-bold text-[#111827] dark:text-gray-200">
                        <span>Customer Satisfaction</span>
                        <span className="text-[#FA4318]">88%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                         <div className="h-full bg-[#FA4318] rounded-full relative" style={{ width: '88%' }}></div>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <Link to="/about">
                <button className="bg-[#FA4318] hover:bg-orange-700 text-white px-10 py-4 rounded font-bold shadow-lg hover:shadow-orange-900/30 transition-all duration-300 flex items-center gap-2 group">
                    About Us
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About;