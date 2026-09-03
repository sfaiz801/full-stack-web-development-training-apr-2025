import { Card, ListGroup } from "react-bootstrap";
import {
    Facebook,
    Instagram,
    Youtube,
    TwitterX,
    Linkedin,
} from "react-bootstrap-icons";

const RBListGroup = () => {
    const socialData = [
        {
            id: 1,
            name: "Facebook",
            icon: <Facebook color="#1877F2" size={20} />,
            percent: "20%",
        },
        {
            id: 2,
            name: "Instagram",
            icon: <Instagram color="#E4405F" size={20} />,
            percent: "20%",
        },
        {
            id: 3,
            name: "YouTube",
            icon: <Youtube color="#FF0000" size={20} />,
            percent: "20%",
        },
        {
            id: 4,
            name: "TwitterX",
            icon: <TwitterX color="#000000" size={20} />,
            percent: "20%",
        },
        {
            id: 5,
            name: "LinkedIn",
            icon: <Linkedin color="#0A66C2" size={20} />,
            percent: "20%",
        },
    ];

    return (
        <div className="container mt-4">
            <Card style={{ maxWidth: "450px" }} className="shadow-sm">
                <Card.Body>
                    <Card.Title className="mb-3 fs-4 fw-bold">
                        Social Media Traffic
                    </Card.Title>

                    <ListGroup variant="flush">
                        {socialData.map((item) => (
                            <ListGroup.Item
                                key={item.id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex align-items-center gap-2">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>

                                <span className="fw-semibold">{item.percent}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RBListGroup;
