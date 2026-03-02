import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface TestimonialData {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: "MONISH POUL",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    text: "Progressively strategize intermandated manufactured products after multidisciplinary sources. Conveniently iterate value-added systems with.",
  },
  {
    id: 2,
    name: "MICHEL CLACRK",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    text: "Progressively strategize intermandated manufactured products after multidisciplinary sources. Conveniently iterate value-added systems with.",
  },
  {
    id: 3,
    name: "ANJELINA MATHEUS",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    text: "Progressively strategize intermandated manufactured products after multidisciplinary sources. Conveniently iterate value-added systems with.",
  },
  {
    id: 4,
    name: "ROBERT FOX",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    text: "Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate customer service with robust ideas.",
  }
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;

    if (!isPaused) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, 2000);
    }

    return () => clearInterval(slideInterval);
  }, [isPaused, startIndex]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[startIndex % testimonials.length],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length],
  ];

  return (
    // Section BG: White (Light) -> Gray-900 (Dark)
    <section className="py-20 bg-background transition-colors duration-300">
      <div className="main-container">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 relative">
          <div className="text-center lg:text-center w-full">
            <div className="inline-block border border-[#FA4318] px-4 py-1 rounded-full mb-4">
              <span className="text-[#FA4318] text-sm font-bold uppercase tracking-wider">
                TESTIMONIALS
              </span>
            </div>
            
            {/* Title: Gray-900 (Light) -> White (Dark) */}
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase transition-colors">
              OUR CLIENT'S FEEDBACK
            </h2>
            
            {/* Subtitle: Gray-500 (Light) -> Gray-400 (Dark) */}
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              Dramatically enhance interactive metrics for reliable services. Proactively unleash fully researched e-commerce.
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 gap-3">
            <button 
              onClick={prevSlide}
              // Button: White/Gray (Light) -> Gray-800/Gray-600 (Dark)
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FA4318] hover:text-white hover:border-[#FA4318] dark:hover:bg-[#FA4318] dark:hover:text-white dark:hover:border-[#FA4318] transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FA4318] hover:text-white hover:border-[#FA4318] dark:hover:bg-[#FA4318] dark:hover:text-white dark:hover:border-[#FA4318] transition-all duration-300"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleTestimonials.map((item) => (
            <div 
              key={item.id} 
              // Card BG: Gray-50 (Light) -> Gray-800 (Dark)
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-sm hover:shadow-lg transition-all duration-500 ease-in-out group animate-fadeIn"
            >
              {/* Quote Icon Box */}
              <div className="mb-6">
                <div className="bg-[#FA4318] w-12 h-12 flex items-center justify-center rounded-sm shadow-md">
                   <Quote className="text-white fill-current" size={24} />
                </div>
              </div>

              {/* Feedback Text: Gray-600 (Light) -> Gray-300 (Dark) */}
              <div className="mb-8 border-l-4 border-[#FA4318] pl-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic transition-colors">
                  "{item.text}"
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  // Border color matches the card background (White -> Gray-800)
                  className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm transition-colors"
                />
                <div>
                  {/* Name: Gray-900 (Light) -> White (Dark) */}
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase text-sm transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[#FA4318] text-xs font-semibold tracking-wide">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 active:bg-[#FA4318] active:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 active:bg-[#FA4318] active:text-white transition-colors"
            >
              <ArrowRight size={18} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;