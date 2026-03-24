import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MOCK_CURRENT_USER, MOCK_INVESTMENTS } from "../mockData";
import { PACKAGES, formatINR } from "../types";

export function Certificate() {
  const user = MOCK_CURRENT_USER;
  const investment = MOCK_INVESTMENTS.find(
    (i) => i.userId === user.id && i.status === "active",
  );
  const pkg = investment
    ? PACKAGES.find((p) => p.tier === investment.tier)
    : null;

  const handlePrint = () => {
    window.print();
    toast.success("Certificate sent to printer!");
  };

  if (!investment || !pkg) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
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
                fill="oklch(0.72 0.12 75 / 0.25)"
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
            </svg>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Divay Multi Services
          </p>
          <h2 className="text-xl font-bold tracking-[0.15em] uppercase gold-text mt-1">
            Certificate of Investment
          </h2>
          <div
            className="h-px max-w-xs mx-auto mt-3"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.72 0.12 75), transparent)",
            }}
          />
        </div>

        <div className="text-center space-y-4 mb-8">
          <p className="text-sm text-muted-foreground tracking-wide">
            This is to certify that
          </p>
          <p className="text-3xl font-bold tracking-[0.05em] gold-text">
            {user.name}
          </p>
          <p className="text-sm text-muted-foreground">
            has successfully invested in the
          </p>
          <p className="text-2xl font-bold tracking-widest uppercase">
            {pkg.name} Package
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-6">
            <CertDetail
              label="Investment"
              value={formatINR(investment.amount)}
            />
            <CertDetail label="Monthly ROI" value={formatINR(pkg.monthlyROI)} />
            <CertDetail label="ROI Rate" value="5% p.m." />
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Certificate ID
            </p>
            <p className="text-xs font-mono gold-text">
              {investment.certificateId}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Issue Date
            </p>
            <p className="text-xs font-semibold">{investment.date}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Member ID
            </p>
            <p className="text-xs font-mono">{user.referralCode}</p>
          </div>
        </div>

        <div
          className="absolute bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.72 0.12 75 / 0.1)",
            border: "2px solid oklch(0.72 0.12 75 / 0.5)",
          }}
        >
          <div className="text-center">
            <p className="text-[7px] uppercase tracking-wider gold-text font-bold leading-tight">
              Aura
            </p>
            <p className="text-[7px] uppercase tracking-wider gold-text font-bold leading-tight">
              Diamond
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-sm font-bold gold-text">{value}</p>
    </div>
  );
}

function CornerDecor({ pos }: { pos: string }) {
  const posClass: Record<string, string> = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3 rotate-90",
    "bottom-left": "bottom-3 left-3 -rotate-90",
    "bottom-right": "bottom-3 right-3 rotate-180",
  };
  return (
    <div className={`absolute ${posClass[pos]} w-6 h-6`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="oklch(0.72 0.12 75)"
        strokeWidth="1.5"
        role="img"
        aria-hidden="true"
      >
        <path d="M2 22 L2 2 L22 2" />
      </svg>
    </div>
  );
}
