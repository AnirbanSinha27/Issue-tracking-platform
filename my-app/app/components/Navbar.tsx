"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/src/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((res) => {
        setUser(res.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          ApniSec
        </Link>

        {/* Right Section */}
        {!loading && (
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:underline"
                >
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  className="text-sm font-medium hover:underline"
                >
                  Profile
                </Link>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:underline text-black"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 bg-black text-white rounded text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function LogoutButton() {
  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  }

  return (
    <button
      onClick={logout}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  );
}
