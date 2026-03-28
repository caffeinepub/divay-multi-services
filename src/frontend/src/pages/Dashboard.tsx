import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { MOCK_TRANSACTIONS } from "../mockData";
import { PACKAGES, formatINR } from "../types";
import type { User } from "../types";

type Page = "dashboard" | "network" | "investments" | "admin" | "certificate";

interface DashboardProps {
  userProfile: User;
  onNavigate: (page: Page) => void;
}

function Sparkline({
  data,
  color = "oklch(0.72 0.12 75)",
}: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const points = data.map(
    (v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`,
  );
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="Sparkline chart"
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dashboard({ userProfile, onNavigate }: DashboardProps) {
  const [transactions] = useState(MOCK_TRANSACTIONS);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawType, setWithdrawType] = useState<"roi" | "commission">("roi");
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const pkg = PACKAGES.find((p) => p.tier === userProfile.package);
  const roiBalance = userProfile.roiBalance;
  const commissionBalance = userProfile.commissionBalance;
  const totalWithdrawn = userProfile.totalWithdrawn;
  const directReferrals = userProfile.directReferrals;
  const teamSize = userProfile.teamSize;

  const roiData = [2500, 2500, 3500, 5000, 5000, 5000, roiBalance || 5000];
  const commData = [0, 2000, 1500, 3500, 750, 1000, commissionBalance || 2000];
  const teamData = [1, 3, 8, 12, 15, 20, teamSize || 23];

  const handleWithdraw = () => {
    const amt = Number.parseFloat(withdrawAmount);
    if (!amt || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    const bal = withdrawType === "roi" ? roiBalance : commissionBalance;
    if (amt > bal) {
      toast.error("Insufficient balance");
      return;
    }
    setWithdrawLoading(true);
    setTimeout(() => {
      toast.success(`Withdrawal request of ${formatINR(amt)} submitted!`);
      setWithdrawAmount("");
      setWithdrawLoading(false);
    }, 600);
  };

  const getTypeColor = (type: string) => {
    if (type === "roi") return "bg-chart-1/20 text-chart-1";
    if (type === "commission") return "bg-chart-2/20 text-chart-2";
    return "bg-destructive/20 text-destructive";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div
        className="rounded-xl p-6 sm:p-8 border border-border"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.04 260) 0%, oklch(0.1 0.03 250) 100%)",
        }}
      >
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
          Welcome back
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.1em] uppercase text-foreground">
          {userProfile.name}
        </h1>
        <div className="mt-3 flex flex-wrap gap-3">
          {pkg && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase gold-text"
              style={{
                background: "oklch(0.72 0.12 75 / 0.1)",
                border: "1px solid oklch(0.72 0.12 75 / 0.3)",
              }}
            >
              <DiamondIcon />
              {pkg.name} Package
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs tracking-wider uppercase text-muted-foreground border border-border">
            Referral: {userProfile.referralCode}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          title="Total ROI Earned"
          value={formatINR(roiBalance + totalWithdrawn)}
          sub={pkg ? `${formatINR(pkg.monthlyROI)}/month` : ""}
          data={roiData}
          note="+5% Monthly"
          color="oklch(0.72 0.12 75)"
        />
        <KpiCard
          title="Team Commission"
          value={formatINR(commissionBalance)}
          sub={`${directReferrals} direct referrals`}
          data={commData}
          note="15-Level Structure"
          color="oklch(0.6 0.15 240)"
        />
        <KpiCard
          title="Team Network"
          value={teamSize.toString()}
          sub="Total members"
          data={teamData}
          note="Growing team"
          color="oklch(0.65 0.15 180)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Wallet Balances
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                ROI Balance
              </p>
              <p className="text-xl font-bold gold-text">
                {formatINR(roiBalance)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Commission
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: "oklch(0.6 0.15 240)" }}
              >
                {formatINR(commissionBalance)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Total Withdrawn
              </p>
              <p className="text-xl font-bold text-muted-foreground">
                {formatINR(totalWithdrawn)}
              </p>
            </div>
          </div>

          <h3 className="text-xs tracking-wider uppercase text-muted-foreground mb-3">
            Request Withdrawal
          </h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setWithdrawType("roi")}
                className={`flex-1 py-2 text-xs rounded-lg border transition-all uppercase tracking-wider ${
                  withdrawType === "roi"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
                data-ocid="dashboard.toggle"
              >
                ROI
              </button>
              <button
                type="button"
                onClick={() => setWithdrawType("commission")}
                className={`flex-1 py-2 text-xs rounded-lg border transition-all uppercase tracking-wider ${
                  withdrawType === "commission"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
                data-ocid="dashboard.toggle"
              >
                Commission
              </button>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-input border-border"
                data-ocid="dashboard.input"
              />
              <Button
                type="button"
                onClick={handleWithdraw}
                disabled={withdrawLoading}
                className="bg-primary text-primary-foreground hover:opacity-90 whitespace-nowrap"
                data-ocid="dashboard.primary_button"
              >
                {withdrawLoading ? "Please wait..." : "Withdraw"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Min ₹500 | Processed within 2-3 business days
            </p>
          </div>
        </div>

        <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Recent Transactions
          </h2>
          {transactions.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground text-sm"
              data-ocid="dashboard.empty_state"
            >
              No transactions yet.
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 6).map((tx, idx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                  data-ocid={`dashboard.item.${idx + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${getTypeColor(tx.type)}`}
                    >
                      {tx.type}
                    </span>
                    <div>
                      <p className="text-xs text-foreground">
                        {tx.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {tx.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      tx.type === "withdrawal"
                        ? "text-destructive"
                        : "gold-text"
                    }`}
                  >
                    {tx.type === "withdrawal" ? "-" : "+"}
                    {formatINR(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickAction
          icon="💎"
          label="View Package"
          onClick={() => onNavigate("investments")}
        />
        <QuickAction
          icon="👥"
          label="My Network"
          onClick={() => onNavigate("network")}
        />
        <QuickAction
          icon="📜"
          label="Certificate"
          onClick={() => onNavigate("certificate")}
        />
        <QuickAction
          icon="📊"
          label="Commission Plan"
          onClick={() => onNavigate("investments")}
        />
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  sub,
  data,
  note,
  color,
}: {
  title: string;
  value: string;
  sub: string;
  data: number[];
  note: string;
  color: string;
}) {
  return (
    <div
      className="diamond-bg rounded-xl p-5 card-glow"
      style={{ border: `1px solid ${color}40` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color }}>
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
        </div>
        <div className="text-right">
          <Sparkline data={data} color={color} />
          <p className="text-[10px] mt-1" style={{ color }}>
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="diamond-bg gold-border rounded-xl p-4 text-center hover:border-primary/80 transition-all group card-glow"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </p>
    </button>
  );
}

function DiamondIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      role="img"
      aria-label="Diamond"
    >
      <polygon
        points="5,0 10,4.5 5,12 0,4.5"
        fill="oklch(0.72 0.12 75 / 0.4)"
        stroke="oklch(0.72 0.12 75)"
        strokeWidth="0.75"
      />
    </svg>
  );
}
