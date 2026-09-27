import React from 'react';
import { useApp } from '../../context/AppContext';
import { History, ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

export const RecordsModal: React.FC = () => {
  const { activeModal, setActiveModal, transactions } = useApp();

  if (
    !activeModal ||
    !['recharge_record', 'withdraw_record', 'financial_records'].includes(activeModal)
  ) {
    return null;
  }

  const title =
    activeModal === 'recharge_record'
      ? 'Recharge Records'
      : activeModal === 'withdraw_record'
      ? 'Withdrawal Records'
      : 'Financial Records';

  const filtered = transactions.filter((t) => {
    if (activeModal === 'recharge_record') return t.type === 'deposit';
    if (activeModal === 'withdraw_record') return t.type === 'withdraw';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#11275b] to-[#071433] border border-blue-500/40 rounded-3xl p-5 shadow-2xl text-white max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold">{title}</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No records found
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-[#08173d] border border-blue-900/40 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-white capitalize">
                    {item.type === 'deposit' ? (
                      <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                    )}
                    <span>{item.type.replace('_', ' ')}</span>
                  </div>
                  <span
                    className={`font-mono font-bold ${
                      item.type === 'withdraw' || item.type === 'vip_purchase'
                        ? 'text-rose-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {item.type === 'withdraw' || item.type === 'vip_purchase' ? '-' : '+'}
                    ${item.amount.toFixed(2)} USDT
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{item.createdAt}</span>
                  <div className="flex items-center gap-1">
                    {item.status === 'completed' ? (
                      <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-0.5 font-semibold">
                        <Clock className="w-3 h-3" /> Processing
                      </span>
                    )}
                  </div>
                </div>

                {item.details && (
                  <div className="text-[10px] text-slate-400 pt-0.5 border-t border-blue-950 truncate">
                    {item.details}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

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
