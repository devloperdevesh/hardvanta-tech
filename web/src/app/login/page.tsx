"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg("");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ Proper redirect
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message);
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
        <div className="flex flex-col justify-center px-12 py-12 space-y-6">
          {/* Heading */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Login to your account
            </h2>
            <p className="text-sm text-gray-500">
              Welcome back, continue your journey
            </p>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="input"
                {...register("email")}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="input pr-14"
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
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            {/* Remember + Forgot */}
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

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-300"></div>
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
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
