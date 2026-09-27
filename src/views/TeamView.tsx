import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Share2,
  Copy,
  Check,
  Users,
  ChevronRight,
  Send,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import cryptoRewardsImg from '../assets/images/crypto_rewards_3d_1790494612961.jpg';

export const TeamView: React.FC = () => {
  const { user, t, language, teamMembers, addSimulatedReferral, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedLevelDetails, setSelectedLevelDetails] = useState<number | null>(null);

  const inviteCode = user?.invitationCode || '167111';
  const referralLink = `https://2F1RXJ.po588.com/#/register?ic=${inviteCode}`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(inviteCode);
    setCopiedCode(true);
    showToast(t.copied);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true);
    showToast(t.copied);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    const text = `Join Porsche Global Asset Platform with invitation code: ${inviteCode}`;
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + referralLink)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + referralLink)}`, '_blank');
    } else {
      handleCopyLink();
    }
  };

  // Calculate team statistics
  const totalTeamSize = teamMembers.length;
  const totalTeamDeposits = teamMembers.reduce((sum, m) => sum + m.depositAmount, 0);
  const totalCommission = teamMembers.reduce((sum, m) => sum + m.commissionEarned, 0);

  const level1Members = teamMembers.filter((m) => m.level === 1);
  const level2Members = teamMembers.filter((m) => m.level === 2);
  const level3Members = teamMembers.filter((m) => m.level === 3);

  const levelTiers = [
    {
      level: 1,
      name: t.level1,
      rate: '12%',
      members: level1Members,
      gradient: 'from-[#0e2763] to-[#0a1a45]',
      border: 'border-blue-700/40',
      tagColor: 'text-sky-300',
    },
    {
      level: 2,
      name: t.level2,
      rate: '2%',
      members: level2Members,
      gradient: 'from-[#0d3460] to-[#072445]',
      border: 'border-teal-500/40',
      tagColor: 'text-teal-300',
    },
    {
      level: 3,
      name: t.level3,
      rate: '1%',
      members: level3Members,
      gradient: 'from-[#221c54] to-[#120d36]',
      border: 'border-purple-500/40',
      tagColor: 'text-purple-300',
    },
  ];

  return (
    <div className="pb-24 pt-2 px-3 max-w-md mx-auto space-y-4">
      {/* Top Blue Referral Banner (matching screenshot 6) */}
      <div className="relative rounded-3xl p-4 bg-gradient-to-r from-[#0055ff] via-[#0066ee] to-[#0099ff] text-white shadow-xl overflow-hidden">
        {/* Right background illustration */}
        <div className="absolute right-0 top-0 bottom-0 w-36 opacity-90 pointer-events-none overflow-hidden">
          <img
            src={cryptoRewardsImg}
            alt="Rewards"
            className="w-full h-full object-cover mix-blend-screen scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-[260px] space-y-2.5">
          {/* Invitation Code */}
          <div>
            <span className="text-[11px] text-blue-100 font-medium block">
              {t.invitationCode}:
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl font-black font-mono tracking-wider drop-shadow-sm">
                {inviteCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1 rounded-full bg-black/85 hover:bg-black text-white text-[11px] font-bold shadow-md active:scale-95 transition-all flex items-center gap-1"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{t.copy}</span>
              </button>
            </div>
          </div>

          {/* Referral link */}
          <div>
            <p className="text-[11px] text-blue-100 font-medium leading-tight">
              {t.shareReferral}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-[10px] font-mono text-blue-200 truncate max-w-[170px] bg-black/20 px-2 py-1 rounded-lg">
                {referralLink}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded-full bg-black/85 hover:bg-black text-white text-[11px] font-bold shadow-md active:scale-95 transition-all shrink-0 flex items-center gap-1"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{t.copy}</span>
              </button>
            </div>
          </div>

          {/* Social share icon buttons row */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <button
              onClick={() => shareToSocial('twitter')}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs font-bold transition-transform active:scale-90"
              title="X"
            >
              𝕏
            </button>
            <button
              onClick={() => shareToSocial('facebook')}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs font-bold transition-transform active:scale-90"
              title="Facebook"
            >
              f
            </button>
            <button
              onClick={() => shareToSocial('telegram')}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-transform active:scale-90"
              title="Telegram"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => shareToSocial('linkedin')}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs font-bold transition-transform active:scale-90"
              title="LinkedIn"
            >
              in
            </button>
            <button
              onClick={() => shareToSocial('whatsapp')}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-transform active:scale-90"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => shareToSocial('other')}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-transform active:scale-90"
              title="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Date Range Selector Header */}
      <div className="flex items-center gap-2 px-1 text-xs font-semibold text-slate-300">
        <Calendar className="w-4 h-4 text-sky-400" />
        <span>{t.dateRange}</span>
        <span className="text-[10px] text-slate-500 font-mono ml-auto">All Time</span>
      </div>

      {/* Team Statistics Card (exact match screenshot 6) */}
      <div className="bg-gradient-to-br from-[#102559] to-[#0a183d] border border-blue-900/40 rounded-3xl p-4 shadow-xl space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-3 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">{t.teamSize}</span>
            <span className="text-lg font-black text-white font-mono">{totalTeamSize}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">{t.teamDeposits}</span>
            <span className="text-lg font-black text-white font-mono">
              ${totalTeamDeposits.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">{t.teamWithdrawals}</span>
            <span className="text-lg font-black text-white font-mono">$0.00</span>
          </div>
        </div>

        <div className="border-t border-blue-900/30" />

        {/* Row 2 */}
        <div className="grid grid-cols-3 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">{t.newMembers}</span>
            <span className="text-base font-bold text-slate-200 font-mono">{totalTeamSize}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">{t.firstDeposits}</span>
            <span className="text-base font-bold text-slate-200 font-mono">{totalTeamSize}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">{t.firstWithdrawals}</span>
            <span className="text-base font-bold text-slate-200 font-mono">0</span>
          </div>
        </div>
      </div>

      {/* 3 Commission Level Cards (matching screenshot 6) */}
      <div className="space-y-3">
        {levelTiers.map((tier) => {
          const totalTierIncome = tier.members.reduce((acc, m) => acc + m.commissionEarned, 0);

          return (
            <div
              key={tier.level}
              className={`rounded-2xl p-4 bg-gradient-to-r ${tier.gradient} border ${tier.border} shadow-lg relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-bold text-white tracking-wide">
                  {tier.name}
                </h4>
                <button
                  onClick={() => setSelectedLevelDetails(tier.level)}
                  className="px-4 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-bold border border-white/20 shadow-md active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>{t.details}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.registeredActive}</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {tier.members.length}/{tier.members.length}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.commissionRate}</span>
                  <span className={`text-sm font-bold font-mono ${tier.tagColor}`}>
                    {tier.rate}
                  </span>
                </div>
                <div className="col-span-2 pt-1">
                  <span className="text-[10px] text-slate-400 block">{t.totalIncome}</span>
                  <span className="text-base font-black font-mono text-emerald-400">
                    {totalTierIncome.toFixed(2)} USDT
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal for selected level tier */}
      {selectedLevelDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-gradient-to-b from-[#102454] to-[#071333] border border-blue-500/30 rounded-3xl p-5 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold">
                  {selectedLevelDetails === 1 ? t.level1 : selectedLevelDetails === 2 ? t.level2 : t.level3}{' '}
                  {t.details}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLevelDetails(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {teamMembers.filter((m) => m.level === selectedLevelDetails).length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  {t.noData}
                </div>
              ) : (
                teamMembers
                  .filter((m) => m.level === selectedLevelDetails)
                  .map((member) => (
                    <div
                      key={member.id}
                      className="p-2.5 rounded-xl bg-[#0a183b] border border-blue-900/40 text-xs space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-slate-200 font-semibold truncate max-w-[160px]">
                          {member.email}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-600/30 text-sky-300 font-mono text-[10px]">
                          VIP{member.vipLevel}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>Deposited: ${member.depositAmount.toFixed(2)}</span>
                        <span className="text-emerald-400 font-mono font-bold">
                          Commission: +${member.commissionEarned.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <button
              onClick={() => setSelectedLevelDetails(null)}
              className="w-full mt-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
