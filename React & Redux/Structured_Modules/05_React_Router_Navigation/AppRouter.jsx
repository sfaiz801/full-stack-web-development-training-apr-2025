import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom';

/**
 * AppRouter Component
 * Demonstrates:
 * - BrowserRouter & Routes
 * - Active NavLink styling
 * - Dynamic route parameters (:id) with useParams()
 * - Programmatic navigation with useNavigate()
 * - 404 Wildcard Route (*)
 */

function Home() {
  return <div className="p-4 bg-slate-900 rounded">Home Dashboard Overview</div>;
}

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-slate-900 rounded space-y-3">
      <h3 className="text-sky-400 font-bold">Course ID: {courseId}</h3>
      <button onClick={() => navigate(-1)} className="px-3 py-1 bg-slate-700 rounded text-sm">
        Go Back
      </button>
    </div>
  );
}

function NotFound() {
  return <div className="p-4 bg-rose-950/40 text-rose-300 rounded">404: Route Not Found</div>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-3 bg-slate-800 rounded mb-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-sky-400 font-bold" : "text-slate-300"}>
          Home
        </NavLink>
        <NavLink to="/courses/react-19" className={({ isActive }) => isActive ? "text-sky-400 font-bold" : "text-slate-300"}>
          React Course
        </NavLink>
        <NavLink to="/courses/fastapi" className={({ isActive }) => isActive ? "text-sky-400 font-bold" : "text-slate-300"}>
          FastAPI Course
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
