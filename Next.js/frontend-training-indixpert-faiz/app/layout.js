import "@/styles/globals.scss";
import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata = {
  title: "Classic Tailors • Client Portal",
  description: "Gents Clothes Stitching & Fabric Sales — Classic Tailors, Mirganj",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="light">
      <body>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
