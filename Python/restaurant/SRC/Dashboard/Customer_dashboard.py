from SRC.Utility.color import tcolor
from SRC.Utility.Validation import validate_int
from SRC.Utility.Get_input import get_input
from SRC.Dashboard.UI.Pages.Profile_page import profile_page
from SRC.Controllers.Item_controller.Item import search_item_by_category, search_item_by_name
from SRC.Manage_Reservation.manage_reservation import ReservationMenu
from SRC.Order_Management.Manage_Order import OrderManagement
from SRC.Bill_Management.Manage_Bill import BillManagement

def customer_dashboard():
    while True:
    
        print(f'{tcolor.HEADER}**************𝐂𝐔𝐒𝐓𝐎𝐌𝐄𝐑 𝐃𝐀𝐒𝐇𝐁𝐎𝐀𝐑𝐃****************')
        print(f'{tcolor.OKBLUE}1. PROFILE')
        print(f'2. SEARCH ITEM BY CATEGORY')
        print(f'3. SEARCH ITEM BY NAME')
        print(f'4. RESERVATION')
        print(f'5. ORDER')
        print(f'6. BILL')
        print(f'7. LOGOUT ')
        
        choice = get_input(validate_int, 'Choose a option : ', 'Invalid option')
        if(not choice):
            break
        elif choice == 1:
            profile_page()
        elif choice == 2:
            search_item_by_category()
        elif choice == 3:
            search_item_by_name()
        elif choice == 4:
            ReservationMenu().reservation_customer_main()
        elif choice == 5:
            OrderManagement().Order_Management_Dashboard()
        elif choice == 6:
            BillManagement().Bill_Management_Dashboard()
        elif choice == 7:
            break
        else:
            print(f'{tcolor.FAIL}Invalid option')
            continue
        