
import os
import json
import uuid
from datetime import datetime, date

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


class EmployeeManagement:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.json_file = os.path.join(base_dir, '..', 'Database', 'staff_data.json')
        self.staff_list = self.load_data()

    def load_data(self):
        """Load staff data from the JSON file."""
        if os.path.exists(self.json_file):
            try:
                with open(self.json_file, 'r') as file:
                    staff_list = json.load(file)
                    for staff in staff_list:
                        if 'id' not in staff:
                            staff['id'] = str(uuid.uuid4())[:4]
                        if 'date_of_birth' in staff:  # Ensure date_of_birth is in datetime.date format
                            staff['date_of_birth'] = datetime.strptime(staff['date_of_birth'], "%Y-%m-%d").date()
                        if 'date_of_joining' in staff:  # Ensure date_of_joining is in datetime.date format
                            staff['date_of_joining'] = datetime.strptime(staff['date_of_joining'], "%Y-%m-%d").date()
                    return staff_list
            except Exception as e:
                print(f"Error loading data: {e}")
        else:
            print(f"File {self.json_file} not found.")
        return []

    def save_data(self):
        """Save staff data to the JSON file."""
        os.makedirs(os.path.dirname(self.json_file), exist_ok=True)

        # Convert date fields back to string format before saving
        for staff in self.staff_list:
            if isinstance(staff.get('date_of_birth'), date):
                staff['date_of_birth'] = staff['date_of_birth'].strftime("%Y-%m-%d")
            if isinstance(staff.get('date_of_joining'), date):
                staff['date_of_joining'] = staff['date_of_joining'].strftime("%Y-%m-%d")

        with open(self.json_file, 'w') as file:
            json.dump(self.staff_list, file, indent=4)

    def employee_management(self):
        """Menu for employee management."""
        
        while True:
            print(F"{bcolors.OKYELLOW}\n=======================================================")
            print(f"{bcolors.HEADER}***************** EMPLOYEE MANAGEMENT *****************")
            print(F"{bcolors.OKYELLOW}=======================================================")
            print(f"{bcolors.OKBLUE}1. HIRE STAFF")
            print("2. EDIT STAFF PROFILE")
            print("3. DELETE STAFF PROFILE")
            print("4. VIEW ALL STAFF STATUS")
            print("5. VIEW ALL STAFF PROFILE")
            print("6. BACK")

            choice = input(f"{bcolors.OKGREEN}Please select an option: ")

            if choice == '1':
                self.add_staff()
            elif choice == '2':
                self.edit_staff()
            elif choice == '3':
                self.delete_staff()
            elif choice == '4':
                self.view_staff()
            elif choice == '5':
                self.view_individual_staff_profiles()
            elif choice == '6':
                break
            else:
                print(f"{bcolors.FAIL}Invalid choice. Please try again.")

            while True:
                print(f"{bcolors.OKBLUE}\nDO YOU WANT TO:")
                print("1. GO BACK EMPLOYEE MANAGEMENT")
                print("2. GO BACK TO ADMIN MENU")
                
                choice = input(f"{bcolors.OKGREEN}Enter your choice (1/2): ")
                if choice == '1':
                    break  # Continue to perform another action
                elif choice == '2':
                    return 
                else:
                    print(f"{bcolors.FAIL}Invalid choice. Please enter 1 or 2.")

    def view_individual_staff_profiles(self):
        """View details of all staff members."""
        if not self.staff_list:
            print(f"{bcolors.WARNING}No staff members available in the system.{bcolors.ENDC}")
        else:
            print(f"{bcolors.HEADER}\n================== ALL STAFF PROFILES ==================")
            for staff_member in self.staff_list:
                print(f"{bcolors.HEADER}----------------------------------------------------")
                for key, value in staff_member.items():
                    print(f"{bcolors.OKCYAN}{key.capitalize()}: {value}{bcolors.ENDC}")
            print(f"{bcolors.HEADER}===================================================={bcolors.ENDC}")

    def add_staff(self):
        """Add a new staff member with updated fields and validation."""
        name = input(f"{bcolors.OKBLUE}Enter staff's full name: ").strip()
        
        # Email validation
        while True:
            email = input(f"{bcolors.OKBLUE}Enter staff's email: ").strip()
            if email.endswith('@gmail.com'):
                break
            else:
                print(f"{bcolors.WARNING}Invalid email! It must end with '@gmail.com'.")
        
        # Date of Birth Validation
        while True:
            date_of_birth = input("Enter Staff's Date of Birth (YYYY-MM-DD): ").strip()
            try:
                date_of_birth = datetime.strptime(date_of_birth, "%Y-%m-%d").date()
                # Calculate the age
                today = date.today()
                age = today.year - date_of_birth.year - ((today.month, today.day) < (date_of_birth.month, date_of_birth.day))

                if 18 <= age <= 70:  # Valid age range check
                    print(f"Valid DOB. Staff age is {age} years.")
                    break
                else:
                    print(f"Invalid age: {age}. Staff must be between 18 and 70 years old.")
            except ValueError:
                print("Invalid date format. Please enter DOB in YYYY-MM-DD format.")

        # Mobile number validation
        while True:
            mobile_number = input(f"{bcolors.OKBLUE}Enter staff's mobile number: ").strip()
            if mobile_number.isdigit() and len(mobile_number) == 10:
                break
            else:
                print(f"{bcolors.WARNING}Invalid input. Mobile number must be exactly 10 digits.")

        # Address input
        address = input("Enter staff's address: ").strip()
        
        # Role validation (must not be an integer)
        while True:
            role = input("Enter staff role: ").strip()
            if role.isdigit():
                print(f"{bcolors.WARNING}Invalid input. Role cannot be a number.")
            else:
                break

        # Salary validation (must be a positive number)
        while True:
            salary = input("Enter staff salary: ").strip()
            if salary.isdigit() and int(salary) > 0:
                salary = int(salary)  # Convert salary to integer
                break
            else:
                print(f"{bcolors.WARNING}Invalid input. Salary must be a positive number.")

        # Employee type input (no specific validation mentioned)
        employee_type = input("Enter employee type (Full-time/Part-time): ").strip()

        # Gender validation (must be a string, not a number)
        while True:
            gender = input("Enter staff gender: ").strip().capitalize()
            if gender.isdigit():
                print(f"{bcolors.WARNING}Invalid input. Gender must be a string.")
            else:
                break

        while True:
            status = input("Enter status (Active/Inactive): ").strip().capitalize()
            if status in ["Active", "Inactive"]:
                break
            else:
                print(f"{bcolors.WARNING}Invalid input! Please enter 'Active' or 'Inactive'.")

        # Username validation
        while True:
            username = input(f"{bcolors.OKBLUE}Enter a username for the staff: ").strip()
            if any(staff['username'] == username for staff in self.staff_list):
                print(f"{bcolors.WARNING}Username '{username}' is already taken. Please choose a different one.")
            elif not username.isalnum() or not username.isupper():
                print(f"{bcolors.WARNING}Invalid username! It must contain only uppercase letters and digits.")
            else:
                break

        shift_preference = input(f"{bcolors.OKBLUE}Enter shift preference (day/night): ").strip().lower()
        while shift_preference not in ["day", "night"]:
            shift_preference = input(f"{bcolors.WARNING}Invalid input. Enter shift preference (day/night): ").strip().lower()

        staff_id = str(uuid.uuid4())[:4]
        
        # Password validation
        while True:
            password = input("Enter a password for the staff: ").strip()
            if any(staff['password'] == password for staff in self.staff_list):
                print(f"{bcolors.FAIL}Password '{password}' is already taken. Please choose a different one.")
            elif len(password) < 7 or len(password) > 16:
                print(f"{bcolors.FAIL}Invalid password! It must be between 7 and 16 characters.")
            elif not (password[0].isupper() and password[1:].islower()):
                print(f"{bcolors.FAIL}Password must start with an uppercase letter followed by lowercase letters.")
            elif not any(char.isdigit() for char in password):
                print(f"{bcolors.FAIL}Password must contain at least one digit.")
            elif not any(char in "!@#$%^&*(),.?\":{}|<>" for char in password):
                print(f"{bcolors.FAIL}Password must contain at least one special character.")
            else:
                break

        date_of_joining = datetime.now().strftime("%Y-%m-%d")

        staff_member = {
            "id": staff_id,
            "name": name,
            "email": email,
            "date_of_birth": date_of_birth,
            "mobile_number": mobile_number,
            "address": address,
            "role": role,
            "salary": salary,
            "employee_type": employee_type,
            "date_of_joining": date_of_joining,
            "shift_preference": shift_preference,
            "gender": gender,
            "username": username,
            "password": password,
            "status": status
        }

        self.staff_list.append(staff_member)
        self.save_data()
        print(f"{bcolors.OKCYAN}Staff {name} added successfully with ID {staff_id} and username '{username}'.")

    def edit_staff(self):
        """Edit an existing staff member's information with updated fields."""
        self.view_staff()
        staff_id = input("Enter the ID of the staff member to edit: ")

        staff_found=False
        for staff in self.staff_list:
            if staff['id'] == staff_id:
                staff_found=True
                print(f"Editing {staff['name']}...")

                while True:
                    print(f"{bcolors.HEADER}\nSelect the field you want to edit:")
                    print("1. Name")
                    print("2. Email")
                    print("3. Date Of Birth")
                    print("4. Mobile Number")
                    print("5. Address")
                    print("6. Role")
                    print("7. Salary")
                    print("8. Employee Type")
                    print("9. Gender")
                    print("10. Username")
                    print("11. Password")
                    print("12. Status (Active/Inactive)")
                    print("13. Shift Preference")
                    print("14. Done Editing")

                    choice = input(f"{bcolors.OKBLUE}Choose an option: ")

                    if choice == '1':
                        new_name = input(f"Enter new name (current: {staff['name']}): ").strip()
                        if new_name:
                            staff['name'] = new_name
                            print("Name updated.")
                    
                    elif choice == '2':
                    # Email validation
                        while True:
                            new_email = input(f"Enter new email (current: {staff['email']}): ").strip()
                            if new_email.endswith('@gmail.com'):
                                staff['email'] = new_email
                                print("Email updated.")
                                break
                            else:
                                print(f"{bcolors.WARNING}Invalid email! It must end with '@gmail.com'.")
                    
                    elif choice == '3':
                                        while True:
                                            date_of_birth = input(f"Enter Staff's Date of Birth (current: {staff['date_of_birth']}): ").strip()
                                            if not date_of_birth:
                                                print("DOB unchanged.")
                                                break
                                            try:
                                                date_of_birth = datetime.strptime(date_of_birth, "%Y-%m-%d").date()
                                                if 18 <= (date.today() - date_of_birth).days // 365 <= 70:
                                                    staff['date_of_birth'] = date_of_birth
                                                    print("DOB updated.")
                                                    break
                                                else:
                                                    print(f"{bcolors.WARNING}Invalid age. Staff must be between 18 and 70 years old.")
                                            except ValueError:
                                                print("Invalid date format. Please enter DOB in YYYY-MM-DD format.")

                    elif choice == '4':
                    # Mobile number validation
                        while True:
                            new_mobile_number = input(f"Enter new mobile number (current: {staff['mobile_number']}): ").strip()
                            if new_mobile_number.isdigit() and len(new_mobile_number) == 10:
                                staff['mobile_number'] = new_mobile_number
                                print("Mobile number updated.")
                                break
                            else:
                                print(f"{bcolors.WARNING}Invalid input. Mobile number must be exactly 10 digits.")

                    
                    
                    elif choice == '5':
                        new_address = input(f"Enter new address (current: {staff['address']}): ").strip()
                        if new_address:
                            staff['address'] = new_address
                            print("Address updated.")

                    elif choice == '6':
                    # Role validation (must not be an integer)
                        while True:
                            new_role = input(f"Enter new role (current: {staff['role']}): ").strip()
                            if new_role.isdigit():
                                print(f"{bcolors.WARNING}Invalid input. Role cannot be a number.")
                            else:
                                staff['role'] = new_role
                                print("Role updated.")
                                break

                    elif choice == '7':
                    # Salary validation (must be a positive number)
                        while True:
                            new_salary = input(f"Enter new salary (current: {staff['salary']}): ").strip()
                            if new_salary.isdigit() and int(new_salary) > 0:
                                staff['salary'] = int(new_salary)  # Convert salary to integer
                                print("Salary updated.")
                                break
                            else:
                                print(f"{bcolors.WARNING}Invalid input. Salary must be a positive number.")


                    elif choice == '8':
                        new_employee_type = input(f"Enter new employee type (current: {staff['employee_type']}): ").strip()
                        if new_employee_type in ["Full-time", "Part-time"]:
                            staff['employee_type'] = new_employee_type
                            print("Employee type updated.")
                        else:
                            print(f"{bcolors.WARNING}Invalid employee type.")
                    elif choice == '9':
                        new_gender = input(f"Enter new gender (current: {staff['gender']}): ").strip().capitalize()
                        if new_gender in ["Male", "Female", "Other"]:
                            staff['gender'] = new_gender
                            print("Gender updated.")
                        else:
                            print(f"{bcolors.WARNING}Invalid gender.")
                    elif choice == '10':
                        new_username = input(f"Enter new username (current: {staff['username']}): ").strip()
                        if new_username and all(s['username'] != new_username for s in self.staff_list if s != staff):
                            staff['username'] = new_username
                            print("Username updated.")
                        else:
                            print(f"{bcolors.WARNING}Username '{new_username}' is already taken or invalid.")

                    elif choice == '11':  # Password Edit
                        new_password = input("Enter new password: ").strip()

                        # Check for existing password
                        if any(staff['password'] == new_password for staff in self.staff_list if staff != staff):
                            print(f"{bcolors.WARNING}This password is already taken by another staff member. Please choose a different one.")
                        elif len(new_password) < 7 or len(new_password) > 16:
                            print(f"{bcolors.WARNING}Invalid password! It must be between 7 and 16 characters.")
                        elif not (new_password[0].isupper() and new_password[1:].islower()):
                            print(f"{bcolors.WARNING}Invalid password! The first letter must be uppercase and the rest lowercase.")
                        elif not any(char.isdigit() for char in new_password):
                            print(f"{bcolors.WARNING}Invalid password! It must contain at least one digit.")
                        elif not any(char in "!@#$%^&*(),.?\":{}|<>" for char in new_password):
                            print(f"{bcolors.WARNING}Invalid password! It must contain at least one special character.")
                        else:
                            staff['password'] = new_password
                            print("Password updated.")

                    elif choice == '12':
                        staff = next((s for s in self.staff_list if s['id'] == staff_id), None)
                        
                        if staff:
                            # Display current status
                            print(f"Current status of {staff['name']} is {staff['status']}.")

                            # Ask for new status (Active/Inactive)
                            new_status = input("Enter new status (Active/Inactive): ").strip().capitalize()

                            # Validate the new status
                            if new_status in ["Active", "Inactive"]:
                                if staff['status'] == 'Active' and new_status == 'Inactive':
                                    # If current status is Active and trying to set to Inactive, update the status
                                    staff['status'] = new_status
                                    print(f"Status of {staff['name']} has been updated to Inactive.")
                                elif staff['status'] == 'Inactive' and new_status == 'Active':
                                    # If current status is Inactive and trying to set to Active, update the status
                                    staff['status'] = new_status
                                    print(f"Status of {staff['name']} has been updated to Active.")
                                else:
                                    # If trying to set the same status, show a message
                                    print(f"The status of {staff['name']} is already {new_status}. No changes made.")
                            else:
                                print(f"{bcolors.WARNING}Invalid status! Please enter either 'Active' or 'Inactive'.")
                                         
                    elif choice == '13':
                        new_shift_preference = input("Enter shift preference (day/night): ").strip().lower()
                        if new_shift_preference in ["day", "night"]:
                            staff['shift_preference'] = new_shift_preference
                            print("Shift preference updated.")
                        else:
                            print(f"{bcolors.WARNING}Invalid shift preference.")
                    elif choice == '14':
                        print("Done editing.")
                        break
                    else:
                        print(f"{bcolors.WARNING}Invalid choice, please try again.")
                    
                self.save_data()
                print(f"Staff {staff['name']} updated successfully.")
                break
        if not staff_found:  # This will only execute if no staff was found with the given ID
            print(f"{bcolors.WARNING}Staff member with ID {staff_id} not found.")
          

    def delete_staff(self):
        """Delete a staff member by ID."""
        self.view_staff()
        staff_id = input(f"{bcolors.OKBLUE}Enter the ID of the staff member to delete: ")

        for staff in self.staff_list:
            if 'id' in staff and staff['id'] == staff_id:
                confirm = input(f"Are you sure you want to delete {staff['name']}? (yes/no): ").lower()
                if confirm == 'yes':
                    self.staff_list.remove(staff)
                    self.save_data()
                    print(f"Staff with ID {staff_id} deleted successfully.")
                else:
                    print(f"{bcolors.WARNING}Deletion canceled.")
                return
        print(f"Staff member with ID {staff_id} not found.")

    def view_staff(self):
        """Display all staff members, categorized by status (Active/Inactive)."""
        active_staff = [staff for staff in self.staff_list if staff['status'].lower() == 'active']
        inactive_staff = [staff for staff in self.staff_list if staff['status'].lower() == 'inactive']
        
        # Display active staff
        print(f"{bcolors.HEADER}\n====================== Active Staff =======================")
        if active_staff:
            for staff in active_staff:
                print(f"{bcolors.OKCYAN}ID: {staff['id']}, Name: {staff['name']}, Role: {staff['role']}, Status: {staff['status']}")
        else:
            print(f"{bcolors.WARNING}No active staff members.")
        
        print(F"{bcolors.OKYELLOW}============================================================")
        # Display inactive staff
        print(f"{bcolors.HEADER}\n====================== Inactive Staff ======================")
        if inactive_staff:
            for staff in inactive_staff:
                print(f"{bcolors.OKCYAN}ID: {staff['id']}, Name: {staff['name']}, Role: {staff['role']}, Status: {staff['status']}")
        else:
            print(f"{bcolors.WARNING}No inactive staff members.")
        
        print(F"{bcolors.OKYELLOW}============================================================")

if __name__ == "__main__":
    print("Welcome to the Employee Management System.")
    dashboard = EmployeeManagement()
    dashboard.employee_management()
