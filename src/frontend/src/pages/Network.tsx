import { useState } from "react";
import { toast } from "sonner";
import { MOCK_DOWNLINE } from "../mockData";
import type { DownlineMember, User } from "../types";
import { PACKAGES } from "../types";

interface NetworkProps {
  userProfile: User;
}

export function Network({ userProfile }: NetworkProps) {
  const [downline] = useState(MOCK_DOWNLINE);

  const referralLink = `https://divay.icp.app/register?ref=${userProfile.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const level1 = downline.filter((m) => m.level === 1);
  const level2 = downline.filter((m) => m.level === 2);

  const tierColor = (pkg: string) => {
    if (pkg === "white") return "oklch(0.9 0.02 250)";
    if (pkg === "blue") return "oklch(0.6 0.15 240)";
    if (pkg === "black") return "oklch(0.72 0.12 75)";
    return "oklch(0.5 0 0)";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
          Your Diamond
        </p>
        <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">
          Network
        </h1>
      </div>

      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
          Your Referral Link
        </h2>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-0 bg-muted/50 rounded-lg px-4 py-2.5 font-mono text-xs text-muted-foreground truncate">
            {referralLink}
          </div>
          <button
            type="button"
            onClick={copyLink}
            className="px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all"
            style={{
              background: "oklch(0.72 0.12 75 / 0.15)",
              border: "1px solid oklch(0.72 0.12 75 / 0.5)",
              color: "oklch(0.72 0.12 75)",
            }}
            data-ocid="network.button"
          >
            Copy Link
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your referral code:{" "}
          <span className="gold-text font-semibold">
            {userProfile.referralCode}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox
          label="Direct Referrals"
          value={userProfile.directReferrals.toString()}
        />
        <StatBox label="Total Team" value={userProfile.teamSize.toString()} />
        <StatBox
          label="Network Levels"
          value={
            downline.length > 0
              ? String(Math.max(...downline.map((d) => d.level)))
              : "0"
          }
        />
        <StatBox label="Total Members" value={downline.length.toString()} />
      </div>

      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-sm tracking-[0.2em] uppercase font-semibold">
            Downline Tree
          </h2>
          <span className="text-xs text-muted-foreground">
            {downline.length} members in your network
          </span>
        </div>

        {downline.length === 0 ? (
          <div className="text-center py-8" data-ocid="network.empty_state">
            <p className="text-4xl mb-3">◆</p>
            <p className="text-sm text-muted-foreground">
              No members in your network yet.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Share your referral link to grow your team!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {level1.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Level 1 — Direct Referrals ({level1.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {level1.map((member, idx) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      tierColor={tierColor(member.package)}
                      idx={idx + 1}
                    />
                  ))}
                </div>
              </div>
            )}
            {level2.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Level 2 ({level2.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {level2.map((member, idx) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      tierColor={tierColor(member.package)}
                      idx={idx + 1}
                    />
                  ))}
                </div>
              </div>
            )}
            {downline.filter((m) => m.level > 2).length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Deeper Levels ({downline.filter((m) => m.level > 2).length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {downline
                    .filter((m) => m.level > 2)
                    .map((member, idx) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        tierColor={tierColor(member.package)}
                        idx={idx + 1}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MemberCard({
  member,
  tierColor,
  idx,
}: { member: DownlineMember; tierColor: string; idx: number }) {
  const pkgName =
    PACKAGES.find((p) => p.tier === member.package)?.name ?? member.package;
  return (
    <div
      className="bg-muted/30 rounded-lg p-4 border border-border"
      data-ocid={`network.item.${idx}`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: `${tierColor}20`,
            color: tierColor,
            border: `1px solid ${tierColor}40`,
          }}
        >
          {member.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{member.name}</p>
          <p className="text-xs text-muted-foreground">
            Level {member.level} • {pkgName}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="diamond-bg gold-border rounded-xl p-4 text-center card-glow">
      <p className="text-2xl font-bold gold-text">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}
