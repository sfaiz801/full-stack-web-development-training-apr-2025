import React, { useState } from "react";
import { Container, Button, ProgressBar, Card, Badge, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardWidget = () => {
    // 1. State for Progress
    const [progress, setProgress] = useState(5);

    // 2. Handlers for Buttons
    const handleIncrease = () => {
        setProgress((prev) => (prev + 5 <= 100 ? prev + 5 : 100));
    };

    const handleDecrease = () => {
        setProgress((prev) => (prev - 5 >= 0 ? prev - 5 : 0));
    };

    return (
        <Container className="py-5" style={{ maxWidth: "800px" }}>

            {/* --- CONTROL BUTTONS --- */}
            <div className="mb-4">
                <Button variant="primary" className="me-2" onClick={handleIncrease}>
                    Progress + 5%
                </Button>
                <Button variant="primary" onClick={handleDecrease}>
                    Progress - 5%
                </Button>
            </div>

            {/* --- UPPER PROGRESS BARS --- */}
            <div className="mb-5">
                <p className="fw-bold mb-1">Completed {progress}%</p>

                {/* Green Bar (Thinner as requested) */}
                <ProgressBar
                    variant="success"
                    now={progress}
                    label={`${progress}%`}
                    className="mb-2"
                    style={{ height: "12px", fontSize: "8px", lineHeight: "12px" }}
                />

                {/* Red Bar (Static small error bar matching design) */}
                <ProgressBar
                    variant="danger"
                    now={5}
                    style={{ height: "8px" }}
                />
            </div>

            <hr className="my-5" />

            {/* --- DASHBOARD CARD --- */}
            <Card className="shadow-sm" style={{ width: "350px", borderRadius: "10px" }}>
                <Card.Body>
                    <Card.Title className="fw-bold">Bootstrap Dashboard Application</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">Web Development</Card.Subtitle>

                    <Card.Text className="text-secondary" style={{ fontSize: "0.95rem" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Card.Text>

                    {/* Badge */}
                    <Badge bg="info" className="mb-3 text-white p-2">In Progress</Badge>

                    {/* Card Progress Bar (Linked to State) */}
                    <div className="mb-2">
                        <span className="text-info fw-bold" style={{ fontSize: "0.8rem" }}>{progress}%</span>
                        <ProgressBar
                            variant="info"
                            now={progress}
                            style={{ height: "6px" }}
                        />
                    </div>
                </Card.Body>

                {/* Card Footer */}
                <Card.Footer className="bg-light border-top py-3">
                    <Row className="text-center align-items-center">
                        <Col className="border-end">
                            <small className="text-muted d-block text-start ps-3">Due Date:</small>
                            <span className="fw-bold text-start d-block ps-3">1 Jan, 2022</span>
                        </Col>
                        <Col>
                            <small className="text-muted d-block text-start ps-3">Budget:</small>
                            <span className="fw-bold text-start d-block ps-3">$123,000</span>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>

        </Container>
    );
};

export default DashboardWidget;