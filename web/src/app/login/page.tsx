"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] px-6">

      <div className="w-full max-w-3xl grid md:grid-cols-2 bg-white rounded-2xl shadow-md overflow-hidden">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center px-10 py-10 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
          <h1 className="text-2xl font-semibold">
            Hardvanta
          </h1>

          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Industrial electronics platform for engineers and builders.
          </p>

          <div className="mt-8 space-y-2 text-sm text-white/80">
            <p>High performance components</p>
            <p>Reliable sourcing</p>
            <p>Built for scale</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-8 py-10">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your details to continue
            </p>
          </div>

          <div className="space-y-4">

            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full name"
                className="input"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email address"
                className="input"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="input"
              />
            </div>

          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="mt-5 w-full py-3 rounded-xl font-medium text-white
            bg-gradient-to-r from-indigo-600 to-blue-500
            hover:opacity-95 transition"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full flex items-center justify-center gap-2.5 py-3 
          rounded-xl border border-gray-200 bg-white 
          text-sm font-medium hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account{" "}
            <Link href="/login" className="text-black font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}