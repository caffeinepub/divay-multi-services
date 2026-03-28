import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { MOCK_CURRENT_USER } from "../mockData";
import type { User } from "../types";

interface AuthPageProps {
  onLogin: (profile: User, isAdmin: boolean) => void;
}

const ADMIN_EMAILS = ["admin@divay.com", "admin@aura.com"];

const MOCK_ADMIN_USER: User = {
  id: "admin-001",
  name: "Admin",
  email: "admin@divay.com",
  phone: "+91 00000 00000",
  referralCode: "ADMIN001",
  package: "none",
  joinDate: "2024-01-01",
  status: "active",
  directReferrals: 0,
  teamSize: 0,
  roiBalance: 0,
  commissionBalance: 0,
  totalWithdrawn: 0,
};

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      role="img"
      aria-label="Hide password"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      role="img"
      aria-label="Show password"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [uplineCode, setUplineCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (mode === "login") {
        if (!password) {
          toast.error("Please enter your password");
          setLoading(false);
          return;
        }
        if (ADMIN_EMAILS.includes(email.toLowerCase())) {
          onLogin({ ...MOCK_ADMIN_USER, email }, true);
        } else {
          onLogin(
            { ...MOCK_CURRENT_USER, email: email || MOCK_CURRENT_USER.email },
            false,
          );
        }
      } else {
        if (!name || !email || !phone || !password) {
          toast.error("Please fill all required fields");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters");
          setLoading(false);
          return;
        }
        toast.success("Registration successful! Please log in.");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      }
      setLoading(false);
    }, 500);
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
              data-ocid="auth.tab"
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
              data-ocid="auth.tab"
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
                  data-ocid="auth.input"
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
                data-ocid="auth.input"
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
                  data-ocid="auth.input"
                />
              </div>
            )}
            <div>
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-input border-border pr-10"
                  data-ocid="auth.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>
            {mode === "register" && (
              <div>
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Confirm Password *
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="bg-input border-border pr-10"
                    data-ocid="auth.input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                </div>
              </div>
            )}
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
                  data-ocid="auth.input"
                />
              </div>
            )}
            {mode === "register" && (
              <div>
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Upline Code (Optional)
                </Label>
                <Input
                  value={uplineCode}
                  onChange={(e) => setUplineCode(e.target.value)}
                  placeholder="Sponsor's referral code"
                  className="mt-1 bg-input border-border"
                  data-ocid="auth.input"
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary text-primary-foreground tracking-widest uppercase text-sm font-semibold hover:opacity-90 gold-glow"
              data-ocid="auth.submit_button"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
