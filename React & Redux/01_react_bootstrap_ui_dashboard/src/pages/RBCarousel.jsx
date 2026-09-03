import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Container, Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

const slides = [
    {
        img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
        title: "First Slide",
        desc: "This is the first slide.",
    },
    {
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        title: "Second Slide",
        desc: "This is the second slide.",
    },
    {
        img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80",
        title: "Third Slide",
        desc: "This is the third slide.",
    },
];

const RBCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "900px" }}>

            {/* Carousel with rounded corners */}
            <div style={{ borderRadius: "16px", overflow: "hidden" }}>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    indicators={false}
                    controls={true}
                    prevIcon={
                        <span
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                border: "2px solid rgba(255,255,255,0.7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(255,255,255,0.15)",
                            }}
                        >
                            <ArrowLeft size={16} color="white" />
                        </span>
                    }
                    nextIcon={
                        <span
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                border: "2px solid rgba(255,255,255,0.7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(255,255,255,0.15)",
                            }}
                        >
                            <ArrowRight size={16} color="white" />
                        </span>
                    }
                >
                    {slides.map((slide, i) => (
                        <Carousel.Item key={i}>
                            <img
                                src={slide.img}
                                alt={slide.title}
                                style={{
                                    width: "100%",
                                    height: "420px",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <Carousel.Caption>
                                <h5 className="fw-bold">{slide.title}</h5>
                                <p>{slide.desc}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* Dots Indicator */}
            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: i === index ? "#0d6efd" : "#ced4da",
                            display: "inline-block",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                    />
                ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-3">
                <Button variant="primary" onClick={handlePrev} className="px-4">
                    <ArrowLeft size={16} className="me-1" /> Prev
                </Button>
                <Button variant="primary" onClick={handleNext} className="px-4">
                    Next <ArrowRight size={16} className="ms-1" />
                </Button>
            </div>

        </Container>
    );
};

export default RBCarousel;