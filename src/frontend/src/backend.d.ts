import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Result = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Withdrawal {
    id: string;
    status: Variant_pending_approved_rejected;
    userName: string;
    userId: Principal;
    date: string;
    withdrawalType: Variant_roi_commission;
    amount: bigint;
}
export interface Investment {
    id: string;
    status: Variant_active_pending_rejected;
    userName: string;
    userId: Principal;
    date: string;
    tier: Variant_blue_black_white;
    certificateId: string;
    amount: bigint;
}
export interface DownlineMember {
    referralCode: string;
    userId: Principal;
    name: string;
    level: bigint;
}
export interface UserProfile {
    status: Variant_active_pending_inactive;
    directReferrals: bigint;
    packageTier: Variant_blue_none_black_white;
    teamSize: bigint;
    referralCode: string;
    bankAccount?: {
        ifsc: string;
        bankName: string;
        accountNumber: string;
    };
    joinDate: string;
    commissionBalance: bigint;
    name: string;
    email: string;
    roiBalance: bigint;
    totalWithdrawn: bigint;
    uplineCode?: string;
    phone: string;
}
export interface Transaction {
    id: string;
    status: Variant_pending_approved_rejected_credited;
    userId: Principal;
    date: string;
    description: string;
    txType: Variant_roi_commission_withdrawal;
    amount: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_active_pending_inactive {
    active = "active",
    pending = "pending",
    inactive = "inactive"
}
export enum Variant_active_pending_rejected {
    active = "active",
    pending = "pending",
    rejected = "rejected"
}
export enum Variant_blue_black_white {
    blue = "blue",
    black = "black",
    white = "white"
}
export enum Variant_blue_none_black_white {
    blue = "blue",
    none = "none",
    black = "black",
    white = "white"
}
export enum Variant_pending_approved_rejected {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Variant_pending_approved_rejected_credited {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    credited = "credited"
}
export enum Variant_roi_commission {
    roi = "roi",
    commission = "commission"
}
export enum Variant_roi_commission_withdrawal {
    roi = "roi",
    commission = "commission",
    withdrawal = "withdrawal"
}
export interface backendInterface {
    approveInvestment(id: string): Promise<Result>;
    approveWithdrawal(id: string): Promise<Result>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    creditROI(userId: Principal, amount: bigint, description: string): Promise<Result>;
    getAllInvestments(): Promise<Array<Investment>>;
    getAllTransactions(): Promise<Array<Transaction>>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getAllWithdrawals(): Promise<Array<Withdrawal>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyDirectReferrals(): Promise<Array<UserProfile>>;
    getMyDownline(): Promise<Array<DownlineMember>>;
    getMyInvestments(): Promise<Array<Investment>>;
    getMyProfile(): Promise<UserProfile | null>;
    getMyTransactions(): Promise<Array<Transaction>>;
    getMyWithdrawals(): Promise<Array<Withdrawal>>;
    getUserProfile(userId: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    loginByEmail(email: string): Promise<UserProfile | null>;
    registerUser(name: string, email: string, phone: string, referralCode: string, uplineCode: string | null): Promise<Result>;
    rejectInvestment(id: string): Promise<Result>;
    rejectWithdrawal(id: string): Promise<Result>;
    requestWithdrawal(amount: bigint, withdrawalType: Variant_roi_commission): Promise<Result>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInvestment(tier: Variant_blue_black_white, amount: bigint, userName: string): Promise<Result>;
    updateMyBankAccount(accountNumber: string, bankName: string, ifsc: string): Promise<Result>;
    updateMyProfile(name: string, email: string, phone: string): Promise<Result>;
    updateUserStatus(userId: Principal, status: Variant_active_pending_inactive): Promise<Result>;
}
