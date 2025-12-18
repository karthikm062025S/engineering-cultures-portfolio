import React, { useState } from 'react';
import { SectionContent } from '../types';

interface SectionViewProps {
  data: SectionContent;
  isActive: boolean;
}

export const SectionView: React.FC<SectionViewProps> = ({ data, isActive }) => {
  const [imgError, setImgError] = useState(false);

  const getTransitionClass = (baseDelay: string) => {
    return isActive
      ? `opacity-100 translate-y-0 ${baseDelay}`
      : 'opacity-0 translate-y-10 delay-0';
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-background-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-zinc-900">
        {!imgError ? (
          <img
            src={data.image}
            alt={data.imageAlt}
            onError={() => setImgError(true)}
            className={`
              w-full h-full object-cover
              transition-transform duration-[2500ms] ease-out
              ${isActive ? 'scale-105' : 'scale-[1.12]'}
              filter brightness-[1.05] contrast-[1.05] grayscale-[10%]
            `}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
        )}

        {/* Image-preserving overlays */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-20 text-center">
        {data.isIntro ? (
          <div className="relative max-w-4xl flex flex-col items-center gap-6">
            {/* Slightly stronger local contrast ONLY behind text */}
            <div className="absolute inset-0 bg-black/60 blur-[95px] -z-10 rounded-full"></div>

            <h1
              className={`
                font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-xl
                transition-all duration-1000 ease-out
                ${getTransitionClass('delay-300')}
              `}
            >
              {data.heading}
            </h1>

            <p
              className={`
                font-serif text-xl md:text-3xl text-zinc-100 italic max-w-2xl mt-4 drop-shadow-lg
                transition-all duration-1000 ease-out
                ${getTransitionClass('delay-500')}
              `}
            >
              {data.paragraph}
            </p>

            {data.bridgingLine && (
              <div
                className={`
                  mt-12 font-serif text-lg md:text-2xl uppercase tracking-[0.1em]
                  transition-all duration-1000 ease-out
                  ${getTransitionClass('delay-700')}
                `}
              >
                <span className="block mb-2 text-zinc-300">
                  {data.bridgingLine.split('\n')[0]}
                </span>
                <span className="block text-[#e29e79] font-semibold">
                  {data.bridgingLine.split('\n')[1]}
                </span>
              </div>
            )}

            <div
              className={`
                absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                transition-opacity duration-1000
                ${isActive ? 'delay-1000 opacity-80' : 'delay-0 opacity-0'}
              `}
            >
              <span className="font-serif text-sm text-zinc-300">
                scroll to explore
              </span>
              <div className="w-px h-8 bg-[#e29e79] animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="relative max-w-3xl flex flex-col items-center gap-8 md:gap-12">
            {/* Slightly stronger local contrast ONLY behind text */}
            <div className="absolute inset-0 bg-black/65 blur-[85px] -z-10 rounded-full"></div>

            <div
              className={`
                w-px bg-[#e29e79]
                transition-all duration-1000 ease-out
                ${isActive ? 'h-12 delay-300' : 'h-0 delay-0'}
              `}
            ></div>

            <h2
              className={`
                font-serif text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-xl
                transition-all duration-1000 ease-out
                ${getTransitionClass('delay-500')}
              `}
            >
              {data.heading}
            </h2>

            <p
              className={`
                font-serif text-lg md:text-2xl text-zinc-100 leading-relaxed max-w-2xl drop-shadow-lg
                transition-all duration-1000 ease-out
                ${getTransitionClass('delay-700')}
              `}
            >
              {data.paragraph}
            </p>

            {data.bridgingLine && (
              <div
                className={`
                  mt-4 p-4 border-t border-white/30
                  font-serif text-base md:text-lg text-[#e29e79] italic
                  transition-all duration-1000 ease-out
                  ${getTransitionClass('delay-1000')}
                `}
              >
                {data.bridgingLine}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
