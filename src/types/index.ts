export type Language = 'en' | 'ar';

export interface User {
  id: string;
  email: string;
  phone?: string;
  vipLevel: number; // 0 = unranked, 1 = VIP1, etc.
  balance: number;
  todayEarnings: number;
  totalEarnings: number;
  invitationCode: string;
  inviterCode?: string;
  registeredAt: string;
  vipExpireAt?: string;
  securityPassword?: string;
  lastTasksCompletedAt?: number;
}

export interface VIPTier {
  level: number;
  name: string;
  price: number;
  dailyTasks: number;
  perTaskProfit: number;
  dailyProfit: number;
  totalProfit: number;
  daysValid: number;
  assetSymbol: string; // BTC, ETH, XAU, etc.
  assetName: string;
  assetImage: string;
  badgeColor?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  titleAr: string;
  reward: number;
  vipRequired: number;
  completed: boolean;
  completedAt?: string;
  category: string;
  assetSymbol: string;
  assetName: string;
  assetImage: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'task_reward' | 'vip_purchase' | 'daily_reward' | 'referral_commission';
  amount: number;
  status: 'completed' | 'pending' | 'processing';
  createdAt: string;
  txHash?: string;
  details?: string;
  network?: string;
}

export interface TeamMember {
  id: string;
  email: string;
  level: 1 | 2 | 3;
  vipLevel: number;
  depositAmount: number;
  commissionEarned: number;
  joinedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  time: string;
  read: boolean;
}
