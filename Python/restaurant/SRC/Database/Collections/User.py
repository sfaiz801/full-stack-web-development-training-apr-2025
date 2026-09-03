from SRC.Database.Collections.Path import USER_FILE
import json
import os

class User:
    def __init__(self):
        self.users=self.load_user()
        
    def load_user(self):
        if os.path.exists(USER_FILE):
            with open(USER_FILE, 'r') as f:
                return json.load(f)
        else:
            return []
        
    def save_user(self):
        with open(USER_FILE, 'w') as f:
            json.dump(self.users, f, indent=4)
            