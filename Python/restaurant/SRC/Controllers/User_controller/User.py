from SRC.Utility.color import tcolor
from SRC.Database.Collections.User import User
from SRC.Controllers.User_controller.User_state import UserState
from SRC.Utility.Get_input import get_input
from SRC.Utility.Validation import validate_int
from SRC.Utility.Error_log import log




def delete_user():
    try:
        print(f'{tcolor.HEADER}Do you want to delete your account')
        print(f'{tcolor.OKBLUE}1. YES ✅')
        print('2. NO ❌')
        choice = get_input(validate_int, 'Choose a option : ', 'Invalid option' )
        if(not choice):
            print('Invalid option')
            return
        if choice == 1:
            user_state = UserState().get_state
            USER = User()
            for user in USER.users:
                if user['email'] == user_state['email']:
                    user['status'] = 'deactive'
                    USER.save_user()
                    print(f"{tcolor.OKGREEN}User {user_state['email']} has been deleted")
        elif choice == 2:
            print('Thank you🙏')
        else:
            print('Invalid option')
            
    except Exception as error:
        print(f'{tcolor.FAIL} {error}')
        log(error)

def view_profile():
    try:
        user_state = UserState().get_state
        USER = User()
        for user in USER.users:
            if user['email'] == user_state['email']:
                print(f"{tcolor.OKBLUE}Email : {user['email']}")
                print(f"{tcolor.OKBLUE}Name : {user['name']}")
                print(f"{tcolor.OKBLUE}Date of birth : {user['date_of_birth']}")
                print(f"{tcolor.OKBLUE}Gender : {user['gender']}")
                print(f"{tcolor.OKBLUE}Phone : {user['phone']}")
                print(f"{tcolor.OKBLUE}Address : {user['address']}")
                print(f"{tcolor.OKBLUE}Status : {user['status']}")
    except Exception as error:
        print(f'{tcolor.FAIL} {error}')
        log(error)
        