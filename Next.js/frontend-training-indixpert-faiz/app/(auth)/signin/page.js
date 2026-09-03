"use client";

import Signin from "@/components/features/auth/Signin";
import PublicRoute from "@/components/features/auth/PublicRoute";

export default function SigninPage() {
  return (
    <PublicRoute>
      <Signin />
    </PublicRoute>
  );
}
