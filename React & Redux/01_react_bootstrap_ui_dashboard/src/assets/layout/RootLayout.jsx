import { useState, useEffect } from 'react';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const nonInteractivePaths = [
    '/badges', '/breadcrumbs', '/buttongroup', '/buttons',
    '/cards', '/figure', '/images', '/listgroup',
    '/pagination', '/progressbar', '/spinner', '/tables'
];

const interactivePaths = [
    '/accordion', '/carousel', '/dropdowns', '/modal',
    '/navbaroffcanvas', '/navtabs', '/overlays', '/forms'
];

const getPageTitle = (pathname) => {
    const map = {
        '/': 'Home',
        '/home': 'Home',
        '/badges': 'Badges',
        '/breadcrumbs': 'Breadcrumbs',
        '/buttongroup': 'Button Group',
        '/buttons': 'Buttons',
        '/cards': 'Cards',
        '/figure': 'Figure',
        '/images': 'Images',
        '/listgroup': 'List Group',
        '/pagination': 'Pagination',
        '/progressbar': 'Progress Bar',
        '/spinner': 'Spinner',
        '/tables': 'Tables',
        '/accordion': 'Accordion',
        '/carousel': 'Carousel',
        '/dropdowns': 'Dropdowns',
        '/modal': 'Modal',
        '/navbaroffcanvas': 'Navbar & Offcanvas',
        '/navtabs': 'Nav Tabs',
        '/overlays': 'Overlays & Tooltips',
        '/forms': 'Forms',
    };
    return map[pathname] || 'React BootStrap';
};

const SidebarLink = ({ to, label }) => (
    <li className="mb-1">
        <NavLink
            to={to}
            className={({ isActive }) =>
                `text-decoration-none d-flex align-items-center gap-2 px-2 py-1 rounded ${isActive
                    ? 'text-primary fw-semibold bg-primary bg-opacity-10'
                    : 'text-dark'
                }`
            }
        >
            <ArrowRight size={15} />
            {label}
        </NavLink>
    </li>
);

const RootLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [openKey, setOpenKey] = useState(
        nonInteractivePaths.includes(location.pathname) ? '0' : '1'
    );

    useEffect(() => {
        if (nonInteractivePaths.includes(location.pathname)) {
            setOpenKey('0');
        } else if (interactivePaths.includes(location.pathname)) {
            setOpenKey('1');
        }
    }, [location.pathname]);

    const handleAccordionToggle = (key) => {
        setOpenKey((prev) => (prev === key ? null : key));
    };

    return (
        <Container fluid className="vh-100 d-flex flex-column">

            {/* Header */}
            <Row className="bg-light py-3 border-bottom">
                <Col>
                    <h1 className="mb-0 fs-4 fw-bold">React BootStrap</h1>
                </Col>
            </Row>

            {/* Main Layout */}
            <Row className="flex-grow-1 overflow-hidden">

                {/* Sidebar */}
                <Col
                    xs={12} sm={12} md={4} lg={3}
                    className="border-end h-100 overflow-auto p-3"
                    style={{ backgroundColor: '#f8f9fa' }}
                >
                    {/* Button click pe Home page pe jao */}
                    <Button
                        className="mb-3 w-100"
                        variant="primary"
                        onClick={() => navigate('/home')}
                    >
                        React BootStrap
                    </Button>

                    <Accordion activeKey={openKey} onSelect={handleAccordionToggle}>

                        {/* Non Interactive */}
                        <Accordion.Item eventKey="0" className="border-0 mb-2">
                            <Accordion.Header>
                                Non Interactive Component
                            </Accordion.Header>
                            <Accordion.Body className="pt-2 pb-1 px-1">
                                <ul className="list-unstyled mb-0">
                                    <SidebarLink to="/badges" label="Badges" />
                                    <SidebarLink to="/breadcrumbs" label="Breadcrumbs" />
                                    <SidebarLink to="/buttongroup" label="ButtonGroup" />
                                    <SidebarLink to="/buttons" label="Buttons" />
                                    <SidebarLink to="/cards" label="Cards" />
                                    <SidebarLink to="/figure" label="Figure" />
                                    <SidebarLink to="/images" label="Images" />
                                    <SidebarLink to="/listgroup" label="ListGroup" />
                                    <SidebarLink to="/pagination" label="Pagination" />
                                    <SidebarLink to="/progressbar" label="ProgressBar" />
                                    <SidebarLink to="/spinner" label="Spinner" />
                                    <SidebarLink to="/tables" label="Tables" />
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Interactive */}
                        <Accordion.Item eventKey="1" className="border-0">
                            <Accordion.Header>
                                Interactive Component
                            </Accordion.Header>
                            <Accordion.Body className="pt-2 pb-1 px-1">
                                <ul className="list-unstyled mb-0">
                                    <SidebarLink to="/accordion" label="Accordion" />
                                    <SidebarLink to="/carousel" label="Carousel" />
                                    <SidebarLink to="/dropdowns" label="Dropdowns" />
                                    <SidebarLink to="/modal" label="Modal" />
                                    <SidebarLink to="/navbaroffcanvas" label="NavbarOffCanvas" />
                                    <SidebarLink to="/navtabs" label="NavTabs" />
                                    <SidebarLink to="/overlays" label="Overlays" />
                                    <SidebarLink to="/forms" label="Forms" />
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </Col>

                {/* Content Area */}
                <Col
                    xs={12} sm={12} md={8} lg={9}
                    className="p-4 h-100 overflow-auto"
                >
                    <h2 className="fs-2 text-primary fw-bold mb-1">
                        {getPageTitle(location.pathname)}
                    </h2>
                    <hr className="mt-2 mb-4" />
                    <Outlet />
                </Col>

            </Row>
        </Container>
    );
};

export default RootLayout;