import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { MOCK_CURRENT_USER } from "../mockData";
import { COMMISSION_LEVELS, PACKAGES, formatINR } from "../types";
import type { PackageTier } from "../types";

type Page = "dashboard" | "network" | "investments" | "admin" | "certificate";

interface InvestmentsProps {
  onNavigate: (page: Page) => void;
}

export function Investments({ onNavigate }: InvestmentsProps) {
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const user = MOCK_CURRENT_USER;

  const handleSelect = (tier: PackageTier) => {
    setSelectedPackage(tier);
    setShowModal(true);
  };

  const handleSubmit = () => {
    toast.success(
      "Purchase request submitted! Admin will approve within 24 hours.",
    );
    setShowModal(false);
  };

  const pkg = PACKAGES.find((p) => p.tier === selectedPackage);

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

      {user.package !== "none" && (
        <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                Active Investment
              </p>
              <p className="text-xl font-bold gold-text">
                {PACKAGES.find((p) => p.tier === user.package)?.name}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {formatINR(
                  PACKAGES.find((p) => p.tier === user.package)?.amount ?? 0,
                )}{" "}
                &bull; Since Jan 15, 2024
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate("certificate")}
              className="border-primary/50 text-primary hover:bg-primary/10 text-xs tracking-wider uppercase"
            >
              View Certificate
            </Button>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-6">
          Choose Your Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((p, i) => (
            <PackageCard
              key={p.tier}
              pkg={p}
              isActive={user.package === p.tier}
              index={i}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-6">
          15-Level Commission Structure
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COMMISSION_LEVELS.map((cl) => (
            <div
              key={cl.level}
              className="bg-muted/40 rounded-lg p-3 flex items-center justify-between"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Level {cl.level}
              </span>
              <span className="text-sm font-bold gold-text">{cl.percent}%</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Commission is earned on the investment amount of each downline member
          across 15 levels.
        </p>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="diamond-bg border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm tracking-[0.15em] uppercase gold-text">
              Purchase {pkg?.name}
            </DialogTitle>
          </DialogHeader>
          {pkg && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <Row label="Package" value={pkg.name} />
                <Row
                  label="Investment Amount"
                  value={formatINR(pkg.amount)}
                  highlight
                />
                <Row
                  label="Monthly ROI (5%)"
                  value={formatINR(pkg.monthlyROI)}
                />
                <Row
                  label="Annual ROI"
                  value={formatINR(pkg.monthlyROI * 12)}
                />
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Payment Instructions
                </p>
                <p className="text-sm text-foreground mb-2">
                  Transfer {formatINR(pkg.amount)} to:
                </p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>
                    Bank:{" "}
                    <span className="text-foreground">
                      Divay Multi Services Pvt. Ltd.
                    </span>
                  </p>
                  <p>
                    Account: <span className="text-foreground">1234567890</span>
                  </p>
                  <p>
                    IFSC: <span className="text-foreground">HDFC0001234</span>
                  </p>
                  <p>
                    Use your referral code{" "}
                    <span className="gold-text font-semibold">
                      {MOCK_CURRENT_USER.referralCode}
                    </span>{" "}
                    as reference.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border-border"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                >
                  Submit Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PackageCard({
  pkg,
  isActive,
  index,
  onSelect,
}: {
  pkg: (typeof PACKAGES)[0];
  isActive: boolean;
  index: number;
  onSelect: (tier: PackageTier) => void;
}) {
  const configs = [
    {
      bg: "diamond-bg",
      borderColor: "oklch(0.72 0.12 75)",
      textColor: "oklch(0.72 0.12 75)",
      label: "Entry",
    },
    {
      bg: "blue-diamond-bg",
      borderColor: "oklch(0.6 0.15 240)",
      textColor: "oklch(0.7 0.15 240)",
      label: "Premium",
    },
    {
      bg: "white-diamond-bg",
      borderColor: "oklch(0.7 0.02 250)",
      textColor: "oklch(0.2 0.04 250)",
      label: "Elite",
    },
  ];
  const cfg = configs[index];

  return (
    <div
      className={`${cfg.bg} rounded-xl p-6 card-glow relative overflow-hidden`}
      style={{ border: `1px solid ${cfg.borderColor}60` }}
    >
      {isActive && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold"
          style={{
            background: `${cfg.borderColor}20`,
            border: `1px solid ${cfg.borderColor}`,
            color: cfg.borderColor,
          }}
        >
          Active
        </div>
      )}

      <div className="mb-4">
        <p
          className="text-[10px] uppercase tracking-[0.2em] mb-1"
          style={{ color: cfg.textColor, opacity: 0.7 }}
        >
          {cfg.label} Tier
        </p>
        <div className="flex items-center gap-2">
          <span className="text-2xl" style={{ color: cfg.textColor }}>
            ◆
          </span>
          <h3
            className="text-lg font-bold tracking-wider uppercase"
            style={{ color: cfg.textColor }}
          >
            {pkg.name}
          </h3>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <p
            className="text-[10px] uppercase tracking-wider opacity-60"
            style={{ color: cfg.textColor }}
          >
            Investment
          </p>
          <p className="text-2xl font-bold" style={{ color: cfg.textColor }}>
            {formatINR(pkg.amount)}
          </p>
        </div>
        <div
          className="h-px opacity-20"
          style={{ background: cfg.textColor }}
        />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p
              className="opacity-60 uppercase tracking-wider"
              style={{ color: cfg.textColor }}
            >
              Monthly ROI
            </p>
            <p className="font-semibold" style={{ color: cfg.textColor }}>
              {formatINR(pkg.monthlyROI)}
            </p>
          </div>
          <div>
            <p
              className="opacity-60 uppercase tracking-wider"
              style={{ color: cfg.textColor }}
            >
              Annual
            </p>
            <p className="font-semibold" style={{ color: cfg.textColor }}>
              {formatINR(pkg.monthlyROI * 12)}
            </p>
          </div>
          <div>
            <p
              className="opacity-60 uppercase tracking-wider"
              style={{ color: cfg.textColor }}
            >
              ROI Rate
            </p>
            <p className="font-semibold" style={{ color: cfg.textColor }}>
              5% / Month
            </p>
          </div>
          <div>
            <p
              className="opacity-60 uppercase tracking-wider"
              style={{ color: cfg.textColor }}
            >
              Commission
            </p>
            <p className="font-semibold" style={{ color: cfg.textColor }}>
              15 Levels
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(pkg.tier)}
        className="w-full py-3 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase transition-all hover:opacity-90"
        style={{
          background: `${cfg.borderColor}20`,
          border: `1px solid ${cfg.borderColor}`,
          color: cfg.textColor,
        }}
      >
        Select Package
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={
          highlight ? "font-bold gold-text" : "font-medium text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}
