"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash, FaLock, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "@/utils/validationSchemas";
import AuthLayout from "@/components/features/auth/AuthLayout";
import { authService } from "@/services/authService";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode") || searchParams.get("code") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const watchPassword = watch("password", "");

  // Interactive Password Strength calculation
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (!watchPassword) return { score: 0, label: "", color: "" };

    if (watchPassword.length >= 8) score += 25;
    if (/[A-Z]/.test(watchPassword)) score += 25;
    if (/[0-9]/.test(watchPassword)) score += 25;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(watchPassword)) score += 25;

    if (score <= 25) return { score, label: "Weak", color: "bg-danger" };
    if (score <= 50) return { score, label: "Fair", color: "bg-warning" };
    if (score <= 75) return { score, label: "Good", color: "bg-info" };
    return { score, label: "Strong", color: "bg-success" };
  }, [watchPassword]);

  const onSubmit = async (data) => {
    try {
      if (!oobCode) {
        toast.error("Password reset code missing. Please use the link sent to your email.");
        return;
      }

      await authService.resetPassword({
        oobCode: oobCode,
        new_password: data.password,
      });

      toast.success("Password reset successful! Redirecting to sign in...");

      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Failed to reset password. Please request a new link.");
    }
  };

  return (
    <AuthLayout
      illustrationTitle="Create New Password"
      illustrationText="Set a strong password for your account to ensure your custom suit orders and profile stay secure."
    >
      <div className="mb-4">
        <Link href="/signin" className="small text-muted text-decoration-none d-inline-flex align-items-center gap-2 hover-primary">
          <FaArrowLeft /> Back to Sign In
        </Link>
      </div>

      <h3 className="fw-bold mb-1">🔐 Create New Password</h3>

      {oobCode ? (
        <>
          <p className="text-muted small mb-4">
            Enter your new secure password below to update your Firebase account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* New Password */}
            <div className="mb-3">
              <label className="form-label small fw-medium">New Password</label>
              <div className="input-field-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Min. 8 chars (uppercase, lowercase, number & symbol)"
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

              {/* Password Strength Indicator */}
              {watchPassword && (
                <div className="mt-2">
                  <div className="d-flex justify-content-between align-items-center extra-small text-muted mb-1">
                    <span>Strength: <strong className="text-dark">{passwordStrength.label}</strong></span>
                    <span>{passwordStrength.score}%</span>
                  </div>
                  <div className="progress" style={{ height: "5px" }}>
                    <div
                      className={`progress-bar ${passwordStrength.color}`}
                      role="progressbar"
                      style={{ width: `${passwordStrength.score}%`, transition: "width 0.3s ease" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label small fw-medium">Confirm New Password</label>
              <div className="input-field-group">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  placeholder="Re-enter new password"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback d-block small">{errors.confirmPassword.message}</div>
              )}
            </div>

            <button type="submit" className="auth-primary-btn d-flex align-items-center justify-content-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                "Updating Password..."
              ) : (
                <>
                  <FaCheckCircle /> Update Password
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "64px", height: "64px" }}>
            <FaExclamationTriangle className="fs-2" />
          </div>
          <h5 className="fw-bold mb-2">Reset Link Required</h5>
          <p className="text-muted small mb-4">
            To reset your password securely, please click the link sent to your email address from Firebase.
          </p>

          <Link href="/forgot-password" className="auth-primary-btn text-decoration-none d-inline-flex align-items-center justify-content-center gap-2">
            <FaPaperPlane /> Request Password Reset Email
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
