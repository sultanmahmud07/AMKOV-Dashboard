import React from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscription logic here (e.g., toast notification)
    alert("Thank you for subscribing to DropX!");
  };

  return (
    // Background: Dark Navy (Standard for professional footers/newsletters)
    <section className=" py-16 relative overflow-hidden">
      
      {/* Decorative Background Elements (Abstract Circles) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FA4318] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="main-container relative z-10">
        <div className="bg-[#1F2937] dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700/50 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Side: Text Content */}
          <div className="text-center lg:text-left lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-[#FA4318]/10 px-4 py-1.5 rounded-full mb-4 border border-[#FA4318]/20">
              <Mail size={16} className="text-[#FA4318]" />
              <span className="text-[#FA4318] text-xs font-bold uppercase tracking-wider">
                Newsletter
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Subscribe for Updates
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Join our community of 85,000+ members. Get the latest news on logistics, shipping trends, and exclusive DropX offers directly in your inbox.
            </p>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-5/12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#FA4318] transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA4318] focus:border-transparent transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#FA4318] hover:bg-orange-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-900/40 flex items-center justify-center gap-2 group"
              >
                Subscribe Now
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <p className="text-xs text-center lg:text-left text-gray-500 mt-2">
                We care about your data in our <a href="#" className="text-white hover:text-[#FA4318] underline transition-colors">privacy policy</a>.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;