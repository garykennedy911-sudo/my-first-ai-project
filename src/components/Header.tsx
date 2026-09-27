import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Globe, ChevronDown } from 'lucide-react';
import bingxLogoImg from '../assets/images/bingx_brand_logo_1790496601051.jpg';

export const Header: React.FC = () => {
  const { language, setLanguage, unreadNotifsCount, setActiveModal } = useApp();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0a2f7c] via-[#0d3b94] to-[#0a2a70] text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-blue-900/40 backdrop-blur-md">
      {/* Brand logo & name */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center shadow-md overflow-hidden shrink-0 border border-blue-400/50">
          <img
            src={bingxLogoImg}
            alt="BingX"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-xl font-black tracking-tight text-white font-sans drop-shadow-sm uppercase">
          BingX
        </span>
      </div>

      {/* Action controls (Envelope & Language) */}
      <div className="flex items-center gap-3">
        {/* Envelope notification button */}
        <button
          onClick={() => setActiveModal('notifications')}
          className="relative p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white/90"
          aria-label="Messages"
        >
          <Mail className="w-5 h-5" />
          {unreadNotifsCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#0d3b94] animate-pulse" />
          )}
        </button>

        {/* Language selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-white/15 hover:bg-white/25 border border-white/20 transition-all text-white"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'English' : 'العربية'}</span>
            <ChevronDown className="w-3 h-3 text-white/80" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-blue-700/60 rounded-xl shadow-2xl py-1 z-50 overflow-hidden text-sm">
              <button
                onClick={() => {
                  setLanguage('en');
                  setLangMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-600/30 transition-colors ${
                  language === 'en' ? 'text-blue-400 font-bold bg-blue-600/10' : 'text-slate-300'
                }`}
              >
                <span>English</span>
                {language === 'en' && <span className="text-blue-400">✓</span>}
              </button>
              <button
                onClick={() => {
                  setLanguage('ar');
                  setLangMenuOpen(false);
                }}
                className={`w-full text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-600/30 transition-colors ${
                  language === 'ar' ? 'text-blue-400 font-bold bg-blue-600/10' : 'text-slate-300'
                }`}
              >
                <span>العربية</span>
                {language === 'ar' && <span className="text-blue-400">✓</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
