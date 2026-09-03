"""
02_custom_exceptions.py
-----------------------
Demonstrates custom, user-defined exceptions:
- Inheriting from built-in Exception class
- Attaching custom error codes and context
- Raising exceptions with 'raise'
"""

class AuthenticationError(Exception):
    """Raised when authentication credentials fail."""
    def __init__(self, username: str, message: str = "Invalid login credentials"):
        self.username = username
        self.message = message
        super().__init__(f"Auth Error for '{username}': {message}")

class InsufficientBalanceError(Exception):
    """Raised when withdrawal exceeds available funds."""
    def __init__(self, current_balance: float, requested_amount: float):
        self.current_balance = current_balance
        self.requested_amount = requested_amount
        super().__init__(
            f"Withdrawal of Rs. {requested_amount} denied. Current balance is only Rs. {current_balance}."
        )

def authenticate_user(username: str, password: str):
    valid_db = {"faiz": "securePass123"}
    if username not in valid_db or valid_db[username] != password:
        raise AuthenticationError(username, "Password mismatch or user does not exist")
    print(f"Login successful for user: {username}")

def main():
    print("--- 1. Testing Custom Authentication Exception ---")
    try:
        authenticate_user("faiz", "wrongPassword!")
    except AuthenticationError as e:
        print(f"[Caught Custom Exception] {e}")

    print("\n--- 2. Testing Custom Insufficient Balance Exception ---")
    try:
        balance = 500.0
        requested = 2000.0
        if requested > balance:
            raise InsufficientBalanceError(balance, requested)
    except InsufficientBalanceError as e:
        print(f"[Caught Custom Exception] {e}")

if __name__ == "__main__":
    main()
