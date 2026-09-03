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
class EditStaffProfile:
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
                    print("12. Done Editing")

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