export type PackageTier = "none" | "black" | "blue" | "white";

export interface InvestmentPackage {
  tier: PackageTier;
  name: string;
  amount: number;
  minAmount: number;
  maxAmount: number;
  monthlyROI: number;
  roiPercent: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  uplineCode?: string;
  package: PackageTier;
  joinDate: string;
  status: "active" | "pending" | "inactive";
  directReferrals: number;
  teamSize: number;
  roiBalance: number;
  commissionBalance: number;
  totalWithdrawn: number;
}

export interface Investment {
  id: string;
  userId: string;
  userName: string;
  tier: PackageTier;
  amount: number;
  date: string;
  status: "pending" | "active" | "rejected";
  certificateId: string;
}

export interface Transaction {
  id: string;
  type: "roi" | "commission" | "withdrawal";
  amount: number;
  date: string;
  description: string;
  status: "credited" | "pending" | "approved" | "rejected";
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  type: "roi" | "commission";
}

export interface DownlineMember {
  id: string;
  name: string;
  level: number;
  package: PackageTier;
  joinDate: string;
  teamSize: number;
}

export const PACKAGES: InvestmentPackage[] = [
  {
    tier: "black",
    name: "Black Diamond",
    amount: 100000,
    minAmount: 10000,
    maxAmount: 100000,
    monthlyROI: 5000,
    roiPercent: 5,
  },
  {
    tier: "blue",
    name: "Blue Diamond",
    amount: 500000,
    minAmount: 100000,
    maxAmount: 500000,
    monthlyROI: 25000,
    roiPercent: 5,
  },
  {
    tier: "white",
    name: "White Diamond",
    amount: 1000000,
    minAmount: 500000,
    maxAmount: 1000000,
    monthlyROI: 50000,
    roiPercent: 5,
  },
];

export const COMMISSION_LEVELS = [
  { level: 1, percent: 2.0, note: "Direct Referral Bonus" },
  { level: 2, percent: 2.0, note: "Secondary team sales" },
  { level: 3, percent: 0.5, note: "" },
  { level: 4, percent: 0.5, note: "" },
  { level: 5, percent: 0.5, note: "" },
  { level: 6, percent: 0.5, note: "" },
  { level: 7, percent: 0.5, note: "" },
  { level: 8, percent: 0.5, note: "" },
  { level: 9, percent: 0.5, note: "" },
  { level: 10, percent: 0.5, note: "" },
  { level: 11, percent: 0.2, note: "Deep-level residual income" },
  { level: 12, percent: 0.2, note: "" },
  { level: 13, percent: 0.2, note: "" },
  { level: 14, percent: 0.2, note: "" },
  { level: 15, percent: 0.2, note: "" },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPackageInfo(
  tier: PackageTier,
): InvestmentPackage | undefined {
  return PACKAGES.find((p) => p.tier === tier);
}
