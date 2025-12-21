"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/src/lib/api";
import { Shield, User, Mail, Lock, ArrowRight, Eye, EyeOff, Fingerprint } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router=useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulated API call - replace with your apiFetch logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(6,182,212,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size:64px_64px" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 mb-4 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent tracking-tight">
            ApniSec
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Secure your digital presence</p>
        </div>

        {/* Main card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          
          <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Fingerprint className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Create Account</h2>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name input */}
              <div className="relative group/input">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-gray-500 group-focus-within/input:text-cyan-400 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="relative group/input">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-gray-500 group-focus-within/input:text-cyan-400 transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="relative group/input">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-500 group-focus-within/input:text-cyan-400 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min 6 characters)"
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-gray-900/80 transition-all duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full group/btn overflow-hidden rounded-xl py-3.5 font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 transition-transform duration-300 group-hover/btn:scale-105" />
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl" />
                <span className="relative flex items-center justify-center gap-2 text-black font-semibold">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Register
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 hover:underline underline-offset-4">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          By registering, you agree to our{" "}
          <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Terms</a>
          {" "}&{" "}
          <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
