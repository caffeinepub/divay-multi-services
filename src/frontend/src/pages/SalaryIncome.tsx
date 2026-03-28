import { formatINR } from "../types";

const SALARY_LEVELS = [
  {
    level: 1,
    businessVolume: 1000000,
    label: "10 Lakh",
    monthlySalary: 10000,
    totalPayout: 100000,
  },
  {
    level: 2,
    businessVolume: 2500000,
    label: "25 Lakh",
    monthlySalary: 25000,
    totalPayout: 250000,
  },
  {
    level: 3,
    businessVolume: 5000000,
    label: "50 Lakh",
    monthlySalary: 50000,
    totalPayout: 500000,
  },
  {
    level: 4,
    businessVolume: 10000000,
    label: "1 Crore",
    monthlySalary: 100000,
    totalPayout: 1000000,
  },
  {
    level: 5,
    businessVolume: 20000000,
    label: "2 Crore",
    monthlySalary: 200000,
    totalPayout: 2000000,
  },
  {
    level: 6,
    businessVolume: 50000000,
    label: "5 Crore",
    monthlySalary: 500000,
    totalPayout: 5000000,
  },
  {
    level: 7,
    businessVolume: 100000000,
    label: "10 Crore",
    monthlySalary: 1000000,
    totalPayout: 10000000,
  },
];

const RANK_NAMES = [
  "Diamond Star",
  "Double Diamond",
  "Triple Diamond",
  "Crown Diamond",
  "Crown Ambassador",
  "Royal Crown",
  "Royal Platinum",
];

const MOCK_SALARY_DATA = {
  powerSideTotal: 320000,
  otherSideTotal: 280000,
  salaryMonthsCompleted: 3,
  totalSalaryEarned: 6000,
};

