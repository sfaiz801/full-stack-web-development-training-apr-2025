import { useState } from "react";
import { Container, Pagination } from "react-bootstrap";

const totalPages = 5;

const RBPagination = () => {
    const [activePage, setActivePage] = useState(3);

    return (
        <Container className="mt-4">
            <h5 className="fw-bold mb-1">Pagination</h5>
            <p className="text-secondary mb-3">Active Page : {activePage}</p>

            <Pagination>
                {/* First */}
                <Pagination.First onClick={() => setActivePage(1)} disabled={activePage === 1} />
                {/* Prev */}
                <Pagination.Prev onClick={() => setActivePage((p) => Math.max(1, p - 1))} disabled={activePage === 1} />

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === activePage}
                        onClick={() => setActivePage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}

                {/* Next */}
                <Pagination.Next onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))} disabled={activePage === totalPages} />
                {/* Last */}
                <Pagination.Last onClick={() => setActivePage(totalPages)} disabled={activePage === totalPages} />
            </Pagination>

            <p className="mt-2" style={{ fontSize: "14px" }}>
                <span className="text-danger fw-semibold">Note:</span> Functionality simulation is optional.
            </p>
        </Container>
    );
};

export default RBPagination;