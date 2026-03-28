import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { User } from "../types";

interface ProfileProps {
  userProfile: User;
  onProfileUpdate: (updated: User) => void;
}

export function Profile({ userProfile, onProfileUpdate }: ProfileProps) {
  const [name, setName] = useState(userProfile.name);
  const [nameLoading, setNameLoading] = useState(false);

  const [email, setEmail] = useState(userProfile.email);
  const [emailLoading, setEmailLoading] = useState(false);

  const [mobile, setMobile] = useState(userProfile.phone);
  const [mobileLoading, setMobileLoading] = useState(false);

  const [bank, setBank] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [bankLoading, setBankLoading] = useState(false);

  const handleSaveName = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setNameLoading(true);
    setTimeout(() => {
      onProfileUpdate({ ...userProfile, name: name.trim() });
      toast.success("Name updated successfully");
      setNameLoading(false);
    }, 500);
  };

  const handleSaveEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setEmailLoading(true);
    setTimeout(() => {
      onProfileUpdate({ ...userProfile, email: email.trim() });
      toast.success("Email updated successfully");
      setEmailLoading(false);
    }, 500);
  };

  const handleSaveMobile = () => {
    const mobileRegex = /^[6-9]\d{9}$/;
    const cleanMobile = mobile.replace(/[\s+]/g, "");
    if (!cleanMobile) {
      toast.error("Mobile number cannot be empty");
      return;
    }
    if (!mobileRegex.test(cleanMobile)) {
      toast.error(
        "Enter a valid 10-digit Indian mobile number (starts with 6–9)",
      );
      return;
    }
    setMobileLoading(true);
    setTimeout(() => {
      onProfileUpdate({ ...userProfile, phone: cleanMobile });
      toast.success("Mobile number updated successfully");
      setMobileLoading(false);
    }, 500);
  };

  const handleSaveBank = () => {
    if (!bank.bankName.trim()) {
      toast.error("Bank name is required");
      return;
    }
    if (!bank.accountNumber.trim()) {
      toast.error("Account number is required");
      return;
    }
    if (!bank.ifscCode.trim()) {
      toast.error("IFSC code is required");
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bank.ifscCode.toUpperCase())) {
      toast.error("Enter a valid IFSC code (e.g., HDFC0001234)");
      return;
    }
    setBankLoading(true);
    setTimeout(() => {
      toast.success("Bank account updated successfully");
      setBankLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
          Account
        </p>
        <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">
          Profile Management
        </h1>
      </div>

      <Card className="diamond-bg gold-border card-glow">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2">
            <UserIcon size={14} />
            Name Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs tracking-wider uppercase text-muted-foreground">
              Full Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="mt-1 bg-input border-border"
              data-ocid="profile.input"
            />
          </div>
          <Button
            onClick={handleSaveName}
            disabled={nameLoading}
            className="bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
            data-ocid="profile.save_button"
          >
            {nameLoading ? (
              "Saving..."
            ) : (
              <>
                <CheckCircle2 size={14} className="mr-1" /> Save Name
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="diamond-bg gold-border card-glow">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2">
            <Mail size={14} />
            Email Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs tracking-wider uppercase text-muted-foreground">
              Email Address
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 bg-input border-border"
              data-ocid="profile.input"
            />
          </div>
          <Button
            onClick={handleSaveEmail}
            disabled={emailLoading}
            className="bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
            data-ocid="profile.save_button"
          >
            {emailLoading ? (
              "Saving..."
            ) : (
              <>
                <CheckCircle2 size={14} className="mr-1" /> Save Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="diamond-bg gold-border card-glow">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2">
            <Phone size={14} />
            Mobile Number Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs tracking-wider uppercase text-muted-foreground">
              Mobile Number
            </Label>
            <Input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="9876543210"
              className="mt-1 bg-input border-border"
              data-ocid="profile.input"
            />
          </div>
          <Button
            onClick={handleSaveMobile}
            disabled={mobileLoading}
            className="bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
            data-ocid="profile.save_button"
          >
            {mobileLoading ? (
              "Saving..."
            ) : (
              <>
                <CheckCircle2 size={14} className="mr-1" /> Save Mobile
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="diamond-bg gold-border card-glow">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2">
            <Building2 size={14} />
            Bank Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs tracking-wider uppercase text-muted-foreground">
              Bank Name
            </Label>
            <Input
              value={bank.bankName}
              onChange={(e) =>
                setBank((b) => ({ ...b, bankName: e.target.value }))
              }
              placeholder="State Bank of India"
              className="mt-1 bg-input border-border"
              data-ocid="profile.input"
            />
          </div>
          <div>
            <Label className="text-xs tracking-wider uppercase text-muted-foreground">
              Account Number
            </Label>
            <Input
              value={bank.accountNumber}
              onChange={(e) =>
                setBank((b) => ({ ...b, accountNumber: e.target.value }))
              }
              placeholder="Enter account number"
              className="mt-1 bg-input border-border"
              data-ocid="profile.input"
            />
          </div>
          <div>
            <Label className="text-xs tracking-wider uppercase text-muted-foreground">
              IFSC Code
            </Label>
            <Input
              value={bank.ifscCode}
              onChange={(e) =>
                setBank((b) => ({
                  ...b,
                  ifscCode: e.target.value.toUpperCase(),
                }))
              }
              placeholder="HDFC0001234"
              className="mt-1 bg-input border-border"
              data-ocid="profile.input"
            />
          </div>
          <Button
            onClick={handleSaveBank}
            disabled={bankLoading}
            className="bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
            data-ocid="profile.save_button"
          >
            {bankLoading ? (
              "Saving..."
            ) : (
              <>
                <CheckCircle2 size={14} className="mr-1" /> Save Bank Details
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
