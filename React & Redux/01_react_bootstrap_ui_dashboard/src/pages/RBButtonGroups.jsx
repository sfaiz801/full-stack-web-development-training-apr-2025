import { useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";

function RBButtonGroups() {
    const [alignment, setAlignment] = useState("left");

    const textStyle = {
        textAlign: alignment
    };

    return (
        <div className="mb-5">
            <h3>Button Groups</h3>

            <ButtonGroup className="mb-3">
                <Button
                    variant={alignment === "left" ? "primary" : "outline-primary"}
                    onClick={() => setAlignment("left")}
                >
                    Left
                </Button>

                <Button
                    variant={alignment === "center" ? "primary" : "outline-primary"}
                    onClick={() => setAlignment("center")}
                >
                    Center
                </Button>

                <Button
                    variant={alignment === "right" ? "primary" : "outline-primary"}
                    onClick={() => setAlignment("right")}
                >
                    Right
                </Button>
            </ButtonGroup>

            <Card className="p-3">
                <p style={textStyle}>
                    Here, the actions of the above buttons will be reflected.
                </p>
            </Card>
        </div>
    );
}

export default RBButtonGroups;
