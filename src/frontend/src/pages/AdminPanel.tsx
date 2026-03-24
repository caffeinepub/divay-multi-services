import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  MOCK_ALL_USERS,
  MOCK_INVESTMENTS,
  MOCK_WITHDRAWALS,
} from "../mockData";
import { PACKAGES, formatINR } from "../types";
import type { Investment, WithdrawalRequest } from "../types";

type TabId = "overview" | "investments" | "withdrawals" | "users";

export function AdminPanel() {
  const [investments, setInvestments] =
    useState<Investment[]>(MOCK_INVESTMENTS);
  const [withdrawals, setWithdrawals] =
    useState<WithdrawalRequest[]>(MOCK_WITHDRAWALS);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const pending = investments.filter((i) => i.status === "pending");
  const active = investments.filter((i) => i.status === "active");
  const pendingWd = withdrawals.filter((w) => w.status === "pending");

  const approveInvestment = (id: string) => {
    setInvestments((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "active" as const } : i)),
    );
    toast.success("Investment approved & commissions distributed!");
  };

  const rejectInvestment = (id: string) => {
    setInvestments((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "rejected" as const } : i,
      ),
    );
    toast.error("Investment rejected.");
  };

  const approveWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: "approved" as const } : w,
      ),
    );
    toast.success("Withdrawal approved!");
  };

  const rejectWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: "rejected" as const } : w,
      ),
    );
    toast.error("Withdrawal rejected.");
  };

  const processROI = () => {
    toast.success("Monthly ROI processed for all active investors!");
  };

  const tierName = (tier: string) =>
    PACKAGES.find((p) => p.tier === tier)?.name ?? tier;

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "investments", label: `Investments (${pending.length} pending)` },
    { id: "withdrawals", label: `Withdrawals (${pendingWd.length} pending)` },
    { id: "users", label: "All Users" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
            Admin
          </p>
          <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">
            Control Panel
          </h1>
        </div>
        <Button
          onClick={processROI}
          className="bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
        >
          Process Monthly ROI
        </Button>
      </div>

      <div className="flex gap-1 p-1 bg-muted rounded-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 text-xs tracking-wider uppercase rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total Members"
              value={MOCK_ALL_USERS.length.toString()}
            />
            <StatCard
              label="Active Investments"
              value={active.length.toString()}
            />
            <StatCard
              label="Pending Approvals"
              value={pending.length.toString()}
              highlight
            />
            <StatCard
              label="Pending Withdrawals"
              value={pendingWd.length.toString()}
              highlight
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total Invested"
              value={formatINR(
                investments
                  .filter((i) => i.status === "active")
                  .reduce((s, i) => s + i.amount, 0),
              )}
            />
            <MetricCard label="Total ROI Paid" value={formatINR(125000)} />
            <MetricCard label="Total Commissions" value={formatINR(87500)} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(
              [
                {
                  icon: "👥",
                  label: "Member Management",
                  action: () => setActiveTab("users"),
                },
                {
                  icon: "💼",
                  label: "Investment Approvals",
                  action: () => setActiveTab("investments"),
                },
                {
                  icon: "💸",
                  label: "Withdrawal Approvals",
                  action: () => setActiveTab("withdrawals"),
                },
                { icon: "📊", label: "Commission Structure", action: () => {} },
                {
                  icon: "📈",
                  label: "Process Monthly ROI",
                  action: processROI,
                },
                { icon: "⚙️", label: "Platform Settings", action: () => {} },
              ] as const
            ).map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={item.action}
                className="diamond-bg gold-border rounded-xl p-5 text-left hover:border-primary/70 transition-all card-glow"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "investments" && (
        <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            All Investment Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "User",
                    "Package",
                    "Amount",
                    "Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 px-3 text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-3 text-sm font-medium">
                      {inv.userName}
                    </td>
                    <td className="py-3 px-3 text-xs gold-text font-semibold uppercase">
                      {tierName(inv.tier)}
                    </td>
                    <td className="py-3 px-3 text-sm font-semibold">
                      {formatINR(inv.amount)}
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">
                      {inv.date}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="py-3 px-3">
                      {inv.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => approveInvestment(inv.id)}
                            className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => rejectInvestment(inv.id)}
                            className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "withdrawals" && (
        <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Withdrawal Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["User", "Type", "Amount", "Date", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left py-2 px-3 text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((wd) => (
                  <tr
                    key={wd.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-3 text-sm font-medium">
                      {wd.userName}
                    </td>
                    <td className="py-3 px-3 text-xs uppercase tracking-wider">
                      {wd.type}
                    </td>
                    <td className="py-3 px-3 text-sm font-semibold gold-text">
                      {formatINR(wd.amount)}
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">
                      {wd.date}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={wd.status} />
                    </td>
                    <td className="py-3 px-3">
                      {wd.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => approveWithdrawal(wd.id)}
                            className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => rejectWithdrawal(wd.id)}
                            className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            All Users
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Name",
                    "Phone",
                    "Package",
                    "Joined",
                    "Team",
                    "ROI Balance",
                    "Commission",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 px-3 text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_ALL_USERS.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-3 text-sm font-medium">{u.name}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">
                      {u.phone}
                    </td>
                    <td className="py-3 px-3 text-xs gold-text font-semibold uppercase">
                      {tierName(u.package)}
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">
                      {u.joinDate}
                    </td>
                    <td className="py-3 px-3 text-sm font-semibold">
                      {u.teamSize}
                    </td>
                    <td className="py-3 px-3 text-sm">
                      {formatINR(u.roiBalance)}
                    </td>
                    <td className="py-3 px-3 text-sm">
                      {formatINR(u.commissionBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`diamond-bg rounded-xl p-4 card-glow text-center ${highlight ? "gold-border" : "border border-border"}`}
    >
      <p
        className={`text-2xl font-bold ${highlight ? "gold-text" : "text-foreground"}`}
      >
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="diamond-bg gold-border rounded-xl p-5 card-glow">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-xl font-bold gold-text">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    active: "bg-green-500/20 text-green-400",
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-destructive/20 text-destructive",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${cfg[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}
