import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  FileSpreadsheet,
  Lock,
  KeyRound,
  Download,
  Headphones,
  LogOut,
  Copy,
  Check,
  ChevronRight,
  Crown,
  History,
} from 'lucide-react';
import { PorscheLogo } from '../components/PorscheLogo';

export const MeView: React.FC = () => {
  const { user, t, logout, setActiveModal, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState(false);

  const inviteCode = user?.invitationCode || '167111';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(inviteCode);
    setCopiedCode(true);
    showToast(t.copied);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const menuItems = [
    {
      icon: History,
      label: t.rechargeRecord,
      action: () => setActiveModal('recharge_record'),
      color: 'text-sky-400',
    },
    {
      icon: History,
      label: t.withdrawRecord,
      action: () => setActiveModal('withdraw_record'),
      color: 'text-indigo-400',
    },
    {
      icon: FileSpreadsheet,
      label: t.financialRecords,
      action: () => setActiveModal('financial_records'),
      color: 'text-emerald-400',
    },
    {
      icon: Lock,
      label: t.modifyLoginPassword,
      action: () => setActiveModal('change_password'),
      color: 'text-amber-400',
    },
    {
      icon: KeyRound,
      label: t.modifySecurityPassword,
      action: () => setActiveModal('change_security_password'),
      color: 'text-rose-400',
    },
    {
      icon: Download,
      label: t.downloadApp,
      action: () => setActiveModal('download_app'),
      color: 'text-blue-400',
    },
    {
      icon: Headphones,
      label: t.customerService,
      action: () => setActiveModal('telegram'),
      color: 'text-sky-300',
    },
  ];

  return (
    <div className="pb-24 pt-2 px-3 max-w-md mx-auto space-y-4">
      {/* User Info Header Card */}
      <div className="bg-gradient-to-br from-[#122e70] via-[#0d2358] to-[#07163c] border border-blue-600/30 rounded-3xl p-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-lg border-2 border-amber-400/50">
            <PorscheLogo size="sm" showText={false} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm truncate font-mono">
                {user?.email}
              </h3>
              <span className={`px-2 py-0.5 rounded-full font-black text-[10px] flex items-center gap-0.5 shrink-0 ${
                user?.vipLevel && user.vipLevel > 0
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-700 text-slate-300'
              }`}>
                <Crown className="w-2.5 h-2.5" />
                {user?.vipLevel && user.vipLevel > 0 ? `VIP${user.vipLevel}` : 'VIP0'}
              </span>
            </div>

            {user?.phone && (
              <div className="text-[11px] font-mono text-sky-300 mt-0.5">
                {user.phone}
              </div>
            )}

            <div className="flex items-center gap-3 mt-1.5 text-xs text-blue-200">
              <span className="font-mono text-[11px] text-slate-300">
                UID: {user?.id}
              </span>
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <span className="text-slate-400">Code:</span>
                <span className="font-bold text-white">{inviteCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 hover:text-white text-slate-400"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Balance Card */}
      <div className="bg-gradient-to-r from-[#0d2459] to-[#08173d] border border-blue-800/40 rounded-3xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Wallet className="w-4 h-4 text-sky-400" />
            <span>{t.totalBalance}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">USDT (TRC20)</span>
        </div>

        <div className="text-3xl font-black text-white font-mono tracking-tight mb-4">
          ${user?.balance.toFixed(2) || '0.00'}
        </div>

        {/* Recharge and Withdraw Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setActiveModal('deposit')}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 font-bold text-xs text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>{t.recharge}</span>
          </button>
          <button
            onClick={() => setActiveModal('withdraw')}
            className="py-3 px-4 rounded-2xl bg-[#081534] hover:bg-[#0c1e4a] border border-blue-600/40 font-bold text-xs text-white shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <ArrowUpRight className="w-4 h-4 text-sky-400" />
            <span>{t.withdraw}</span>
          </button>
        </div>

        {/* Revenue stats row */}
        <div className="grid grid-cols-2 pt-3 border-t border-blue-900/40 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">{t.todayEarnings}</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              +{user?.todayEarnings.toFixed(2) || '0.00'} USDT
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">{t.totalRevenue}</span>
            <span className="font-mono font-bold text-sky-400 text-sm">
              +{user?.totalEarnings.toFixed(2) || '0.00'} USDT
            </span>
          </div>
        </div>
      </div>

      {/* Menu Action List */}
      <div className="bg-[#0a193d]/80 border border-blue-900/40 rounded-3xl p-2 shadow-lg divide-y divide-blue-900/30">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-colors text-xs text-slate-200"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-xl bg-[#06122d] ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          );
        })}
      </div>

      {/* Sign Out Button */}
      <div className="pt-2">
        <button
          onClick={logout}
          className="w-full py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-semibold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
};
