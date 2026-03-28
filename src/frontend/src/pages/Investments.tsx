import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { MOCK_INVESTMENTS } from "../mockData";
import { COMMISSION_LEVELS, PACKAGES, formatINR } from "../types";
import type { Investment, PackageTier, User } from "../types";

type Page = "dashboard" | "network" | "investments" | "admin" | "certificate";

interface InvestmentsProps {
  userProfile: User;
  onNavigate: (page: Page) => void;
}

const BANK_DETAILS = {
  accountNo: "TSCK2BLNNJA0035",
  ifsc: "ICIC0000104",
  bankName: "Karad Merchant Co-operative Credit Society",
};

export function Investments({ userProfile, onNavigate }: InvestmentsProps) {
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"amount" | "bank">("amount");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myInvestments, setMyInvestments] = useState<Investment[]>(
    MOCK_INVESTMENTS.filter((i) => i.userId === "user-001"),
  );

  const handleSelect = (tier: PackageTier) => {
    setSelectedPackage(tier);
    setInvestmentAmount("");
    setStep("amount");
    setShowModal(true);
  };

  const handleProceedToBank = () => {
    setStep("bank");
  };

  const handleSubmit = () => {
    if (!selectedPackage) return;
    setSubmitting(true);
    setTimeout(() => {
      const newInv: Investment = {
        id: `inv-${Date.now()}`,
        userId: "user-001",
        userName: userProfile.name,
        tier: selectedPackage,
        amount: Number(investmentAmount),
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        certificateId: `CERT-${Date.now()}`,
      };
      setMyInvestments((prev) => [...prev, newInv]);
      toast.success(
        "Investment request submitted! Admin will approve within 24 hours.",
      );
      setShowModal(false);
      setSubmitting(false);
      setStep("amount");
    }, 600);
  };

  const handleModalClose = (open: boolean) => {
    setShowModal(open);
    if (!open) setStep("amount");
  };

  const pkg = PACKAGES.find((p) => p.tier === selectedPackage);
  const amountNum = Number(investmentAmount);
  const amountValid =
    pkg &&
    investmentAmount !== "" &&
    amountNum >= pkg.minAmount &&
    amountNum <= pkg.maxAmount;
  const amountOutOfRange =
    pkg &&
    investmentAmount !== "" &&
    (amountNum < pkg.minAmount || amountNum > pkg.maxAmount);

  const activeInvestment = myInvestments.find((i) => i.status === "active");
  const packageTier = userProfile.package;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
          Diamond
        </p>
        <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">
          Investment Packages
        </h1>
      </div>

      {activeInvestment && (
        <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                Active Investment
              </p>
              <p className="text-xl font-bold gold-text">
                {PACKAGES.find((p) => p.tier === activeInvestment.tier)?.name}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {formatINR(activeInvestment.amount)} invested
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("certificate")}
              className="px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold"
              style={{
                background: "oklch(0.72 0.12 75 / 0.15)",
                border: "1px solid oklch(0.72 0.12 75 / 0.5)",
                color: "oklch(0.72 0.12 75)",
              }}
              data-ocid="investments.button"
            >
              View Certificate
            </button>
          </div>
        </div>
      )}

      {myInvestments.filter((i) => i.status === "pending").length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-xs text-amber-400 uppercase tracking-wider font-semibold mb-1">
            Pending Approval
          </p>
          <p className="text-sm text-muted-foreground">
            You have{" "}
            {myInvestments.filter((i) => i.status === "pending").length}{" "}
            investment(s) awaiting admin approval.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKAGES.map((p) => (
          <PackageCard
            key={p.tier}
            pkg={p}
            isActive={packageTier === p.tier}
            onSelect={() => handleSelect(p.tier)}
          />
        ))}
      </div>

      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-4">
          15-Level Commission Structure
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {COMMISSION_LEVELS.map((cl) => (
            <div
              key={cl.level}
              className="bg-muted/30 rounded-lg p-3 text-center"
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Level {cl.level}
              </p>
              <p className="text-lg font-bold gold-text">{cl.percent}%</p>
              {cl.note && (
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {cl.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="tracking-wider uppercase">
              {pkg?.name} —{" "}
              {step === "amount" ? "Enter Amount" : "Bank Payment Details"}
            </DialogTitle>
          </DialogHeader>

          {/* Step indicator */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background:
                    step === "amount"
                      ? "oklch(0.72 0.12 75)"
                      : "oklch(0.72 0.12 75 / 0.3)",
                  color:
                    step === "amount"
                      ? "oklch(0.1 0 0)"
                      : "oklch(0.72 0.12 75)",
                }}
              >
                1
              </div>
              <span className="text-xs text-muted-foreground">Amount</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background:
                    step === "bank"
                      ? "oklch(0.72 0.12 75)"
                      : "oklch(0.4 0.02 250 / 0.5)",
                  color:
                    step === "bank" ? "oklch(0.1 0 0)" : "oklch(0.6 0.05 250)",
                }}
              >
                2
              </div>
              <span className="text-xs text-muted-foreground">Payment</span>
            </div>
          </div>

          {/* Step 1: Amount Entry */}
          {step === "amount" && pkg && (
            <div className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">
                Enter your investment amount between{" "}
                <span className="gold-text font-semibold">
                  {formatINR(pkg.minAmount)}
                </span>{" "}
                and{" "}
                <span className="gold-text font-semibold">
                  {formatINR(pkg.maxAmount)}
                </span>
              </p>
              <div>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder={`Min ${formatINR(pkg.minAmount)}`}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-input border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  data-ocid="investments.input"
                />
                {amountOutOfRange && (
                  <p className="text-xs text-destructive mt-1">
                    Amount must be between {formatINR(pkg.minAmount)} and{" "}
                    {formatINR(pkg.maxAmount)}
                  </p>
                )}
                {amountValid && (
                  <div className="mt-3 p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Projected Returns
                    </p>
                    <p className="text-sm">
                      Monthly ROI:{" "}
                      <span className="gold-text font-semibold">
                        {formatINR(amountNum * 0.05)}
                      </span>
                    </p>
                    <p className="text-sm">
                      Annual ROI:{" "}
                      <span className="gold-text font-semibold">
                        {formatINR(amountNum * 0.6)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <Button
                onClick={handleProceedToBank}
                disabled={!amountValid}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 tracking-widest uppercase text-sm font-semibold"
                data-ocid="investments.proceed_button"
              >
                Proceed to Payment →
              </Button>
            </div>
          )}

          {/* Step 2: Bank Details + Submit */}
          {step === "bank" && pkg && (
            <div className="space-y-4 pt-2">
              <div
                className="p-1 rounded-lg"
                style={{
                  background: "oklch(0.72 0.12 75 / 0.05)",
                  border: "1px solid oklch(0.72 0.12 75 / 0.25)",
                }}
              >
                <div
                  className="flex items-center gap-2 px-3 pt-3 pb-2 border-b"
                  style={{ borderColor: "oklch(0.72 0.12 75 / 0.2)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      stroke="oklch(0.72 0.12 75)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 10h20"
                      stroke="oklch(0.72 0.12 75)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 15h4"
                      stroke="oklch(0.72 0.12 75)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-xs font-semibold uppercase tracking-wider gold-text">
                    Bank Transfer Details
                  </p>
                </div>
                <div className="px-3 py-3 space-y-3">
                  <BankRow label="Bank Name" value={BANK_DETAILS.bankName} />
                  <BankRow
                    label="Account Number"
                    value={BANK_DETAILS.accountNo}
                    copyable
                  />
                  <BankRow
                    label="IFSC Code"
                    value={BANK_DETAILS.ifsc}
                    copyable
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Investment Summary
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-semibold">{pkg.name}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">
                    Amount to Transfer
                  </span>
                  <span className="gold-text font-bold">
                    {formatINR(amountNum)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Please transfer the exact amount to the bank account above and
                click <strong>Submit</strong>. Your investment will be activated
                after admin verification.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep("amount")}
                  className="flex-1 tracking-wider uppercase text-xs"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-primary text-primary-foreground hover:opacity-90 tracking-widest uppercase text-sm font-semibold"
                  data-ocid="investments.submit_button"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BankRow({
  label,
  value,
  copyable,
}: { label: string; value: string; copyable?: boolean }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // simple inline feedback via title attr — no extra state needed
  };
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground min-w-0">{label}</span>
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm font-semibold text-right truncate">
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            title="Copy"
            className="shrink-0 p-1 rounded hover:bg-muted/60 transition-colors"
            aria-label={`Copy ${label}`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="9"
                y="9"
                width="13"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function PackageCard({
  pkg,
  isActive,
  onSelect,
}: { pkg: (typeof PACKAGES)[0]; isActive: boolean; onSelect: () => void }) {
  const colors: Record<string, string> = {
    black: "oklch(0.72 0.12 75)",
    blue: "oklch(0.6 0.15 240)",
    white: "oklch(0.9 0.02 250)",
  };
  const color = colors[pkg.tier] ?? "oklch(0.72 0.12 75)";

  return (
    <div
      className="rounded-xl p-6 card-glow relative"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.04 260) 0%, oklch(0.1 0.03 250) 100%)",
        border: `1px solid ${color}${isActive ? "" : "50"}`,
        boxShadow: isActive ? `0 0 20px ${color}30` : undefined,
      }}
    >
      {isActive && (
        <div
          className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${color}20`, color }}
        >
          Active
        </div>
      )}
      <div className="flex items-center gap-2 mb-4">
        <svg
          width="20"
          height="24"
          viewBox="0 0 10 12"
          fill="none"
          role="img"
          aria-label="Diamond"
        >
          <polygon
            points="5,0 10,4.5 5,12 0,4.5"
            fill={`${color}30`}
            stroke={color}
            strokeWidth="0.75"
          />
        </svg>
        <h3
          className="text-sm font-bold tracking-wider uppercase"
          style={{ color }}
        >
          {pkg.name}
        </h3>
      </div>
      <p className="text-2xl font-bold mb-1" style={{ color }}>
        {formatINR(pkg.minAmount)}
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        to {formatINR(pkg.maxAmount)}
      </p>
      <div className="space-y-2 mb-5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Monthly ROI</span>
          <span className="font-semibold" style={{ color }}>
            5%
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Annual ROI</span>
          <span className="font-semibold" style={{ color }}>
            60%
          </span>
        </div>
      </div>
      <Button
        onClick={onSelect}
        className="w-full text-xs tracking-wider uppercase font-semibold"
        style={{
          background: `${color}20`,
          border: `1px solid ${color}50`,
          color,
        }}
        variant="outline"
        data-ocid="investments.primary_button"
      >
        {isActive ? "Upgrade" : "Invest Now"}
      </Button>
    </div>
  );
}
