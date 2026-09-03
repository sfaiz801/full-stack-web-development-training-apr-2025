import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import {
    CalendarFill,
    ClockHistory,
    CurrencyRupee,
} from "react-bootstrap-icons";

const projectDetails = [
    {
        icon: <CalendarFill size={15} className="text-primary me-2" />,
        label: "Start Date",
        value: "01 Jul, 2025",
    },
    {
        icon: <CalendarFill size={15} className="text-primary me-2" />,
        label: "End Date",
        value: "31 Dec, 2025",
    },
    {
        icon: <ClockHistory size={15} className="text-warning me-2" />,
        label: "Estimate Time",
        value: "5 Months",
    },
    {
        icon: <CurrencyRupee size={15} className="text-primary me-2" />,
        label: "Estimate Cost",
        value: "₹ 5,80,000",
    },
];

const ProjectTabs = () => {
    return (
        <Container className="mt-4">
            <Tabs defaultActiveKey="overview" className="mb-3 border-bottom">
                {/* ── Overview Tab ── */}
                <Tab eventKey="overview" title="Overview">
                    <p className="text-secondary mb-4" style={{ fontSize: "15px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus tellus,
                        ultricies quis orci ac, volutpat rhoncus lacus. Sed tempor arcu vitae neque
                        mollis rutrum ac a odio. Donec sit amet ex in est dictum imperdiet.
                    </p>

                    {projectDetails.map((item, i) => (
                        <Row
                            key={i}
                            className="align-items-center py-3 border-top"
                        >
                            <Col className="d-flex align-items-center fw-semibold text-dark">
                                {item.icon}
                                {item.label}
                            </Col>
                            <Col className="text-end text-secondary fw-medium">
                                {item.value}
                            </Col>
                        </Row>
                    ))}
                </Tab>

                {/* ── Other Tabs ── */}
                <Tab eventKey="scope" title="Project Scope">
                    <p className="text-secondary">Project scope details go here.</p>
                </Tab>

                <Tab eventKey="team" title="Team Members">
                    <p className="text-secondary">Team members list goes here.</p>
                </Tab>

                <Tab eventKey="tasks" title="Tasks">
                    <p className="text-secondary">Tasks list goes here.</p>
                </Tab>

                <Tab eventKey="chat" title="Chat">
                    <p className="text-secondary">Chat section goes here.</p>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default ProjectTabs;