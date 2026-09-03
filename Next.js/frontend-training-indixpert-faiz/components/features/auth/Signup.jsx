"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaUserPlus, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { signupSchema } from "@/utils/validationSchemas";
import AuthLayout from "@/components/features/auth/AuthLayout";
import { authService } from "@/services/authService";
import { LOCAL_STORAGE_KEYS } from "@/constants";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

  const watchPassword = watch("password", "");

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
      const mobileNumber = data.mobile ? `+91${data.mobile}` : "";
      await authService.signup({
        full_name: data.fullName,
        email: data.email,
        mobile: mobileNumber,
        password: data.password,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.USER,
          JSON.stringify({
            full_name: data.fullName,
            email: data.email,
            mobile: mobileNumber,
          })
        );
      }

      toast.success("Account created successfully! Verification link sent.");
      setRegisteredEmail(data.email);
    } catch (err) {
      console.warn("Signup attempt failed:", err.message || err);
      let errorMsg = "Something went wrong";

      if (err.response?.data) {
        const { detail, message, error } = err.response.data;
        if (Array.isArray(detail)) {
          errorMsg = detail.map(d => `${d.loc.join('.')} - ${d.msg}`).join(', ');
        } else if (typeof detail === 'string') {
          errorMsg = detail;
        } else if (message) {
          errorMsg = message;
        } else if (error) {
          errorMsg = error;
        } else {
          errorMsg = JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        errorMsg = err.message;
      }

      toast.error(String(errorMsg));
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      const res = await authService.resendVerificationEmail();
      toast.success(res.message || "Verification email resent!");
    } catch (err) {
      toast.error(err.message || "Could not resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  if (registeredEmail) {
    return (
      <AuthLayout
        illustrationTitle="Verification Link Sent!"
        illustrationText="Please verify your email address to complete your registration and log in."
      >
        <div className="text-center py-3">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-light shadow-sm"
            style={{ width: "70px", height: "70px", color: "#16a34a" }}
          >
            <FaCheckCircle size={38} />
          </div>

          <h2 className="fw-bold mb-2 text-dark fs-4" style={{ fontFamily: "Georgia, serif" }}>
            Account Created Successfully!
          </h2>

          <p className="text-muted small mb-3">
            Please verify your account. A verification link has been dispatched to:
          </p>

          <div className="p-3 bg-light rounded-3 border mb-4">
            <strong className="text-dark fs-6 d-flex align-items-center justify-content-center gap-2">
              <FaEnvelope className="text-primary" /> {registeredEmail}
            </strong>
          </div>

          <p className="text-muted extra-small mb-4">
            Check your Gmail or email inbox, click the link to verify your account, and then proceed to Sign In.
          </p>

          <div className="d-flex flex-column gap-2">
            <button
              onClick={() => router.push("/signin")}
              className="btn w-100 text-white fw-bold py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", minHeight: "44px" }}
            >
              <FaPaperPlane /> Proceed to Sign In
            </button>

            <button
              type="button"
              onClick={handleResendEmail}
              disabled={isResending}
              className="btn btn-outline-secondary w-100 fw-semibold py-2 rounded-3"
              style={{ minHeight: "44px" }}
            >
              {isResending ? "Resending..." : "Resend Verification Email"}
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      illustrationTitle="Crafting Perfection, Stitch by Stitch."
      illustrationText="Register to book fitting appointments, customize bespoke suits, and track order progress."
    >

      <div className="mb-3">
        <h2 className="fw-bold mb-1 text-dark fs-3" style={{ fontFamily: "Georgia, serif" }}>
          ✂️ Join Classic Tailors
        </h2>
        <p className="text-muted small">Fill in your details below to create your client profile.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-2">
          <div className="col-12 col-md-6 mb-2">
            <label className="form-label small fw-medium text-dark">Full Name</label>
            <div className="input-field-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                placeholder="Full Name"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && <div className="invalid-feedback d-block small">{errors.fullName.message}</div>}
          </div>

          <div className="col-12 col-md-6 mb-2">
            <label className="form-label small fw-medium text-dark">Mobile Number</label>
            <div className="input-field-group">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                placeholder="Enter mobile number"
                maxLength={10}
                {...register("mobile")}
              />
            </div>
            {errors.mobile && <div className="invalid-feedback d-block small">{errors.mobile.message}</div>}
          </div>
        </div>

        <div className="mb-2">
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

        <div className="row g-2">
          <div className="col-12 col-md-6 mb-2">
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

          <div className="col-12 col-md-6 mb-2">
            <label className="form-label small fw-medium text-dark">Confirm Password</label>
            <div className="input-field-group">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                placeholder="Confirm Password"
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
        </div>

        {watchPassword && (
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center extra-small text-muted mb-1">
              <span>Password Strength: <strong className="text-dark">{passwordStrength.label}</strong></span>
              <span>{passwordStrength.score}%</span>
            </div>
            <div className="progress" style={{ height: "4px" }}>
              <div
                className={`progress-bar ${passwordStrength.color}`}
                role="progressbar"
                style={{ width: `${passwordStrength.score}%`, transition: "width 0.3s ease" }}
              ></div>
            </div>
          </div>
        )}

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
            id="terms"
            {...register("terms")}
          />
          <label className="form-check-label extra-small text-muted" htmlFor="terms">
            I agree to the Terms of Service & Privacy Policy
          </label>
          {errors.terms && <div className="invalid-feedback d-block small">{errors.terms.message}</div>}
        </div>

        <button
          type="submit"
          className="btn w-100 text-white fw-bold py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", minHeight: "48px" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Creating Account..."
          ) : (
            <>
              <FaUserPlus /> Create Account
            </>
          )}
        </button>

        <div className="text-center mt-3 small text-muted">
          Already have an account?{" "}
          <Link href="/signin" className="fw-bold text-decoration-none ms-1" style={{ color: "#b45309" }}>
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}