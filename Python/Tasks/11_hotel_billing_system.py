"""
Project 11: Hotel & Restaurant Billing System
Topic: Loops, Dictionaries, Arithmetic calculations, formatted receipt generator
Description: Interactive food menu ordering, tax calculation, discount coupons, and receipt generation.
"""

import datetime

MENU = {
    1: {"name": "Margherita Pizza", "price": 8.99},
    2: {"name": "Cheeseburger Deluxe", "price": 6.50},
    3: {"name": "Pasta Alfredo", "price": 7.80},
    4: {"name": "French Fries (Large)", "price": 3.50},
    5: {"name": "Chocolate Lava Cake", "price": 4.50},
    6: {"name": "Cold Coffee / Iced Tea", "price": 2.50}
}

COUPONS = {
    "WELCOME10": 0.10,
    "FOODIE20": 0.20
}

def display_menu():
    print("\n" + "=" * 45)
    print("           THE GOURMET BISTRO MENU")
    print("=" * 45)
    print(f"{'No.':<4} | {'Item Name':<25} | {'Price'}")
    print("-" * 45)
    for code, item in MENU.items():
        print(f"{code:<4} | {item['name']:<25} | ${item['price']:.2f}")
    print("=" * 45)

def take_order():
    order = {}
    while True:
        display_menu()
        choice = input("Enter Item Number to add to cart (or 0 to complete order): ").strip()
        if choice == '0':
            break
        if not choice.isdigit() or int(choice) not in MENU:
            print("Invalid item number! Please select from the menu.")
            continue
        
        item_no = int(choice)
        try:
            qty = int(input(f"Quantity for {MENU[item_no]['name']}: "))
            if qty <= 0:
                print("Quantity must be greater than 0.")
                continue
            order[item_no] = order.get(item_no, 0) + qty
            print(f"Added {qty}x {MENU[item_no]['name']} to order.")
        except ValueError:
            print("Invalid quantity number.")
            
    return order

def generate_bill(order, customer_name, coupon_code=""):
    if not order:
        print("No items in order to bill.")
        return

    subtotal = sum(MENU[item_no]["price"] * qty for item_no, qty in order.items())
    discount_rate = COUPONS.get(coupon_code.upper(), 0.0)
    discount_amt = subtotal * discount_rate
    tax = (subtotal - discount_amt) * 0.08  # 8% Tax
    total = (subtotal - discount_amt) + tax

    now_str = datetime.datetime.now().strftime("%d-%b-%Y %I:%M %p")
    print("\n" + "=" * 50)
    print("             TAX INVOICE / RECEIPT")
    print("             The Gourmet Bistro")
    print("=" * 50)
    print(f"Customer: {customer_name}")
    print(f"Date/Time: {now_str}")
    print("-" * 50)
    print(f"{'Item':<22} | {'Qty':<4} | {'Rate':<8} | {'Amount'}")
    print("-" * 50)
    for item_no, qty in order.items():
        item = MENU[item_no]
        line_total = item['price'] * qty
        print(f"{item['name']:<22} | {qty:<4} | ${item['price']:<7.2f} | ${line_total:.2f}")
    print("-" * 50)
    print(f"{'Subtotal:':<38} ${subtotal:.2f}")
    if discount_amt > 0:
        print(f"{f'Discount ({coupon_code.upper()}):':<38} -${discount_amt:.2f}")
    print(f"{'Tax (8%):':<38} +${tax:.2f}")
    print("=" * 50)
    print(f"{'GRAND TOTAL:':<38} ${total:.2f}")
    print("=" * 50)
    print("         Thank you for dining with us! ❤️")

def main():
    print("Welcome to Hotel & Restaurant Billing System!")
    customer_name = input("Enter Customer Name: ").strip() or "Guest"
    order = take_order()
    
    if order:
        coupon = input("\nEnter Discount Coupon Code (or press Enter to skip): ").strip()
        generate_bill(order, customer_name, coupon)
    else:
        print("Order cancelled.")

if __name__ == '__main__':
    main()
