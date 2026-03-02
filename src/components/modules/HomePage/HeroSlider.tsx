/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import ParcelTracker from './ParcelTracker';

// 1. Define the interface for your slide data
interface SlideData {
  id: number;
  image: string;
  subTitle: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

// 2. The Content Data (Easy to change)
const slides: SlideData[] = [
  {
    id: 1,
    // Using a placeholder image related to logistics
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    subTitle: "Professional Logistics",
    title: "FAST CERTIFIED & BEST WORLDWIDE SERVICE",
    description: "Professionally strategize stand-alone functionalities and cooperative total linkage. Objectively predominate virtual quality vectors.",
    primaryBtnText: "Explore Services",
    primaryBtnLink: "/service/sea-transportation",
    secondaryBtnText: "Contact Us",
    secondaryBtnLink: "/contact",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
    subTitle: "Reliable Shipping",
    title: "SAFE & SECURE PARCEL DELIVERY",
    description: "We ensure your packages arrive on time and in perfect condition. Track your shipment in real-time with our advanced system.",
    primaryBtnText: "Track Parcel",
    primaryBtnLink: "/track",
    secondaryBtnText: "Get a Quote",
    secondaryBtnLink: "/contact",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop", // Air freight
    subTitle: "Global Reach",
    title: "CONNECTING COMMERCE GLOBALLY",
    description: "Our air freight services bridge the gap between continents. Experience speed and efficiency like never before.",
    primaryBtnText: "Our Policies",
    primaryBtnLink: "/privacy-policy",
    secondaryBtnText: "Support",
    secondaryBtnLink: "/help",
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  return (
    <div className="relative h-[92vh] md:h-[86vh] w-full group mt-20 mb-24 md:mb-16">

      {/* Slides Container */}
      <div
        className="relative h-full w-full"
        // Pause auto-slide on hover for better UX
        onMouseEnter={() => { }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080c24] via-black/50 to-transparent" />
            </div>

            {/* Content Content */}
            <div className="main-container relative z-20 flex h-full items-center">
              <div className="w-full md:max-w-5xl space-y-4 pt-0 "> {/* Padding left to make room for arrows */}

                {/* Subtitle */}
                <span className="inline-block rounded bg-[#FA4318]/20 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-[#FA4318] backdrop-blur-sm">
                  {slide.subTitle}
                </span>

                {/* Main Title */}
                <h1 className="text-3xl font-extrabold uppercase leading-tight text-white md:text-5xl drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="max-w-xl text-sm md:text-lg text-gray-200">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to={slide.primaryBtnLink}
                    className="rounded bg-[#FA4318] px-8 py-3 text-sm md:text-base font-bold text-white transition-transform hover:scale-105 hover:bg-orange-700 shadow-lg"
                  >
                    {slide.primaryBtnText}
                  </Link>
                  <Link
                    to={slide.secondaryBtnLink}
                    className="rounded border-2 border-white bg-transparent px-8 py-3 text-sm md:text-base font-bold text-white transition-colors hover:bg-white hover:text-black"
                  >
                    {slide.secondaryBtnText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons (Left Side Placement per image) */}
      <div className="absolute right-6 top-2/3 z-30 flex -translate-y-1/2 flex-col gap-4">

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#FA4318] hover:text-white border border-white/20"
          aria-label="Previous Slide"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-[#FA4318] hover:text-white shadow-lg"
          aria-label="Next Slide"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Optional: Bottom Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${currentSlide === index ? 'bg-[#FA4318] w-8' : 'bg-white/50 hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* === PARCEL TRACKER INTEGRATION === */}
      {/* Positioned absolutely at the bottom, centered */}
      <div className="absolute -bottom-24 md:-bottom-16 left-0 right-0 z-40 px-4 flex justify-center">
        <ParcelTracker />
      </div>
    </div>
  );
};

export default HeroSlider;