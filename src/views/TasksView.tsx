import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, CheckCircle2, ChevronRight, Zap, Coins, Lock, Sparkles, RefreshCw, TrendingUp } from 'lucide-react';

export const TasksView: React.FC = () => {
  const { user, t, language, tasks, completeTask, taskResetSeconds, resetTasksNow, setCurrentTab } = useApp();
  const [activeTab, setActiveTab] = useState<'in_progress' | 'completed'>('in_progress');
  const [processingTaskId, setProcessingTaskId] = useState<string | null>(null);

  const hasVipPackage = user && user.vipLevel > 0;

  // Format seconds into HH:MM:SS
  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const inProgressTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const handleFinish = async (taskId: string) => {
    setProcessingTaskId(taskId);
    // Simulate real quantitative node arbitrage settlement delay
    setTimeout(async () => {
      await completeTask(taskId);
      setProcessingTaskId(null);
    }, 1100);
  };

  return (
    <div className="pb-24 pt-2 px-3 max-w-md mx-auto space-y-4">
      {/* Top Cyan/Blue Gradient Card (exact match from screenshot 5) */}
      <div className="relative rounded-3xl p-5 bg-gradient-to-r from-[#7a88ff] via-[#48b5f3] to-[#2bd9c6] text-slate-900 shadow-xl overflow-hidden">
        {/* Task Reset Pill */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/85 text-white text-xs font-mono font-semibold shadow-md">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-300">{t.taskReset}</span>
            <span className="text-white font-bold">{formatTimer(taskResetSeconds)}</span>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 text-center">
          <div className="border-r border-slate-900/15 pr-2">
            <div className="text-xs font-bold text-slate-900 mb-1">{t.todaysTasks}</div>
            <div className="text-2xl font-black font-mono text-slate-950">
              {hasVipPackage ? tasks.length : 0}
            </div>
          </div>
          <div className="pl-2">
            <div className="text-xs font-bold text-slate-900 mb-1">{t.tasksRemainingToday}</div>
            <div className="text-2xl font-black font-mono text-slate-950">
              {hasVipPackage ? inProgressTasks.length : 0}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-[#0b1c47]/80 border border-blue-900/40 rounded-3xl p-4 shadow-xl min-h-[380px] flex flex-col">
        {/* Segmented Tab Bar (exact match screenshot 5: "In Progress" | "Completed") */}
        <div className="flex bg-[#071333] p-1 rounded-2xl mb-4 border border-blue-950 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('in_progress')}
            className={`flex-1 py-2.5 rounded-xl font-semibold transition-all ${
              activeTab === 'in_progress'
                ? 'bg-blue-600/70 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.inProgress}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2.5 rounded-xl font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-blue-600/70 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.completed}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 flex flex-col">
          {/* CONDITION 1: User has not purchased any VIP package yet */}
          {!hasVipPackage ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-16 h-16 rounded-3xl bg-blue-950/80 border border-blue-600/30 flex items-center justify-center mb-4 text-amber-400 shadow-xl shadow-blue-950">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">
                {language === 'ar' ? 'المهام مقفلة حتى يتم شراء باقة' : 'Tasks Locked'}
              </h4>
              <p className="text-xs text-slate-300 max-w-xs mb-5 leading-relaxed">
                {language === 'ar'
                  ? 'لا تظهر مهام التداول الكمي حتى تقوم بشراء باقة VIP (مثل BTC أو ETH أو XAU). تبدأ الباقات من 6$ فقط.'
                  : 'Quantitative tasks will not appear until you purchase a VIP package (BTC, ETH, XAU). Packages start at only 6$.'}
              </p>
              <button
                onClick={() => setCurrentTab('vip')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{language === 'ar' ? 'شراء باقة VIP الآن (تبدأ من 6$)' : 'Buy VIP Package (Starts at $6)'}</span>
              </button>
            </div>
          ) : activeTab === 'in_progress' ? (
            /* CONDITION 2: User has VIP package, show in-progress tasks */
            inProgressTasks.length === 0 ? (
              /* All daily tasks completed, wait 24h reset */
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-slate-400 px-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-sm font-bold text-white mb-1">
                  {language === 'ar' ? 'تم إنجاز جميع مهام اليوم بنجاح!' : 'All Tasks Completed!'}
                </span>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  {language === 'ar'
                    ? `تتجدد المهام تلقائياً بعد 24 ساعة من تنفيذها. موعد التجديد بعد:`
                    : `Tasks renew automatically 24 hours after completion. Next refresh in:`}{' '}
                  <strong className="text-sky-300 font-mono">{formatTimer(taskResetSeconds)}</strong>
                </p>

                {/* Instant 24h Reset helper for testing */}
                <button
                  onClick={resetTasksNow}
                  className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-sky-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تجديد فوري للمهام (وضع التجربة)' : 'Instant 24h Reset (Test)'}</span>
                </button>
              </div>
            ) : (
              /* Available Tasks to complete with crypto asset matching the VIP tier */
              <div className="space-y-3.5">
                {inProgressTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gradient-to-br from-[#12285e] to-[#0a183b] border border-blue-700/40 rounded-2xl p-3.5 shadow-lg flex flex-col gap-2.5 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                          <Coins className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-600 text-white font-bold">
                              {task.assetSymbol}
                            </span>
                            <span className="text-[10px] font-mono uppercase text-sky-300 font-semibold">
                              {task.category}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                            {language === 'ar' ? task.titleAr : task.title}
                          </h4>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block">
                          {language === 'ar' ? 'العمولة' : 'Reward'}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          +{task.reward.toFixed(2)} USDT
                        </span>
                      </div>
                    </div>

                    {/* Crypto Asset Node Preview Banner */}
                    <div className="relative h-24 w-full rounded-xl overflow-hidden border border-blue-950 shadow-inner">
                      <img
                        src={task.assetImage}
                        alt={task.assetSymbol}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end justify-between p-2.5">
                        <span className="text-[11px] font-black text-amber-300 bg-black/80 px-2 py-0.5 rounded-md backdrop-blur-sm shadow border border-amber-400/30 font-mono">
                          {task.assetSymbol} / USDT Node
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                          <TrendingUp className="w-3 h-3" /> 99.8% Sync
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      disabled={processingTaskId === task.id}
                      onClick={() => handleFinish(task.id)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                        processingTaskId === task.id
                          ? 'bg-blue-600/50 text-white cursor-wait'
                          : 'bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 text-white active:scale-98 shadow-blue-500/30'
                      }`}
                    >
                      {processingTaskId === task.id ? (
                        <>
                          <Zap className="w-3.5 h-3.5 animate-spin" />
                          <span>{t.processingTask}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.doTask}</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Completed Tab */
            <div className="space-y-2.5">
              {completedTasks.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-slate-400">
                  <span className="text-sm font-medium">{t.noData}</span>
                </div>
              ) : (
                completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#091738]/80 border border-blue-900/30 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-[9px] font-mono px-1 rounded bg-blue-600/40 text-sky-200">
                            {task.assetSymbol}
                          </span>
                          <h5 className="font-bold text-white text-[11px] line-clamp-1">
                            {language === 'ar' ? task.titleAr : task.title}
                          </h5>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {task.completedAt || 'Today'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-emerald-400 text-xs">
                        +{task.reward.toFixed(2)} USDT
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
