from SRC.Utility.Get_input import get_input
from SRC.Utility.Validation import validate_int
from SRC.Controllers.User_controller.Update_user import *
from SRC.Controllers.User_controller.User import delete_user
from SRC.Utility.color import tcolor



def profile_update_page():
    while True:
    
        print(f'{tcolor.HEADER}**************PROFILE UPDATE PAGE****************')
        print(f'{tcolor.OKBLUE}1. UPDATE NAME')
        print(f'2. UPDATE PHONE')
        print(f'3. UPDATE ADDRESS')
        print(f'4. UPDATE GENDER')
        print(f'5. UPDATE DATE OF BIRTH')
        print(f'6. UPDATE PASSWORD')
        print(f'7. BACK')
        
        choice = get_input(validate_int, 'Choose a option : ', 'Invalid option')
        if(not choice):
            break
        if choice == 1:
            update_name()
        elif choice == 2:
            update_phone()
        elif choice == 3:
            update_address()
        elif choice == 4:
            update_gender()
        elif choice == 5:
            update_dob()
        elif choice == 6:
            update_password()
        elif choice == 7:
            break
        else:
            print(f'{tcolor.FAIL}Invalid option')
            continue
        
