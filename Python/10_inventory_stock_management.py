"""
Project 10: Inventory & Stock Management System
Topic: Dictionaries, File I/O, Low-stock alerts, Financial valuation
Description: Manage shop products, stock quantity, wholesale/retail prices, and restock alerts.
"""

import json
import os

STOCK_FILE = "inventory_data.json"

def load_inventory():
    if os.path.exists(STOCK_FILE):
        try:
            with open(STOCK_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {}
    return {
        "P01": {"name": "Wireless Mouse", "category": "Electronics", "price": 18.5, "stock": 25},
        "P02": {"name": "Mechanical Keyboard", "category": "Electronics", "price": 45.0, "stock": 4},
        "P03": {"name": "USB-C Cable", "category": "Accessories", "price": 6.0, "stock": 50}
    }

def save_inventory(items):
    with open(STOCK_FILE, "w") as f:
        json.dump(items, f, indent=4)

def display_inventory(items):
    if not items:
        print("\nInventory is empty.")
        return
    print("\n" + "=" * 70)
    print(f"{'ID':<6} | {'Item Name':<22} | {'Category':<14} | {'Price ($)':<10} | {'Stock'}")
    print("=" * 70)
    total_val = 0
    for pid, data in items.items():
        val = data['price'] * data['stock']
        total_val += val
        alert = " (LOW STOCK!)" if data['stock'] <= 5 else ""
        print(f"{pid:<6} | {data['name']:<22} | {data['category']:<14} | ${data['price']:<9.2f} | {data['stock']}{alert}")
    print("=" * 70)
    print(f"Total Inventory Valuation: ${total_val:,.2f}")

def add_or_update_product(items):
    pid = input("Enter Product ID (e.g., P04): ").strip().upper()
    name = input("Enter Product Name: ").strip()
    category = input("Enter Category: ").strip()
    try:
        price = float(input("Enter Unit Price ($): "))
        stock = int(input("Enter Stock Quantity: "))
    except ValueError:
        print("Invalid number input.")
        return

    items[pid] = {"name": name, "category": category, "price": price, "stock": stock}
    save_inventory(items)
    print(f"Product '{name}' added/updated successfully.")

def update_stock(items):
    pid = input("Enter Product ID: ").strip().upper()
    if pid not in items:
        print("Product ID not found.")
        return
    print(f"Current stock for {items[pid]['name']} is: {items[pid]['stock']}")
    try:
        delta = int(input("Enter stock adjustment (positive to add, negative to deduct): "))
        if items[pid]['stock'] + delta < 0:
            print("Stock cannot become negative.")
            return
        items[pid]['stock'] += delta
        save_inventory(items)
        print(f"New stock count: {items[pid]['stock']}")
    except ValueError:
        print("Invalid input.")

def low_stock_alerts(items, threshold=5):
    lows = [data['name'] for data in items.values() if data['stock'] <= threshold]
    if lows:
        print(f"\n⚠️  LOW STOCK ALERT! The following items have <= {threshold} items left:")
        for name in lows:
            print(f"- {name}")
    else:
        print(f"\nAll items have healthy stock levels (> {threshold}).")

def main():
    items = load_inventory()
    while True:
        print("\n=== INVENTORY & STOCK MANAGEMENT ===")
        print("1. View Complete Stock Inventory")
        print("2. Add New Product")
        print("3. Adjust / Restock Product Quantity")
        print("4. Check Low Stock Alerts")
        print("5. Exit")
        
        choice = input("Enter choice (1-5): ").strip()
        if choice == '1':
            display_inventory(items)
        elif choice == '2':
            add_or_update_product(items)
        elif choice == '3':
            update_stock(items)
        elif choice == '4':
            low_stock_alerts(items)
        elif choice == '5':
            print("Exiting Inventory System. Bye!")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
