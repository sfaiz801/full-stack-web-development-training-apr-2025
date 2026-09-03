"use client";

import ProtectedRoute from "@/components/features/auth/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
