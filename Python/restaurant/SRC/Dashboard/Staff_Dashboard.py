import sys
import os
import json
import getpass  # Import getpass to hide password input


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

# Add the project root to sys.path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# Importing OrderManagement from the correct path
from SRC.Order_Management.Manage_Order import OrderManagement
from SRC.Bill_Management.Manage_Bill import BillManagement
from SRC.Manage_Reservation.manage_reservation import ReservationMenu
from SRC.Manage_Employee.Edit_Staff_Profile import EditStaffProfile

def staff_dashboard():

    if login():
        staff_menu()  # Proceed to staff menu if login is successful
    elif not login():
        return
    else:
        print("Invalid input. Please try again.")

def login():
    # Define the path to 'staff_data.json' dynamically
    staff_data_path = os.path.join(os.path.dirname(__file__), '..', 'Database', 'staff_data.json')
    
    # Check if the file exists
    if not os.path.exists(staff_data_path):
        print("Staff data file not found.")
        return False

    try:
        with open(staff_data_path, 'r') as file:
            try:
                staff_data = json.load(file)
            except json.JSONDecodeError:
                print("Error: Malformed JSON in staff data file.")
                return False
    except Exception as e:
        print(f"Error reading staff data: {e}")
        return False

    # Check if staff data is empty
    if not staff_data:
        print("No staff data found.")
        return False

    # Prompt user for credentials
    username = input("Enter Staff username: ")
    password = getpass.getpass("Enter Staff password: ")  # Hide password input

    # Check credentials against staff data
    for staff in staff_data:
        if staff.get('username') == username and staff.get('password') == password:
            print(f"Login successful! Welcome {username} to the Staff Dashboard.\n")
            return True

    print("Invalid credentials. Please try again.")
    return False

def staff_menu():
    while True:
        print(f"{bcolors.HEADER}\n========= Staff Dashboard =========\n")
        print(f"{bcolors.OKBLUE}1. Order Management")
        print("2. Bill Management")
        print("3. Reservation")
        print("4. Edit Staff Profile")
        print("5. Exit to Login Menu")
        
        choice = input("Please select an option: ")
        
        if choice == "1":
            order_management = OrderManagement()  # Instantiate OrderManagement
            order_management.Order_Management_Dashboard()  # Call the method for managing orders
        elif choice == "2":
            bill=BillManagement()
            bill.Bill_Management_Dashboard()
        elif choice == "3":
            reservation=ReservationMenu()
            reservation.reservation_staff_main()
        elif choice == "4":
            edit_staff=EditStaffProfile()
            edit_staff.edit_staff()
        elif choice == "5":
            break
        else:
            print("Invalid option. Please try again.")


if __name__ == "__main__":
    staff_dashboard()
    
