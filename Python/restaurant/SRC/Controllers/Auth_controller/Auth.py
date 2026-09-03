from SRC.Database.Collections.User import User
from SRC.Utility.Verify_user import verify_user
from SRC.Models.User_model import UserModel
from SRC.Dashboard.Customer_dashboard import customer_dashboard
from SRC.Controllers.User_controller.User_state import UserState
from SRC.Utility.Error_log import log

def user_signup(name, date_of_birth, gender, address, email, phone, username, password):
    try:
        USER = User()
        find_user = verify_user(email)
        if find_user:
            raise Exception('User already register with this email')
        if(verify_user(username)):
            raise Exception('Username already exist')
        new_user = UserModel(name,date_of_birth,gender,address,email,phone,username,password).__dict__
        USER.users.append(new_user)
        USER.save_user()
        print('User created successfully')
    except Exception as error:
        print(error)
        log(error)
        
def user_login(username, password):
    try:
        users = User().users
        if(verify_user(username)):
            for user in users:
                if user['username'] == username:
                    if user['password'] == password:
                        if user['status'] == 'active':
                            #print('Login successfully!')
                            UserState().update_state(user)
                            customer_dashboard()
                        
                        else:
                            raise Exception('Your account is deactive, please contact to your admin')
                    else:
                        raise Exception('Wrong credential')
        else:
            raise Exception('User not found')
    except Exception as error:
        print(error)
        log(error)
        
                