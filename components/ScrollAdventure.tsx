import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollAdventureProps } from '../types';
import { SectionView } from './SectionView';

export const ScrollAdventure: React.FC<ScrollAdventureProps> = ({ sections }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const handleScroll = useCallback((direction: 'up' | 'down') => {
    if (isScrolling.current) return;

    if (direction === 'down' && currentIndex < sections.length - 1) {
      isScrolling.current = true;
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => { isScrolling.current = false; }, 1600); // Increased lock time for cinematic pace
    } else if (direction === 'up' && currentIndex > 0) {
      isScrolling.current = true;
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => { isScrolling.current = false; }, 1600);
    }
  }, [currentIndex, sections.length]);

  // Wheel Event Handler
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 20) {
        handleScroll(e.deltaY > 0 ? 'down' : 'up');
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [handleScroll]);

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        handleScroll('down');
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handleScroll('up');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleScroll]);

  // Touch Events for Mobile
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); 
    };
    const onTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      if (Math.abs(diff) > 50) { 
        handleScroll(diff > 0 ? 'down' : 'up');
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleScroll]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background-primary">
      {/* Container that slides */}
      <div 
        className="w-full h-full transition-transform ease-in-out will-change-transform"
        style={{ 
          transform: `translateY(-${currentIndex * 100}%)`,
          transitionDuration: '1500ms', // Increased duration for weight and deliberation
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' // Smooth ease-in-out for a less abrupt start/stop
        }}
      >
        {sections.map((section, idx) => (
          <div key={section.id} className="w-full h-full">
            <SectionView data={section} isActive={idx === currentIndex} />
          </div>
        ))}
      </div>

      {/* Progress Indicators - Minimal dots */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50">
        {sections.map((_, idx) => (
          <div 
            key={idx}
            onClick={() => {
              if (!isScrolling.current) {
                setCurrentIndex(idx);
              }
            }}
            className={`
              w-1 h-1 rounded-full transition-all duration-700 cursor-pointer
              ${idx === currentIndex 
                ? 'bg-accent-copper scale-[2] opacity-100' 
                : 'bg-white opacity-20 hover:opacity-50'}
            `}
          />
        ))}
      </div>
    </div>
  );
};