import { Card, Button, Row, Col, Container } from "react-bootstrap";

const products = [
    {
        id: 1,
        title: "Bluetooth Headphones",
        image: "/src/assets/images/headphones.webp",
        description:
            "40mm Bass Drivers, 60ms Low Latency, Fast Charging, Bluetooth 5.4",
        price: "₹1,399",
        oldPrice: "₹3,999",
    },
    {
        id: 2,
        title: "Gaming Headphone",
        image: "/src/assets/images/headphones.webp",
        description:
            "RGB Lights, Dual Pairing, 70H Playtime, Detachable Mic",
        price: "₹1,399",
        oldPrice: "₹3,999",
    },
    {
        id: 3,
        title: "boAt Rockerz 450",
        image: "/src/assets/images/headphones.webp",
        description:
            "15H Battery, Integrated Controls, Wireless Bluetooth",
        price: "₹1,399",
        oldPrice: "₹3,999",
    },
];

const RBCards = () => {
    return (
        <Container className="mt-4">
            <h4 className="mb-4">Product Cards</h4>

            <Row>
                {products.map((item) => (
                    <Col md={4} key={item.id} className="mb-4">
                        <Card className="h-100 card-custom">
                            <Card.Img
                                variant="top"
                                src={item.image}
                                className="ratio ratio-1x1"
                            />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text className="text-secondary small">{item.description}</Card.Text>

                                <h6>
                                    {item.price}{" "}
                                    <span className="strike-through">
                                        {item.oldPrice}
                                    </span>
                                </h6>

                                <div className="d-flex gap-2 mt-3">
                                    <Button variant="outline-primary" className="flex-grow-1 btn-custom">
                                        Add To Cart
                                    </Button>
                                    <Button variant="primary" className="flex-grow-1 btn-custom">Buy Now</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RBCards;
