import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Volume2,
  DollarSign,
  ArrowUpRight,
  DownloadCloud,
  FileText,
  Share2,
  Briefcase,
  Megaphone,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import bingxCryptoBanner from '../assets/images/bingx_crypto_banner_1790496612878.jpg';
import { MOCK_LIVE_WITHDRAWALS } from '../data/mockData';

export const HomeView: React.FC = () => {
  const { t, setCurrentTab, setActiveModal, user, showToast } = useApp();

  const quickActions = [
    {
      id: 'deposit',
      title: t.deposit,
      icon: DollarSign,
      bg: 'from-sky-400 to-blue-600',
      action: () => setActiveModal('deposit'),
    },
    {
      id: 'withdraw',
      title: t.withdraw,
      icon: ArrowUpRight,
      bg: 'from-blue-500 to-indigo-600',
      action: () => setActiveModal('withdraw'),
    },
    {
      id: 'app',
      title: t.app,
      icon: DownloadCloud,
      bg: 'from-sky-400 to-blue-500',
      action: () => setActiveModal('download_app'),
    },
    {
      id: 'about',
      title: t.aboutUs,
      icon: FileText,
      bg: 'from-blue-500 to-indigo-700',
      action: () => setActiveModal('about_us'),
    },
    {
      id: 'invite',
      title: t.inviteFriends,
      icon: Share2,
      bg: 'from-blue-500 to-indigo-600',
      action: () => setCurrentTab('team'),
    },
    {
      id: 'agent',
      title: t.agentPartnership,
      icon: Briefcase,
      bg: 'from-blue-600 to-indigo-800',
      action: () => setActiveModal('agent_partnership'),
    },
  ];

  return (
    <div className="pb-24 pt-2 px-3 space-y-4 max-w-md mx-auto">
      {/* Banner / Carousel Image */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-xl border border-blue-900/40">
        <img
          src={bingxCryptoBanner}
          alt="BingX Global Asset Station"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061436]/90 via-transparent to-transparent flex items-end p-3.5">
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400">
                Official Quantitative Terminal
              </span>
              <h2 className="text-sm font-black text-white drop-shadow-md uppercase">
                BingX Global Asset Station
              </h2>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-blue-600/70 backdrop-blur-sm border border-white/20 text-[10px] text-white font-mono">
              VIP Tier 1-8
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Broadcast Announcement */}
      <div className="flex items-center gap-2 bg-[#0c245c]/80 backdrop-blur-md border border-blue-800/40 rounded-full px-3 py-2 overflow-hidden shadow-inner">
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
          <Volume2 className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="overflow-hidden flex-1 relative h-5">
          <div className="animate-marquee text-xs text-sky-200/90 whitespace-nowrap">
            {t.marqueeText}
          </div>
        </div>
      </div>

      {/* 6 Quick Action Grid Icons (exact matching screenshot 3) */}
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="flex flex-col items-center justify-center bg-[#0d2254]/60 hover:bg-[#122e70]/80 active:scale-95 transition-all p-3 rounded-2xl border border-blue-900/40 shadow-md group"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-2 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-6 h-6 drop-shadow" />
              </div>
              <span className="text-xs font-medium text-slate-200 text-center leading-tight">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Events Section (exact matching screenshot 3) */}
      <div className="space-y-2 pt-1">
        <h3 className="text-sm font-bold text-white px-1 flex items-center gap-1.5">
          <span>{t.events}</span>
        </h3>

        <div className="bg-gradient-to-br from-[#122d6e] to-[#0a1c47] border border-blue-600/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
          {/* Top header row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="text-xs font-bold text-white leading-snug flex-1">
              {t.eventTitle}
            </h4>
            <span className="text-sm font-black text-emerald-400 font-mono shrink-0">
              +98.00 USDT
            </span>
          </div>

          {/* Description line with megaphone */}
          <div className="flex items-start gap-2 text-[11px] text-blue-200/90 mb-3 bg-[#08183d]/60 p-2.5 rounded-xl border border-blue-900/30">
            <Megaphone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-tight">{t.eventDesc}</p>
          </div>

          {/* Progress row */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">{t.invitedRequired}</span>
              <span className="text-sky-300 font-mono font-semibold">0/15</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[#08183d] rounded-full overflow-hidden border border-blue-950">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                style={{ width: '0%' }}
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  showToast('Task incomplete: 15 active referrals needed.');
                }}
                className="px-4 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-semibold shadow-md active:scale-95 transition-all"
              >
                0/1 {t.claim}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Member Withdrawals ticker */}
      <div className="bg-[#091b42]/80 border border-blue-900/40 rounded-2xl p-3.5 shadow-md">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold text-white">{t.liveWithdrawals}</span>
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="space-y-2">
          {MOCK_LIVE_WITHDRAWALS.slice(0, 4).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#071536]/60 border border-blue-950"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-slate-300">{item.user}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-amber-400">{item.amount}</span>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
