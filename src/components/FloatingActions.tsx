import React from 'react';
import { useApp } from '../context/AppContext';
import { Send, Calendar, Gift } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { setActiveModal, spinAvailable, dailyClaimedDays } = useApp();

  return (
    <div className="fixed right-3 bottom-24 z-30 flex flex-col items-center gap-3">
      {/* Telegram customer service support button */}
      <button
        onClick={() => setActiveModal('telegram')}
        className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-transform border border-white/20"
        title="Telegram Support"
      >
        <Send className="w-5 h-5 -rotate-12 translate-x-[-1px] text-white" />
      </button>

      {/* Daily sign-in calendar button */}
      <button
        onClick={() => setActiveModal('daily_signin')}
        className="w-11 h-11 rounded-full bg-[#1b3b85] text-white flex items-center justify-center shadow-lg shadow-indigo-900/40 hover:scale-105 active:scale-95 transition-transform border border-white/20 relative"
        title="Daily Sign-In"
      >
        <Calendar className="w-5 h-5 text-sky-200" />
        {dailyClaimedDays.length < 7 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#1b3b85]" />
        )}
      </button>

      {/* Lucky Gift box button */}
      <button
        onClick={() => setActiveModal('gift_box')}
        className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-900/40 hover:scale-105 active:scale-95 transition-transform border border-white/20 relative animate-bounce"
        title="Lucky Prize"
      >
        <Gift className="w-5 h-5 text-amber-300" />
        {spinAvailable && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-indigo-700" />
        )}
      </button>
    </div>
  );
};
