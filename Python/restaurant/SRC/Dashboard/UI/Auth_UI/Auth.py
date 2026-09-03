
from SRC.Utility.Get_input import get_input, get_password
from SRC.Utility.Validation import *
from SRC.Utility.Verify_user import verify_user
from SRC.Controllers.Auth_controller.Auth import user_login, user_signup
from SRC.Utility.Error_log import log
from SRC.Utility.color import tcolor


def login():
    try:
        username = get_input(validate_username, 'Enter your username : ', 'Invalid username')
        if(not username):
            return
        if(not verify_user(username)):
            raise Exception('User not exist')
        password = get_password(validate_password, 'Enter your password : ', 'Invalid password')
        if(not password):
            raise Exception('Invalid password')
        
        user_login(username, password)
        
    except Exception as error:
        print(f'{tcolor.FAIL}{error}')
        log(error)
        
        

def signup():
    try:
        name = get_input(validate_name, 'Enter your name : ','Invalid name ')
        if(not name):
            raise Exception('Invalid name')
        
        username = get_input(validate_username, 'Enter your username : ', 'Invalid username')
        if(not username):
            raise Exception('Invalid username')
        
        email = get_input(validate_email, 'Enter your email : ','Invalid email')
        if(not email):
            raise Exception('Invalid email')
        
        phone = get_input(validate_phone, 'Enter your mobile number : ', 'Invalid mobile number')
        if(not phone):
            raise Exception('Ivalid mobile number')
        
        gender = get_input(validate_gender, 'gender (male/female/other) : ', 'Invalid gender')
        if(not gender):
            raise Exception('Invalid gender')
        
        dob = get_input(validate_dob, 'Enter your dob (DD-MM-YYYY) : ', 'Invalid dob')
        if(not dob):
            raise Exception('Invalid dob')
        
        address = get_input(validate_address, 'Enter your address : ', 'Invalid address')
        if(not address):
            raise Exception('Invalid address')
        
        password = get_password(validate_password, 'Enter your password : ', 'Invalid password')
        if(not password):
            raise Exception('Invalid password')
        
        user_signup(name, dob, gender, address, email, phone, username, password)
        
    except Exception as error:
        print(f'{tcolor.FAIL}{error}')
        log(error)
    