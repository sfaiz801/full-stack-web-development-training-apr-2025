from SRC.Database.Collections.User import User

def verify_user(username):
    users = User().users
    for user in users:
        if(user['email']==username or user['username']== username):
            return True
    return False