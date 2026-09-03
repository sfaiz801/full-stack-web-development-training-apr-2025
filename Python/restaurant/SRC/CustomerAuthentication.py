

from SRC.Dashboard.UI.Auth_UI.Auth import login, signup
from SRC.Utility.Get_input import get_input
from SRC.Utility.Validation import validate_int
from SRC.Utility.color import tcolor



def Customer_authentication():
    while True:
        print(f"{tcolor.HEADER}\nᴀᴜᴛʜᴇɴᴛɪᴄᴀᴛɪᴏɴ ᴅᴀꜱʜʙᴏᴀʀᴅ")
        print(f"{tcolor.OKBLUE}1. Login")
        print("2. Signup")
        print("3. Exit")
        
        choice = get_input(validate_int, 'Choose a option : ', 'Invalid option')
        
        if(not choice):
            break
        
        
        if(choice == 1):
            login()
        elif choice == 2:
            signup()
        elif choice == 3:
            break
        else:
            print('Invalid option')
            
