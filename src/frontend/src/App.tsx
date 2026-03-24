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

type Page = "dashboard" | "network" | "investments" | "admin" | "certificate";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const handleLogin = (name: string, admin: boolean) => {
    setUserName(name);
    setIsAdmin(admin);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setIsAdmin(false);
    setCurrentPage("dashboard");
  };

  if (!isLoggedIn) {
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
        return <Dashboard userName={userName} onNavigate={setCurrentPage} />;
      case "network":
        return <Network />;
      case "investments":
        return <Investments onNavigate={setCurrentPage} />;
      case "admin":
        return isAdmin ? (
          <AdminPanel />
        ) : (
          <Dashboard userName={userName} onNavigate={setCurrentPage} />
        );
      case "certificate":
        return <Certificate />;
      default:
        return <Dashboard userName={userName} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userName={userName}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
