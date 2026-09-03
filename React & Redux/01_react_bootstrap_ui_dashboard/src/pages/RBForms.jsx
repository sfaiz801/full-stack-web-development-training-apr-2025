import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const RBForms = () => {
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", phone: "", email: "",
        country: "", state: "", city: "", zip: "",
        address: "", sex: "", hobbies: [], resume: null, terms: false,
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // ── Handle Change ──────────────────────────────────────────
    const handleChange = (e) => {
        const { id, value, type, checked, files, name } = e.target;

        if (type === "checkbox" && name === "hobbies") {
            setFormData((prev) => ({
                ...prev,
                hobbies: checked
                    ? [...prev.hobbies, value]
                    : prev.hobbies.filter((h) => h !== value),
            }));
        } else if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [id]: checked }));
        } else if (type === "file") {
            setFormData((prev) => ({ ...prev, resume: files[0] || null }));
        } else if (type === "radio") {
            setFormData((prev) => ({ ...prev, sex: value }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }

        // Clear error on change
        setErrors((prev) => ({ ...prev, [id || name]: "" }));
    };

    // ── Validate ───────────────────────────────────────────────
    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim())
            newErrors.firstName = "First name is required.";

        if (!formData.lastName.trim())
            newErrors.lastName = "Last name is required.";

        if (!formData.phone.trim())
            newErrors.phone = "Phone number is required.";
        else if (!/^\d{10}$/.test(formData.phone))
            newErrors.phone = "Enter valid 10-digit phone number.";

        if (!formData.email.trim())
            newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Enter a valid email address.";

        if (!formData.country || formData.country === "Select country")
            newErrors.country = "Please select a country.";

        if (!formData.state || formData.state === "Select state")
            newErrors.state = "Please select a state.";

        if (!formData.city || formData.city === "Select city")
            newErrors.city = "Please select a city.";

        if (!formData.zip.trim())
            newErrors.zip = "Zip/Pin code is required.";
        else if (!/^\d{6}$/.test(formData.zip))
            newErrors.zip = "Enter valid 6-digit zip code.";

        if (!formData.address.trim())
            newErrors.address = "Address is required.";

        if (!formData.sex)
            newErrors.sex = "Please select your gender.";

        if (formData.hobbies.length === 0)
            newErrors.hobbies = "Select at least one hobby.";

        if (!formData.resume)
            newErrors.resume = "Please upload your resume.";

        if (!formData.terms)
            newErrors.terms = "You must agree to terms and conditions.";

        return newErrors;
    };

    // ── Submit ─────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitted(true);
    };

    // ── Success Screen ─────────────────────────────────────────
    if (submitted) {
        return (
            <Container>
                <div className="text-center py-5">
                    <h3 className="text-success fw-bold">✅ Form Submitted!</h3>
                    <p className="text-secondary">Thank you, {formData.firstName} {formData.lastName}!</p>
                    <Button variant="primary" className="btn-custom" onClick={() => {
                        setSubmitted(false); setFormData({
                            firstName: "", lastName: "", phone: "", email: "",
                            country: "", state: "", city: "", zip: "",
                            address: "", sex: "", hobbies: [], resume: null, terms: false,
                        });
                    }}>
                        Fill Again
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <h5 className="fw-bold mb-4">Registration Details</h5>

            <Form onSubmit={handleSubmit} noValidate>

                {/* Row 1 — First & Last Name */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                                placeholder="Enter first name"
                            />
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last name <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                                placeholder="Enter last name"
                            />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 2 — Phone & Email */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                                placeholder="10-digit number"
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                placeholder="example@mail.com"
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 3 — Country & State */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="country">
                            <Form.Label>Select Country <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                value={formData.country}
                                onChange={handleChange}
                                isInvalid={!!errors.country}
                            >
                                <option>Select country</option>
                                <option>India</option>
                                <option>USA</option>
                                <option>UK</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="state">
                            <Form.Label>Select State <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                value={formData.state}
                                onChange={handleChange}
                                isInvalid={!!errors.state}
                            >
                                <option>Select state</option>
                                <option>Maharashtra</option>
                                <option>Delhi</option>
                                <option>Karnataka</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 4 — City & Zip */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label>Select City <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                value={formData.city}
                                onChange={handleChange}
                                isInvalid={!!errors.city}
                            >
                                <option>Select city</option>
                                <option>Mumbai</option>
                                <option>Pune</option>
                                <option>Bangalore</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="zip">
                            <Form.Label>Zip/Pin Code <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.zip}
                                onChange={handleChange}
                                isInvalid={!!errors.zip}
                                placeholder="6-digit code"
                            />
                            <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 5 — Address */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="address">
                            <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={formData.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                                placeholder="Enter full address"
                            />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 6 — Sex & Hobbies */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Sex <span className="text-danger">*</span></Form.Label>
                        <div className="d-flex gap-3">
                            <Form.Check type="radio" name="sex" label="Male" id="male" value="Male" onChange={handleChange} />
                            <Form.Check type="radio" name="sex" label="Female" id="female" value="Female" onChange={handleChange} />
                        </div>
                        {errors.sex && <div className="text-danger small">{errors.sex}</div>}
                    </Col>
                    <Col md={6}>
                        <Form.Label>Hobbies <span className="text-danger">*</span></Form.Label>
                        <div className="d-flex gap-3">
                            <Form.Check type="checkbox" name="hobbies" label="Drawing" id="drawing" value="Drawing" onChange={handleChange} />
                            <Form.Check type="checkbox" name="hobbies" label="Singing" id="singing" value="Singing" onChange={handleChange} />
                            <Form.Check type="checkbox" name="hobbies" label="Dancing" id="dancing" value="Dancing" onChange={handleChange} />
                        </div>
                        {errors.hobbies && <div className="text-danger small">{errors.hobbies}</div>}
                    </Col>
                </Row>

                {/* Row 7 — Resume */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="resume">
                            <Form.Label>Resume <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleChange}
                                isInvalid={!!errors.resume}
                                accept=".pdf,.doc,.docx"
                            />
                            <Form.Control.Feedback type="invalid">{errors.resume}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 8 — Terms */}
                <Row className="mb-4">
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Agree to terms and conditions"
                            id="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            isInvalid={!!errors.terms}
                            feedback={errors.terms}
                            feedbackType="invalid"
                        />
                    </Col>
                </Row>

                <Button type="submit" variant="primary" className="btn-custom">
                    Submit form
                </Button>

            </Form>
        </Container>
    );
};

export default RBForms;