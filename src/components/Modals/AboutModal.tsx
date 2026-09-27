import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Briefcase, Download, Shield, Award, KeyRound, Lock, Check } from 'lucide-react';
import { PorscheLogo } from '../PorscheLogo';

export const AboutModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useApp();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  if (
    !activeModal ||
    !['about_us', 'agent_partnership', 'download_app', 'upgrade_log', 'change_password', 'change_security_password'].includes(
      activeModal
    )
  ) {
    return null;
  }

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass !== confirmPass) {
      showToast('Passwords do not match');
      return;
    }
    showToast('Password updated successfully!');
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#11275b] to-[#071433] border border-blue-500/40 rounded-3xl p-5 shadow-2xl text-white max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold">
            {activeModal === 'about_us' && 'About BingX Platform'}
            {activeModal === 'agent_partnership' && 'Agent Partnership Program'}
            {activeModal === 'download_app' && 'Download Official BingX App'}
            {activeModal === 'upgrade_log' && 'VIP Upgrade Records'}
            {activeModal === 'change_password' && 'Modify Login Password'}
            {activeModal === 'change_security_password' && 'Modify Security Password'}
          </h3>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* About Us */}
        {activeModal === 'about_us' && (
          <div className="space-y-3.5 text-xs text-slate-300">
            <div className="flex justify-center py-2">
              <PorscheLogo size="md" showText={true} />
            </div>
            <p className="leading-relaxed">
              <strong>BingX Global Asset Platform</strong> is a premier institutional cryptocurrency
              and quantitative arbitrage collaboration network. We provide decentralized consensus settlement
              for digital asset pairs including BTC, ETH, and physical gold index XAU with guaranteed daily returns.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-[#08173d] border border-blue-900/40 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400" />
                <span className="text-[11px] font-bold text-white">Full Reserve Audit</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08173d] border border-blue-900/40 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-bold text-white">Guaranteed Payouts</span>
              </div>
            </div>
          </div>
        )}

        {/* Agent Partnership */}
        {activeModal === 'agent_partnership' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-[#08173d] p-3 rounded-2xl border border-blue-900/40">
              <h4 className="font-bold text-white text-xs mb-1">Three-Tier Direct Rebate</h4>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Level 1 Direct Referrals:</span>
                  <span className="font-bold text-emerald-400 font-mono">12%</span>
                </div>
                <div className="flex justify-between">
                  <span>Level 2 Secondary Referrals:</span>
                  <span className="font-bold text-sky-400 font-mono">2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Level 3 Extended Referrals:</span>
                  <span className="font-bold text-purple-400 font-mono">1%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#08173d] p-3 rounded-2xl border border-blue-900/40">
              <h4 className="font-bold text-white text-xs mb-1">Monthly Team Leader Salary</h4>
              <p className="text-[11px] text-slate-300 leading-snug">
                Maintain 50 active VIP members to receive a guaranteed monthly salary bonus of <strong>1,000 USDT to 10,000 USDT</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Download App */}
        {activeModal === 'download_app' && (
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center mx-auto text-sky-400">
              <Download className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Porsche Mobile App v2.6.4</h4>
              <p className="text-xs text-slate-400 mt-1">
                Install directly on your device for lightning-fast order execution.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => showToast('Downloading Android APK...')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-xs font-bold text-white shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Download Android APK</span>
              </button>
              <button
                onClick={() => showToast('Opening iOS Web App Configuration...')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 border border-white/15 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Install iOS Web Clip</span>
              </button>
            </div>
          </div>
        )}

        {/* Upgrade Log */}
        {activeModal === 'upgrade_log' && (
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-[#08173d] border border-blue-900/40 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">Joined VIP 1</span>
                <span className="text-[10px] text-slate-400 block">Initial tier activated</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold">Free</span>
            </div>
          </div>
        )}

        {/* Password Modals */}
        {(activeModal === 'change_password' || activeModal === 'change_security_password') && (
          <form onSubmit={handlePasswordSave} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 block mb-1">Old Password</label>
              <input
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-3 py-2 bg-[#06122d] border border-blue-900/60 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 bg-[#06122d] border border-blue-900/60 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2 bg-[#06122d] border border-blue-900/60 rounded-xl text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white"
            >
              Save Changes
            </button>
          </form>
        )}

        <button
          onClick={() => setActiveModal(null)}
          className="w-full mt-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};
