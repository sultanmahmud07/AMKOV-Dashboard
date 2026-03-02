/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Plus, Facebook, Twitter, Instagram } from 'lucide-react';

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "MISHEL MARSH",
      role: "Co-Founder",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "MICHEL RICHARD",
      role: "Director & CEO",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "ANJELINA ROSEE",
      role: "Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "ROBERT FOX",
      role: "Logistics Head",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    if (!isPaused) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => clearInterval(slideInterval);
  }, [isPaused, startIndex]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

const visibleMembers = [
    teamMembers[startIndex % teamMembers.length],
    teamMembers[(startIndex + 1) % teamMembers.length],
    teamMembers[(startIndex + 2) % teamMembers.length],
    teamMembers[(startIndex + 3) % teamMembers.length], // <--- ADD THIS LINE
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="main-container ">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16 text-center relative">
          <div className="inline-block border border-[#FA4318] px-4 py-1 rounded-full mb-4 bg-white dark:bg-gray-800">
            <span className="text-[#FA4318] text-sm font-bold uppercase tracking-wider">
              TEAM MEMBERS
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] dark:text-white mb-4 uppercase transition-colors">
            OUR PROFESSIONAL TEAM
          </h2>
          <p className="max-w-2xl text-gray-500 dark:text-gray-400 text-lg transition-colors">
            Dramatically enhance interactive metrics for reliable services. Proactively unleash fully researched e-commerce.
          </p>

          {/* Navigation Arrows */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 gap-3">
             <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FA4318] hover:text-white hover:border-[#FA4318] dark:hover:bg-[#FA4318] dark:hover:text-white transition-all duration-300"
             >
              <ArrowLeft size={20} />
            </button>
            <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FA4318] hover:text-white hover:border-[#FA4318] dark:hover:bg-[#FA4318] dark:hover:text-white transition-all duration-300"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Team Grid */}
       <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" // Changed lg:grid-cols-3 to lg:grid-cols-4 and gap-8 to gap-6 (to fit better)
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleMembers.map((member) => (
            <div 
              key={member.id} 
              // Card Container: Relative allows us to position the button absolutely within the card
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fadeIn"
            >
              
              {/* 1. Image Area (Fixed Height) */}
              <div className="w-full h-96 overflow-hidden rounded-t-xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
              </div>

              {/* 2. Text Content Area */}
              <div className="p-8 pt-6 text-center transition-colors duration-300 bg-white dark:bg-gray-800 group-hover:bg-[#FA4318] rounded-b-xl">
                <h3 className="text-lg font-extrabold text-[#111827] dark:text-white uppercase mb-1 transition-colors group-hover:text-white">
                  {member.name}
                </h3>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide transition-colors group-hover:text-white/90">
                  {member.role}
                </span>
              </div>

              {/* 3. The Floating Interaction (MOVED OUTSIDE the overflow-hidden containers) */}
              {/* Position: Top = 96 (height of image) - half button height via translate */}
              <div className="absolute top-96 right-8 -translate-y-1/2 z-20 flex flex-col-reverse items-center gap-3 group/social w-12 pb-2">
                
                {/* Trigger Button */}
                <button className="w-12 h-12 shrink-0 rounded-full bg-[#FA4318] text-white flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 transition-colors duration-300 group-hover/social:bg-white group-hover/social:text-[#FA4318]">
                  <Plus size={24} className="transition-transform duration-300 group-hover/social:rotate-45" />
                </button>

                {/* Social Icons (Appear above button) */}
                <div className="flex flex-col gap-3 opacity-0 translate-y-4 invisible group-hover/social:visible group-hover/social:opacity-100 group-hover/social:translate-y-0 transition-all duration-300 delay-75">
                  <a href="#" className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white transition-all hover:scale-110">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white text-sky-400 flex items-center justify-center shadow-md hover:bg-sky-400 hover:text-white transition-all hover:scale-110">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white text-pink-600 flex items-center justify-center shadow-md hover:bg-pink-600 hover:text-white transition-all hover:scale-110">
                    <Instagram size={18} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 active:bg-[#FA4318] active:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 active:bg-[#FA4318] active:text-white"
            >
              <ArrowRight size={18} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default OurTeam;