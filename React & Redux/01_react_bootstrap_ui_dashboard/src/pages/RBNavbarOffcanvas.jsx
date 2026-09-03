import { useState } from "react";
import {
    Navbar, Nav, NavDropdown, Button, Container,
    Offcanvas,
} from "react-bootstrap";
import {
    GlobeAmericas, EnvelopeFill, TelephoneFill,
} from "react-bootstrap-icons";

const RBNavbar = () => {
    const [showContact, setShowContact] = useState(false);

    return (
        <>
            <Navbar bg="white" expand="lg" className="border-bottom shadow-sm px-3 py-2">
                <Container fluid>
                    <Navbar.Brand
                        href="#"
                        className="d-flex align-items-center justify-content-center text-white navbar-brand-logo"
                    >
                        RB
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-navbar" />

                    <Navbar.Collapse id="main-navbar">
                        {/* Left Nav Links */}
                        <Nav className="me-auto align-items-lg-center gap-1">
                            <Nav.Link href="#home" className="text-dark fw-medium">Home</Nav.Link>
                            <Nav.Link href="#services" className="text-dark fw-medium">Services</Nav.Link>

                            {/* Company Dropdown */}
                            <NavDropdown title="Company" id="company-dropdown" className="fw-medium">
                                <NavDropdown.Item href="#about">About Us</NavDropdown.Item>
                                <NavDropdown.Item href="#team">Our Team</NavDropdown.Item>
                                <NavDropdown.Item href="#infra">Infrastructure</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#testimonials">Testimonials</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
                            <Button variant="primary" className="navbar-btn">Login</Button>
                            <Button variant="outline-primary" className="navbar-btn">Sign Up</Button>
                            <Button variant="dark" className="navbar-btn-contact" onClick={() => setShowContact(true)}>
                                Contact
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={showContact} onHide={() => setShowContact(false)} placement="end" className="offcanvas-custom">
                <Offcanvas.Header closeButton className="offcanvas-header-custom">
                    <Offcanvas.Title className="offcanvas-title-custom">Contact Us</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className="p-4">
                    <h5 className="fw-bold mb-4 contact-heading">We are here to help you!</h5>

                    <hr className="mb-4" />

                    <p className="fw-semibold mb-3">Indixpert</p>

                    <div className="mb-4">
                        <p className="d-flex align-items-center gap-2 mb-2 fw-medium text-secondary contact-label">
                            <GlobeAmericas size={14} /> Our Offices
                        </p>
                        <p className="mb-1 ms-4 contact-text">1: Hyderabad, Telangana, India</p>
                        <p className="mb-0 ms-4 contact-text">2: Gurugram, Haryana, India</p>
                    </div>

                    <div className="mb-4">
                        <p className="d-flex align-items-center gap-2 mb-2 fw-medium text-secondary contact-label">
                            <EnvelopeFill size={13} /> Email
                        </p>
                        <p className="mb-0 ms-4 contact-text">contact@indixpert.com</p>
                    </div>

                    <div className="mb-4">
                        <p className="d-flex align-items-center gap-2 mb-2 fw-medium text-secondary contact-label">
                            <TelephoneFill size={13} /> Phone
                        </p>
                        <p className="mb-0 ms-4 contact-text">(+91) 778 899 2897</p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default RBNavbar;