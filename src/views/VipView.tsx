import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VIP_TIERS } from '../data/mockData';
import { VIPTier } from '../types';
import { Crown, Lock, CheckCircle2, Sparkles, Unlock, ArrowRight, Coins } from 'lucide-react';
import bingxLogoImg from '../assets/images/bingx_brand_logo_1790496601051.jpg';

export const VipView: React.FC = () => {
  const { user, t, language, upgradeVIP, setActiveModal, setCurrentTab, showToast } = useApp();
  const [selectedTier, setSelectedTier] = useState<VIPTier | null>(null);

  // Correctly handle vipLevel: if 0, currentVipLevel is 0 (Unranked)
  const currentVipLevel = user?.vipLevel ?? 0;

  const handleUnlock = (tier: VIPTier) => {
    setSelectedTier(tier);
  };

  const confirmUnlock = () => {
    if (!selectedTier) return;
    const res = upgradeVIP(selectedTier.level);
    showToast(res.message);
    if (!res.success) {
      // Prompt to deposit
      setActiveModal('deposit');
    }
    setSelectedTier(null);
  };

  return (
    <div className="pb-24 pt-2 px-3 max-w-md mx-auto space-y-3.5">
      {/* Top right "Upgrade Log" sub-header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-300">
            {language === 'ar' ? 'المستوى الحالي:' : 'Current Tier:'}{' '}
            <strong className="text-amber-400 font-mono">
              {currentVipLevel > 0 ? `VIP${currentVipLevel}` : language === 'ar' ? 'بدون باقة (VIP0)' : 'Unranked (VIP0)'}
            </strong>
          </span>
        </div>
        <button
          onClick={() => setActiveModal('upgrade_log')}
          className="text-xs font-medium text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors"
        >
          {t.upgradeLog}
        </button>
      </div>

      {/* VIP Tiers List */}
      <div className="space-y-3.5">
        {VIP_TIERS.map((tier) => {
          const isCurrentOrUnlocked = tier.level <= currentVipLevel && currentVipLevel > 0;
          const isExactCurrent = tier.level === currentVipLevel && currentVipLevel > 0;

          return (
            <div
              key={tier.level}
              className={`relative rounded-3xl p-4 transition-all overflow-hidden border ${
                isExactCurrent
                  ? 'bg-gradient-to-br from-[#123982] via-[#0d2864] to-[#081a44] border-emerald-400/70 shadow-2xl shadow-emerald-950/50 ring-2 ring-emerald-400/40'
                  : isCurrentOrUnlocked
                  ? 'bg-gradient-to-br from-[#12285e] to-[#0a183b] border-blue-600/40 shadow-md'
                  : 'bg-gradient-to-br from-[#132a63]/90 via-[#0e2152]/90 to-[#09173d]/90 border-blue-900/40 shadow-md opacity-90 hover:opacity-100'
              }`}
            >
              {/* Top Banner Row: Crown Badge + Unlocked Indicator or Lock */}
              <div className="flex items-center justify-between mb-3">
                {/* Crown badge */}
                <div className="flex items-center gap-1 px-3 py-1 rounded-r-full -ml-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-md">
                  <Crown className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span>{tier.name}</span>
                </div>

                {/* CLEAR UNLOCKED INDICATOR (No lock icon for unlocked tier!) */}
                {isExactCurrent ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-500/20 animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'ar' ? 'تم الفتح: باقتك الحالية' : 'Unlocked: Active'}</span>
                  </div>
                ) : isCurrentOrUnlocked ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold">
                    <Unlock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{language === 'ar' ? 'مفتوحة' : 'Unlocked'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 text-[11px]">
                    <Lock className="w-3 h-3 text-amber-400/80" />
                    <span>{language === 'ar' ? 'مقفول' : 'Locked'}</span>
                  </div>
                )}
              </div>

              {/* Main Content: Left BingX Logo & Crypto Node, Right Stats */}
              <div className="grid grid-cols-[100px_1fr] gap-3 items-center">
                {/* Left: BingX Logo & Crypto Asset Thumbnail */}
                <div className="flex flex-col items-center justify-center p-1.5 rounded-2xl bg-white/95 shadow-md border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                      <img
                        src={bingxLogoImg}
                        alt="BingX"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] font-black text-blue-900 tracking-wider">
                      BingX
                    </span>
                  </div>

                  <div className="w-full h-11 rounded-lg overflow-hidden border border-slate-300 relative group">
                    <img
                      src={tier.assetImage}
                      alt={tier.assetSymbol}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-0.5">
                      <span className="text-[9px] font-black text-amber-300 font-mono tracking-wider">
                        {tier.assetSymbol}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-black text-slate-900 mt-1 uppercase font-mono tracking-wider">
                    {tier.name} · {tier.assetSymbol}
                  </span>
                </div>

                {/* Right: Tier Statistics */}
                <div className="space-y-1 text-xs">
                  <div className="text-[11px] font-bold text-sky-300 truncate mb-0.5 flex items-center gap-1">
                    <span className="px-1.5 py-0.2 rounded bg-blue-600/60 text-white font-mono text-[9px]">
                      {tier.assetSymbol}
                    </span>
                    <span className="truncate">{tier.assetName}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{t.dailyTasks}</span>
                    <span className="font-semibold text-white font-mono">{tier.dailyTasks}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{t.perTaskProfit}</span>
                    <span className="font-semibold text-emerald-400 font-mono">
                      {tier.perTaskProfit.toFixed(2)} USDT
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{t.dailyProfit}</span>
                    <span className="font-semibold text-sky-400 font-mono">
                      {tier.dailyProfit.toFixed(2)} USDT
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{t.totalProfit}</span>
                    <span className="font-semibold text-amber-400 font-mono">
                      {tier.totalProfit.toLocaleString()}.00 USDT
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Unlocked Active Banner vs Unlock Now Button */}
              {isExactCurrent ? (
                <div className="mt-3.5 pt-3 border-t border-emerald-500/30 bg-emerald-950/40 -mx-4 -mb-4 px-4 py-2.5 rounded-b-3xl flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {language === 'ar' ? 'الباقة مفعلة وجاهزة للمهام' : 'Active & ready for tasks'}
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentTab('tasks')}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 text-slate-950 text-xs font-black shadow-md flex items-center gap-1 active:scale-95 transition-all"
                  >
                    <span>{language === 'ar' ? 'المهام' : 'Tasks'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : isCurrentOrUnlocked ? (
                <div className="mt-3 pt-2 border-t border-blue-800/40 text-[11px] text-sky-300 font-mono flex items-center justify-between">
                  <span>{language === 'ar' ? 'مستوى مفتوح' : 'Unlocked Level'}</span>
                  <span className="text-emerald-400 font-bold">✓ {t.unlockValid}</span>
                </div>
              ) : (
                <div className="mt-3 pt-2 flex justify-end">
                  <button
                    onClick={() => handleUnlock(tier)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-950 hover:bg-black active:scale-98 text-white text-xs font-bold border border-blue-600/40 shadow-lg flex items-center justify-center gap-2 transition-all group"
                  >
                    <span className="font-mono text-amber-400">{tier.price.toFixed(2)} USDT</span>
                    <span className="group-hover:text-sky-300 transition-colors">{t.unlockNow}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal for VIP Unlock */}
      {selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-gradient-to-b from-[#122b6b] to-[#08173d] border border-blue-500/40 rounded-3xl p-5 shadow-2xl text-white">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold">{t.unlockConfirmTitle}</h3>
            </div>

            <p className="text-xs text-blue-200/90 mb-4 leading-relaxed">
              {t.unlockConfirmDesc
                .replace('{tier}', selectedTier.name)
                .replace('{price}', selectedTier.price.toFixed(2))}
            </p>

            <div className="bg-[#071333] p-3 rounded-2xl border border-blue-900/50 mb-5 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'الرصيد المتاح:' : 'Available Balance:'}</span>
                <span className="font-mono font-bold text-white">
                  ${user?.balance.toFixed(2) || '0.00'} USDT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'سعر فتح الباقة:' : 'Unlock Fee:'}</span>
                <span className="font-mono font-bold text-amber-400">
                  {selectedTier.price.toFixed(2)} USDT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'الربح اليومي:' : 'Daily Profit:'}</span>
                <span className="font-mono font-bold text-emerald-400">
                  +{selectedTier.dailyProfit.toFixed(2)} USDT / {language === 'ar' ? 'يوم' : 'day'}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setSelectedTier(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-300 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmUnlock}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 text-xs font-bold text-white shadow-lg shadow-blue-500/30 transition-all"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
