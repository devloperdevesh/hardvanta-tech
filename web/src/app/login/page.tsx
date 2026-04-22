"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Login failed");
      }

      window.location.href = "/";
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
          <p className="text-sm text-blue-100 max-w-sm leading-relaxed">
            Discover high-performance components, sensors and ICs for your next
            innovation.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col justify-center px-12 py-12 space-y-7">
          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              Login to your account
            </h2>
            <p className="text-sm text-gray-500">
              Welcome back, continue your journey
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-14 outline-none transition"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-3 text-sm text-blue-600 hover:underline"
              >
                {show ? "Hide" : "Show"}
              </button>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="accent-blue-600"
                {...register("remember")}
              />
              Remember me
            </label>

            <Link href="/forgot" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition active:scale-[0.98]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-300"></div>
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition font-medium text-gray-700"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
