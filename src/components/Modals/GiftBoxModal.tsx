import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, Sparkles } from 'lucide-react';

export const GiftBoxModal: React.FC = () => {
  const { activeModal, setActiveModal, luckySpin, spinAvailable } = useApp();
  const [opening, setOpening] = useState(false);
  const [wonPrize, setWonPrize] = useState<number | null>(null);

  if (activeModal !== 'gift_box') return null;

  const handleOpenGift = () => {
    if (!spinAvailable) return;
    setOpening(true);
    setTimeout(() => {
      const res = luckySpin();
      setWonPrize(res.reward);
      setOpening(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#1c1447] via-[#111c47] to-[#071333] border border-purple-500/40 rounded-3xl p-5 shadow-2xl text-white text-center">
        <div className="flex justify-end">
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        <div className="my-3 flex justify-center">
          <div
            className={`w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-500/50 border-2 border-amber-300 ${
              opening ? 'animate-bounce' : ''
            }`}
          >
            <Gift className="w-12 h-12 text-white" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          BingX Mystery Gift Box
        </h3>
        <p className="text-xs text-purple-200/80 mb-4 px-4">
          Open the mystery BingX reward box for an instant USDT asset credit!
        </p>

        {wonPrize !== null ? (
          <div className="bg-purple-950/60 p-4 rounded-2xl border border-purple-500/40 mb-4">
            <span className="text-xs text-slate-300 block mb-1">Congratulations! You won:</span>
            <div className="text-3xl font-black font-mono text-amber-300 flex items-center justify-center gap-1">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>+{wonPrize.toFixed(2)} USDT</span>
            </div>
            <span className="text-[10px] text-emerald-400 block mt-1">
              Credited immediately to your main balance!
            </span>
          </div>
        ) : (
          <button
            disabled={!spinAvailable || opening}
            onClick={handleOpenGift}
            className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
              spinAvailable && !opening
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-amber-500/30 active:scale-98'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {opening ? 'Opening Mystery Box...' : spinAvailable ? 'Open Gift Box' : 'Opened for Today'}
          </button>
        )}

        <button
          onClick={() => setActiveModal(null)}
          className="mt-3 text-xs text-slate-400 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};
