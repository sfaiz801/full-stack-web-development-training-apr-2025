
from SRC.Database.Collections.User import User
from SRC.Utility.Validation import *
from SRC.Utility.Get_input import get_password, get_input
from SRC.Controllers.User_controller.User_state import UserState
from SRC.Utility.color import tcolor
from SRC.Utility.Error_log import log

def update_name():
    try:
        USER = User()
        user_state = UserState().get_state
        name = get_input(validate_name, 'Enter update name : ', 'Invalid name')
        if(not name):
            raise Exception('Invalid name')
        for user in USER.users:
            if(user['email'] == user_state['email']):
                user['name'] = name
                USER.save_user()
                print(f'{tcolor.OKGREEN}Name updated successfully')
    except Exception as error:
        print(f'{tcolor.FAIL}{error}')
        log(error)
        
def update_address():
    try:
        USER = User()
        user_state = UserState().get_state
        address = get_input(validate_address, 'Enter update address : ', 'Invalid address')
        if(not address):
            raise Exception('Invalid address')
        for user in USER.users:
            if(user['email'] == user_state['email']):
                user['address'] = address
                USER.save_user()
                print(f'{tcolor.OKGREEN}Address updated successfully')
    except Exception as error:
        print(f'{tcolor.FAIL} {error}')
        log(error)

def update_gender():
    try:
        USER = User()
        user_state = UserState().get_state
        gender = get_input(validate_gender, 'Enter update gender : ', 'Invalid gender')
        if(not gender):
            raise Exception('Invalid gender')
        for user in USER.users:
            if(user['email'] == user_state['email']):
                user['gender'] = gender
                USER.save_user()
                print(f'{tcolor.OKGREEN}Gender updated successfully')
    except Exception as error:
        print(f'{tcolor.FAIL} {error}')
        log(error)
        
def update_password():
    try:
        USER = User()
        user_state = UserState().get_state
        
        new_password = get_password(validate_password, 'Enter new password : ' , 'Invalid password')
        if(not new_password):
            raise Exception('Invalid password')
        for user in USER.users:
            if(user['email'] == user_state['email']):
                user['password'] = new_password
                USER.save_user()
                print(f'{tcolor.OKGREEN}Password updated successfully')
    except Exception as error:
        print(f'{tcolor.FAIL} {error}')
        log(error)

def update_phone():
    try:
        USER = User()
        user_state = UserState().get_state
        phone = get_input(validate_phone, 'Enter update phone : ', 'Invalid phone')
        if(not phone):
            raise Exception('Invalid phone')
        for user in USER.users:
            if(user['email'] == user_state['email']):
                user['phone'] = phone
                USER.save_user()
                print(f'{tcolor.OKGREEN}Phone updated successfully')
    except Exception as error:
        print(f'{tcolor.FAIL} {error}')
        log(error)

def update_dob():
    try:
        USER = User()
        user_state = UserState().get_state
        dob = get_input(validate_dob, 'Enter update dob (DD-MM-YYYY) : ', 'Invalid dob')
        if(not dob):
            raise Exception('Invalid dob')
        for user in USER.users:
            if(user['email'] == user_state['email']):
                user['date_of_birth'] = dob
                USER.save_user()
                print(f'{tcolor.OKGREEN}Dob updated successfully')
    except Exception as error:
        print(f'{tcolor.FAIL} {error}')
        log(error)
        