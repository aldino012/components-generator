// src/templates/Carousel.js

module.exports = (componentName) => {
  return `"use client";

import React, { useState, useEffect, useCallback } from 'react';

/**
 * ${componentName} Component
 * Standar Industri: Auto-play cerdas, transisi halus, Dark Mode, dan Aksesibilitas penuh.
 */
const ${componentName} = ({
  items = [],            // Array: { id, image, title, description, action }
  autoPlay = true,       // Boolean: Putar otomatis
  interval = 5000,       // Number: Durasi per slide (ms)
  showIndicators = true, // Boolean: Tampilkan titik-titik navigasi
  showControls = true,   // Boolean: Tampilkan tombol panah kiri/kanan
  className = '',
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (!items || items.length === 0) return null;

  // =========================================================================
  // 1. LOGIKA NAVIGASI
  // =========================================================================
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // =========================================================================
  // 2. AUTO-PLAY & KEYBOARD NAVIGATION
  // =========================================================================
  useEffect(() => {
    if (autoPlay && !isPaused) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, isPaused, interval, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // =========================================================================
  // 3. RENDER KOMPONEN
  // =========================================================================
  return (
    <div 
      className={\`relative w-full overflow-hidden rounded-2xl group \${className}\`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeri Gambar"
      {...props}
    >
      {/* Wrapper Slide dengan Transisi Halus */}
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: \`translateX(-\${currentIndex * 100}%)\` }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id || index} 
            className="w-full flex-shrink-0 relative"
            role="group"
            aria-roledescription="slide"
            aria-label={\`Slide \${index + 1} dari \${items.length}\`}
            aria-hidden={currentIndex !== index}
          >
            {/* Gambar Background */}
            <img 
              src={item.image} 
              alt={item.title || 'Carousel slide'} 
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
            
            {/* Gradient Overlay agar teks selalu terbaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Konten Teks */}
            {(item.title || item.description || item.action) && (
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 text-white">
                <div className="max-w-2xl space-y-4">
                  {item.title && (
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-md">
                      {item.title}
                    </h2>
                  )}
                  {item.description && (
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed drop-shadow-sm">
                      {item.description}
                    </p>
                  )}
                  {item.action && (
                    <div className="pt-2">
                      {item.action}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tombol Kontrol (Prev/Next) - Muncul saat hover atau fokus */}
      {showControls && items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Slide sebelumnya"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Slide berikutnya"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indikator (Dots) */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={\`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 \${
                currentIndex === index 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/80 w-2'
              }\`}
              aria-label={\`Pergi ke slide \${index + 1}\`}
              aria-current={currentIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ${componentName};
`;
};