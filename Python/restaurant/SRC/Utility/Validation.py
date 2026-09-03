import re 
def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@gmail\.com$'
    if(re.match(pattern, email)):
        return email.lower()
    else:
        return None

def validate_phone(phone):
    pattern = r'^\d{10}$'
    if(re.match(pattern, phone)):
        return phone
    else:
        return None
        
def validate_password(password):
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
    if(re.match(pattern, password)):
        return password
    else:
        return None

def validate_username(username):
    pattern = r"^[A-Za-z\d]+$"
    if(re.match(pattern, username)):
        return username.lower()
    else:
        return None

def validate_gender(gender):
    pattern = r"^(male|female|other)$"
    if(re.match(pattern, gender.lower())):
        return gender.lower()
    else:
        return None
    
def validate_address(addrress):
    pattern = r"^[A-Za-z0-9]+( +[A-Za-z0-9]+)*$"
    if(re.match(pattern, addrress)):
        return addrress
    else:
        return None

def validate_name(name):
    pattern = r"^[A-Za-z0-9]+( +[A-Za-z0-9]+)*$"
    if(re.match(pattern, name)):
        return name.lower()
    else:
        return None
    
def validate_dob(dob):
    pattern = r"^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$"
    if(re.match(pattern, dob)):
        return dob
    else:
        return None
    
def validate_int(i):
    pattern = r"^(0|[1-9]\d*)$"
    if(re.match(pattern, i)):
        return int(i)
    else:
        return None
    




