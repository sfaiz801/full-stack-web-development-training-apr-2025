import { useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";

const items = [
    {
        key: "0",
        question: "What is the cost of an online course ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo hendrerit interdum. Pellentesque id elit ac lorem feugiat congue. Nam odio leo, viverra vitae libero quis, porttitor egestas ex.",
    },
    {
        key: "1",
        question: "Do I need to visit any physical location?",
        answer: "No physical visit is required. All courses are conducted online.",
    },
    {
        key: "2",
        question: "What are the technology requirements?",
        answer: "You need a stable internet connection and a device like a laptop or mobile.",
    },
    {
        key: "3",
        question: "How can I ask questions or clear doubts?",
        answer: "You can ask questions during live sessions or through discussion forums.",
    },
];

const RBAccordion = () => {
    const [activeKey, setActiveKey] = useState("0");

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey === activeKey ? null : eventKey);
    };

    return (
        <Container className="mt-4">
            {/* Default arrow hide */}
            <style>{`
                .custom-accordion .accordion-button::after {
                    display: none !important;
                }
                .custom-accordion .accordion-button {
                    background-color: transparent !important;
                    box-shadow: none !important;
                }
            `}</style>

            <Accordion
                activeKey={activeKey}
                onSelect={handleSelect}
                className="custom-accordion"
            >
                {items.map(({ key, question, answer }) => (
                    <Accordion.Item eventKey={key} key={key} className="border-0 border-bottom">
                        <Accordion.Header as="div">
                            <span className={`fw-bold flex-grow-1 ${activeKey === key ? "text-primary" : "text-dark"}`}>
                                {question}
                            </span>
                            <span className="me-2">
                                {activeKey === key
                                    ? <DashCircle size={20} className="text-primary" />
                                    : <PlusCircle size={20} className="text-dark" />
                                }
                            </span>
                        </Accordion.Header>
                        <Accordion.Body className="text-secondary">
                            {answer}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default RBAccordion;