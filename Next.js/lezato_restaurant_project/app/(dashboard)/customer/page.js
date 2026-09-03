"use client";
import { useState, useRef, useEffect } from "react";
import CustomersData from "@/data/CustomersData";
import TablePagination from "@/components/TablePagination";
import styles from "@/styles/scss/theme/customer.module.css";

const ITEMS_PER_PAGE = 10;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter data based on search
  const filtered = CustomersData.filter(
    (c) =>
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()),
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOpenDropdown(null);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h4 className={styles.heading}>Customers</h4>
        <span className={styles.breadcrumb}>Customer / Customer</span>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>

        <button className={styles.addBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21c0-4 3-7 6-7s6 3 6 7" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="16" y1="11" x2="22" y2="11" />
          </svg>
          Add New Customer
        </button>

        <div className={styles.filterBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>Filter</span>
          <span>▾</span>
        </div>

        <button className={styles.refreshBtn}>↻</button>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              <th className={styles.th}></th>
              <th className={styles.th}>Customer ID</th>
              <th className={styles.th}>Join Date</th>
              <th className={styles.th}>Customer Name</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Total Spent</th>
              <th className={styles.th}>Last Order</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((customer) => {
                const selected = selectedRows.includes(customer.id);
                return (
                  <tr
                    key={customer.id}
                    className={`${styles.tr} ${selected ? styles.trSelected : ""}`}
                  >
                    <td className={styles.td}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleRow(customer.id)}
                        style={{ accentColor: "#ff6b35", cursor: "pointer" }}
                      />
                    </td>
                    <td className={selected ? styles.tdBold : styles.td}>{customer.id}</td>
                    <td className={selected ? styles.tdBold : styles.td}>{customer.joinDate}</td>
                    <td className={selected ? styles.tdBold : styles.td}>{customer.customerName}</td>
                    <td className={selected ? styles.tdBold : styles.td}>{customer.location}</td>
                    <td className={selected ? styles.tdBold : styles.td}>{customer.totalSpent}</td>
                    <td className={styles.td}>
                      <span className={selected ? styles.lastOrderBadgeSelected : styles.lastOrderBadge}>
                        {customer.lastOrder}
                      </span>
                    </td>

                    {/* Three dots dropdown */}
                    <td
                      className={styles.td}
                      style={{ position: "relative" }}
                      ref={openDropdown === customer.id ? dropdownRef : null}
                    >
                      <button
                        className={styles.dotBtn}
                        onClick={() =>
                          setOpenDropdown(openDropdown === customer.id ? null : customer.id)
                        }
                      >
                        ···
                      </button>

                      {openDropdown === customer.id && (
                        <div className={styles.dropdown}>
                          <button
                            className={styles.dropdownItem}
                            onClick={() => {
                              alert(`Edit: ${customer.customerName}`);
                              setOpenDropdown(null);
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            className={styles.dropdownItemDelete}
                            onClick={() => {
                              alert(`Delete: ${customer.customerName}`);
                              setOpenDropdown(null);
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className={styles.noData}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filtered.length}
        label="customers"
        onPageChange={handlePageChange}
      />
    </div>
  );
}