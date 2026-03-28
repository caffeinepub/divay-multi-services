import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import {
  MOCK_ALL_USERS,
  MOCK_INVESTMENTS,
  MOCK_WITHDRAWALS,
} from "../mockData";
import { PACKAGES, formatINR } from "../types";
import type {
  Investment,
  PackageTier,
  User,
  WithdrawalRequest,
} from "../types";

type TabId = "overview" | "investments" | "withdrawals" | "users";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  package: "black" as PackageTier,
  status: "pending" as User["status"],
  referralCode: "",
  uplineCode: "",
};

function generateReferralCode() {
  return `DMS${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

export function AdminPanel() {
  const [investments, setInvestments] =
    useState<Investment[]>(MOCK_INVESTMENTS);
  const [withdrawals, setWithdrawals] =
    useState<WithdrawalRequest[]>(MOCK_WITHDRAWALS);
  const [users, setUsers] = useState<User[]>(MOCK_ALL_USERS);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [creditUserId, setCreditUserId] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [creditDesc, setCreditDesc] = useState("");
  const [creditLoading, setCreditLoading] = useState(false);

  // User management state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState({ ...EMPTY_FORM });

  const pending = investments.filter((i) => i.status === "pending");
  const active = investments.filter((i) => i.status === "active");
  const pendingWd = withdrawals.filter((w) => w.status === "pending");

  const approveInvestment = (id: string) => {
    setInvestments((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "active" as const } : i)),
    );
    toast.success("Investment approved & commissions distributed!");
  };

  const rejectInvestment = (id: string) => {
    setInvestments((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "rejected" as const } : i,
      ),
    );
    toast.error("Investment rejected.");
  };

  const approveWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: "approved" as const } : w,
      ),
    );
    toast.success("Withdrawal approved!");
  };

  const rejectWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: "rejected" as const } : w,
      ),
    );
    toast.error("Withdrawal rejected.");
  };

  const handleCreditROI = () => {
    if (!creditUserId || !creditAmount) {
      toast.error("Fill in user ID and amount");
      return;
    }
    const targetUser = users.find(
      (u) => u.referralCode === creditUserId || u.email === creditUserId,
    );
    if (!targetUser) {
      toast.error("User not found (search by email or referral code)");
      return;
    }
    setCreditLoading(true);
    setTimeout(() => {
      toast.success("ROI credited successfully!");
      setCreditUserId("");
      setCreditAmount("");
      setCreditDesc("");
      setCreditLoading(false);
    }, 600);
  };

  const openAddForm = () => {
    setUserForm({ ...EMPTY_FORM, referralCode: generateReferralCode() });
    setEditingUserId(null);
    setShowAddForm(true);
    setDeleteConfirmId(null);
  };

  const openEditForm = (user: User) => {
    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      package: user.package,
      status: user.status,
      referralCode: user.referralCode,
      uplineCode: user.uplineCode ?? "",
    });
    setEditingUserId(user.id);
    setShowAddForm(false);
    setDeleteConfirmId(null);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingUserId(null);
    setUserForm({ ...EMPTY_FORM });
  };

  const handleCreateUser = () => {
    if (!userForm.name || !userForm.email) {
      toast.error("Name and Email are required.");
      return;
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: userForm.name,
      email: userForm.email,
      phone: userForm.phone,
      referralCode: userForm.referralCode || generateReferralCode(),
      uplineCode: userForm.uplineCode || undefined,
      package: userForm.package,
      joinDate: new Date().toISOString().slice(0, 10),
      status: userForm.status,
      directReferrals: 0,
      teamSize: 0,
      roiBalance: 0,
      commissionBalance: 0,
      totalWithdrawn: 0,
    };
    setUsers((prev) => [newUser, ...prev]);
    cancelForm();
    toast.success("User created successfully!");
  };

  const handleUpdateUser = () => {
    if (!userForm.name || !userForm.email) {
      toast.error("Name and Email are required.");
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUserId
          ? {
              ...u,
              name: userForm.name,
              email: userForm.email,
              phone: userForm.phone,
              package: userForm.package,
              status: userForm.status,
              uplineCode: userForm.uplineCode || undefined,
            }
          : u,
      ),
    );
    cancelForm();
    toast.success("User updated successfully!");
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirmId(null);
    toast.success("User deleted.");
  };

  const tierName = (tier: string) =>
    PACKAGES.find((p) => p.tier === tier)?.name ?? tier;

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "investments", label: `Investments (${pending.length} pending)` },
    { id: "withdrawals", label: `Withdrawals (${pendingWd.length} pending)` },
    { id: "users", label: `All Users (${users.length})` },
  ];

  const isFormOpen = showAddForm || editingUserId !== null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
            Admin
          </p>
          <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">
            Control Panel
          </h1>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-muted rounded-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 text-xs tracking-wider uppercase rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Users" value={users.length.toString()} />
            <StatCard
              label="Active Investments"
              value={active.length.toString()}
            />
            <StatCard
              label="Pending Investments"
              value={pending.length.toString()}
            />
            <StatCard
              label="Pending Withdrawals"
              value={pendingWd.length.toString()}
            />
          </div>
          <div className="diamond-bg gold-border rounded-xl p-6 card-glow">
            <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Credit ROI to User
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <AdminLabel htmlFor="credit-user">
                  User (Email or Referral Code)
                </AdminLabel>
                <Input
                  id="credit-user"
                  value={creditUserId}
                  onChange={(e) => setCreditUserId(e.target.value)}
                  placeholder="user@email.com"
                  className="mt-1 bg-input border-border"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <AdminLabel htmlFor="credit-amount">Amount (₹)</AdminLabel>
                <Input
                  id="credit-amount"
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  placeholder="5000"
                  className="mt-1 bg-input border-border"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <AdminLabel htmlFor="credit-desc">Description</AdminLabel>
                <Input
                  id="credit-desc"
                  value={creditDesc}
                  onChange={(e) => setCreditDesc(e.target.value)}
                  placeholder="Monthly ROI"
                  className="mt-1 bg-input border-border"
                  data-ocid="admin.input"
                />
              </div>
            </div>
            <Button
              onClick={handleCreditROI}
              disabled={creditLoading}
              className="mt-3 bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
              data-ocid="admin.submit_button"
            >
              {creditLoading ? "Crediting..." : "Credit ROI"}
            </Button>
          </div>
        </div>
      )}

      {activeTab === "investments" && (
        <div className="space-y-3">
          {investments.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              No investments yet.
            </div>
          ) : (
            investments.map((inv, idx) => (
              <div
                key={inv.id}
                className="diamond-bg gold-border rounded-xl p-4 card-glow flex items-center justify-between flex-wrap gap-3"
                data-ocid={`admin.item.${idx + 1}`}
              >
                <div>
                  <p className="font-semibold text-sm">{inv.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {tierName(inv.tier)} • {formatINR(inv.amount)} • {inv.date}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                      inv.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : inv.status === "pending"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
                {inv.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => approveInvestment(inv.id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs uppercase tracking-wider"
                      data-ocid="admin.confirm_button"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => rejectInvestment(inv.id)}
                      className="border-destructive text-destructive hover:bg-destructive/10 text-xs uppercase tracking-wider"
                      data-ocid="admin.delete_button"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "withdrawals" && (
        <div className="space-y-3">
          {withdrawals.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              No withdrawal requests.
            </div>
          ) : (
            withdrawals.map((wd, idx) => (
              <div
                key={wd.id}
                className="diamond-bg gold-border rounded-xl p-4 card-glow flex items-center justify-between flex-wrap gap-3"
                data-ocid={`admin.item.${idx + 1}`}
              >
                <div>
                  <p className="font-semibold text-sm">{wd.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatINR(wd.amount)} • {wd.type} • {wd.date}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                      wd.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : wd.status === "pending"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {wd.status}
                  </span>
                </div>
                {wd.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => approveWithdrawal(wd.id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs uppercase tracking-wider"
                      data-ocid="admin.confirm_button"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => rejectWithdrawal(wd.id)}
                      className="border-destructive text-destructive hover:bg-destructive/10 text-xs uppercase tracking-wider"
                      data-ocid="admin.delete_button"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-4">
          {/* Header row with Add button */}
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {users.length} registered user{users.length !== 1 ? "s" : ""}
            </p>
            {!isFormOpen && (
              <Button
                size="sm"
                onClick={openAddForm}
                className="bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
                data-ocid="users.open_modal_button"
              >
                + Add New User
              </Button>
            )}
          </div>

          {/* Add / Edit Form */}
          {isFormOpen && (
            <div
              className="diamond-bg gold-border rounded-xl p-6 card-glow space-y-4"
              data-ocid="users.modal"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {editingUserId ? "Edit User" : "Add New User"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <AdminLabel htmlFor="uf-name">Full Name *</AdminLabel>
                  <Input
                    id="uf-name"
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Rajesh Kumar"
                    className="mt-1 bg-input border-border"
                    data-ocid="users.input"
                  />
                </div>
                <div>
                  <AdminLabel htmlFor="uf-email">Email *</AdminLabel>
                  <Input
                    id="uf-email"
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="rajesh@email.com"
                    className="mt-1 bg-input border-border"
                    data-ocid="users.input"
                  />
                </div>
                <div>
                  <AdminLabel htmlFor="uf-phone">Phone</AdminLabel>
                  <Input
                    id="uf-phone"
                    value={userForm.phone}
                    onChange={(e) =>
                      setUserForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+91 98765 43210"
                    className="mt-1 bg-input border-border"
                    data-ocid="users.input"
                  />
                </div>
                <div>
                  <AdminLabel htmlFor="uf-package">Package</AdminLabel>
                  <select
                    id="uf-package"
                    value={userForm.package}
                    onChange={(e) =>
                      setUserForm((f) => ({
                        ...f,
                        package: e.target.value as PackageTier,
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    data-ocid="users.select"
                  >
                    <option value="black">Black Diamond (₹10k–₹1L)</option>
                    <option value="blue">Blue Diamond (₹1L–₹5L)</option>
                    <option value="white">White Diamond (₹5L–₹10L)</option>
                  </select>
                </div>
                <div>
                  <AdminLabel htmlFor="uf-status">Status</AdminLabel>
                  <select
                    id="uf-status"
                    value={userForm.status}
                    onChange={(e) =>
                      setUserForm((f) => ({
                        ...f,
                        status: e.target.value as User["status"],
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    data-ocid="users.select"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <AdminLabel htmlFor="uf-referral">Referral Code</AdminLabel>
                  <Input
                    id="uf-referral"
                    value={userForm.referralCode}
                    onChange={(e) =>
                      setUserForm((f) => ({
                        ...f,
                        referralCode: e.target.value,
                      }))
                    }
                    placeholder="DMSXXXXX"
                    className="mt-1 bg-input border-border"
                    data-ocid="users.input"
                  />
                </div>
                <div>
                  <AdminLabel htmlFor="uf-upline">Upline Code</AdminLabel>
                  <Input
                    id="uf-upline"
                    value={userForm.uplineCode}
                    onChange={(e) =>
                      setUserForm((f) => ({
                        ...f,
                        uplineCode: e.target.value,
                      }))
                    }
                    placeholder="Sponsor's referral code"
                    className="mt-1 bg-input border-border"
                    data-ocid="users.input"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={editingUserId ? handleUpdateUser : handleCreateUser}
                  className="bg-primary text-primary-foreground hover:opacity-90 text-xs tracking-wider uppercase"
                  data-ocid="users.submit_button"
                >
                  {editingUserId ? "Update User" : "Create User"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelForm}
                  className="text-xs tracking-wider uppercase"
                  data-ocid="users.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* User list */}
          {users.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="users.empty_state"
            >
              No users registered. Add one above.
            </div>
          ) : (
            users.map((user, idx) => (
              <div
                key={user.id}
                className="diamond-bg gold-border rounded-xl p-4 card-glow"
                data-ocid={`admin.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email} • {user.phone || "No phone"} •{" "}
                      {user.referralCode} • Joined {user.joinDate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Package: {tierName(user.package)} • Team: {user.teamSize}{" "}
                      • ROI: {formatINR(user.roiBalance)}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                        user.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : user.status === "pending"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  <div className="flex gap-2 items-start">
                    {deleteConfirmId === user.id ? (
                      <div
                        className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2"
                        data-ocid="users.dialog"
                      >
                        <span className="text-xs text-destructive font-medium">
                          Delete user?
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-destructive hover:bg-destructive/90 text-white text-xs px-2 h-7"
                          data-ocid="users.confirm_button"
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-xs px-2 h-7"
                          data-ocid="users.cancel_button"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditForm(user)}
                          className="text-xs tracking-wider uppercase"
                          data-ocid="users.edit_button"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteConfirmId(user.id)}
                          className="border-destructive text-destructive hover:bg-destructive/10 text-xs tracking-wider uppercase"
                          data-ocid="users.delete_button"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function AdminLabel({
  htmlFor,
  children,
}: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs text-muted-foreground uppercase tracking-wider"
    >
      {children}
    </label>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="diamond-bg gold-border rounded-xl p-4 card-glow text-center">
      <p className="text-2xl font-bold gold-text">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}
