import React from 'react';
import bingxLogoImg from '../assets/images/bingx_brand_logo_1790496601051.jpg';

interface BingXLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BingXLogo: React.FC<BingXLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-white p-0.5 flex items-center justify-center shadow-lg border-2 border-blue-500/40 overflow-hidden relative`}
      >
        <img
          src={bingxLogoImg}
          alt="BingX"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      {showText && (
        <span className="text-[11px] tracking-[0.2em] font-black text-white mt-1 uppercase font-sans">
          BINGX
        </span>
      )}
    </div>
  );
};

// Backwards compatibility alias
export const PorscheLogo = BingXLogo;
