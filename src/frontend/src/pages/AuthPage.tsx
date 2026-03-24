import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface AuthPageProps {
  onLogin: (name: string, isAdmin: boolean) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (mode === "login") {
      setLoading(false);
      if (email === "admin@divay.com") {
        onLogin("Admin User", true);
      } else {
        onLogin(name || "Rajesh Kumar", false);
      }
    } else {
      if (!name || !email || !phone) {
        toast.error("Please fill all required fields");
        setLoading(false);
        return;
      }
      toast.success("Registration successful! Please log in.");
      setMode("login");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.08 0.025 250) 0%, oklch(0.12 0.035 255) 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 32 32"
              fill="none"
              role="img"
              aria-label="Divay Multi Services logo"
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
          <h1 className="text-2xl font-bold tracking-[0.15em] uppercase gold-text">
            Divay Multi Services
          </h1>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
            Investment Platform
          </p>
        </div>

        <div className="diamond-bg gold-border rounded-xl p-8 card-glow">
          <div className="flex gap-1 mb-6 p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm tracking-wider uppercase rounded-md transition-all ${
                mode === "login"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm tracking-wider uppercase rounded-md transition-all ${
                mode === "register"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Full Name *
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rajesh Kumar"
                  className="mt-1 bg-input border-border"
                />
              </div>
            )}
            <div>
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Email Address *
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 bg-input border-border"
              />
            </div>
            {mode === "register" && (
              <div>
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Phone Number *
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 bg-input border-border"
                />
              </div>
            )}
            <div>
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Password *
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 bg-input border-border"
              />
            </div>
            {mode === "register" && (
              <div>
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Referral Code (Optional)
                </Label>
                <Input
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="e.g. RK2024001"
                  className="mt-1 bg-input border-border"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary text-primary-foreground tracking-widest uppercase text-sm font-semibold hover:opacity-90 gold-glow"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          {mode === "login" && (
            <div className="mt-5 p-3 rounded-lg border border-border bg-muted/40 text-xs text-muted-foreground space-y-1">
              <p
                className="font-semibold tracking-wider uppercase text-xs"
                style={{ color: "oklch(0.72 0.12 75)" }}
              >
                Demo Credentials
              </p>
              <p>
                <span className="font-medium text-foreground">Admin ID:</span>{" "}
                admin@divay.com
              </p>
              <p>
                <span className="font-medium text-foreground">Password:</span>{" "}
                admin123
              </p>
              <p className="mt-1 text-muted-foreground">
                Investor: Use any email to login
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
