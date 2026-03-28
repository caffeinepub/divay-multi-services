import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MOCK_INVESTMENTS } from "../mockData";
import { PACKAGES, formatINR } from "../types";
import type { User } from "../types";

interface CertificateProps {
  userProfile: User;
}

export function Certificate({ userProfile }: CertificateProps) {
  const investment =
    MOCK_INVESTMENTS.find(
      (i) => i.userId === "user-001" && i.status === "active",
    ) ?? null;
  const pkg = investment
    ? PACKAGES.find((p) => p.tier === investment.tier)
    : null;

  const handlePrint = () => {
    window.print();
    toast.success("Certificate sent to printer!");
  };

  if (!investment || !pkg) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center"
        data-ocid="certificate.empty_state"
      >
        <div className="text-4xl mb-4">◆</div>
        <h2 className="text-lg font-semibold mb-2">No Active Investment</h2>
        <p className="text-muted-foreground text-sm">
          You need an approved investment to view your certificate.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
            Investment
          </p>
          <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">
            Certificate
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={handlePrint}
          className="border-primary/50 text-primary hover:bg-primary/10 text-xs tracking-wider uppercase"
          data-ocid="certificate.button"
        >
          Print / Download
        </Button>
      </div>

      <div
        className="relative rounded-2xl p-8 sm:p-12 card-glow"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.04 260) 0%, oklch(0.1 0.03 250) 50%, oklch(0.13 0.035 255) 100%)",
          border: "2px solid oklch(0.72 0.12 75 / 0.6)",
          boxShadow:
            "0 0 40px oklch(0.72 0.12 75 / 0.2), inset 0 0 60px oklch(0 0 0 / 0.3)",
        }}
      >
        <CornerDecor pos="top-left" />
        <CornerDecor pos="top-right" />
        <CornerDecor pos="bottom-left" />
        <CornerDecor pos="bottom-right" />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <svg
              width="48"
              height="56"
              viewBox="0 0 32 32"
              fill="none"
              role="img"
              aria-label="Diamond"
            >
              <polygon
                points="16,2 28,12 16,30 4,12"
                fill="none"
                stroke="oklch(0.72 0.12 75)"
                strokeWidth="1.5"
              />
              <polygon
                points="16,2 28,12 16,16 4,12"
                fill="oklch(0.72 0.12 75 / 0.2)"
                stroke="oklch(0.72 0.12 75)"
                strokeWidth="1"
              />
              <line
                x1="4"
                y1="12"
                x2="28"
                y2="12"
                stroke="oklch(0.72 0.12 75)"
                strokeWidth="1"
              />
              <line
                x1="16"
                y1="2"
                x2="16"
                y2="30"
                stroke="oklch(0.72 0.12 75 / 0.5)"
                strokeWidth="0.75"
              />
            </svg>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
            Certificate of Investment
          </p>
          <h2 className="text-2xl font-bold tracking-[0.15em] uppercase gold-text">
            Divay Multi Services
          </h2>
        </div>

        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
            This certifies that
          </p>
          <p className="text-3xl font-bold tracking-[0.1em] uppercase">
            {userProfile.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {userProfile.email}
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
            has successfully invested in
          </p>
          <p className="text-2xl font-bold gold-text tracking-wider uppercase">
            {pkg.name}
          </p>
          <p className="text-3xl font-bold mt-2">
            {formatINR(investment.amount)}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <CertField label="Investment Date" value={investment.date} />
          <CertField label="Certificate ID" value={investment.certificateId} />
          <CertField
            label="Monthly ROI"
            value={`${formatINR(investment.amount * 0.05)}/mo`}
          />
          <CertField label="Referral Code" value={userProfile.referralCode} />
        </div>

        <div className="text-center">
          <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
            Divay Multi Services — Investment Platform
          </p>
        </div>
      </div>
    </div>
  );
}

function CertField({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="text-center p-3 rounded-lg"
      style={{
        background: "oklch(0.72 0.12 75 / 0.05)",
        border: "1px solid oklch(0.72 0.12 75 / 0.2)",
      }}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-xs font-semibold gold-text">{value}</p>
    </div>
  );
}

function CornerDecor({
  pos,
}: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const classes: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4 rotate-90",
    "bottom-left": "bottom-4 left-4 -rotate-90",
    "bottom-right": "bottom-4 right-4 rotate-180",
  };
  return (
    <div className={`absolute ${classes[pos]}`} aria-hidden="true">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 2 L10 2 L2 10"
          stroke="oklch(0.72 0.12 75 / 0.5)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}
