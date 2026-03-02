import { Link } from 'react-router';
import { 
  Search, 
  Package, 
  Truck, 
  CreditCard, 
  User, 
  Globe, 
  ShieldAlert, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronRight 
} from 'lucide-react'; // npm install lucide-react

const HelpCenter = () => {
  
  // Data for Help Categories
  const categories = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Sending Parcels",
      description: "Guides on packaging, labeling, and scheduling pickups.",
      link: "/help/sending"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Tracking & Delivery",
      description: "Where is my parcel? Understanding tracking statuses.",
      link: "/help/tracking"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Billing & Payments",
      description: "Invoices, payment methods, and pricing calculations.",
      link: "/help/billing"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Account Management",
      description: "Profile settings, password reset, and role management.",
      link: "/help/account"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "International Shipping",
      description: "Customs, duties, and restricted items policy.",
      link: "/help/international"
    },
    {
      icon: <ShieldAlert className="w-8 h-8" />,
      title: "Claims & Insurance",
      description: "Report damaged items, lost parcels, and insurance info.",
      link: "/help/claims"
    }
  ];

  // Data for Popular Articles
  const popularArticles = [
    "How do I change my delivery address?",
    "What are the prohibited items list?",
    "How to calculate volumetric weight?",
    "My parcel status hasn't changed in 2 days",
    "How to download my monthly invoice?"
  ];

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* === 1. Hero Search Section === */}
      <section className="bg-[#111827] relative py-20 overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FA4318] opacity-10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <span className="text-[#FA4318] font-bold uppercase tracking-wider text-sm mb-4 block">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            How can we help you today?
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-[#FA4318] transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for answers (e.g. 'tracking', 'refund')" 
              className="w-full pl-14 pr-6 py-5 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-[#FA4318]/30 text-lg transition-all"
            />
          </div>
        </div>
      </section>

      {/* === 2. Browse Categories === */}
      <section className="py-16 -mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((item, index) => (
              <Link 
                to={item.link} 
                key={index} 
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-1 hover:border-[#FA4318] transition-all duration-300 group"
              >
                <div className="bg-gray-100 dark:bg-gray-800 w-14 h-14 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:bg-[#FA4318] group-hover:text-white transition-colors duration-300 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2 group-hover:text-[#FA4318] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === 3. Popular Articles & Contact === */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Popular Articles */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-6">
                Most Popular Articles
              </h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
                {popularArticles.map((article, i) => (
                  <Link 
                    key={i} 
                    to="#" 
                    className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <span className="text-gray-600 dark:text-gray-300 font-medium group-hover:text-[#FA4318] transition-colors">
                      {article}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#FA4318] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Direct Support Box */}
            <div className="lg:col-span-5">
              <div className="bg-[#111827] dark:bg-black rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA4318] opacity-20 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                
                <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
                <p className="text-gray-400 mb-8">
                  Our support team is available 24/7 to assist you with any issues.
                </p>

                <div className="space-y-4">
                  {/* Chat Option */}
                  <button className="w-full bg-[#FA4318] hover:bg-orange-700 text-white p-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all shadow-lg hover:shadow-orange-900/50 group">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Start Live Chat
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Email Option */}
                    <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-700 hover:border-gray-600 transition-all">
                      <Mail className="w-6 h-6 text-gray-400" />
                      <span className="text-sm font-medium">Email Us</span>
                    </button>
                    {/* Phone Option */}
                    <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-700 hover:border-gray-600 transition-all">
                      <Phone className="w-6 h-6 text-gray-400" />
                      <span className="text-sm font-medium">Call Us</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HelpCenter;