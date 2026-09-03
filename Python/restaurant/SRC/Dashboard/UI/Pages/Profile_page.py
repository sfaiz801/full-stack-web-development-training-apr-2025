from SRC.Utility.Get_input import get_input
from SRC.Utility.Validation import validate_int
from SRC.Controllers.User_controller.Update_user import *
from SRC.Controllers.User_controller.User import delete_user, view_profile
from SRC.Utility.color import tcolor
from SRC.Dashboard.UI.Pages.Profile_update_page import profile_update_page


def profile_page():
    while True:
    
        print(f'{tcolor.HEADER}**************PROFILE PAGE****************')
        print(f'{tcolor.OKBLUE}1. UPDATE PROFILE')
        print(f'2. VIEW PROFILE')
        print(f'3. DELETE PROFILE')
        print(f'4. BACK')
        
        choice = get_input(validate_int, 'Choose a option : ', 'Invalid option')
        if(not choice):
            break
        if choice == 1:
            profile_update_page()
        elif choice == 2:
            view_profile()
        elif choice == 3:
            delete_user()
        elif choice == 4:
            break
        else:
            print(f'{tcolor.FAIL}Invalid option')
            continue
        
