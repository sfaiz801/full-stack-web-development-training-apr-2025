"use client";

import Signup from "@/components/features/auth/Signup";
import PublicRoute from "@/components/features/auth/PublicRoute";

export default function SignupPage() {
  return (
    <PublicRoute>
      <Signup />
    </PublicRoute>
  );
}
