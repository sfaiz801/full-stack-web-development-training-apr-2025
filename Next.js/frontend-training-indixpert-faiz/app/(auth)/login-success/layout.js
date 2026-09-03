"use client";

import ProtectedRoute from "@/components/features/auth/ProtectedRoute";

export default function LoginSuccessLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
