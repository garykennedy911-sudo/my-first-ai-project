import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, AlertCircle, ShieldCheck } from 'lucide-react';

export const WithdrawModal: React.FC = () => {
  const { t, activeModal, setActiveModal, user, withdrawFunds, showToast } = useApp();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [secPass, setSecPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (activeModal !== 'withdraw') return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setErrorMsg('Please enter a valid withdrawal amount');
      return;
    }

    const res = withdrawFunds(val, address, secPass);
    if (res.success) {
      showToast(res.message);
      setActiveModal(null);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#11275b] to-[#071433] border border-blue-500/40 rounded-3xl p-5 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold">{t.withdrawTitle}</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* Balance Preview */}
        <div className="bg-[#071330] p-3 rounded-2xl border border-blue-950 mb-4 flex justify-between items-center text-xs">
          <span className="text-slate-400">Available Balance:</span>
          <span className="text-emerald-400 font-mono font-bold text-sm">
            ${user?.balance.toFixed(2) || '0.00'} USDT
          </span>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleWithdraw} className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              {t.withdrawAddress}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. TR7NHcorqQHQFi9pa37VVUDM396Mn5KA7qr"
              className="w-full px-3 py-2.5 bg-[#06122d] border border-blue-900/60 rounded-xl font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-semibold">
                {t.withdrawAmount}
              </label>
              <button
                type="button"
                onClick={() => setAmount(String(user?.balance || 0))}
                className="text-[10px] text-sky-400 hover:underline"
              >
                Max All
              </button>
            </div>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="3.00 - 50000.00"
              className="w-full px-3 py-2.5 bg-[#06122d] border border-blue-900/60 rounded-xl font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-xs"
            />
            <span className="text-[10px] text-slate-400 block mt-1">
              {t.minWithdraw} · Handling Fee: 0%
            </span>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              {t.securityPassword}
            </label>
            <input
              type="password"
              value={secPass}
              onChange={(e) => setSecPass(e.target.value)}
              placeholder="Fund Security Password"
              className="w-full px-3 py-2.5 bg-[#06122d] border border-blue-900/60 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 font-bold text-xs text-white shadow-lg shadow-blue-500/30 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.confirmWithdraw}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
