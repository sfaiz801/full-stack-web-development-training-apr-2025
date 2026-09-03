"use client";

import Link from "next/link";
import { FaCut, FaCheckCircle, FaCrown, FaUserShield } from "react-icons/fa";

export default function AuthLayout({ children, illustrationTitle, illustrationText }) {
  return (
    <div className="min-vh-100 w-100 m-0 p-0 overflow-hidden bg-white">
      <div className="row g-0 min-vh-100 w-100 m-0">
        {/* Left 50% Panel: Bespoke Tailors Luxury Image */}
        <div 
          className="col-12 col-lg-6 d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative"
          style={{ 
            backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.5) 0%, rgba(15, 23, 42, 0.9) 100%), url('/classic_tailors_bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Top Logo / Badge */}
          <div className="position-relative" style={{ zIndex: 2 }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-lg"
                style={{ 
                  width: "50px", 
                  height: "50px", 
                  background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  border: "2px solid rgba(255, 255, 255, 0.3)"
                }}
              >
                <FaCut className="fs-4" />
              </div>
              <div>
                <span className="fw-bold fs-3 text-white tracking-tight d-block" style={{ fontFamily: "Georgia, serif", lineHeight: 1 }}>
                  Classic Tailors
                </span>
                <small className="text-warning extra-small tracking-wider text-uppercase fw-semibold" style={{ letterSpacing: "1.5px" }}>
                  Exclusive Gents Tailoring & Fabric
                </small>
              </div>
            </div>
          </div>

          {/* Middle Headline & Features */}
          <div className="position-relative my-auto py-4" style={{ zIndex: 2, maxWidth: "480px" }}>
            <span 
              className="rounded-pill px-3 py-2 mb-3 d-inline-flex align-items-center gap-2 small fw-semibold"
              style={{ 
                backgroundColor: "rgba(217, 119, 6, 0.25)",
                color: "#fef08a",
                border: "1px solid rgba(234, 179, 8, 0.4)"
              }}
            >
              <FaCrown style={{ color: "#fbbf24" }} /> Premium Gents Tailoring
            </span>

            <h1 className="fw-bold text-white mb-3" style={{ fontFamily: "Georgia, serif", fontSize: "2.4rem", lineHeight: "1.2" }}>
              {illustrationTitle || "Crafting Perfection, Stitch by Stitch."}
            </h1>

            <p className="text-white-50 fs-6 mb-4" style={{ lineHeight: "1.65" }}>
              {illustrationText || "Sign in to manage your custom suit orders, fittings, measurement profiles, and premium fabric selections."}
            </p>

            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2 small text-white-80">
                <FaCheckCircle className="text-warning" /> <span>Gents Handcrafted Suits, Sherwanis & Jackets</span>
              </div>
              <div className="d-flex align-items-center gap-2 small text-white-80">
                <FaCheckCircle className="text-warning" /> <span>Personalized Gents Measurement Profile</span>
              </div>
              <div className="d-flex align-items-center gap-2 small text-white-80">
                <FaCheckCircle className="text-warning" /> <span>Shop Owner: Masoom Ahmad | Tech: Faiz Siddique</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="position-relative extra-small text-white-50 mt-4" style={{ zIndex: 2 }}>
            © {new Date().getFullYear()} Classic Tailors. All Rights Reserved. Gents Wear Only.
          </div>
        </div>

        {/* Right 50% Panel: Clean Form Layout */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center px-4 px-md-5 py-5 bg-white">
          <div className="w-100" style={{ maxWidth: "420px" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}