from datetime import datetime
class UserModel:
    def __init__(self, name, date_of_birth, gender, address, email, phone, username, password):
        self.name = name
        self.date_of_birth = date_of_birth
        self.gender = gender
        self.address = address
        self.email = email
        self.phone = phone
        self.username = username
        self.password = password
        self.status = 'active'
        self.role = 'customer'
        self.create_at = str(datetime.now())


    def __str__(self):
        return {
            "name": {self.name},
            "date_of_birth": {self.date_of_birth},
            "gender": {self.gender},
            "address": {self.address},
            "email": {self.email},
            "phone": {self.phone},
            "username": {self.username},
            "password": {self.password},
            "status": {self.status},
            "role": {self.role},
            "create_at": {self.create_at}
        }

