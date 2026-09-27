import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCheck } from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const { activeModal, setActiveModal, notifications, markNotifsAsRead, language } = useApp();

  if (activeModal !== 'notifications') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#11275b] to-[#071433] border border-blue-500/40 rounded-3xl p-5 shadow-2xl text-white max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold">System Messages</h3>
          </div>
          <button
            onClick={() => {
              markNotifsAsRead();
              setActiveModal(null);
            }}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded-2xl bg-[#08173d] border border-blue-900/40 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-xs">
                  {language === 'ar' ? n.titleAr : n.title}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {language === 'ar' ? n.contentAr : n.content}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            markNotifsAsRead();
            setActiveModal(null);
          }}
          className="w-full mt-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs flex items-center justify-center gap-1.5"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All as Read & Close</span>
        </button>
      </div>
    </div>
  );
};
