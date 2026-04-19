"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-2xl shadow-md w-[350px]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account 🚀
        </h1>

        <input
          placeholder="Email"
          className="input w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="input w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup} className="btn w-full">
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}