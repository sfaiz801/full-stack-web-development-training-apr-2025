import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { EnvelopeFill } from "react-bootstrap-icons";

const SubscribeModal = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubscribe = () => {
        if (email.trim()) {
            alert(`Subscribed with: ${email}`);
            setEmail("");
            handleClose();
        }
    };

    return (
        <div className="bg-secondary min-vh-100 p-4">
            {/* Subscribe Button */}
            <Button
                variant="primary"
                onClick={handleShow}
                className="d-flex align-items-center gap-2 btn-custom"
            >
                <EnvelopeFill size={15} />
                Subscribe
            </Button>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton className="border-bottom border-light">
                    <Modal.Title className="fw-bold">Don't miss out</Modal.Title>
                </Modal.Header>

                <Modal.Body className="py-4">
                    <p className="text-secondary mb-4">
                        Signup for our newsletter to stay upto date.
                    </p>

                    <InputGroup>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={handleSubscribe}
                        >
                            Subscribe
                        </Button>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SubscribeModal;