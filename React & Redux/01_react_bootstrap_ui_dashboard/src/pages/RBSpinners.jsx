import { useState, useRef } from "react";
import { Button, Spinner, Container } from "react-bootstrap";

const SubmitWithSpinner = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const timerRef = useRef(null);

    const handleSubmit = () => {
        setIsSubmitting(true);
        timerRef.current = setTimeout(() => {
            setIsSubmitting(false);
            alert("Submitted successfully!");
        }, 5000);
    };

    const handleCancel = () => {
        clearTimeout(timerRef.current);
        setIsSubmitting(false);
    };

    return (
        <Container className="mt-4">
            {/* Default UI */}
            <p className="fw-bold mb-2">Default UI</p>
            <div className="d-flex gap-2 mb-4">
                <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                    Click to Submit
                </Button>
                <Button variant="danger" onClick={handleCancel} style={{ opacity: isSubmitting ? 1 : 0.5 }}>
                    Cancel
                </Button>
            </div>

            {/* Submitting state description */}
            <p className="fw-bold mb-2">
                UI on clicking Submit button, here on clicking Cancel button, submit process will be stopped.
            </p>
            <div className="d-flex gap-2">
                <Button variant="primary" disabled>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Submitting
                </Button>
                <Button variant="danger" onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
        </Container>
    );
};

export default SubmitWithSpinner;