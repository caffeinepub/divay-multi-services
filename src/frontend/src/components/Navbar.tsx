import { Button } from "@/components/ui/button";
import { useState } from "react";

type Page = "dashboard" | "network" | "investments" | "admin" | "certificate";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userName: string;
  isAdmin: boolean;
  onLogout: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  userName,
  isAdmin,
  onLogout,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { id: Page; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "network", label: "Network" },
    { id: "investments", label: "Investments" },
    ...(isAdmin ? [{ id: "admin" as Page, label: "Admin" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-sidebar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-3 group"
        >
          <DiamondLogo />
          <div className="text-left">
            <div className="text-xs tracking-[0.2em] uppercase gold-text font-semibold leading-none">
              Divay Multi Services
            </div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground leading-none mt-0.5">
              Investments
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link pb-1 ${
                currentPage === item.id ? "active" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-muted-foreground">
            {userName}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="text-xs tracking-wider uppercase border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full"
          >
            Log Out
          </Button>
          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              role="img"
              aria-label="Menu"
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-sidebar px-4 pb-3">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMenuOpen(false);
              }}
              className={`block w-full text-left py-2 nav-link ${
                currentPage === item.id ? "active" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function DiamondLogo() {
  return (
    <svg
      width="32"
      height="32"
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
        fill="oklch(0.72 0.12 75 / 0.15)"
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
  );
}
