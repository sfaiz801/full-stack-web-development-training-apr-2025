"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaSignOutAlt,
  FaKey,
  FaArrowLeft,
  FaCheckCircle,
  FaRulerCombined,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";
import { LOCAL_STORAGE_KEYS } from "@/constants";

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, logout } = useAuth();
  
  const [profileData, setProfileData] = useState(() => {
    let savedMobile = authUser?.mobile || "";
    if (!savedMobile && typeof window !== "undefined") {
      try {
        const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || "{}");
        if (storedUser.mobile) savedMobile = storedUser.mobile;
      } catch {}
    }
    return {
      full_name: authUser?.full_name || "Client User",
      email: authUser?.email || "",
      mobile: savedMobile,
      uid: authUser?.uid || "fb-client-id",
      authProvider: "Firebase Authentication",
    };
  });

  const [measurements, setMeasurements] = useState({
    chest: '40"',
    waist: '34"',
    shoulder: '18"',
    sleeve: '25.5"',
    jacketSize: '40R Regular (Gents)',
  });

  const [resetSending, setResetSending] = useState(false);

  useEffect(() => {
    userService.getProfile()
      .then((data) => {
        if (data) {
          setProfileData((prev) => ({
            ...prev,
            full_name: data.full_name || prev.full_name,
            email: data.email || prev.email,
            mobile: data.mobile || prev.mobile,
          }));
        }
      })
      .catch(() => {});
  }, [authUser]);

  const handleSendPasswordReset = async () => {
    if (!profileData.email) return;
    setResetSending(true);
    try {
      await authService.sendFirebasePasswordReset(profileData.email);
      toast.success("Password reset email sent to your inbox!");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email.");
    } finally {
      setResetSending(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully.");
  };

  const getInitials = (name) => {
    if (!name) return "CT";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
        <div className="container-fluid container">
          <Link href="/dashboard" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <span className="bg-warning text-dark rounded-circle px-2 py-1 fs-6 fw-bold">CT</span>
            <span style={{ fontFamily: "Georgia, serif" }}>Classic Tailors</span>
          </Link>

          <div className="d-flex align-items-center gap-3 ms-auto">
            <Link href="/dashboard" className="btn btn-outline-light btn-sm rounded-pill px-2 px-sm-3 d-flex align-items-center gap-2">
              <FaArrowLeft /> <span className="d-none d-sm-inline">Dashboard</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-2 px-sm-3 d-flex align-items-center gap-2">
              <FaSignOutAlt /> <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Profile Body */}
      <div className="container py-5 flex-grow-1">
        {/* Profile Header Hero Card */}
        <div 
          className="rounded-4 p-4 mb-4 text-white shadow-sm d-flex flex-column flex-md-row align-items-center gap-4 position-relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
        >
          {/* Avatar Circle */}
          <div 
            className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold fs-2 shadow"
            style={{ width: "90px", height: "90px", minWidth: "90px", border: "4px solid rgba(255, 255, 255, 0.2)" }}
          >
            {getInitials(profileData.full_name)}
          </div>

          {/* User Info */}
          <div className="flex-grow-1 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
              <h3 className="fw-bold mb-0 text-white" style={{ fontFamily: "Georgia, serif" }}>
                {profileData.full_name}
              </h3>
              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 rounded-pill small">
                <FaCheckCircle className="me-1" /> Firebase Verified
              </span>
            </div>
            <p className="text-white-50 mb-2 small">{profileData.email}</p>
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-3 extra-small text-white-50">
              <span><FaShieldAlt className="text-warning me-1" /> Auth: {profileData.authProvider}</span>
              <span>•</span>
              <span><FaIdCard className="text-info me-1" /> Client ID: {profileData.uid.slice(0, 12)}...</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="d-flex flex-column gap-2 w-100 w-md-auto">
            <button 
              onClick={handleSendPasswordReset} 
              disabled={resetSending}
              className="btn btn-warning text-dark btn-sm fw-bold px-3 py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
            >
              <FaKey /> {resetSending ? "Sending Link..." : "Reset Password via Mail"}
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* Column 1: Account Information */}
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold mb-4 pb-2 border-bottom d-flex align-items-center gap-2" style={{ fontFamily: "Georgia, serif" }}>
                <FaUser className="text-warning" /> Account & Personal Details
              </h5>

              <div className="d-flex flex-column gap-3">
                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted extra-small d-block text-uppercase fw-semibold">Full Name</span>
                    <strong className="text-dark fs-6">{profileData.full_name}</strong>
                  </div>
                  <FaUser className="text-secondary opacity-50 fs-5" />
                </div>

                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted extra-small d-block text-uppercase fw-semibold">Email Address</span>
                    <strong className="text-dark fs-6">{profileData.email || "Not Provided"}</strong>
                  </div>
                  <FaEnvelope className="text-secondary opacity-50 fs-5" />
                </div>

                {/* Only render Phone Number if user actually filled in a mobile number */}
                {profileData.mobile ? (
                  <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-muted extra-small d-block text-uppercase fw-semibold">Phone Number</span>
                      <strong className="text-dark fs-6">{profileData.mobile}</strong>
                    </div>
                    <FaPhone className="text-secondary opacity-50 fs-5" />
                  </div>
                ) : null}

                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted extra-small d-block text-uppercase fw-semibold">Authentication Engine</span>
                    <strong className="text-dark fs-6">Firebase Auth (v9 SDK)</strong>
                  </div>
                  <FaShieldAlt className="text-success opacity-75 fs-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Gents Tailoring Profile & Body Measurements */}
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold mb-4 pb-2 border-bottom d-flex align-items-center gap-2" style={{ fontFamily: "Georgia, serif" }}>
                <FaRulerCombined className="text-warning" /> Gents Tailoring Measurement Profile
              </h5>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="p-3 border border-light-subtle rounded-3 text-center bg-white shadow-xs">
                    <span className="text-muted extra-small d-block">Chest</span>
                    <span className="fw-bold fs-5 text-dark">{measurements.chest}</span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 border border-light-subtle rounded-3 text-center bg-white shadow-xs">
                    <span className="text-muted extra-small d-block">Waist</span>
                    <span className="fw-bold fs-5 text-dark">{measurements.waist}</span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 border border-light-subtle rounded-3 text-center bg-white shadow-xs">
                    <span className="text-muted extra-small d-block">Shoulder Width</span>
                    <span className="fw-bold fs-5 text-dark">{measurements.shoulder}</span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 border border-light-subtle rounded-3 text-center bg-white shadow-xs">
                    <span className="text-muted extra-small d-block">Sleeve Length</span>
                    <span className="fw-bold fs-5 text-dark">{measurements.sleeve}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-3 text-white mb-3" style={{ background: "linear-gradient(135deg, #b45309 0%, #78350f 100%)" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="extra-small text-white-50 d-block">Recommended Gents Fit</span>
                    <strong className="fs-6">{measurements.jacketSize}</strong>
                  </div>
                  <span className="badge bg-light text-dark rounded-pill px-3 py-1">Custom Fit</span>
                </div>
              </div>

              <div className="text-center mt-auto">
                <p className="extra-small text-muted mb-0">
                  Measurements verified by Owner Masoom Ahmad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rich Footer */}
      <footer className="bg-dark text-white border-top py-4 mt-auto">
        <div className="container">
          <div className="row g-3 align-items-center text-center text-md-start">
            <div className="col-12 col-md-4">
              <h5 className="fw-bold text-warning mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Classic Tailors
              </h5>
              <p className="extra-small text-white-50 mb-0">
                Specialized in Gents Clothes Stitching & Gents Fabric Sales.
              </p>
            </div>

            <div className="col-12 col-md-4 text-center">
              <div className="extra-small text-white-50 mb-1">
                <FaMapMarkerAlt className="text-warning me-1" />
                Ganesh Cinema Road, Chiktoli Gali, Kalyani Chowk, Mirganj
              </div>
              <div className="extra-small text-white-50">
                <FaClock className="text-success me-1" />
                Mon - Sun: 10:00 AM - 9:00 PM (Open All 7 Days)
              </div>
            </div>

            <div className="col-12 col-md-4 text-md-end">
              <div className="extra-small text-white-50">
                Shop Owner: <strong className="text-white">Masoom Ahmad</strong>
              </div>
              <div className="extra-small text-white-50">
                Designed & Managed by: <strong className="text-warning">Faiz Siddique</strong>
              </div>
            </div>
          </div>
          <hr className="my-3 border-secondary" />
          <div className="text-center extra-small text-white-50">
            © {new Date().getFullYear()} Classic Tailors. All rights reserved. Gents Wear Only.
          </div>
        </div>
      </footer>
    </div>
  );
}
