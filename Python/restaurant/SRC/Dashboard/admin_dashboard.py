from ..Authentication.authentication import Authentication
from ..Manage_Employee.manage_employee import EmployeeManagement
from ..Manage_Reservation.manage_reservation import ReservationMenu
<<<<<<< HEAD
from ..CustomerAuthentication import Customer_authentication
=======
from ..Order_Management.Manage_Order import OrderManagement
from ..Menu.menu import MenuDashboard
from ..Bill_Management.Manage_Bill import BillManagement
from ..Bill_Management.View_Bill import BillManager
from ..Restaurent_Profile.restaurent_profile import RestaurantProfileManager
from .Staff_Dashboard import staff_dashboard
from ..CustomerAuthentication import Customer_authentication

>>>>>>> b47be83a9f07c6f3d82cbd7f0b79fd996769517c
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


class AdminDashboard:
    def __init__(self):
        self.main_dashboard()

    def main_dashboard(self):        
        while True:

            print(f"{bcolors.HEADER}\n============================================================")
            print("                   RED HEAVEN RESTAURANT                   ")
            print("                   Siwan, Bihar - 841438                     ")
            print("=============================================================")

            print(F"{bcolors.OKYELLOW}\n========================================================")
            print(f"{bcolors.HEADER}******************** MAIN DASHBOARD ********************")
            print(F"{bcolors.OKYELLOW}========================================================")            
            print(f"{bcolors.OKBLUE}1. LOGIN")
            print("2. EXIT")

            choice = input(f"{bcolors.OKBLUE}Please select an option: ")

            if choice == '1':
                self.login_dashboard()
            elif choice == '2':
                print(f"{bcolors.ENDC}Exiting system... Goodbye!")
                break
            else:
                print(f"{bcolors.FAIL}Invalid choice. Please try again.")

    def login_dashboard(self):
        auth = Authentication()
        while True:
            print(F"{bcolors.OKYELLOW}\n======================================================")
            print(f"{bcolors.HEADER}******************* LOGIN DASHBOARD ******************")
            print(f"{bcolors.OKYELLOW}======================================================")
            print(f"{bcolors.OKBLUE}1. ADMIN LOGIN")
            print("2. STAFF LOGIN")
            print("3. CUSTOMER LOGIN")
            print("4. BACK")

            choice = input(f"{bcolors.OKGREEN}Please select an option: ")

            if choice == '1':
                if auth.manager_login():
                    self.admin_menu()
                else:
                    print("Login failed. Returning to Login Dashboard.")
            elif choice == '2':
                staff_dashboard()
            elif choice == '3':
<<<<<<< HEAD
                print("Customer Login selected. Proceed with Customer Login logic...")
                Customer_authentication()
            elif choice == '0':
                break
=======
                Customer_authentication()
>>>>>>> b47be83a9f07c6f3d82cbd7f0b79fd996769517c
            elif choice == '4':
                return   
            else:
                print(f"{bcolors.FAIL}Invalid choice. Please try again.")

    def admin_menu(self):
        """Displays admin menu options, then asks if the user wants to see it again after each action."""
        manage_employee = EmployeeManagement()
        manage_order=OrderManagement()
        manage_reservation= ReservationMenu()
        menu=MenuDashboard()
        bill=BillManagement()
        view_bill=BillManager()
        restaurant=RestaurantProfileManager()
        
        show_dashboard = True

        while True:
            
            if show_dashboard:
                print(F"{bcolors.OKYELLOW}\n======================================================")
                print(f"{bcolors.HEADER}==================== ADMIN MENU ======================")
                print(F"{bcolors.OKYELLOW}======================================================")
                print(f"{bcolors.OKBLUE}1. MENU")
                print("2. ORDER")
                print("3. MANAGE EMPLOYEE")
                print("4. MANAGE RESERVATION")
                print("5. RESTAURENT PROFILE")
                print("6. SALES REPORTS")
                print("7. VIEW BILL")
                print("8. LOGOUT")

            
            choice = input(f"{bcolors.OKGREEN}Please enter your choice: ")

            
            if choice == '1':
                menu.menu_management()               
            elif choice == '2':
                manage_order.Order_Management_Admin_Dashboard()  
            elif choice == '3':              
                manage_employee.employee_management()
            elif choice == '4':
                manage_reservation.reservation_admin_main()
            elif choice == '5':
                restaurant.restaurant_profile_menu()
            elif choice == '6':
                bill.Bill_Management_Dashboard_Admin()
            elif choice == '7':
                view_bill.print_bill()
            elif choice =='8':
                break
            else:
                print(f"{bcolors.FAIL}Invalid choice. Please try again.")
            


if __name__ == '__main__':
    AdminDashboard()