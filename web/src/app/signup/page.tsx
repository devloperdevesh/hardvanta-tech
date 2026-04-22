"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Signup failed");
      }

      window.location.href = "/login";
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center px-14 py-14 bg-gradient-to-br from-blue-600 to-blue-500 text-white">
          <h1 className="text-3xl font-semibold leading-tight mb-4">
            Industrial Electronics Marketplace
          </h1>

          <p className="text-sm text-blue-100 leading-relaxed max-w-sm">
            Discover high-performance components, sensors and ICs built for
            engineers, startups and innovators.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col justify-center px-12 py-12 space-y-7">
          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h2>
            <p className="text-sm text-gray-500">Get started in seconds</p>
          </div>

          {/* Inputs */}
          <div className="space-y-5">
            {/* Name */}
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 leading-relaxed">
            By creating an account, you agree to our{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>

          {/* Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition active:scale-[0.98]"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
