"""
Project 14: Daily Expense & Budget Tracker
Topic: Lists, Dictionaries, File I/O, Statistical Aggregation
Description: Track daily incomes, expenses across categories, calculate savings and category breakdown.
"""

import json
import os
from datetime import datetime

EXPENSES_FILE = "expenses_data.json"

def load_data():
    if os.path.exists(EXPENSES_FILE):
        try:
            with open(EXPENSES_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {"income": [], "expense": []}
    return {"income": [], "expense": []}

def save_data(data):
    with open(EXPENSES_FILE, "w") as f:
        json.dump(data, f, indent=4)

def add_entry(data, entry_type):
    title = input("Description/Title: ").strip()
    try:
        amount = float(input("Amount ($): "))
        if amount <= 0:
            print("Amount must be positive.")
            return
    except ValueError:
        print("Invalid number.")
        return

    category = input("Category (Food, Rent, Shopping, Bills, Salary, Other): ").strip() or "General"
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    entry = {
        "title": title,
        "amount": amount,
        "category": category,
        "date": date_str
    }
    data[entry_type].append(entry)
    save_data(data)
    print(f"{entry_type.capitalize()} of ${amount:.2f} logged successfully.")

def view_summary(data):
    total_income = sum(item["amount"] for item in data["income"])
    total_expense = sum(item["amount"] for item in data["expense"])
    balance = total_income - total_expense

    print("\n" + "=" * 45)
    print("           FINANCIAL SUMMARY")
    print("=" * 45)
    print(f"Total Inflow / Income   : +${total_income:.2f}")
    print(f"Total Outflow / Expense : -${total_expense:.2f}")
    print("-" * 45)
    print(f"Net Savings / Balance   :  ${balance:.2f}")
    print("=" * 45)

    # Category breakdown for expenses
    cat_totals = {}
    for item in data["expense"]:
        cat = item["category"]
        cat_totals[cat] = cat_totals.get(cat, 0.0) + item["amount"]

    if cat_totals:
        print("\nExpense Breakdown By Category:")
        for cat, amt in cat_totals.items():
            pct = (amt / total_expense) * 100 if total_expense > 0 else 0
            print(f"- {cat:<15}: ${amt:<8.2f} ({pct:.1f}%)")

def list_recent_transactions(data):
    print("\n--- RECENT EXPENSES ---")
    if not data["expense"]:
        print("No expenses recorded.")
    for item in data["expense"][-10:]:
        print(f"[{item['date']}] {item['title']} ({item['category']}): -${item['amount']:.2f}")

def main():
    data = load_data()
    while True:
        print("\n=== DAILY EXPENSE & BUDGET TRACKER ===")
        print("1. Add Income")
        print("2. Add Expense")
        print("3. View Summary & Category Breakdown")
        print("4. View Recent Transactions")
        print("5. Exit")
        
        choice = input("Enter choice (1-5): ").strip()
        if choice == '1':
            add_entry(data, "income")
        elif choice == '2':
            add_entry(data, "expense")
        elif choice == '3':
            view_summary(data)
        elif choice == '4':
            list_recent_transactions(data)
        elif choice == '5':
            print("Manage your money smartly! Goodbye.")
            break
        else:
            print("Invalid option.")

if __name__ == '__main__':
    main()
