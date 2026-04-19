"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name || !email || !password) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch {
      alert("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f8fafc]">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* LEFT SIDE (WELCOME PANEL) */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <h1 className="text-3xl font-semibold leading-tight">
            Welcome to Hardvanta
          </h1>
          <p className="mt-4 text-white/80">
            Build faster. Ship smarter. Scale effortlessly.
          </p>

          <div className="mt-10 space-y-4 text-sm text-white/70">
            <p>✔ Clean developer experience</p>
            <p>✔ Powerful tools</p>
            <p>✔ Lightning fast performance</p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="p-8 md:p-10">

          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Get started in seconds
            </p>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email address"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="mt-6 w-full py-2.5 rounded-lg font-medium text-white
            bg-black hover:bg-gray-900 transition"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* GOOGLE */}
          <button className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border text-sm hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}