"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { signinSchema } from "@/utils/validationSchemas";
import AuthLayout from "@/components/features/auth/AuthLayout";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export default function Signin() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signinSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      const token = response?.token || response?.access_token;
      login(token, response?.user);
      toast.success("Signed in successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.warn("Login attempt failed:", err.message || err);
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password";
      toast.error(errorMsg);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await authService.googleSignInWithFirebase();
      const token = response?.token || response?.access_token;
      login(token, response?.user);
      toast.success("Signed in with Google!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Google Sign-In error:", err);
      toast.error(err.message || "Google Sign-In failed.");
    }
  };

  return (
    <AuthLayout
      illustrationTitle="Crafting Perfection, Stitch by Stitch."
      illustrationText="Sign in to manage your custom suit orders, fittings, measurement profiles, and premium fabric selections."
    >
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark fs-3" style={{ fontFamily: "Georgia, serif" }}>
          👋 Sign In
        </h2>
        <p className="text-muted small">Enter your email and password to access Classic Tailors portal.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label small fw-medium text-dark">Email Address</label>
          <div className="input-field-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              {...register("email")}
            />
          </div>
          {errors.email && <div className="invalid-feedback d-block small">{errors.email.message}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="form-label small fw-medium text-dark">Password</label>
          <div className="input-field-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter password"
              {...register("password")}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword((p) => !p)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <div className="invalid-feedback d-block small">{errors.password.message}</div>}
        </div>

        {/* Remember me & Forgot Password Row */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="form-check m-0">
            <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
            <label className="form-check-label extra-small text-secondary" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <Link href="/forgot-password" className="extra-small text-decoration-none fw-semibold" style={{ color: "#b45309" }}>
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-100 text-white fw-bold py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", minHeight: "48px" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Signing In..."
          ) : (
            <>
              <FaSignInAlt /> Log In to Classic Tailors
            </>
          )}
        </button>

        {/* Google Sign In Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1 text-muted" />
          <span className="px-2 small text-muted">OR</span>
          <hr className="flex-grow-1 text-muted" />
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline-dark w-100 fw-semibold py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
          style={{ minHeight: "44px" }}
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        {/* Sign Up Redirect */}
        <div className="text-center mt-4 small text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="fw-bold text-decoration-none ms-1" style={{ color: "#b45309" }}>
            Create Account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}