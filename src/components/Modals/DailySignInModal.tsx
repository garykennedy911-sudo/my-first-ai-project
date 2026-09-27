import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, CheckCircle2, Sparkles } from 'lucide-react';

export const DailySignInModal: React.FC = () => {
  const { activeModal, setActiveModal, dailyClaimedDays, claimDailyReward, showToast } = useApp();

  if (activeModal !== 'daily_signin') return null;

  const days = [
    { day: 1, reward: 0.75 },
    { day: 2, reward: 1.00 },
    { day: 3, reward: 1.25 },
    { day: 4, reward: 1.50 },
    { day: 5, reward: 1.75 },
    { day: 6, reward: 2.00 },
    { day: 7, reward: 5.00 },
  ];

  const handleClaim = (day: number) => {
    const res = claimDailyReward(day);
    if (res.success) {
      showToast(`+${res.reward} USDT Daily Bonus Claimed!`);
    } else {
      showToast('Already claimed for this day.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#11275b] to-[#071433] border border-blue-500/40 rounded-3xl p-5 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Daily Check-In</h3>
              <span className="text-[10px] text-slate-400">Continuous check-in gives higher rewards</span>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* 7-day grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {days.map((item) => {
            const isClaimed = dailyClaimedDays.includes(item.day);
            const isNext = !isClaimed && (dailyClaimedDays.length === 0 || dailyClaimedDays[dailyClaimedDays.length - 1] === item.day - 1);

            return (
              <button
                key={item.day}
                disabled={isClaimed}
                onClick={() => handleClaim(item.day)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center text-xs transition-all relative ${
                  isClaimed
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                    : isNext
                    ? 'bg-blue-600/40 border border-blue-400 text-white animate-pulse'
                    : 'bg-[#06122d] border border-blue-950 text-slate-400'
                } ${item.day === 7 ? 'col-span-2' : ''}`}
              >
                <span className="text-[10px] font-semibold mb-1">Day {item.day}</span>
                {isClaimed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-400" />
                )}
                <span className="font-mono font-bold mt-1 text-[11px]">
                  +{item.reward} USDT
                </span>
                {isClaimed && (
                  <span className="text-[9px] text-emerald-400 font-bold">Claimed</span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setActiveModal(null)}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};
