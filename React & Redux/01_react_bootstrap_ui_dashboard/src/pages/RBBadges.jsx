import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import { Cart, Telephone, Brush } from "react-bootstrap-icons";

function RBBadges() {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="mb-4">
                        React BootStrap <span className="text-primary">Components</span>
                    </h1>

                    <h3 className="mb-3">Badges</h3>

                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Payment Date</th>
                                <th>Payment Status</th>
                                <th>Employment Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Joseph Oden</td>
                                <td><Cart className="me-2" />Sales</td>
                                <td>$64,000</td>
                                <td>Aug 3, 2024</td>
                                <td><Badge bg="primary">Pending</Badge></td>
                                <td>Full-Time</td>
                            </tr>

                            <tr>
                                <td>Carol Brown</td>
                                <td><Telephone className="me-2" />Support</td>
                                <td>$82,000</td>
                                <td>Aug 6, 2024</td>
                                <td><Badge bg="warning">Negotiating</Badge></td>
                                <td>Part-Time</td>
                            </tr>

                            <tr>
                                <td>Peggy Castello</td>
                                <td><Brush className="me-2" />Design</td>
                                <td>$120,000</td>
                                <td>Aug 13, 2024</td>
                                <td><Badge bg="danger">Failed</Badge></td>
                                <td>Full-Time</td>
                            </tr>

                            <tr>
                                <td>Katherine Grey</td>
                                <td><Cart className="me-2" />Sales</td>
                                <td>$75,000</td>
                                <td>Aug 19, 2024</td>
                                <td><Badge bg="success">Paid</Badge></td>
                                <td>Full-Time</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default RBBadges;
