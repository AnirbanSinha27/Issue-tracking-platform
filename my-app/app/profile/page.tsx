"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import { apiFetch } from "@/src/lib/api";
import { User, Mail, Lock, Calendar, Save, Loader2, UserCircle, Shield, Edit2, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Profile form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((data: { user: UserData }) => {
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      // Try to update profile - adjust endpoint as needed
      await apiFetch("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ name, email }),
      });
      
      setSuccess("Profile updated successfully!");
      setUser({ ...user!, name, email });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile. API endpoint may not be implemented yet.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    setChangingPassword(true);

    try {
      // Try to update password - adjust endpoint as needed
      await apiFetch("/api/auth/password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to change password. API endpoint may not be implemented yet.");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading profile...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-linear(rgba(6,182,212,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size:64px_64px" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
                  Profile Settings
                </h1>
                <p className="text-gray-500 text-sm mt-1">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-sm text-emerald-400">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info Card */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
                  {/* Avatar */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 rounded-full blur-xl opacity-50" />
                      <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                        {user ? getInitials(user.name) : "U"}
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-1">{user?.name}</h2>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>

                  {/* Account Info */}
                  <div className="space-y-4 pt-6 border-t border-gray-800/50">
                    <div className="flex items-center gap-3 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">Member since</p>
                        <p className="text-sm text-white">{formatDate(user?.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <Shield className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">Account Status</p>
                        <p className="text-sm text-emerald-400">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Update Form */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-linear-to-br from-cyan-500/20 to-emerald-500/20 rounded-lg p-2">
                      <Edit2 className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-5">
                    {/* Name Input */}
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={saving}
                      className="relative w-full group/btn overflow-hidden rounded-xl py-3.5 font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 transition-transform duration-300 group-hover/btn:scale-105" />
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl" />
                      <span className="relative flex items-center justify-center gap-2 text-black font-semibold">
                        {saving ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Changes
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Password Change Form */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-linear-to-br from-cyan-500/20 to-emerald-500/20 rounded-lg p-2">
                      <Lock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Change Password</h2>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-5">
                    {/* Current Password */}
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors duration-300"
                          >
                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors duration-300"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors duration-300"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="relative w-full group/btn overflow-hidden rounded-xl py-3.5 font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 transition-transform duration-300 group-hover/btn:scale-105" />
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl" />
                      <span className="relative flex items-center justify-center gap-2 text-black font-semibold">
                        {changingPassword ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Changing Password...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            Update Password
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}