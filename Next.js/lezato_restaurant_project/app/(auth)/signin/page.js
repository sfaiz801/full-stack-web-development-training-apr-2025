"use client";

import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";

const API_URL = "https://69e9c09b15c7e2d51268ab44.mockapi.io/v1/users";

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Server error. Please try again.");

      const users = await res.json();

      const matchedUser = users.find(
        (u) =>
          u.name?.toLowerCase() === formData.name.toLowerCase() &&
          u.password === formData.password
      );

      if (matchedUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        router.push("/dashboard");
      } else {
        setError("Invalid name or password. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "400px" }} className="p-4 shadow">
            <h3 className="text-center mb-4">Sign In</h3>

            <Form onSubmit={handleSubmit}>

              {/* Error Message */}
              {error && (
                <div
                  className="alert alert-danger py-2 px-3 mb-3"
                  style={{ fontSize: "0.85rem", borderRadius: "8px" }}
                >
                  {error}
                </div>
              )}

              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-100"
                disabled={loading}
                style={{ background: "#f26522", border: "none", borderRadius: "8px" }}
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small>
                Don't have an account? <a href="/signup">Sign Up</a>
              </small>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}