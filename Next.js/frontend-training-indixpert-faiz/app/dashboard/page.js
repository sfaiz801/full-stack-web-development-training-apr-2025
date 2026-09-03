"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  FaCut,
  FaClock,
  FaAward,
  FaRulerCombined,
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaTshirt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStore,
  FaUser,
  FaGem,
  FaMagic,
  FaCalendarCheck,
  FaChevronRight,
  FaMale,
  FaBuilding,
  FaEnvelope
} from "react-icons/fa";

import { userService } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { logout, user: authUser } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);
  
  const [userProfile, setUserProfile] = useState({
    name: authUser?.full_name || "Client User",
    email: authUser?.email || "user@example.com",
    mobile: authUser?.mobile || "+91 98765 43210",
  });

  useEffect(() => {
    userService.getProfile()
      .then((data) => {
        if (data?.full_name) {
          setUserProfile((prev) => ({
            ...prev,
            name: data.full_name,
            email: data.email || prev.email,
          }));
        }
      })
      .catch(() => {});
  }, [authUser]);

  const handleLogout = () => {
    logout();
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Metrics Stat Cards
  const statsCards = [
    { title: "Gents Custom Orders", value: "3 Active", subtitle: "2 Suits in Stitching", icon: <FaCut />, colorClass: "emerald" },
    { title: "Body Measurements", value: "Laser Verified", subtitle: "Gents Size Logged", icon: <FaRulerCombined />, colorClass: "amber" },
    { title: "Fittings Completed", value: "6 Sessions", subtitle: "100% Fit Guarantee", icon: <FaTshirt />, colorClass: "indigo" },
    { title: "Gents Tailoring Club", value: "Gold Member", subtitle: "Priority Stitching", icon: <FaGem />, colorClass: "rose" },
  ];

  // Gents Clothing Collection & Stitching Items Offered
  const gentsCollection = [
    { name: "Gents 3-Piece Suit (Stitching & Fabric)", category: "Male Formal Wear", price: "₹14,999", tag: "Stitching + Fabric", badgeColor: "bg-warning text-dark" },
    { name: "Gents Designer Sherwani", category: "Male Wedding Collection", price: "₹18,999", tag: "Royal Heritage", badgeColor: "bg-primary text-white" },
    { name: "Gents Blazer & Jacket", category: "Male Occasion Wear", price: "₹8,499", tag: "Best Fitting", badgeColor: "bg-danger text-white" },
    { name: "Gents Kurta Pajama Set", category: "Male Ethnic Wear", price: "₹4,999", tag: "Festive Collection", badgeColor: "bg-success text-white" },
    { name: "Gents Shirt & Trouser Stitching", category: "Male Daily Wear", price: "₹2,199", tag: "Perfect Fit", badgeColor: "bg-info text-dark" },
  ];

  // Active Custom Gents Orders
  const gentsOrders = [
    { 
      id: 1, 
      title: "3-Piece Charcoal Wool Suit (Gents)", 
      progress: 85, 
      tailor: "Masoom Ahmad (Owner & Master Tailor)", 
      status: "Final Trial & Fitting", 
      tag: "Gents Suit",
      initials: "MA",
      bgColor: "bg-warning"
    },
    { 
      id: 2, 
      title: "Gents Navy Double-Breasted Blazer", 
      progress: 45, 
      tailor: "Master Tailor Team", 
      status: "Stitching & Lining", 
      tag: "Gents Jacket",
      initials: "CT",
      bgColor: "bg-indigo text-white",
      styleBg: "#4f46e5"
    },
    { 
      id: 3, 
      title: "Gents Cotton Formal Shirt (White)", 
      progress: 95, 
      tailor: "Masoom Ahmad", 
      status: "Ready for Pickup", 
      tag: "Gents Shirt",
      initials: "MA",
      bgColor: "bg-success"
    },
  ];

  const fittingActivities = [
    { title: "Chest & Shoulder Measurement Logged", time: "Yesterday", status: "Verified by Owner Masoom Ahmad", icon: <FaCheckCircle className="text-success fs-5" /> },
    { title: "Imported Italian Wool Approved", time: "3 days ago", status: "Premium Gents Fabric", icon: <FaCheckCircle className="text-success fs-5" /> },
    { title: "Gents Fitting Session Booked", time: "5 days ago", status: "Confirmed for Saturday 4 PM", icon: <FaCalendarCheck className="text-warning fs-5" /> },
  ];

  return (
    <div className="dashboard-container min-vh-100 d-flex flex-column">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4 shadow-sm glass-nav sticky-top">
        <div className="container-fluid container">
          <Link href="/dashboard" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <span className="bg-warning text-dark rounded-circle px-2 py-1 fs-6 fw-bold shadow-sm">CT</span>
            <span style={{ fontFamily: "Georgia, serif" }} className="fs-5 tracking-tight">Classic Tailors</span>
          </Link>

          <div className="d-flex align-items-center gap-2 ms-auto">
            {/* Notification Bell with Dropdown */}
            <div className="position-relative" ref={notifRef}>
              <button
                onClick={() => setShowNotif((prev) => !prev)}
                className="btn btn-outline-light btn-sm position-relative rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <FaBell />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-warning border border-dark rounded-circle"></span>
              </button>

              {showNotif && (
                <div
                  className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border border-light"
                  style={{ minWidth: "240px", zIndex: 9999, top: "100%" }}
                >
                  {/* Dropdown Header */}
                  <div className="px-3 py-2 border-bottom d-flex align-items-center justify-content-between">
                    <span className="small fw-bold text-dark">Notifications</span>
                    <span className="badge bg-warning text-dark rounded-pill" style={{ fontSize: "0.65rem" }}>1</span>
                  </div>
                  {/* Notification Item */}
                  <div className="px-3 py-2 d-flex align-items-start gap-2">
                    <div
                      className="rounded-circle bg-warning bg-opacity-15 d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <FaUserCircle style={{ color: "#d97706", fontSize: "0.9rem" }} />
                    </div>
                    <div>
                      <div className="small fw-semibold text-dark" style={{ lineHeight: 1.3 }}>Update your profile</div>
                      <div style={{ fontSize: "0.72rem" }} className="text-muted mt-1">Keep your details up to date for the best experience.</div>
                      <Link
                        href="/profile"
                        onClick={() => setShowNotif(false)}
                        className="small fw-bold text-decoration-none mt-1 d-inline-block"
                        style={{ color: "#b45309" }}
                      >
                        Go to Profile →
                      </Link>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-top text-center">
                    <button
                      onClick={() => setShowNotif(false)}
                      className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                      style={{ fontSize: "0.72rem" }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link href="/profile" className="d-none d-sm-flex align-items-center gap-2 text-white bg-white bg-opacity-10 px-2 px-sm-3 py-1 rounded-pill border border-white border-opacity-25 text-decoration-none hover-primary">
              <FaUserCircle className="fs-5 text-warning" />
              <span className="small fw-semibold user-name-truncate">{userProfile.name}</span>
            </Link>

            <Link href="/profile" className="d-flex d-sm-none align-items-center justify-content-center text-white bg-white bg-opacity-10 rounded-circle border border-white border-opacity-25" style={{ width: "36px", height: "36px" }}>
              <FaUserCircle className="fs-5 text-warning" />
            </Link>

            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 rounded-pill px-2 px-sm-3 fw-semibold">
              <FaSignOutAlt />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4 flex-grow-1">
        {/* Welcome Hero Banner */}
        <div className="hero-gradient-card rounded-4 p-4 mb-4 text-white shadow-lg d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1 extra-small">
                <FaMale className="me-1" /> Exclusive Gents Wear & Tailoring
              </span>
              <span className="badge bg-white bg-opacity-25 text-white rounded-pill px-3 py-1 extra-small d-none d-sm-inline-flex">
                Owner: Masoom Ahmad
              </span>
            </div>
            <h2 className="fw-bold mb-1 text-white" style={{ fontFamily: "Georgia, serif" }}>
              Welcome, {userProfile.name}! ✂️
            </h2>
            <p className="mb-0 small text-white-50">
              Specialized in Gents Clothes Stitching & Fabric Sales.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0" style={{ position: "relative", zIndex: 2 }}>
            <Link href="/profile" className="btn btn-warning text-dark btn-sm px-3 py-1 rounded-3 fw-bold shadow-sm d-flex align-items-center gap-2 w-100 w-md-auto justify-content-center">
              <FaUser /> View Profile
            </Link>
          </div>
        </div>

        {/* Metrics Overview Row */}
        <div className="row g-3 mb-4">
          {statsCards.map((card, idx) => (
            <div key={idx} className="col-6 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm bg-white p-3 h-100 stat-card-gradient">
                <div className="d-flex align-items-center gap-2 gap-sm-3">
                  <div className={`icon-wrapper-colorful ${card.colorClass}`}>
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted extra-small d-block text-uppercase fw-semibold" style={{ fontSize: "0.68rem" }}>{card.title}</span>
                    <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.25rem)" }}>{card.value}</h4>
                    <span className="extra-small text-muted">{card.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shop Location, Owner & Timings Information */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2" style={{ fontFamily: "Georgia, serif" }}>
              <FaStore className="text-warning" /> Classic Tailors Shop Details
            </h5>
            <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1 extra-small fw-bold">
              ● Open Today (Gents Wear Only)
            </span>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="p-3 store-info-box amber-box h-100">
                <div className="d-flex align-items-center gap-2 text-warning mb-1">
                  <FaMapMarkerAlt /> <strong className="text-dark small">Shop Full Address</strong>
                </div>
                <p className="extra-small text-dark mb-0 fw-medium">
                  Ganesh Cinema Road, Chiktoli Gali, Kalyani Chowk, Mirganj
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 store-info-box emerald-box h-100">
                <div className="d-flex align-items-center gap-2 text-success mb-1">
                  <FaClock /> <strong className="text-dark small">Shop Timings</strong>
                </div>
                <p className="extra-small text-dark mb-0 fw-medium">
                  Mon - Sun: 10:00 AM - 9:00 PM <br />
                  (Open All 7 Days)
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 store-info-box indigo-box h-100">
                <div className="d-flex align-items-center gap-2 text-primary mb-1">
                  <FaUser /> <strong className="text-dark small">Ownership & Management</strong>
                </div>
                <p className="extra-small text-dark mb-0 fw-medium">
                  Shop Owner: <strong>Masoom Ahmad</strong> <br />
                  Design & Managed by: <strong>Faiz Siddique</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gents Clothing & Stitching Items Collection */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <h5 className="fw-bold mb-0 text-dark" style={{ fontFamily: "Georgia, serif" }}>
              <FaMale className="text-warning me-2" /> Gents Wear & Stitching
            </h5>
            <span className="extra-small text-muted fw-semibold d-none d-sm-inline">Only Gents Clothes & Stitching</span>
          </div>

          <div className="row g-3">
            {gentsCollection.map((item, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg">
                <div className="p-3 bg-white collection-card text-center h-100">
                  <span className={`badge ${item.badgeColor} rounded-pill px-3 py-1 extra-small mb-2 fw-semibold`}>
                    {item.tag}
                  </span>
                  <h6 className="fw-bold mb-1 fs-6 text-dark">{item.name}</h6>
                  <span className="extra-small text-muted d-block mb-2">{item.category}</span>
                  <div className="p-2 bg-light rounded-3">
                    <strong className="text-dark fs-6">{item.price}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section: Orders & Fittings */}
        <div className="row g-4">
          {/* Active Orders List */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 text-dark" style={{ fontFamily: "Georgia, serif" }}>
                  Ongoing Gents Stitching Orders
                </h5>
                <span className="badge bg-warning-subtle text-dark rounded-pill px-3 py-2 fw-bold">
                  3 Active Orders
                </span>
              </div>

              <div className="d-flex flex-column gap-3">
                {gentsOrders.map((order) => (
                  <div key={order.id} className="p-3 rounded-3 border border-light-subtle bg-white shadow-xs">
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <div 
                        className="tailor-badge-avatar shadow-sm"
                        style={{ background: order.styleBg || "#d97706" }}
                      >
                        {order.initials}
                      </div>

                      <div className="flex-grow-1 min-w-0">
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <div className="min-w-0">
                            <span className="badge bg-secondary-subtle text-secondary mb-1 extra-small">{order.tag}</span>
                            <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "clamp(0.82rem, 2.5vw, 1rem)", lineHeight: 1.3 }}>{order.title}</h6>
                          </div>
                          <span className="small fw-bold text-warning flex-shrink-0">{order.progress}%</span>
                        </div>
                        <small className="text-muted extra-small d-block mt-1">
                          <span className="d-none d-sm-inline">Master Tailor / Owner: </span><strong className="text-dark">{order.tailor}</strong>
                          <span className="mx-1">•</span><strong className="text-dark">{order.status}</strong>
                        </small>
                      </div>
                    </div>

                    <div className="progress progress-animated mb-2">
                      <div
                        className="progress-bar bar-glow"
                        role="progressbar"
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center extra-small text-muted">
                      <span>Stitching Phase: {order.status}</span>
                      <span className="fw-semibold text-warning d-flex align-items-center gap-1">
                        In Progress <FaChevronRight className="extra-small" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Activity & Support */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
              <h5 className="fw-bold mb-3 text-dark" style={{ fontFamily: "Georgia, serif" }}>
                Fitting Session History
              </h5>
              <div className="d-flex flex-column gap-3">
                {fittingActivities.map((act, index) => (
                  <div key={index} className="d-flex align-items-start gap-3 pb-3 border-bottom border-light">
                    <div>{act.icon}</div>
                    <div>
                      <div className="small fw-bold text-dark">{act.title}</div>
                      <div className="text-muted extra-small">{act.status}</div>
                      <div className="text-warning extra-small fw-semibold">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shop Owner Contact Banner */}
            <div 
              className="card border-0 shadow-sm rounded-4 p-4 text-white" 
              style={{ background: "linear-gradient(135deg, #b45309 0%, #78350f 100%)" }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaMagic className="text-warning fs-5" />
                <h6 className="fw-bold mb-0">Need Gents Stitching Support?</h6>
              </div>
              <p className="small opacity-75 mb-3">
                Contact Shop Owner Masoom Ahmad or Designer Faiz Siddique for fitting adjustments.
              </p>
              <Link href="/profile" className="btn btn-light btn-sm fw-bold text-dark rounded-pill px-4 shadow-sm">
                Contact Shop Owner
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rich Detailed Footer */}
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
