"use client";

import { useState, useRef, useEffect } from "react";
import styles from "@/styles/scss/theme/order.module.css";
import OrdersData from "@/data/OrdersData";
import OrderDetailPage from "./../order-details/page";

const ITEMS_PER_PAGE = 10;

// ── Icons (inline SVG so no extra dep needed) ──────────────────────────────
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const SortIcon = () => <span className={styles.sortIcon}></span>;

const DotsIcon = () => (
  <span style={{ letterSpacing: "1px", fontSize: "16px" }}>•••</span>
);

const AcceptIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const RejectIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

const DetailsIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="#3b82f6"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

// ── Status Badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cls =
    status === "DELIVERED"
      ? styles.statusDelivered
      : status === "CANCELED"
        ? styles.statusCanceled
        : styles.statusPending;

  return <span className={`${styles.statusBadge} ${cls}`}>{status}</span>;
}

// ── Dropdown Menu ──────────────────────────────────────────────────────────
function ActionDropdown({ orderId, onClose, onAction, onDetails }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  return (
    <div className={styles.dropdownMenu} ref={ref}>
      <button
        className={`${styles.dropdownItem} ${styles.acceptItem}`}
        onClick={() => {
          onAction(orderId, "DELIVERED");
          onClose();
        }}
      >
        <AcceptIcon /> Accept Order
      </button>
      <button
        className={`${styles.dropdownItem} ${styles.rejectItem}`}
        onClick={() => {
          onAction(orderId, "CANCELED");
          onClose();
        }}
      >
        <RejectIcon /> Reject Order
      </button>
      <button
        className={`${styles.dropdownItem} ${styles.detailsItem}`}
        onClick={() => {
          onDetails(orderId);
          onClose();
        }}
      >
        <DetailsIcon /> Order Details
      </button>
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────
export default function OrderPage() {
  const [orders, setOrders] = useState(OrdersData);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openMenu, setOpenMenu] = useState(null); // order id with open menu
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDetailId, setSelectedDetailId] = useState(null);

  // Filter by search
  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      String(o.id).toLowerCase().includes(q) ||
      String(o.customerId).includes(q) ||
      o.location.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to page 1 when search changes
  const handleSearch = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  // Checkbox logic
  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const toggleAll = () => {
    const pageIds = paginated.map((o) => o.id);
    const allSelected = pageIds.every((id) => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  // Accept / Reject action
  const handleAction = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  // Pagination helpers
  const goTo = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const pageIds = paginated.map((o) => o.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedRows.includes(id));

  if (selectedDetailId !== null) {
    return (
      <OrderDetailPage
        orderId={selectedDetailId}
        onBack={() => setSelectedDetailId(null)}
      />
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Order Page List</h1>
        <div className={styles.breadcrumb}>
          Order / <span>Order List</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
        </div>
        <div className={styles.toolbarRight}>
          <button className={styles.filterBtn}>
            <FilterIcon /> Filter ▾
          </button>
          <button
            className={styles.refreshBtn}
            title="Refresh"
            onClick={() => {
              setOrders(OrdersData);
              setSearch("");
              setCurrentPage(1);
              setSelectedRows([]);
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                />
              </th>
              <th>
                Order ID <SortIcon />
              </th>
              <th>
                Date <SortIcon />
              </th>
              <th>
                Customer Name <SortIcon />
              </th>
              <th>
                Location <SortIcon />
              </th>
              <th>
                Amount <SortIcon />
              </th>
              <th>
                Status Order <SortIcon />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    padding: "32px",
                    color: "#9ca3af",
                  }}
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              paginated.map((order) => {
                const isSelected = selectedRows.includes(order.id);
                const isMenuOpen = openMenu === order.id;

                return (
                  <tr
                    key={order.id}
                    className={isSelected ? styles.selectedRow : ""}
                  >
                    {/* Checkbox */}
                    <td className={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(order.id)}
                      />
                    </td>

                    {/* Order ID */}
                    <td className={styles.orderId}>{order.id}</td>

                    {/* Date */}
                    <td className={styles.dateCell}>{order.date}</td>

                    {/* Customer */}
                    <td className={styles.customerName}>{order.customerId}</td>

                    {/* Location */}
                    <td className={styles.locationCell}>{order.location}</td>

                    {/* Amount */}
                    <td className={styles.amountCell}>{order.amount}</td>

                    {/* Status */}
                    <td>
                      <StatusBadge status={order.status} />
                    </td>

                    {/* Actions */}
                    <td className={styles.actionCell}>
                      <button
                        className={styles.dotsBtn}
                        onClick={() =>
                          setOpenMenu(isMenuOpen ? null : order.id)
                        }
                      >
                        <DotsIcon />
                      </button>
                      {isMenuOpen && (
                        <ActionDropdown
                          orderId={order.id}
                          onClose={() => setOpenMenu(null)}
                          onAction={handleAction}
                          onDetails={(id) => setSelectedDetailId(id)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer with pagination */}
        <div className={styles.tableFooter}>
          <span className={styles.showingText}>
            Showing{" "}
            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} from{" "}
            {filtered.length} data
          </span>

          <div className={styles.pagination}>
            {/* First */}
            <button
              className={styles.navBtn}
              onClick={() => goTo(1)}
              disabled={currentPage === 1}
              title="First page"
            >
              «
            </button>

            {/* Prev */}
            <button
              className={styles.navBtn}
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage === 1}
              title="Previous"
            >
              ‹
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageBtn} ${
                  page === currentPage ? styles.activePage : ""
                }`}
                onClick={() => goTo(page)}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              className={styles.navBtn}
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage === totalPages}
              title="Next"
            >
              ›
            </button>

            {/* Last */}
            <button
              className={styles.navBtn}
              onClick={() => goTo(totalPages)}
              disabled={currentPage === totalPages}
              title="Last page"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
