"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import IssueForm from "../components/IssueForm";
import IssueList from "../components/IssueList";
import { Shield, LayoutDashboard, Bug, AlertTriangle, CheckCircle2, Clock, TrendingUp, Activity, Zap, Plus, List, User, LogOut, Settings, Bell, Sparkles, Code2, Cloud, Lock } from "lucide-react";
import { apiFetch } from "@/src/lib/api";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((data: { user: UserData }) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-linear(rgba(6,182,212,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size:64px_64px" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section with Welcome */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-linear-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">Security issue management</p>
                </div>
              </div>

              {/* User Profile Card */}
              {user && (
                <div className="flex items-center gap-3 bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-xl px-4 py-2.5 shadow-xl">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {getInitials(user.name)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0d1117]"></div>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Welcome Message Card */}
            {user && !loading && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {getGreeting()}, {user.name.split(" ")[0]}! 👋
                        </h2>
                        <p className="text-gray-400">
                          Welcome back to your security command center. Monitor and manage your issues efficiently.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-lg">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 text-sm font-medium">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Issue Form Section */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-linear-to-br from-cyan-500/20 to-emerald-500/20 rounded-lg p-2">
                      <Plus className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Create New Issue</h2>
                  </div>
                  <IssueForm />
                </div>
              </div>
            </div>

            {/* Issue List Section */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-linear-to-br from-cyan-500/20 to-emerald-500/20 rounded-lg p-2">
                        <List className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h2 className="text-xl font-semibold text-white">Your Issues</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <span className="text-gray-400 text-xs font-medium">All Issues</span>
                      </div>
                    </div>
                  </div>
                  <IssueList />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure Platform</span>
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full" />
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              <span>Cloud Security</span>
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Protected</span>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}