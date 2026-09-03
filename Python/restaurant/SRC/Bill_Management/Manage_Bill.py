import json
import random
import datetime
from .View_Bill import BillManager
view_bill=BillManager()

class BillManagement:
    def __init__(self):
        self.bill_file = "SRC/Database/bill.json"
        self.order_file = "SRC/Database/orders.json"  # Assuming order data is stored here
        self.load_bills()

    def load_bills(self):
        try:
            with open(self.bill_file, "r") as f:
                self.bills = json.load(f)
        except FileNotFoundError:
            self.bills = []

    def save_bills(self):
        with open(self.bill_file, "w") as f:
            json.dump(self.bills, f, indent=4)

    def generate_random_invoice_number(self):
        return f"INV-{random.randint(10000, 99999)}"

    def generate_payment_reference_number(self):
        return f"UPI-{random.randint(1000000000, 9999999999)}"

    def generate_bill(self, order_id):
        # Fetch order details from order.json based on order ID
        order_details = self.get_order_details(order_id)
        gst_rate=18
        if not order_details:
            print("No order found with this Order ID to generate bill.")
            return

        if order_details['status'] != 'Confirmed':
            print(f"Order status is {order_details['status']}. Please update the status to 'Confirmed' first.")
            return

        # Ask for customer name if not provided
        customer_name = order_details.get('customer_name', '')
        if not customer_name:
            customer_name = input("Enter Customer Name: ")

        # Generate random invoice number and payment reference number
        invoice_number = self.generate_random_invoice_number()
        payment_reference = self.generate_payment_reference_number()

        # Bill details
        items = order_details['items']
        subtotal = sum(item['price'] * item['quantity'] for item in items)
        gst = subtotal * 0.18
        total_amount = subtotal + gst

        # Bill Output
        print("\n===========================================================")
        print("                   RED HEAVEN RESTAURANT                   ")
        print("                   Siwan, Bihar - 841438                     ")
        print("=============================================================")
        print(f"Invoice No.: {invoice_number}")
        print(f"Customer Name: {customer_name}")
        print(f"Order Type: {order_details['order_type']} (Order ID: {order_id})")
        print(f"Date/Time: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Payment Mode: UPI (Ref No.: {payment_reference})")
        print("--------------------------------------------------")
        print(f"{'Item':<20}{'Qty':<10}{'Price'}")
        print("--------------------------------------------------")
        for item in items:
            print(f"{item['name']:<20}{item['quantity']:<10}₹{item['price'] * item['quantity']}")
        print("--------------------------------------------------")
        print(f"Subtotal:                               ₹{subtotal:.2f}")
        print(f"GST ({gst_rate}%):                              ₹{gst:.2f}")
        print(f"Total Amount:                           ₹{total_amount:.2f}")
        print("--------------------------------------------------")
        print("                  THANK YOU! VISIT AGAIN!                   ")
        print("==================================================")

        # Save bill details to bill.json
        bill_data = {
            "invoice_number": invoice_number,
            "order_id": order_id,
            "customer_name": customer_name,
            "order_type": order_details['order_type'],
            "items": order_details['items'],
            "subtotal": subtotal,
            "gst": gst,
            "total_amount": total_amount,
            "date_time": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "payment_reference": payment_reference
        }
        self.bills.append(bill_data)
        self.save_bills()

    def get_order_details(self, order_id):
        try:
            with open(self.order_file, "r") as f:
                orders = json.load(f)

            # Search for the order in the list of orders
            for order in orders:
                if order['order_id'] == order_id:
                    return order
            
            # If order is not found
            print(f"Order with ID {order_id} not found.")
            return None

        except FileNotFoundError:
            print("No orders data found!")
            return None


    def view_all_bills(self):
        if not self.bills:
            print("No bills available.")
            return
        print("\n---------- All Generated Bills ----------")
        for bill in self.bills:
            print(f"Invoice No.: {bill['invoice_number']} | Order ID: {bill['order_id']} | Total Amount: ₹{bill['total_amount']}")
        print("----------------------------------------")

    def total_sales(self, period):
        if not self.bills:
            print("No bills available to calculate sales.")
            return

        total_sales = 0
        current_date = datetime.datetime.now()

        for bill in self.bills:
            bill_date = datetime.datetime.strptime(bill["date_time"], '%Y-%m-%d %H:%M:%S')

            if period == 'day' and bill_date.date() == current_date.date():
                total_sales += bill['total_amount']
            elif period == 'month' and bill_date.month == current_date.month and bill_date.year == current_date.year:
                total_sales += bill['total_amount']
            elif period == 'year' and bill_date.year == current_date.year:
                total_sales += bill['total_amount']

        print(f"Total Sales ({period}): ₹{total_sales:.2f}")

    def Bill_Management_Dashboard(self):
        while True:
            print("\n----------- Bill Management  ------------")
            print("1. Generate Bill by Order ID")
            print("2. Generate Bill by Mobile Number")
            print("3. View All Bills")
            print("4. Total Sales (Day/Month/Year)")
            print("5. View Bill by order id ")
            print("6. Exit\n")
            
            choice = input("Choose an option: ")

            if choice == "1":
                order_id = input("Enter Order ID to generate bill: ")
                self.generate_bill(order_id)
            elif choice == "2":
                mobile_number = input("Enter Mobile Number to search for: ")
                self.generate_bill_by_mobile(mobile_number)
            elif choice == "3":
                self.view_all_bills()
            elif choice == "4":
                period = input("Enter period (day/month/year): ").lower()
                self.total_sales(period)
            elif choice == "5":
                view_bill.print_bill()
            elif choice == "6":
                break
            else:
                print("Invalid option. Please try again.")


    def generate_bill_by_mobile(self, mobile_number):
        # Fetch order details from order.json based on mobile number
        try:
            with open(self.order_file, "r") as f:
                orders = json.load(f)

            # Find orders with the given mobile number
            orders_with_mobile = [
                order for order in orders.values() if 'mobile' in order and order['mobile'] == mobile_number
            ]

            if not orders_with_mobile:
                print("No order found for this mobile number.")
                return

            for order in orders_with_mobile:
                print(f"\nGenerating bill for Order ID: {order['order_id']}")
                self.generate_bill(order['order_id'])

        except FileNotFoundError:
            print("No orders data found!")


    def Bill_Management_Dashboard_Admin(self):
            while True:
                print("\n----------- Bill Management  ------------")
                print("1. View All Bills")
                print("2. Total Sales (Day/Month/Year)")
                print("3. Back\n")
                
                choice = input("Choose an option: ")

                if choice == "1":
                    self.view_all_bills()
                elif choice == "2":
                    period = input("Enter period (day/month/year): ").lower()
                    self.total_sales(period)
                elif choice == "3":
                    break
                else:
                    print("Invalid option. Please try again.")

# Usage example
if __name__ == "__main__":
    bill_manager = BillManagement()
    bill_manager.Bill_Management_Dashboard()
