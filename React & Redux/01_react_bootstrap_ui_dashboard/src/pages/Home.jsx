import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const nonInteractive = [
    { to: "/badges", label: "Badges" },
    { to: "/breadcrumbs", label: "Breadcrumbs" },
    { to: "/buttongroup", label: "ButtonGroup" },
    { to: "/buttons", label: "Buttons" },
    { to: "/cards", label: "Cards" },
    { to: "/figure", label: "Figure" },
    { to: "/images", label: "Images" },
    { to: "/listgroup", label: "ListGroup" },
    { to: "/pagination", label: "Pagination" },
    { to: "/progressbar", label: "ProgressBar" },
    { to: "/spinner", label: "Spinner" },
    { to: "/tables", label: "Tables" },
];

const interactive = [
    { to: "/accordion", label: "Accordion" },
    { to: "/carousel", label: "Carousel" },
    { to: "/dropdowns", label: "Dropdowns" },
    { to: "/modal", label: "Modal" },
    { to: "/navbaroffcanvas", label: "Navbar & Offcanvas" },
    { to: "/navtabs", label: "NavTabs" },
    { to: "/overlays", label: "Overlays" },
    { to: "/forms", label: "Forms" },
];

const Home = () => {
    return (
        <Container className="py-2">
            <div className="mb-4">
                <h3 className="fw-bold">
                    React BootStrap <span className="text-primary">Components</span>
                </h3>
                <p className="text-secondary">
                    Explore all React Bootstrap components with live examples.
                    Click any component below to see it in action.
                </p>
            </div>

            <Row className="g-4">
                <Col md={6}>
                    <Card className="h-100 shadow-sm border">
                        <Card.Header className="bg-white fw-semibold d-flex align-items-center justify-content-between">
                            Non Interactive Components
                            <Badge bg="secondary" pill>{nonInteractive.length}</Badge>
                        </Card.Header>
                        <Card.Body>
                            <ul className="list-unstyled mb-0">
                                {nonInteractive.map((item) => (
                                    <li key={item.to} className="mb-2">
                                        <Link
                                            to={item.to}
                                            className="text-decoration-none text-dark d-flex align-items-center gap-2"
                                        >
                                            <ArrowRight size={14} className="text-secondary" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="h-100 shadow-sm border">
                        <Card.Header className="bg-white fw-semibold d-flex align-items-center justify-content-between">
                            Interactive Components
                            <Badge bg="primary" pill>{interactive.length}</Badge>
                        </Card.Header>
                        <Card.Body>
                            <ul className="list-unstyled mb-0">
                                {interactive.map((item) => (
                                    <li key={item.to} className="mb-2">
                                        <Link
                                            to={item.to}
                                            className="text-decoration-none text-dark d-flex align-items-center gap-2"
                                        >
                                            <ArrowRight size={14} className="text-secondary" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;