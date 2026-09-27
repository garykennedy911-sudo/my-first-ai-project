import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, ClipboardList, Users, Diamond, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, t } = useApp();

  const navItems = [
    { key: 'home', label: t.home, icon: Home },
    { key: 'tasks', label: t.tasks, icon: ClipboardList },
    { key: 'team', label: t.team, icon: Users },
    { key: 'vip', label: t.vip, icon: Diamond },
    { key: 'me', label: t.me, icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#071942]/95 backdrop-blur-lg border-t border-blue-900/40 text-slate-400 max-w-md mx-auto shadow-2xl">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setCurrentTab(item.key)}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Highlight active bubble/glow if active */}
              {isActive ? (
                <div className="w-10 h-7 rounded-full bg-white/20 flex items-center justify-center mb-0.5 text-white shadow-inner">
                  <Icon className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-7 flex items-center justify-center mb-0.5">
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <span className={`text-[11px] font-medium leading-none ${isActive ? 'font-bold text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
