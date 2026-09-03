import { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

function RBButtons() {
    const [text, setText] = useState("Here, the actions of the above buttons will be reflected.");
    const [isEditing, setIsEditing] = useState(false);

    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [strike, setStrike] = useState(false);

    const textStyle = {
        fontWeight: bold ? "bold" : "normal",
        fontStyle: italic ? "italic" : "normal",
        textDecoration: `
    ${underline ? "underline" : ""}
    ${strike ? " line-through" : ""}
    `
    };

    return (
        <div className="mb-5">
            <h3>Button Styles</h3>

            <Button className="me-2">Normal Button</Button>

            <Button className="me-2" onClick={() => setIsEditing(!isEditing)}>
                <Pencil className="me-1" />
                Edit Record
            </Button>

            <Button variant="outline-primary" className="me-2">
                Outline Button
            </Button>

            <Button disabled>Disabled Button</Button>

            <hr />

            <h3>Button Types</h3>

            <Button as="a" href="#" className="me-2">
                Link
            </Button>

            <Button className="me-2">Button</Button>

            <Button as="input" type="button" value="Input" className="me-2" />

            <Button type="submit" className="me-2">
                Submit
            </Button>

            <Button type="reset">Reset</Button>

            <hr />

            <h3>Toggle Buttons</h3>

            <ButtonGroup className="mb-3">
                <Button
                    variant={bold ? "primary" : "outline-primary"}
                    onClick={() => setBold(!bold)}
                >
                    B
                </Button>

                <Button
                    variant={italic ? "primary" : "outline-primary"}
                    onClick={() => setItalic(!italic)}
                >
                    I
                </Button>

                <Button
                    variant={underline ? "primary" : "outline-primary"}
                    onClick={() => setUnderline(!underline)}
                >
                    U
                </Button>

                <Button
                    variant={strike ? "primary" : "outline-primary"}
                    onClick={() => setStrike(!strike)}
                >
                    S
                </Button>
            </ButtonGroup>

            {isEditing ? (
                <Form.Control
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            ) : (
                <p style={textStyle}>{text}</p>
            )}
        </div>
    );
}

export default RBButtons;
