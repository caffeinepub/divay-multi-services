import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { AdminPanel } from "./pages/AdminPanel";
import { AuthPage } from "./pages/AuthPage";
import { Certificate } from "./pages/Certificate";
import { Dashboard } from "./pages/Dashboard";
import { Footer } from "./pages/Footer";
import { Investments } from "./pages/Investments";
import { Network } from "./pages/Network";
import { Profile } from "./pages/Profile";
import { SalaryIncome } from "./pages/SalaryIncome";
import type { User } from "./types";

type Page =
  | "dashboard"
  | "network"
  | "investments"
  | "admin"
  | "certificate"
  | "salary"
  | "profile";

export default function App() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const handleLogin = (profile: User, admin: boolean) => {
    setUserProfile(profile);
    setIsAdmin(admin);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserProfile(null);
    setIsAdmin(false);
    setCurrentPage("dashboard");
  };

  if (!userProfile) {
    return (
      <>
        <AuthPage onLogin={handleLogin} />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard userProfile={userProfile} onNavigate={setCurrentPage} />
        );
      case "network":
        return <Network userProfile={userProfile} />;
      case "investments":
        return (
          <Investments userProfile={userProfile} onNavigate={setCurrentPage} />
        );
      case "salary":
        return <SalaryIncome />;
      case "admin":
        return isAdmin ? (
          <AdminPanel />
        ) : (
          <Dashboard userProfile={userProfile} onNavigate={setCurrentPage} />
        );
      case "certificate":
        return <Certificate userProfile={userProfile} />;
      case "profile":
        return (
          <Profile userProfile={userProfile} onProfileUpdate={setUserProfile} />
        );
      default:
        return (
          <Dashboard userProfile={userProfile} onNavigate={setCurrentPage} />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userName={userProfile.name}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
