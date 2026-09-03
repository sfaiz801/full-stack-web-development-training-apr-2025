"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "@/utils/validationSchemas";
import AuthLayout from "@/components/features/auth/AuthLayout";
import { authService } from "@/services/authService";

export default function ForgotPassword() {
  const router = useRouter();
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!isSent) return;
    if (countdown === 0) {
      router.push("/signin");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isSent, countdown, router]);

  const onSubmit = async (data) => {
    try {
      const res = await authService.forgotPassword({ email: data.email });
      setSubmittedEmail(data.email);
      setCountdown(5);
      setIsSent(true);
      toast.success(res?.message || "Password reset link sent to your email!");
    } catch (err) {
      toast.error(err.message || "Failed to send reset link. Please check your email.");
    }
  };

  return (
    <AuthLayout
      illustrationTitle="Password Recovery"
      illustrationText="Don't worry! Enter your registered email to receive a password reset link."
    >
      <div className="mb-4">
        <Link href="/signin" className="small text-muted text-decoration-none d-inline-flex align-items-center gap-2 hover-primary">
          <FaArrowLeft /> Back to Sign In
        </Link>
      </div>

      {!isSent ? (
        <>
          <h3 className="fw-bold mb-2">🔑 Forgot Password?</h3>
          <p className="text-muted small mb-4">
            Enter your registered email address below. Firebase will send you a secure link to reset your password directly.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="form-label small fw-medium">Email Address</label>
              <div className="input-field-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="name@company.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <div className="invalid-feedback d-block small">{errors.email.message}</div>
              )}
            </div>

            <button type="submit" className="auth-primary-btn d-flex align-items-center justify-content-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending Link..."
              ) : (
                <>
                  <FaPaperPlane /> Send Password Reset Email
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-3">
          <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "64px", height: "64px" }}>
            <FaCheckCircle className="fs-2" />
          </div>
          <h4 className="fw-bold mb-2">Reset Email Sent!</h4>
          <p className="text-muted small mb-3">
            We sent a password reset link to <strong className="text-dark">{submittedEmail}</strong>. Please check your inbox and click the link to set your new password.
          </p>

          <div className="p-2 bg-light rounded-3 border mb-3">
            <span className="small text-muted fw-medium d-flex align-items-center justify-content-center gap-2">
              <span>⌛ Redirecting to Sign In page in</span>
              <span className="badge bg-dark text-white px-2 py-1 fs-6">{countdown}s</span>
            </span>
          </div>

          <div className="d-flex flex-column gap-2">
            <button
              type="button"
              onClick={() => {
                setIsSent(false);
                setCountdown(5);
              }}
              className="btn btn-outline-secondary btn-sm rounded-3 py-2"
            >
              Resend Reset Email
            </button>

            <Link href="/signin" className="small text-muted text-decoration-none mt-2">
              Return to Sign In ({countdown}s)
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
