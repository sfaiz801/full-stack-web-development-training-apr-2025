import Figure from "react-bootstrap/Figure";
import figureImage from "../assets/images/figure-image.png";

function RBFigure() {
    return (
        <div className="p-3">
            <Figure className="border p-2 rounded shadow-sm bg-white">
                <Figure.Image
                    alt="React Features Diagram"
                    src={figureImage}
                    className="rounded img-fluid"
                />
                <Figure.Caption className="mt-3 text-secondary fs-5">
                    Image Resource :{" "}
                    <a
                        href="https://google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none"
                    >
                        Google.com
                    </a>
                </Figure.Caption>
            </Figure>
        </div>
    );
}

export default RBFigure;