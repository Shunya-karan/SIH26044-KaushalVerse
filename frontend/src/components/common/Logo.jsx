import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'default', showTagline = false, className = '' }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}>
      {/* Skill Graph / Connected Nodes Icon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform group-hover:scale-105 ${
        isSmall ? 'w-8 h-8' : isLarge ? 'w-11 h-11' : 'w-9 h-9'
      }`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={isSmall ? 'w-4 h-4' : isLarge ? 'w-6 h-6' : 'w-5 h-5'}>
          <circle cx="6" cy="6" r="2.5" fill="currentColor" fillOpacity="0.2"/>
          <circle cx="18" cy="6" r="2.5" fill="currentColor" fillOpacity="0.2"/>
          <circle cx="12" cy="18" r="3" fill="currentColor"/>
          <path d="M7.8 7.8L10.5 15.5"/>
          <path d="M16.2 7.8L13.5 15.5"/>
          <path d="M8.5 6h7"/>
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-main transition-colors group-hover:text-primary ${
            isSmall ? 'text-lg' : isLarge ? 'text-2xl' : 'text-xl'
          }`}>
            Kaushal<span className="text-primary font-extrabold">Verse</span>
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary-soft text-primary border border-primary-light rounded">
            SIH
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-subtext font-medium tracking-normal -mt-0.5">
            Bridging Skills. Connecting Academia & Industry.
          </span>
        )}
      </div>
    </Link>
  );
};
