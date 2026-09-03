import json
import os

class MenuDashboard:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.menu_file = os.path.join(base_dir, '..' , 'database', 'menu.json')
        
        self.menu = self.load_menu()

    
    def load_menu(self):
        """Load menu from the JSON file."""
        try:
            with open(self.menu_file, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            print(f"{self.menu_file} not found. Starting with an empty menu.")
            return {}
        except json.JSONDecodeError:
            print(f"Error decoding {self.menu_file}. Starting with an empty menu.")
            return {}

    def save_menu(self):
        """Save the menu to the JSON file."""
        with open(self.menu_file, 'w') as file:
            json.dump(self.menu, file, indent=4)
        print("Menu saved successfully.")


    
    def menu_management(self):
        while True:
            print("\n=============== MENU MANAGEMENT ================")
            print("1. ADD MENU ITEM ")
            print("2. VIEW MENU ITEM")
            print("3. EDIT MENU ITEM")
            print("4. BACK")
            
            choice = input("Please select an option: ")

            if choice == '1':
                self.add_menu_item()
            elif choice == '2':
                self.view_menu()
            elif choice == '3':
                self.edit_menu()                
            elif choice == '4':
                break
            else:
                print("Invalid choice. Please try again.")
    
    def add_menu_item(self):
        """Add a new item to the menu."""
        self.view_menu()  # Show the current menu to help the user
        category = input("\nEnter the category for the new item: ").strip().lower()

        # Ensure category exists in the menu or add it
        if category not in self.menu:
            create_category = input(f"The category '{category}' does not exist. Do you want to create it? (yes/no): ").strip().lower()
            if create_category != "yes":
                print("Operation canceled.")
                return
            self.menu[category] = []

        # Common inputs for all categories
        item_id = input("Enter item ID: ").strip()
        name = input("Enter item name: ").strip()
        new_item = {"id": item_id, "name": name}

        # Handle prices and attributes based on category
        if category == "soft_drinks":
            new_item["small_price"] = input("Enter price for Small size: ").strip()
            new_item["medium_price"] = input("Enter price for Medium size: ").strip()
            new_item["large_price"] = input("Enter price for Large size: ").strip()
        elif category == "water":
            new_item["half_liter_price"] = input("Enter price for 0.5L: ").strip()
            new_item["one_liter_price"] = input("Enter price for 1L: ").strip()
            new_item["two_liter_price"] = input("Enter price for 2L: ").strip()
        elif category in ["veg", "non_veg", "salad"]:
            new_item["quarter_price"] = input("Enter price for Quarter size: ").strip()
            new_item["half_price"] = input("Enter price for Half size: ").strip()
            new_item["full_price"] = input("Enter price for Full size: ").strip()
            ingredients = input("Enter ingredients (comma-separated): ").strip()
            new_item["ingredients"] = [ing.strip() for ing in ingredients.split(",")]
        elif category in ["ice_cream", "sweets"]:
            new_item["price"] = input("Enter price: ").strip()
            new_item["quantity"] = input("Enter quantity: ").strip()
        elif category == "snacks":
            new_item["price_per_packet"] = input("Enter price per packet: ").strip()
            new_item["quantity"] = input("Enter quantity: ").strip()
        elif category in ["indian_bread", "breakfast", "rice_dishes"]:
            new_item["quarter_price"] = input("Enter price for Quarter size: ").strip()
            new_item["half_price"] = input("Enter price for Half size: ").strip()
            new_item["full_price"] = input("Enter price for Full size: ").strip()
        else:
            print(f"Unrecognized category '{category}'. Please try again.")
            return

        # Add the new item to the menu
        self.menu[category].append(new_item)
        self.save_menu()
        print(f"Item '{name}' added successfully to category '{category}'.")


    def edit_menu(self):
        """Edit or delete menu items."""
        while True:
            self.view_menu()
        
            print("\nOptions:")
            print("1. DELETE ITEM BY CATEGORY")
            print("2. DELETE ITEM BY ID")
            print("3. UPDATE ITEM PRICE")
            print("4. BACK")
            option = input("Choose an option (1, 2, 3, or 4): ").strip()

            if option == "1":
                # Delete all items in a category
                category = input("Enter the category to delete all items: ").strip().lower()
                category_found = next((cat for cat in self.menu if cat.lower() == category), None)
                
                if category_found:
                    confirm = input(f"Are you sure you want to delete all items in '{category_found}'? (yes/no): ").strip().lower()
                    if confirm == "yes":
                        del self.menu[category_found]
                        self.save_menu()
                        print(f"All items in the '{category_found}' category have been deleted.")
                    else:
                        print("Operation canceled.")
                else:
                    print("Category not found. Please check the category name and try again.")
            
            elif option == "2":
                # Delete an item by ID
                category = input("Enter the category of the item to delete: ").strip().lower()
                item_id = input("Enter the item ID to delete: ").strip()
                
                category_found = next((cat for cat in self.menu if cat.lower() == category), None)
                
                if category_found:
                    found = False
                    for item in self.menu[category_found]:
                        if str(item["id"]) == item_id:
                            found = True
                            confirm = input(f"Are you sure you want to delete item '{item['name']}'? (yes/no): ").strip().lower()
                            if confirm == "yes":
                                self.menu[category_found].remove(item)
                                self.save_menu()
                                print("Item deleted successfully.")
                            else:
                                print("Operation canceled.")
                            break
                    if not found:
                        print("Item ID not found in the specified category.")
                else:
                    print("Category not found. Please check the category name and try again.")
            
            elif option == "3":
                # Update an item
                category = input("Enter the category of the item to update: ").strip().lower()
                item_id = input("Enter the item ID to update: ").strip()
                
                category_found = next((cat for cat in self.menu if cat.lower() == category), None)
                
                if category_found:
                    found = False
                    for item in self.menu[category_found]:
                        if str(item["id"]) == item_id:
                            found = True
                            item["name"] = input(f"Enter new name (current: {item['name']}): ") or item["name"]
                            for key in [k for k in item if 'price' in k]:
                                item[key] = input(f"Enter new price for {key.replace('_price', '').capitalize()} (current: {item[key]}): ") or item[key]
                            self.save_menu()
                            print("Item updated successfully.")
                            break
                    if not found:
                        print("Item ID not found in the specified category.")
                else:
                    print("Category not found. Please check the category name and try again.")
            elif option =='4':
                break
            else:
                print("Invalid option. Please choose 1, 2, 3, or 4.")



    


    def view_menu(self):
        print("\n======= EDIT MENU ========")
        
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



# Example usage:
if __name__ == "__main__":
    dashboard = MenuDashboard()
    dashboard.menu_management()
