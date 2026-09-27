import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Language, TaskItem, Transaction, TeamMember, NotificationItem } from '../types';
import { VIP_TIERS, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { translations } from '../utils/translations';
import confetti from 'canvas-confetti';

interface AppContextType {
  user: User | null;
  language: Language;
  t: typeof translations.en;
  setLanguage: (lang: Language) => void;
  currentTab: 'home' | 'tasks' | 'team' | 'vip' | 'me';
  setCurrentTab: (tab: 'home' | 'tasks' | 'team' | 'vip' | 'me') => void;
  viewMode: 'mobile' | 'full';
  setViewMode: (mode: 'mobile' | 'full') => void;
  login: (emailOrPhone: string) => void;
  register: (email: string, phone: string, inviteCode?: string) => void;
  logout: () => void;
  loginAsDemo: () => void;
  tasks: TaskItem[];
  completeTask: (taskId: string) => Promise<boolean>;
  upgradeVIP: (tierLevel: number) => { success: boolean; message: string };
  depositFunds: (amount: number, network?: string) => void;
  withdrawFunds: (amount: number, address: string, secPass: string) => { success: boolean; message: string };
  claimDailyReward: (day: number) => { success: boolean; reward: number };
  dailyClaimedDays: number[];
  luckySpin: () => { reward: number };
  spinAvailable: boolean;
  transactions: Transaction[];
  teamMembers: TeamMember[];
  addSimulatedReferral: (email?: string, deposit?: number, level?: 1 | 2 | 3) => void;
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotifsAsRead: () => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  taskResetSeconds: number;
  resetTasksNow: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'porsche_platform_user_v2';
const LOCAL_STORAGE_TX = 'porsche_platform_tx_v2';
const LOCAL_STORAGE_TASKS = 'porsche_platform_tasks_v2';
const LOCAL_STORAGE_TEAM = 'porsche_platform_team_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar'); // Default to Arabic as requested by user
  const [currentTab, setCurrentTab] = useState<'home' | 'tasks' | 'team' | 'vip' | 'me'>('home');
  const [viewMode, setViewMode] = useState<'mobile' | 'full'>('mobile');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dailyClaimedDays, setDailyClaimedDays] = useState<number[]>([]);
  const [spinAvailable, setSpinAvailable] = useState<boolean>(true);

  // User state: starts as null so user sees Register/Login first!
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TX);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Team members: starts ZEROED OUT as requested
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TEAM);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Helper to generate tasks for a given VIP tier
  const generateTasksForVip = (vipLevel: number): TaskItem[] => {
    if (vipLevel <= 0) return [];
    const tier = VIP_TIERS.find((t) => t.level === vipLevel) || VIP_TIERS[0];

    return [
      {
        id: `task-${vipLevel}-1`,
        title: `BingX ${tier.assetSymbol}/USDT High-Frequency Arbitrage Node Consensus`,
        titleAr: `مطابقة عقدة المراجحة الكمية الفورية لرمز ${tier.assetSymbol}/USDT`,
        reward: tier.perTaskProfit,
        vipRequired: tier.level,
        completed: false,
        category: 'Quantitative Arbitrage',
        assetSymbol: tier.assetSymbol,
        assetName: tier.assetName,
        assetImage: tier.assetImage,
      },
      {
        id: `task-${vipLevel}-2`,
        title: `BingX ${tier.assetSymbol}/USDT Liquidity Depth & Settlement Audit`,
        titleAr: `تدقيق عمق السيولة والتسوية السحابية لرمز ${tier.assetSymbol}/USDT`,
        reward: tier.perTaskProfit,
        vipRequired: tier.level,
        completed: false,
        category: 'Liquidity Settlement',
        assetSymbol: tier.assetSymbol,
        assetName: tier.assetName,
        assetImage: tier.assetImage,
      },
    ];
  };

  // Tasks state
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TASKS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Task 24h reset seconds state
  const [taskResetSeconds, setTaskResetSeconds] = useState<number>(86400);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TX, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TEAM, JSON.stringify(teamMembers));
  }, [teamMembers]);

  // Set HTML direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Handle 24-hour Task renewal countdown
  useEffect(() => {
    const updateCountdown = () => {
      if (!user?.lastTasksCompletedAt) {
        setTaskResetSeconds(86400);
        return;
      }
      const elapsed = Math.floor((Date.now() - user.lastTasksCompletedAt) / 1000);
      const remaining = 86400 - elapsed;

      if (remaining <= 0) {
        // 24 hours have passed! Renew tasks
        if (user.vipLevel > 0) {
          const freshTasks = generateTasksForVip(user.vipLevel);
          setTasks(freshTasks);
        }
        setUser((prev) => (prev ? { ...prev, lastTasksCompletedAt: undefined, todayEarnings: 0 } : null));
        setTaskResetSeconds(86400);
      } else {
        setTaskResetSeconds(remaining);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [user?.lastTasksCompletedAt, user?.vipLevel]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const login = (emailOrPhone: string) => {
    const isEmail = emailOrPhone.includes('@');
    const newUser: User = {
      id: 'po_' + Math.floor(100000 + Math.random() * 900000),
      email: isEmail ? emailOrPhone : `${emailOrPhone}@porsche-mobile.com`,
      phone: !isEmail ? emailOrPhone : '+1 (555) ' + Math.floor(1000000 + Math.random() * 9000000),
      vipLevel: 0, // Starts at 0 (No active VIP package until purchased)
      balance: 0.00,
      todayEarnings: 0.00,
      totalEarnings: 0.00,
      invitationCode: String(Math.floor(100000 + Math.random() * 900000)),
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      securityPassword: '******',
    };
    setUser(newUser);
    setTasks([]);
    showToast(translations[language].welcome);
  };

  const register = (email: string, phone: string, inviteCode?: string) => {
    const newUser: User = {
      id: 'po_' + Math.floor(100000 + Math.random() * 900000),
      email: email, // Dynamic email exact as entered by user
      phone: phone, // Dynamic phone exact as entered by user
      vipLevel: 0, // Starts at 0 (Must purchase VIP to unlock)
      balance: 0.00,
      todayEarnings: 0.00,
      totalEarnings: 0.00,
      invitationCode: String(Math.floor(100000 + Math.random() * 900000)),
      inviterCode: inviteCode || '167111',
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      securityPassword: '******',
    };
    setUser(newUser);
    setTasks([]); // No tasks until package is unlocked
    showToast(translations[language].welcome);
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
    showToast('Logged out');
  };

  const loginAsDemo = () => {
    const demo: User = {
      id: 'po_889211',
      email: 'investor.porsche@gmail.com',
      phone: '+971 50 123 4567',
      vipLevel: 1, // Has VIP1
      balance: 25.00,
      todayEarnings: 0.00,
      totalEarnings: 12.00,
      invitationCode: '167111',
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      vipExpireAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().replace('T', ' ').substring(0, 19),
      securityPassword: '******',
    };
    setUser(demo);
    setTasks(generateTasksForVip(1));
    showToast(translations[language].welcome);
  };

  // Complete a task
  const completeTask = async (taskId: string): Promise<boolean> => {
    if (!user || user.vipLevel <= 0) return false;
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.completed) return false;

    // Mark task completed
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: true, completedAt: new Date().toLocaleTimeString() } : t
    );
    setTasks(updatedTasks);

    const reward = task.reward;
    const allDone = updatedTasks.every((t) => t.completed);

    setUser((prev) =>
      prev
        ? {
            ...prev,
            balance: +(prev.balance + reward).toFixed(2),
            todayEarnings: +(prev.todayEarnings + reward).toFixed(2),
            totalEarnings: +(prev.totalEarnings + reward).toFixed(2),
            lastTasksCompletedAt: allDone ? Date.now() : prev.lastTasksCompletedAt,
          }
        : null
    );

    // Record transaction
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'task_reward',
      amount: reward,
      status: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: task.title,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Confetti effect
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    showToast(`+${reward.toFixed(2)} USDT earned!`);
    return true;
  };

  // Instant Reset of 24h Tasks for test convenience
  const resetTasksNow = () => {
    if (!user || user.vipLevel <= 0) return;
    const freshTasks = generateTasksForVip(user.vipLevel);
    setTasks(freshTasks);
    setUser((prev) => (prev ? { ...prev, lastTasksCompletedAt: undefined, todayEarnings: 0 } : null));
    setTaskResetSeconds(86400);
    showToast('24h Tasks reset! You can now complete tasks again.');
  };

  // Upgrade VIP Package
  const upgradeVIP = (tierLevel: number) => {
    if (!user) return { success: false, message: 'Please sign in first' };
    const tier = VIP_TIERS.find((t) => t.level === tierLevel);
    if (!tier) return { success: false, message: 'Invalid VIP tier' };

    if (user.balance < tier.price) {
      return { success: false, message: translations[language].insufficientBalance };
    }

    setUser((prev) =>
      prev
        ? {
            ...prev,
            vipLevel: tier.level,
            balance: +(prev.balance - tier.price).toFixed(2),
            vipExpireAt: new Date(Date.now() + tier.daysValid * 24 * 3600 * 1000)
              .toISOString()
              .replace('T', ' ')
              .substring(0, 19),
            lastTasksCompletedAt: undefined,
          }
        : null
    );

    // Generate new tasks matching this tier's car image and profits
    const newTasks = generateTasksForVip(tier.level);
    setTasks(newTasks);

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'vip_purchase',
      amount: tier.price,
      status: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Upgrade to ${tier.name}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    return {
      success: true,
      message: translations[language].upgradeSuccess.replace('{tier}', tier.name),
    };
  };

  // Deposit
  const depositFunds = (amount: number, network = 'USDT-TRC20') => {
    if (!user) return;
    setUser((prev) =>
      prev
        ? {
            ...prev,
            balance: +(prev.balance + amount).toFixed(2),
          }
        : null
    );

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'deposit',
      amount,
      status: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      txHash: '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6),
      network,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(translations[language].depositSuccess);
  };

  // Withdraw
  const withdrawFunds = (amount: number, address: string, secPass: string) => {
    if (!user) return { success: false, message: 'Please sign in' };
    if (amount < 3.0) return { success: false, message: translations[language].minWithdraw };
    if (amount > user.balance) return { success: false, message: 'Withdraw amount exceeds available balance' };
    if (!address || address.length < 10) return { success: false, message: 'Invalid wallet address' };
    if (!secPass) return { success: false, message: 'Please provide security password' };

    setUser((prev) =>
      prev
        ? {
            ...prev,
            balance: +(prev.balance - amount).toFixed(2),
          }
        : null
    );

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'withdraw',
      amount,
      status: 'processing',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      txHash: address.substring(0, 6) + '...' + address.substring(address.length - 4),
      details: 'USDT-TRC20',
    };
    setTransactions((prev) => [newTx, ...prev]);
    return { success: true, message: translations[language].withdrawSuccess };
  };

  // Add simulated referral to test team member calculation
  const addSimulatedReferral = (email?: string, deposit = 40.0, level: 1 | 2 | 3 = 1) => {
    const rate = level === 1 ? 0.12 : level === 2 ? 0.02 : 0.01;
    const commission = +(deposit * rate).toFixed(2);
    const memberEmail = email || `user_${Math.floor(1000 + Math.random() * 9000)}@crypto.com`;

    const newMember: TeamMember = {
      id: 'tm-' + Date.now(),
      email: memberEmail,
      level,
      vipLevel: deposit >= 98 ? 3 : deposit >= 40 ? 2 : 1,
      depositAmount: deposit,
      commissionEarned: commission,
      joinedAt: new Date().toLocaleTimeString(),
    };

    setTeamMembers((prev) => [newMember, ...prev]);

    // Give commission reward to user
    setUser((prev) =>
      prev
        ? {
            ...prev,
            balance: +(prev.balance + commission).toFixed(2),
            todayEarnings: +(prev.todayEarnings + commission).toFixed(2),
            totalEarnings: +(prev.totalEarnings + commission).toFixed(2),
          }
        : null
    );

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'referral_commission',
      amount: commission,
      status: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Level ${level} referral rebate from ${memberEmail}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`New referral joined! Received +${commission.toFixed(2)} USDT commission.`);
  };

  // Daily Checkin
  const claimDailyReward = (day: number) => {
    if (dailyClaimedDays.includes(day)) {
      return { success: false, reward: 0 };
    }
    const reward = +(0.5 + day * 0.25).toFixed(2);
    setDailyClaimedDays((prev) => [...prev, day]);

    setUser((prev) =>
      prev
        ? {
            ...prev,
            balance: +(prev.balance + reward).toFixed(2),
            todayEarnings: +(prev.todayEarnings + reward).toFixed(2),
          }
        : null
    );

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'daily_reward',
      amount: reward,
      status: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Day ${day} Daily Check-In Bonus`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    return { success: true, reward };
  };

  // Lucky Spin
  const luckySpin = () => {
    const rewards = [1.0, 2.0, 5.0, 10.0, 0.5, 15.0];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    setSpinAvailable(false);

    setUser((prev) =>
      prev
        ? {
            ...prev,
            balance: +(prev.balance + reward).toFixed(2),
            todayEarnings: +(prev.todayEarnings + reward).toFixed(2),
          }
        : null
    );

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'daily_reward',
      amount: reward,
      status: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: 'Lucky Gift Box Prize',
    };
    setTransactions((prev) => [newTx, ...prev]);
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    return { reward };
  };

  const markNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        t: translations[language],
        setLanguage,
        currentTab,
        setCurrentTab,
        viewMode,
        setViewMode,
        login,
        register,
        logout,
        loginAsDemo,
        tasks,
        completeTask,
        upgradeVIP,
        depositFunds,
        withdrawFunds,
        claimDailyReward,
        dailyClaimedDays,
        luckySpin,
        spinAvailable,
        transactions,
        teamMembers,
        addSimulatedReferral,
        notifications,
        unreadNotifsCount,
        markNotifsAsRead,
        activeModal,
        setActiveModal,
        toastMessage,
        showToast,
        taskResetSeconds,
        resetTasksNow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
