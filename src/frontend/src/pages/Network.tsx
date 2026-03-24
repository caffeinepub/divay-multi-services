import { toast } from "sonner";
import { MOCK_CURRENT_USER, MOCK_DOWNLINE } from "../mockData";
import { PACKAGES, formatINR } from "../types";
import type { DownlineMember } from "../types";

export function Network() {
  const user = MOCK_CURRENT_USER;
  const referralLink = `https://aura-diamond.icp.app/register?ref=${user.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const level1 = MOCK_DOWNLINE.filter((m) => m.level === 1);
  const level2 = MOCK_DOWNLINE.filter((m) => m.level === 2);

  const tierColor = (pkg: string) => {
    if (pkg === "white") return "oklch(0.9 0.02 250)";
    if (pkg === "blue") return "oklch(0.6 0.15 240)";
    if (pkg === "black") return "oklch(0.72 0.12 75)";
    return "oklch(0.5 0 0)";
  };

  const tierLabel = (pkg: string) => {
    const p = PACKAGES.find((x) => x.tier === pkg);
    return p ? p.name : "No Package";
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
          >
            Copy Link
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your referral code:{" "}
          <span className="gold-text font-semibold">{user.referralCode}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox
          label="Direct Referrals"
          value={user.directReferrals.toString()}
        />
        <StatBox label="Total Team" value={user.teamSize.toString()} />
        <StatBox label="Active Investors" value="8" />
        <StatBox label="Team Volume" value={formatINR(750000)} />
      </div>

      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-sm tracking-[0.2em] uppercase font-semibold">
            Downline Team Tree
          </h2>
          <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-wider">
            <LegendItem color="oklch(0.72 0.12 75)" label="Black Diamond" />
            <LegendItem color="oklch(0.6 0.15 240)" label="Blue Diamond" />
            <LegendItem color="oklch(0.9 0.02 250)" label="White Diamond" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-primary-foreground gold-glow"
                style={{
                  background: "oklch(0.72 0.12 75)",
                  border: "2px solid oklch(0.72 0.12 75)",
                }}
              >
                {user.name.charAt(0)}
              </div>
              <div className="text-xs mt-1 font-semibold text-foreground">
                {user.name}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {tierLabel(user.package)}
              </div>
            </div>

            <div className="h-6 w-px bg-border" />

            {level1.length > 0 && (
              <>
                <div className="flex gap-8 justify-center">
                  {level1.map((member) => (
                    <TreeNode
                      key={member.id}
                      member={member}
                      color={tierColor(member.package)}
                    />
                  ))}
                </div>
                <div className="h-6 w-px bg-border" />
                {level2.length > 0 && (
                  <div className="flex gap-6 justify-center flex-wrap">
                    {level2.map((member) => (
                      <TreeNode
                        key={member.id}
                        member={member}
                        color={tierColor(member.package)}
                        small
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Downline Members
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Level", "Package", "Joined", "Team Size"].map(
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
              {MOCK_DOWNLINE.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-3 text-sm font-medium">{m.name}</td>
                  <td className="py-3 px-3">
                    <span className="text-xs bg-muted/50 px-2 py-0.5 rounded uppercase tracking-wider">
                      L{m.level}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: tierColor(m.package) }}
                    >
                      {tierLabel(m.package)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">
                    {m.joinDate}
                  </td>
                  <td className="py-3 px-3 text-sm font-semibold">
                    {m.teamSize}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TreeNode({
  member,
  color,
  small = false,
}: { member: DownlineMember; color: string; small?: boolean }) {
  const pkg = PACKAGES.find((p) => p.tier === member.package);
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${small ? "w-10 h-10 text-sm" : "w-12 h-12 text-base"} rounded-full flex items-center justify-center font-bold`}
        style={{
          background: `${color}25`,
          border: `1.5px solid ${color}`,
          color,
        }}
      >
        {member.name.charAt(0)}
      </div>
      <div
        className={`${small ? "text-[9px]" : "text-[10px]"} font-medium text-foreground text-center max-w-[72px] truncate`}
      >
        {member.name}
      </div>
      <div
        className={`${small ? "text-[8px]" : "text-[9px]"} text-muted-foreground uppercase tracking-wider`}
      >
        {pkg?.name.split(" ")[0] ?? "None"}
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="diamond-bg gold-border rounded-xl p-4 card-glow text-center">
      <p className="text-xl font-bold gold-text">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
