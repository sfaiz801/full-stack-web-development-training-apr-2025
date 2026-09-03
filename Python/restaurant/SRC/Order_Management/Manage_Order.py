import json
import random
import os
from datetime import datetime
class bcolors:
    HEADER= '\033[95m'
    OKBLUE= '\033[94m'
    OKCYAN= '\033[96m'
    OKGREEN= '\033[92m'
    OKYELLOW= '\033[33m'
    WARNING= '\033[93m'
    FAIL= '\033[91m'
    ENDC= '\033[0m'
    BOLD= '\033[1m'
    UNDERLINE= '\033[4m'


class OrderManagement:
    def __init__(self):
        # Dynamically build the path for the menu file based on the current directory
        current_dir = os.path.dirname(os.path.abspath(__file__))  # Get the directory of the current script
        
        # Build the paths for menu, orders, and error log relative to the current script's directory
        menu_path = os.path.join(current_dir, '..', '..', 'SRC', 'Database', 'menu.json')
        orders_data_path = os.path.join(current_dir, '..', '..', 'SRC', 'Database', 'orders.json')
        error_log_path = os.path.join(current_dir, '..', '..', 'SRC', 'Database', 'error_log.json')

        # Normalize the paths
        self.menu_path = os.path.normpath(menu_path)
        self.orders_data_path = os.path.normpath(orders_data_path)
        self.error_log_path = os.path.normpath(error_log_path)

        # Check if the menu file exists
        if not os.path.exists(self.menu_path):
            print(f"Menu file not found at {self.menu_path}. Please ensure 'menu.json' is located at the specified path.")
            self.log_error(f"Menu file not found at {self.menu_path}. Please ensure 'menu.json' is located at the specified path.")
            exit(1)  # Exit if the file is not found
        
        # Load the menu from the provided JSON file
        with open(self.menu_path, 'r') as file:
            self.menu = json.load(file)
        
        self.orders = []
        self.order_id_counter = 1

        # Load orders data from the JSON file
        self.load_data()

    def load_data(self):
        """Load order data from the 'orders.json' file."""
        if os.path.exists(self.orders_data_path):
            try:
                with open(self.orders_data_path, 'r') as file:
                    self.orders = json.load(file)
                    #print("Orders loaded successfully.")
            except json.JSONDecodeError:
                print("Error: Malformed JSON in orders data file.")
                self.log_error("Error: Malformed JSON in orders data file.")
            except Exception as e:
                print(f"Error loading orders: {e}")
                self.log_error(f"Error loading orders: {e}")
        else:
            print("No previous orders found. Starting with an empty order list.")

    def save_data(self):
        """Save current order data to the 'orders.json' file."""
        try:
            with open(self.orders_data_path, 'w') as file:
                json.dump(self.orders, file, indent=4)
            print("Orders saved successfully.")
        except Exception as e:
            print(f"Error saving orders: {e}")
            self.log_error(f"Error saving orders: {e}")

    def log_error(self, message):
        """Log errors to the error_log.json file."""
        error_entry = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "error_message": message
        }

        # Check if the error log file exists
        if os.path.exists(self.error_log_path):
            try:
                with open(self.error_log_path, 'r') as file:
                    error_logs = json.load(file)
            except json.JSONDecodeError:
                error_logs = []  # Start with an empty list if there's an issue reading the file
        else:
            error_logs = []

        # Add the new error to the list
        error_logs.insert(0, error_entry)  # Insert at the beginning to keep the latest error first
        
        # Write the updated error logs back to the file
        try:
            with open(self.error_log_path, 'w') as file:
                json.dump(error_logs, file, indent=4)
        except Exception as e:
            print(f"Error logging to file: {e}")

    def view_menu(self):
        print("\n======= Menu ========")
        
        for category, items in self.menu.items():
            # Print category name
            print("-" * 105)  # Line for separation
            print(f"****** {category.capitalize()} ******")
            print("-" * 105)  # Line for separation
            # Print table headers for each category
            if category == "soft_drinks":
                print(f"{'ID':<5} {'Name':<20} {'Small':<10} {'Medium':<10}  {'Large':<10}")
            elif category == "water":
                print(f"{'ID':<5} {'Name':<20}  {'0.5L':<10}  {'1L':<10}  {'2L':<10}")
            elif category in ["veg", "non_veg", "salad"]:
                print(f"{'ID':<5} {'Name':<20} {'Quarter':<10}   {'Half':<10}   {'Full':<10}      {'Ingredients':<30}")
            elif category in ["ice_cream", "sweets"]:
                print(f"{'ID':<5} {'Name':<20} {'Price':<10} {'Quantity':<10}")
            elif category == "snacks":
                print(f"{'ID':<5} {'Name':<20} {'Price/Packet':<15} {'Quantity':<10}")
            elif category in ["indian_bread", "breakfast", "rice_dishes"]:
                print(f"{'ID':<5} {'Name':<20} {'Quarter':<10} {'Half':<10}   {'Full':<10}")

            # Print item details for each category
            for item in items:
                if category == "soft_drinks":
                    print(f"{item['id']:<5} {item['name']:<20} ₹{item.get('small_price', 'N/A'):<10} ₹{item.get('medium_price', 'N/A'):<10} ₹{item.get('large_price', 'N/A'):<10}")
                elif category == "water":
                    print(f"{item['id']:<5} {item['name']:<20}  ₹{item.get('half_liter_price', 'N/A'):<10} ₹{item.get('one_liter_price', 'N/A'):<10} ₹{item.get('two_liter_price', 'N/A'):<10}")
                elif category in ["veg", "non_veg", "salad"]:
                    ingredients = ", ".join(item.get('ingredients', ['N/A']))
                    print(f"{item['id']:<5} {item['name']:<20}  ₹{item.get('quarter_price', 'N/A'):<10}  ₹{item.get('half_price', 'N/A'):<10} ₹{item.get('full_price', 'N/A'):<10} {ingredients:<30}") 
                elif category in ["ice_cream", "sweets"]:
                    print(f"{item['id']:<5} {item['name']:<20} ₹{item.get('price', 'N/A'):<10} {item.get('quantity', 'N/A'):<10}")
                elif category == "snacks":
                    print(f"{item['id']:<5} {item['name']:<20} ₹{item.get('price_per_packet', 'N/A'):<15} {item.get('quantity', 'N/A'):<10}")
                elif category in ["indian_bread", "breakfast", "rice_dishes"]:
                    print(f"{item['id']:<5} {item['name']:<20} ₹{item.get('quarter_price', 'N/A'):<10} ₹{item.get('half_price', 'N/A'):<10} ₹{item.get('full_price', 'N/A'):<10}")

    def view_orders(self):
        print("\n************ Current Orders ************\n")
        
        # Check if there are no orders
        if not self.orders:
            print("No orders have been placed yet.")
        else:
            # Print column headers
            print(f"{'Order ID':<15} {'Order Type':<15} {'Status':<15} {'Item Name':<25} {'Portion':<10} {'Quantity':<10} {'Price':<10}")
            print("-" * 105)  # Line for separation

            # Loop through each order and print order details
            for order in self.orders:
                for item in order["items"]:
                    # Handle missing keys gracefully
                    item_name = item.get('name', 'Unknown')
                    item_quantity = item.get('quantity', 0)
                    item_price = item.get('price', 0)

                    # Determine the portion or size field based on category
                    if item.get('category') == 'water':
                        item_portion = item.get('portion/size', '')  # Use 'portion/size' for water
                    else:
                        item_portion = item.get('portion', '')  # Use 'portion' for other categories

                    # Capitalize and format the portion/size (if applicable)
                    if item_portion:
                        item_portion = item_portion.replace('_', ' ').capitalize()

                    # Print order details in a structured manner
                    print(f"{order['order_id']:<15} {order['order_type']:<15} {order['status']:<15} "
                        f"{item_name:<25} {item_portion:<10} {item_quantity:<10} ₹{item_price:<10}")
                print("-" * 105)  # Line for separation

            # Display the total number of orders
            total_orders = len(self.orders)
            print(f"\nTotal Number of Orders: {total_orders}")


    def create_order(self):
        print("\n------------  Create Order  --------------")
        order_type = input("Order Type (1. Take Away, 2. Dining): ")

        # Generate random order_id based on order type
        if order_type == "1":  # Take Away
            order_id = f"TA-{random.randint(1000, 9999)}"
        elif order_type == "2":  # Dining
            order_id = f"D-{random.randint(1000, 9999)}"
        else:
            print("Invalid order type selected.")
            return

        customer_mobile = None
        if order_type == "1":
            customer_mobile = input("Enter customer mobile number: ")

        status = "Pending"
        items = []
        total_price = 0

        while True:
            item_id = input("Enter Item ID (or type 'done' to finish): ")
            if item_id.lower() == 'done':
                break

            category_found = None
            item_found = None

            # Check category and find item
            for category, items_list in self.menu.items():
                for item in items_list:
                    if str(item['id']) == item_id:
                        category_found = category
                        item_found = item
                        break
                if item_found:
                    break

            if item_found:
                if category_found == 'water':
                    # Asking for the size of the water
                    size = input(f"Enter size for {item_found['name']} (half_liter, one_liter, two_liter): ").strip().lower()
                    valid_sizes = ["half_liter", "one_liter", "two_liter"]
                    if size not in valid_sizes:
                        print("Invalid size selected. Please try again.")
                        continue
                    price_key = f"{size}_price"  # Example: "half_liter_price"
                elif category_found == 'soft_drinks':
                    size = input(f"Enter size for {item_found['name']} (small, medium, large): ").strip().lower()
                    price_key = f"{size}_price"
                elif category_found in ['ice_cream', 'sweets', 'snacks']:
                    size = input(f"Enter quantity for {item_found['name']} (e.g., 100g, 50g): ").strip()
                    price_key = "price" if category_found != 'snacks' else "price_per_packet"
                else:
                    size = input(f"Enter portion size for {item_found['name']} (quarter, half, full): ").strip().lower()
                    price_key = f"{size}_price"

                # Validate the price key exists and is not None
                if price_key not in item_found or item_found[price_key] is None:
                    print(f"Invalid size/portion selected. Please try again.")
                    continue

                # Calculate price
                price = item_found[price_key]
                quantity = int(input(f"Enter quantity for {item_found['name']}: "))
                total_price += price * quantity

                items.append({
                    "name": item_found["name"],
                    "category": category_found,
                    "portion/size": size,
                    "quantity": quantity,
                    "price": price * quantity
                })
            else:
                print("Item not found. Try again.")

        order = {
            "order_id": order_id,
            "order_type": order_type,
            "status": status,
            "items": items,
            "total_price": total_price
        }

        self.orders.append(order)
        print(f"Order {order_id} created successfully.")
        self.save_data()

   

    def cancel_order(self):
        print("\n------------  Cancel Order --------------")
        order_id = input("Enter the Order ID to cancel: ")

        # Search for the order
        for order in self.orders:
            if order["order_id"] == order_id:
                if order["status"] == "Canceled":
                    print(f"Order {order_id} is already canceled.")
                else:
                    order["status"] = "Canceled"
                    print(f"Order {order_id} has been successfully canceled.")
                self.save_data()
                return
        
        print(f"Order ID {order_id} not found.")

    def update_order_status(self):
        print("\n---+---+---- Update Order ----+---+----")
        order_id = input("Enter Order ID: ")
        order = next((order for order in self.orders if order["order_id"] == order_id), None)
        
        if order:
            print(f"\nCurrent Order Details:\nOrder ID: {order['order_id']}\nStatus: {order['status']}\n")
            print("Current Items:")
            for idx, item in enumerate(order['items'], start=1):
                print(f"{idx}. {item['name']} - {item['quantity']} - {item['portion']}")
            
            update_choice = input("\nWhat would you like to update? (1: Order ID, 2: Status, 3: Items): ").strip()

            if update_choice == "1":
                new_order_id = input("Enter new Order ID: ").strip()
                order['order_id'] = new_order_id
                print(f"Order ID updated to: {new_order_id}")
            
            elif update_choice == "2":
                new_status = input("Update status (Pending/Confirmed): ").capitalize()
                if new_status in ["Pending", "Confirmed"]:
                    order["status"] = new_status
                    print(f"Order {order_id} status updated to {new_status}.")
                else:
                    print("Invalid status.")
            
            elif update_choice == "3":
                item_update_choice = input("Do you want to update (1: Item Name, 2: Portion): ").strip()

                if item_update_choice == "1":
                    # Update the item name and quantity
                    item_to_replace = int(input("Enter the item number you want to replace: ")) - 1

                    if 0 <= item_to_replace < len(order['items']):
                        new_item_name = input("Enter the new item name: ").strip()
                        new_item_quantity = input("Enter the new quantity: ").strip()
                        
                        order['items'][item_to_replace]['name'] = new_item_name
                        order['items'][item_to_replace]['quantity'] = new_item_quantity
                        
                        print(f"Item updated to: {new_item_name} - {new_item_quantity}.")
                    else:
                        print("Invalid item number.")

                elif item_update_choice == "2":
                    # Update the portion of an existing item
                    item_to_update = int(input("Enter the item number you want to update the portion for: ")) - 1

                    if 0 <= item_to_update < len(order['items']):
                        new_portion = input("Enter the new portion (Half/Full/Quarter, etc.): ").capitalize()
                        order['items'][item_to_update]['portion'] = new_portion
                        
                        print(f"Portion for item {order['items'][item_to_update]['name']} updated to: {new_portion}.")
                    else:
                        print("Invalid item number.")
            
            else:
                print("Invalid choice.")
            
            self.save_data()  # Save data after updating the order
        else:
            print("Order not found.")

    def find_item_by_id(self, item_id):
        # Search the item in all categories
        for category, items in self.menu.items():
            for item in items:
                if item["id"] == item_id:
                    return item
        return None

    def get_price_by_portion(self, item, portion):
        portion_prices = {
            "quarter": item.get("quarter_price"),
            "half": item.get("half_price"),
            "full": item.get("full_price"),
            "0.5l": item.get("half_liter_price"),
            "1l": item.get("one_liter_price"),
            "2l": item.get("two_liter_price"),
            "small": item.get("small_price"),
            "medium": item.get("medium_price"),
            "large": item.get("large_price"),
            "price": item.get("price"),
            "price_per_packet": item.get("price_per_packet")
        }
        return portion_prices.get(portion)

    def Order_Management_Dashboard(self):

        while True:
            print(f"{bcolors.OKBLUE}\n-----------  Order Management  -------------\n")
            print("1. View Menu")
            print("2. Create Order")
            print("3. Update Order Status")
            print("4. View Current Orders")
            print("5. Exit\n")
            choice = input("Choose an option: ")

            if choice == "1":
                self.view_menu()
            elif choice == "2":
                self.create_order()
            elif choice == "3":
                self.update_order_status()
            elif choice == "4":
                self.view_orders()
            elif choice == "5":
                break
            else:
                print("Invalid option. Please try again.")

    def Order_Management_Admin_Dashboard(self):

        while True:
            print("\n=================  ORDER MANAGEMENT  =================\n")
            print(f"{bcolors.OKBLUE}1. VIEW ALL ORDERS")
            print("2. CANCEL ORDER")
            print("3. BACK\n")
            
            choice = input("Choose an option: ")

            if choice == "1":
                self.view_orders()
            elif choice == "2":
                self.cancel_order()
            elif choice == "3":
                break
            else:
                print("Invalid option. Please try again.")

# Usage example
if __name__ == "__main__":
    order_manager = OrderManagement()
    order_manager.Order_Management_Admin_Dashboard()
    
   
        





