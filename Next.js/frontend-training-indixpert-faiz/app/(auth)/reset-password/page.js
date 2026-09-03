import ResetPassword from "@/components/features/auth/ResetPassword";
import { Suspense } from "react";

export const metadata = {
  title: "Reset Password | Classic Tailors",
  description: "Set a new password for your Classic Tailors account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
