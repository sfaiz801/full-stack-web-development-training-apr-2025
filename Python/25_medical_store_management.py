"""
Project 25: Medical Store & Pharmacy Management System
Topic: OOP, Dictionaries, Expiry Date Tracking, Stock Billing
Description: Track medicines, expiry dates, supplier details, stock management and sell medicines with billing.
"""

import json
import os
import datetime

MED_FILE = "pharmacy_data.json"

def load_pharmacy():
    if os.path.exists(MED_FILE):
        try:
            with open(MED_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {}
    return {
        "M01": {"name": "Paracetamol 500mg", "qty": 100, "price": 1.50, "expiry": "2027-12-31"},
        "M02": {"name": "Amoxicillin 250mg", "qty": 45, "price": 4.20, "expiry": "2026-10-15"},
        "M03": {"name": "Cetirizine 10mg", "qty": 80, "price": 2.00, "expiry": "2028-05-20"},
        "M04": {"name": "Ibuprofen 400mg", "qty": 5, "price": 3.00, "expiry": "2026-04-01"}
    }

def save_pharmacy(medicines):
    with open(MED_FILE, "w") as f:
        json.dump(medicines, f, indent=4)

def view_medicines(medicines):
    if not medicines:
        print("\nNo medicines registered.")
        return
    print("\n" + "=" * 75)
    print(f"{'Code':<6} | {'Medicine Name':<24} | {'Stock':<8} | {'Price ($)':<10} | {'Expiry Date'}")
    print("=" * 75)
    for code, m in medicines.items():
        low = " (LOW)" if m['qty'] <= 10 else ""
        print(f"{code:<6} | {m['name']:<24} | {m['qty']:<8}{low} | ${m['price']:<9.2f} | {m['expiry']}")
    print("=" * 75)

def add_medicine(medicines):
    code = input("Enter Medicine Code (e.g. M05): ").strip().upper()
    name = input("Enter Medicine Name: ").strip()
    try:
        qty = int(input("Enter Stock Quantity: "))
        price = float(input("Enter Unit Price ($): "))
        expiry = input("Enter Expiry Date (YYYY-MM-DD): ").strip()
        # validate date
        datetime.datetime.strptime(expiry, "%Y-%m-%d")
    except ValueError:
        print("Invalid numerical or date format!")
        return

    medicines[code] = {"name": name, "qty": qty, "price": price, "expiry": expiry}
    save_pharmacy(medicines)
    print(f"Medicine '{name}' added successfully.")

def sell_medicine(medicines):
    view_medicines(medicines)
    code = input("\nEnter Medicine Code to sell: ").strip().upper()
    if code not in medicines:
        print("Medicine code not found.")
        return
    
    med = medicines[code]
    try:
        qty = int(input(f"Enter quantity to sell for {med['name']}: "))
        if qty <= 0:
            print("Quantity must be > 0.")
            return
        if qty > med["qty"]:
            print(f"Insufficient stock! Available: {med['qty']}")
            return

        med["qty"] -= qty
        save_pharmacy(medicines)
        bill_amt = qty * med["price"]

        print("\n" + "=" * 40)
        print("         PHARMACY SALE RECEIPT")
        print("=" * 40)
        print(f"Item        : {med['name']}")
        print(f"Quantity    : {qty}")
        print(f"Unit Price  : ${med['price']:.2f}")
        print(f"Total Bill  : ${bill_amt:.2f}")
        print(f"Remaining   : {med['qty']} units")
        print("=" * 40)
    except ValueError:
        print("Invalid quantity.")

def check_expiries(medicines):
    today = datetime.date.today()
    print(f"\nChecking expiration against today's date: {today}")
    found = False
    for code, m in medicines.items():
        try:
            exp_date = datetime.datetime.strptime(m["expiry"], "%Y-%m-%d").date()
            days_left = (exp_date - today).days
            if days_left < 0:
                print(f"❌ EXPIRED: {m['name']} ({code}) expired {-days_left} days ago!")
                found = True
            elif days_left <= 60:
                print(f"⚠️ EXPIRING SOON: {m['name']} ({code}) in {days_left} days ({m['expiry']})")
                found = True
        except ValueError:
            pass
    if not found:
        print("All medicines are within valid non-expiring shelf life.")

def main():
    medicines = load_pharmacy()
    while True:
        print("\n=== PHARMACY & MEDICAL STORE MANAGEMENT ===")
        print("1. View Medicine Inventory")
        print("2. Add / Restock Medicine")
        print("3. Sell Medicine (Generate Bill)")
        print("4. Check Expiry Alerts")
        print("5. Exit")
        
        choice = input("Enter choice (1-5): ").strip()
        if choice == '1':
            view_medicines(medicines)
        elif choice == '2':
            add_medicine(medicines)
        elif choice == '3':
            sell_medicine(medicines)
        elif choice == '4':
            check_expiries(medicines)
        elif choice == '5':
            print("Pharmacy system closed. Goodbye!")
            break
        else:
            print("Invalid selection.")

if __name__ == '__main__':
    main()
