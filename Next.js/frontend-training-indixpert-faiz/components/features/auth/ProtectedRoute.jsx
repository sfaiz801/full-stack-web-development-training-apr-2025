"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/signin");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div 
        className="d-flex flex-column justify-content-center align-items-center min-vh-100"
        style={{ background: "#0f172a", color: "#ffffff" }}
      >
        <div className="spinner-border text-warning mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="small text-white-50 m-0 fw-semibold" style={{ fontFamily: "Georgia, serif", letterSpacing: "1px" }}>
          Classic Tailors • Verifying Authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
