import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, QrCode, AlertCircle, ArrowDownLeft } from 'lucide-react';

export const DepositModal: React.FC = () => {
  const { t, activeModal, setActiveModal, depositFunds } = useApp();
  const [network, setNetwork] = useState<'TRC20' | 'BEP20'>('TRC20');
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('6');

  if (activeModal !== 'deposit') return null;

  const walletAddress =
    network === 'TRC20'
      ? 'TKv9aB7vG4K3nL2pM8wX9Y1zRt6uP5qWeR'
      : '0x71C...B298a0dF3C4a78129F7846A';

  const presets = [6, 40, 98, 280, 680];

  const handleCopy = () => {
    navigator.clipboard?.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateDeposit = () => {
    const amt = parseFloat(customAmount);
    if (!isNaN(amt) && amt > 0) {
      depositFunds(amt, `USDT-${network}`);
      setActiveModal(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#11275b] to-[#071433] border border-blue-500/40 rounded-3xl p-5 shadow-2xl text-white max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold">{t.depositTitle}</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* Network selector */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
            {t.depositNetwork}
          </label>
          <div className="flex bg-[#071330] p-1 rounded-xl border border-blue-950 text-xs">
            <button
              onClick={() => setNetwork('TRC20')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                network === 'TRC20' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              USDT (TRC20)
            </button>
            <button
              onClick={() => setNetwork('BEP20')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                network === 'BEP20' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              USDT (BEP20)
            </button>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl mx-auto w-40 h-40 flex flex-col items-center justify-center shadow-inner mb-4">
          <QrCode className="w-32 h-32 text-slate-900" />
        </div>

        {/* Wallet Address */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
            {t.depositAddress}
          </label>
          <div className="flex items-center gap-2 bg-[#06122d] border border-blue-900/60 p-2.5 rounded-xl">
            <span className="text-[11px] font-mono text-slate-300 truncate flex-1">
              {walletAddress}
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm shrink-0"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{t.copy}</span>
            </button>
          </div>
        </div>

        {/* Amount Selector */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
            Select or Enter Amount (USDT)
          </label>
          <div className="grid grid-cols-5 gap-1.5 mb-2">
            {presets.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setCustomAmount(String(amt))}
                className={`py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                  customAmount === String(amt)
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-[#06122d] border-blue-950 text-slate-300 hover:border-blue-700'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full px-3 py-2 bg-[#06122d] border border-blue-900/60 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-blue-500"
            placeholder="Amount"
          />
        </div>

        {/* Warning Note */}
        <div className="flex items-start gap-2 text-[10px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 mb-4">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>{t.depositNote}</p>
        </div>

        {/* Quick Simulate Deposit Button */}
        <button
          onClick={handleSimulateDeposit}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 font-bold text-xs text-white shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
        >
          ⚡ {t.simulateCredit} (+${customAmount} USDT)
        </button>
      </div>
    </div>
  );
};
