# 🍽️ Red Heaven Restaurant Management System (Python)

A modular and multi-role Restaurant Management System built with Python for the Full Stack Development Training Program.

## 🎯 Project Overview

The primary purpose of this system is to manage restaurant operations across three distinct login roles:
1. **👑 Admin**: Restaurant profile management, employee hiring/records, financial reports, menu configuration, and overall system supervision.
2. **👨‍🍳 Staff**: Order processing, table reservations, live billing, and kitchen order updates.
3. **👥 Customer**: Customer authentication (Login/Signup), browsing food menu, placing dining/takeaway orders, and generating bills.

---

## 📂 Architecture & Directory Structure

```
restaurant/
├── main.py                          # Application entry point
├── README.md                        # Documentation & setup instructions
└── SRC/
    ├── CustomerAuthentication.py    # Authentication flows for Customers, Staff & Admins
    ├── Controllers/                 # Request routers and business logic handlers
    ├── Dashboard/                   # Role-based dashboards (Admin, Staff, Customer)
    ├── Menu/                        # Menu items, categories and pricing
    ├── Order_Management/            # Table orders, order statuses and cart handling
    ├── Bill_Management/             # Invoicing, tax calculations and receipt generation
    ├── Manage_Reservation/          # Table booking and reservation calendar
    ├── Manage_Employee/             # Staff records, roles and shift management
    ├── Restaurent_Profile/          # Restaurant details, tax ID, timings
    ├── Models/                      # Data models for users, items, and orders
    ├── Database/                    # Local JSON database stores for persistence
    └── Utility/                     # Helper functions, input validators and error loggers
```

---

## 🚀 How to Run the Project

1. Navigate to the restaurant project folder:
   ```powershell
   cd "d:\full-stack-web-development-training-apr-2024\Python\restaurant"
   ```

2. Run the main script:
   ```powershell
   python main.py
   ```

3. Follow the interactive console menu to authenticate as Admin, Staff, or Customer.
