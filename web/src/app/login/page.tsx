"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="
      min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#0f4c81] via-[#1b6ca8] to-[#3ccf91]
    ">

      {/* CARD */}
      <div className="
        w-full max-w-md
        bg-white/90 backdrop-blur-xl
        p-8 rounded-2xl shadow-xl
      ">

        {/* HEADER */}
        <div className="text-center mb-6">

          {/* LOGO */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Image src="/logo.png" alt="logo" width={34} height={34} />
            <span className="font-semibold text-lg text-[#1b6ca8]">
              Hardvanta
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800">
            Create Account 🚀
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Join Hardvanta and start building faster
          </p>

        </div>

        {/* NAME */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Full name"
            className="
              w-full pl-10 pr-4 py-2.5 rounded-lg border
              bg-gray-50 focus:bg-white
              focus:ring-2 focus:ring-blue-500/30
              outline-none transition
            "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Email address"
            className="
              w-full pl-10 pr-4 py-2.5 rounded-lg border
              bg-gray-50 focus:bg-white
              focus:ring-2 focus:ring-blue-500/30
              outline-none transition
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="password"
            placeholder="Password"
            className="
              w-full pl-10 pr-4 py-2.5 rounded-lg border
              bg-gray-50 focus:bg-white
              focus:ring-2 focus:ring-blue-500/30
              outline-none transition
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="
            w-full py-2.5 rounded-lg font-medium text-white
            bg-gradient-to-r from-[#0f4c81] to-[#1b6ca8]
            hover:scale-[1.02] active:scale-[0.98]
            hover:shadow-lg transition-all duration-300
            disabled:opacity-70
          "
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-2 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GOOGLE SIGNUP */}
        <button className="
          w-full flex items-center justify-center gap-3
          py-2.5 rounded-lg border bg-white
          text-sm font-medium text-gray-700
          hover:bg-gray-50 transition
        ">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}