import json
from datetime import datetime
import random

class BillManager:
    def __init__(self):
        self.bill_file = "SRC/Database/bill.json"

    # Method to load bill data from JSON file
    def load_bill_data(self):
        try:
            with open(self.bill_file, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            print("No bill data found!")
            return []

    # Method to generate and print bill based on order ID or invoice number
    def print_bill(self):
        # Prompt user for the order ID
        order_id = input("Enter Order ID to View bill: ")
        gst_rate=18

        # Load the existing bill data
        bills = self.load_bill_data()

        # Find the bill based on order ID
        bill_found = None
        for bill in bills:
            if bill['order_id'] == order_id:
                bill_found = bill
                break

        # If no bill found, print a message
        if not bill_found:
            print(f"No bill found for order ID: {order_id}")
            return

        # Extract details from the bill
        invoice_number = bill_found.get('invoice_number', f"INV-{random.randint(10000, 99999)}")
        customer_name = bill_found.get('customer_name', 'N/A')
        order_type = bill_found.get('order_type', 'Unknown')
        payment_mode = bill_found.get('payment_mode', 'UPI')
        payment_ref = bill_found.get('payment_ref', 'N/A')
        items = bill_found.get('items', [])
        gst_amount = bill_found.get('gst', 18)  # Default to 18% GST if not available

        # Calculate total price and GST if not in the bill data
        subtotal = sum(item['price'] * item['quantity'] for item in items)
    
        total_amount = subtotal + gst_amount

        # Print the formatted bill
        print("\n===========================================================")
        print("                   RED HEAVEN RESTAURANT                   ")
        print("                   Siwan, Bihar - 841438                     ")
        print("=============================================================")
        print(f"Invoice No.: {invoice_number}")
        print(f"Customer Name: {customer_name}")
        print(f"Order Type: {order_type} (Order ID: {order_id})")
        print(f"Date/Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Payment Mode: {payment_mode} (Ref No.: {payment_ref})")
        print("--------------------------------------------------")
        print("Item                Qty       Price")
        print("--------------------------------------------------")

        # Print items in the order
        for item in items:
            print(f"{item['name']: <20} {item['quantity']: <10} ₹{item['price'] * item['quantity']}")

        print("--------------------------------------------------")
        print(f"Subtotal:                               ₹{subtotal:.2f}")
        print(f"GST ({gst_rate}%):                            ₹{gst_amount:.2f}")
        print(f"Total Amount:                           ₹{total_amount:.2f}")
        print("--------------------------------------------------")
        print("                  THANK YOU! VISIT AGAIN!       ")
        print("==================================================\n")

if __name__=="__main__":
    bill_manager = BillManager()
    bill_manager.print_bill()
