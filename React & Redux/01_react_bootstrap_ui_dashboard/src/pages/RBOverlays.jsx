import { Button, Container, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

// ── Popover content ──────────────────────────────────────────────────────────
const makePopover = (placement) => (
    <Popover id={`popover-${placement}`}>
        <Popover.Header as="h3">Popover {placement}</Popover.Header>
        <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
        </Popover.Body>
    </Popover>
);

// ── Tooltip content ───────────────────────────────────────────────────────────
const makeTooltip = (placement) => (
    <Tooltip id={`tooltip-${placement}`}>
        Tooltip on <strong>{placement}</strong>.
    </Tooltip>
);

const placements = ["top", "right", "bottom", "left"];

const OverlaysDemo = () => {
    return (
        <Container className="mt-5">

            {/* ── Popovers Row ── */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                {placements.map((placement) => (
                    <OverlayTrigger
                        key={placement}
                        trigger="click"
                        placement={placement}
                        overlay={makePopover(placement)}
                        rootClose
                    >
                        <Button variant="outline-secondary">
                            Popover on {placement}
                        </Button>
                    </OverlayTrigger>
                ))}
            </div>

            <hr className="mb-4" />

            {/* ── Tooltips Row ── */}
            <div className="d-flex flex-wrap gap-2">
                {placements.map((placement) => (
                    <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={makeTooltip(placement)}
                    >
                        <Button variant="secondary">
                            Tooltip on {placement}
                        </Button>
                    </OverlayTrigger>
                ))}
            </div>

        </Container>
    );
};

export default OverlaysDemo;