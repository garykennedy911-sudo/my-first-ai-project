import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FloatingActions } from './components/FloatingActions';
import { AuthView } from './views/AuthView';
import { HomeView } from './views/HomeView';
import { VipView } from './views/VipView';
import { TasksView } from './views/TasksView';
import { TeamView } from './views/TeamView';
import { MeView } from './views/MeView';

// Modals
import { DepositModal } from './components/Modals/DepositModal';
import { WithdrawModal } from './components/Modals/WithdrawModal';
import { DailySignInModal } from './components/Modals/DailySignInModal';
import { GiftBoxModal } from './components/Modals/GiftBoxModal';
import { TelegramModal } from './components/Modals/TelegramModal';
import { NotificationsModal } from './components/Modals/NotificationsModal';
import { AboutModal } from './components/Modals/AboutModal';
import { RecordsModal } from './components/Modals/RecordsModal';

import { Smartphone, Monitor } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, currentTab, viewMode, setViewMode, toastMessage, t } = useApp();

  if (!user) {
    return <AuthView />;
  }

  return (
    <div className="min-h-screen bg-[#020b1f] text-slate-100 flex flex-col items-center justify-start selection:bg-blue-600 selection:text-white">
      {/* Viewport Frame Mode Switcher for Desktop */}
      <div className="hidden lg:flex fixed top-3 left-4 z-50 items-center gap-1.5 bg-[#0a1b42]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-800/60 shadow-lg text-xs">
        <span className="text-slate-400 mr-1">Preview:</span>
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            viewMode === 'mobile'
              ? 'bg-blue-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{t.viewFrame}</span>
        </button>
        <button
          onClick={() => setViewMode('full')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            viewMode === 'full'
              ? 'bg-blue-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{t.viewFull}</span>
        </button>
      </div>

      {/* Main Container: Mobile Frame vs Wide */}
      <div
        className={`w-full transition-all duration-300 min-h-screen flex flex-col relative bg-[#040f2b] shadow-2xl ${
          viewMode === 'mobile'
            ? 'max-w-md border-x border-blue-900/30'
            : 'max-w-2xl border-x border-blue-900/40'
        }`}
      >
        {/* Top Header */}
        <Header />

        {/* View Router */}
        <main className="flex-1 w-full relative">
          {currentTab === 'home' && <HomeView />}
          {currentTab === 'tasks' && <TasksView />}
          {currentTab === 'team' && <TeamView />}
          {currentTab === 'vip' && <VipView />}
          {currentTab === 'me' && <MeView />}
        </main>

        {/* Floating Side Action Buttons (Telegram, Check-in, Gift) */}
        <FloatingActions />

        {/* Bottom 5-Tab Navigation Bar */}
        <BottomNav />

        {/* All Modals */}
        <DepositModal />
        <WithdrawModal />
        <DailySignInModal />
        <GiftBoxModal />
        <TelegramModal />
        <NotificationsModal />
        <AboutModal />
        <RecordsModal />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full px-4 animate-in slide-in-from-top-4 fade-in duration-200">
            <div className="bg-slate-900/95 text-white border border-blue-500/60 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl text-xs text-center font-medium shadow-blue-500/20">
              {toastMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
