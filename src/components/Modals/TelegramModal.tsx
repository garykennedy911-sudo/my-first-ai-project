import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Headphones, ExternalLink, MessageCircle } from 'lucide-react';

export const TelegramModal: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();
  const [messages, setMessages] = useState([
    { sender: 'support', text: 'Hello! Welcome to BingX Global Support. How can we assist you with your deposit, withdrawal, or VIP quantitative tasks today?', time: 'Just now' }
  ]);
  const [inputText, setInputText] = useState('');

  if (activeModal !== 'telegram') return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { sender: 'user', text: inputText, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'support',
          text: 'Thank you for your message. An official BingX platform manager has received your inquiry and is assisting you.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#0f2452] to-[#071333] border border-blue-500/40 rounded-3xl shadow-2xl text-white flex flex-col h-[460px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#0a1b42] border-b border-blue-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-md">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">BingX 24/7 VIP Support</h3>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online Now
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* Telegram Direct Link Button */}
        <div className="bg-sky-600/20 px-4 py-2 border-b border-sky-500/20 flex items-center justify-between">
          <span className="text-[11px] text-sky-200">Official Telegram Channel</span>
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1 bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm"
          >
            <span>@BingX_VIP_Support</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-2.5 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-[#0f214a] border border-blue-800/40 text-slate-200 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-500 px-1 mt-0.5">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-2.5 bg-[#081533] border-t border-blue-900/50 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-[#050e24] border border-blue-900/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
