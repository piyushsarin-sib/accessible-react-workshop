import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const accessibilityInfo = [
  {
    id: 1,
    title: "Motor Disabilities",
    description: "Users with motor disabilities may rely on keyboard navigation, voice commands, or specialized devices. Ensure all functionality is accessible without requiring precise movements.",
    iconEmoji: "🦽"
  },
  {
    id: 2,
    title: "Visual Impairments",
    description: "Provide text alternatives for images, use sufficient color contrast, and ensure content is readable by screen readers. Labels and descriptions help users understand context.",
    iconEmoji: "👁️"
  },
  {
    id: 3,
    title: "Hearing Impairments",
    description: "Include captions for videos, transcripts for audio content, and visual alternatives for audio cues. This ensures deaf or hard-of-hearing users can access your content.",
    iconEmoji: "👂"
  },
  {
    id: 4,
    title: "Cognitive Disabilities",
    description: "Use clear language, consistent navigation, and avoid complex interactions. Provide enough time for users to read content and complete tasks at their own pace.",
    iconEmoji: "🧠"
  },
  {
    id: 5,
    title: "Why Accessibility Matters",
    description: "Accessible websites reach more users, improve SEO, ensure legal compliance, and demonstrate social responsibility. It's not just the right thing to do—it's good for business.",
    iconEmoji: "♿"
  }
];

const AccessibilityCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-advance the carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % accessibilityInfo.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? accessibilityInfo.length - 1 : prevIndex - 1
    );
    // Reset the auto-advance timer when manually navigating
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 7000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % accessibilityInfo.length
    );
    // Reset the auto-advance timer when manually navigating
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 7000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Reset the auto-advance timer when manually navigating
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 7000);
  };

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md mb-10"
      aria-roledescription="carousel"
      aria-label="Accessibility information carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="p-4 md:p-8">
        {isPaused && (
          <div className="absolute top-2 right-2 bg-white/70 text-gray-700 text-xs py-1 px-2 rounded z-10">
            Paused
          </div>
        )}
        {/* Fixed height container */}
        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <div
              key={currentIndex}
              className="text-center animate-slideIn absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="text-5xl mb-4" aria-hidden="true">
                {accessibilityInfo[currentIndex].iconEmoji}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-blue-800">
                {accessibilityInfo[currentIndex].title}
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto px-4 line-clamp-3">
                {accessibilityInfo[currentIndex].description}
              </p>
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1 flex items-center z-10">
        <button 
          onClick={goToPrevious}
          className="bg-white/80 hover:bg-white p-2 rounded-r-lg shadow-md transition-colors hover:text-blue-600 accessible-focus"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-1 flex items-center z-10">
        <button 
          onClick={goToNext}
          className="bg-white/80 hover:bg-white p-2 rounded-l-lg shadow-md transition-colors hover:text-blue-600 accessible-focus"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-3 z-10">
        {accessibilityInfo.map((item, index) => (
          <button
            key={`carousel-indicator-${item.id}`}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              index === currentIndex ? 'bg-blue-600 scale-110' : 'bg-blue-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};

export default AccessibilityCarousel;