export function SalaryIncome() {
  const matchingVolume = Math.min(
    MOCK_SALARY_DATA.powerSideTotal,
    MOCK_SALARY_DATA.otherSideTotal,
  );
  const currentLevel = [...SALARY_LEVELS]
    .reverse()
    .find((l) => matchingVolume >= l.businessVolume);
  const nextLevel = SALARY_LEVELS.find(
    (l) => matchingVolume < l.businessVolume,
  );
  const progressPercent = nextLevel
    ? Math.min((matchingVolume / nextLevel.businessVolume) * 100, 100)
    : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
          Binary Income
        </p>
        <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">
          Salary Income Structure
        </h1>
      </div>

      {/* Salary Calculation Basis */}
      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-4">
          Salary Calculation Basis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-xl p-5 flex items-center gap-4"
            style={{
              background: "oklch(0.55 0.18 280 / 0.1)",
              border: "1px solid oklch(0.55 0.18 280 / 0.35)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
              style={{
                background: "oklch(0.55 0.18 280 / 0.2)",
                border: "1px solid oklch(0.55 0.18 280 / 0.5)",
              }}
            >
              💎
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Per ₹2 Lakh Matched
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: "oklch(0.7 0.18 280)" }}
              >
                ₹2,000
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                for 10 months = ₹20,000 total
              </p>
            </div>
          </div>
          <div
            className="rounded-xl p-5 flex items-center gap-4"
            style={{
              background: "oklch(0.72 0.12 75 / 0.1)",
              border: "1px solid oklch(0.72 0.12 75 / 0.35)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
              style={{
                background: "oklch(0.72 0.12 75 / 0.2)",
                border: "1px solid oklch(0.72 0.12 75 / 0.5)",
              }}
            >
              👑
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Per ₹5 Lakh Matched
              </p>
              <p className="text-2xl font-bold gold-text">
                ₹5,000
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                for 10 months = ₹50,000 total
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
          Salary is calculated by dividing the matched (weaker) side business
          volume by ₹2 lakh units and multiplying by ₹2,000. For example: ₹10
          lakh matched ÷ ₹2 lakh × ₹2,000 = ₹10,000/month.
        </p>
      </div>

      {/* How It Works */}
      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-4">
          How Binary Salary Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-muted/40 rounded-lg p-4 space-y-2">
            <div className="text-2xl">⚡</div>
            <p className="text-xs uppercase tracking-wider font-semibold gold-text">
              Step 1 – Build Two Teams
            </p>
            <p className="text-xs text-muted-foreground">
              Recruit business on both your Power Side and Other Side.
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-4 space-y-2">
            <div className="text-2xl">⚖️</div>
            <p className="text-xs uppercase tracking-wider font-semibold gold-text">
              Step 2 – Match Both Sides
            </p>
            <p className="text-xs text-muted-foreground">
              Salary is calculated based on the weaker (matching) side business
              volume.
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-4 space-y-2">
            <div className="text-2xl">💰</div>
            <p className="text-xs uppercase tracking-wider font-semibold gold-text">
              Step 3 – Earn Salary
            </p>
            <p className="text-xs text-muted-foreground">
              Receive monthly salary for 10 months once your matching volume
              reaches a level.
            </p>
          </div>
        </div>
      </div>

      {/* Team Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="rounded-xl p-6 card-glow"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.06 280), oklch(0.1 0.04 270))",
            border: "1px solid oklch(0.55 0.18 280 / 0.4)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{
                background: "oklch(0.55 0.18 280 / 0.2)",
                border: "1px solid oklch(0.55 0.18 280 / 0.5)",
              }}
            >
              ⚡
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Team A
              </p>
              <p
                className="text-sm font-bold tracking-wider uppercase"
                style={{ color: "oklch(0.7 0.18 280)" }}
              >
                Power Side
              </p>
            </div>
          </div>
          <p
            className="text-3xl font-bold"
            style={{ color: "oklch(0.7 0.18 280)" }}
          >
            {formatINR(MOCK_SALARY_DATA.powerSideTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Total business volume
          </p>
        </div>

        <div
          className="rounded-xl p-6 card-glow"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.06 160), oklch(0.1 0.04 150))",
            border: "1px solid oklch(0.55 0.18 160 / 0.4)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{
                background: "oklch(0.55 0.18 160 / 0.2)",
                border: "1px solid oklch(0.55 0.18 160 / 0.5)",
              }}
            >
              🌿
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Team B
              </p>
              <p
                className="text-sm font-bold tracking-wider uppercase"
                style={{ color: "oklch(0.65 0.18 160)" }}
              >
                Other Side
              </p>
            </div>
          </div>
          <p
            className="text-3xl font-bold"
            style={{ color: "oklch(0.65 0.18 160)" }}
          >
            {formatINR(MOCK_SALARY_DATA.otherSideTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Total business volume
          </p>
        </div>
      </div>

      {/* Matching Volume & Progress */}
      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Matching (Weaker) Side
            </p>
            <p className="text-2xl font-bold gold-text">
              {formatINR(matchingVolume)}
            </p>
          </div>
          {currentLevel && (
            <div
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{
                background: "oklch(0.72 0.12 75 / 0.15)",
                border: "1px solid oklch(0.72 0.12 75 / 0.5)",
                color: "oklch(0.72 0.12 75)",
              }}
            >
              {RANK_NAMES[currentLevel.level - 1]} ◆ Active
            </div>
          )}
        </div>

        {nextLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress to next level</span>
              <span>
                {nextLevel.label} ({Math.round(progressPercent)}%)
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progressPercent}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.12 75), oklch(0.8 0.15 60))",
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Need {formatINR(nextLevel.businessVolume - matchingVolume)} more
              on weaker side to unlock{" "}
              <span className="gold-text font-semibold">
                {formatINR(nextLevel.monthlySalary)}/month
              </span>{" "}
              salary
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Current Salary
            </p>
            <p className="text-lg font-bold gold-text">
              {currentLevel ? formatINR(currentLevel.monthlySalary) : "—"}
            </p>
            <p className="text-[10px] text-muted-foreground">/month</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Months Paid
            </p>
            <p className="text-lg font-bold text-foreground">
              {MOCK_SALARY_DATA.salaryMonthsCompleted}/10
            </p>
            <p className="text-[10px] text-muted-foreground">months</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Total Earned
            </p>
            <p
              className="text-lg font-bold"
              style={{ color: "oklch(0.65 0.18 160)" }}
            >
              {formatINR(MOCK_SALARY_DATA.totalSalaryEarned)}
            </p>
            <p className="text-[10px] text-muted-foreground">salary income</p>
          </div>
        </div>
      </div>

      {/* Full Salary Table */}
      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-6">
          Salary Income Table — Both Sides Required
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Rank
                </th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Power Side
                </th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Other Side
                </th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Monthly Salary
                </th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Duration
                </th>
                <th className="text-right py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Total Payout
                </th>
              </tr>
            </thead>
            <tbody>
              {SALARY_LEVELS.map((sl, i) => {
                const isActive = currentLevel?.level === sl.level;
                const isUnlocked = matchingVolume >= sl.businessVolume;
                return (
                  <tr
                    key={sl.level}
                    className={`border-b border-border/50 transition-colors ${isActive ? "bg-primary/5" : isUnlocked ? "opacity-70" : ""}`}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {isUnlocked ? "✅" : "🔒"}
                        </span>
                        <div>
                          <p
                            className="text-xs font-semibold tracking-wider"
                            style={{
                              color: isActive
                                ? "oklch(0.72 0.12 75)"
                                : undefined,
                            }}
                          >
                            {RANK_NAMES[i]}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Level {sl.level}
                          </p>
                        </div>
                        {isActive && (
                          <span
                            className="ml-1 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold"
                            style={{
                              background: "oklch(0.72 0.12 75 / 0.15)",
                              color: "oklch(0.72 0.12 75)",
                              border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                            }}
                          >
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-xs font-medium">{sl.label}</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-xs font-medium">{sl.label}</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-sm font-bold gold-text">
                        {formatINR(sl.monthlySalary)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-xs text-muted-foreground">
                        10 Months
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.65 0.18 160)" }}
                      >
                        {formatINR(sl.totalPayout)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Salary is earned when both Power Side and Other Side each reach the
          required business volume. Calculated as: matched volume ÷ ₹2 lakh ×
          ₹2,000 per month for 10 months.
        </p>
      </div>

      {/* Binary Tree Visualization */}
      <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
        <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-6">
          Your Binary Team Structure
        </h2>
        <div className="flex flex-col items-center gap-4">
          <div
            className="px-6 py-3 rounded-xl text-center"
            style={{
              background: "oklch(0.72 0.12 75 / 0.12)",
              border: "1px solid oklch(0.72 0.12 75 / 0.5)",
            }}
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              You
            </p>
            <p className="text-sm font-bold gold-text">Rajesh Kumar</p>
          </div>

          <div className="flex items-start gap-16 relative">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-px h-4"
              style={{ background: "oklch(0.72 0.12 75 / 0.4)" }}
            />
            <div
              className="absolute top-0 left-1/4 right-1/4 h-px"
              style={{ background: "oklch(0.72 0.12 75 / 0.3)" }}
            />

            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ background: "oklch(0.55 0.18 280)" }}
              />
              <div
                className="px-5 py-3 rounded-xl text-center min-w-[120px]"
                style={{
                  background: "oklch(0.55 0.18 280 / 0.12)",
                  border: "1px solid oklch(0.55 0.18 280 / 0.4)",
                }}
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Team A
                </p>
                <p
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.7 0.18 280)" }}
                >
                  Power Side
                </p>
                <p
                  className="text-sm font-bold mt-1"
                  style={{ color: "oklch(0.7 0.18 280)" }}
                >
                  {formatINR(MOCK_SALARY_DATA.powerSideTotal)}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ background: "oklch(0.55 0.18 160)" }}
              />
              <div
                className="px-5 py-3 rounded-xl text-center min-w-[120px]"
                style={{
                  background: "oklch(0.55 0.18 160 / 0.12)",
                  border: "1px solid oklch(0.55 0.18 160 / 0.4)",
                }}
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Team B
                </p>
                <p
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.65 0.18 160)" }}
                >
                  Other Side
                </p>
                <p
                  className="text-sm font-bold mt-1"
                  style={{ color: "oklch(0.65 0.18 160)" }}
                >
                  {formatINR(MOCK_SALARY_DATA.otherSideTotal)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Matching volume:{" "}
              <span className="gold-text font-semibold">
                {formatINR(matchingVolume)}
              </span>{" "}
              (weaker side)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
