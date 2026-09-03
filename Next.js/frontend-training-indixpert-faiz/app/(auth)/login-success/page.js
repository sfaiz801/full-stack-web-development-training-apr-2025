"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function LoginSuccess() {
  const router = useRouter();
  const [count, setCount] = useState(2);

  useEffect(() => {
    if (count === 0) { router.replace("/dashboard"); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, router]);

  return (
    <div className="auth-wrapper">
      <div className="auth-card-container text-center" style={{ maxWidth: "420px" }}>
        <FaCheckCircle className="text-success mb-3" style={{ fontSize: "60px" }} />
        <h3 className="fw-bold">Login Successful</h3>
        <p className="text-muted">
          Welcome back! Redirecting to dashboard in <strong>{count}s</strong>...
        </p>
        <Link href="/dashboard" className="auth-primary-btn d-inline-block text-decoration-none mt-2">
          Continue to Dashboard
        </Link>
      </div>
    </div>
  );
}
