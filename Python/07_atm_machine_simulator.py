"""
Project 07: ATM Simulator
Topic: Loops, Conditionals, Security Simulation (PIN verification, Max Attempts)
Description: Realistic ATM console simulation with PIN change, fast cash, and mini statement.
"""

import datetime

class ATMSimulator:
    def __init__(self, pin="1234", balance=5000.0):
        self.pin = pin
        self.balance = balance
        self.transactions = [f"Initial balance setup: ${balance:.2f}"]

    def verify_pin(self):
        attempts = 3
        while attempts > 0:
            entered_pin = input("Enter 4-Digit ATM PIN: ").strip()
            if entered_pin == self.pin:
                print("\n[✓] PIN Verified Successfully!")
                return True
            else:
                attempts -= 1
                print(f"[!] Incorrect PIN. Attempts remaining: {attempts}")
        print("[X] Card blocked due to 3 failed attempts. Please contact bank.")
        return False

    def withdraw(self):
        try:
            amt = float(input("Enter amount to withdraw (multiples of 100): $"))
            if amt <= 0 or amt % 100 != 0:
                print("Amount must be a positive multiple of 100.")
                return
            if amt > self.balance:
                print("Insufficient balance in your account.")
                return
            self.balance -= amt
            timestamp = datetime.datetime.now().strftime("%d-%b %H:%M")
            self.transactions.append(f"{timestamp} | Cash Withdrawal | -${amt:.2f}")
            print(f"\nPlease collect cash: ${amt:.2f}")
            print(f"Updated Balance: ${self.balance:.2f}")
        except ValueError:
            print("Invalid input.")

    def deposit(self):
        try:
            amt = float(input("Enter amount to deposit: $"))
            if amt <= 0:
                print("Invalid amount.")
                return
            self.balance += amt
            timestamp = datetime.datetime.now().strftime("%d-%b %H:%M")
            self.transactions.append(f"{timestamp} | Cash Deposit    | +${amt:.2f}")
            print(f"Deposit successful! Updated Balance: ${self.balance:.2f}")
        except ValueError:
            print("Invalid input.")

    def change_pin(self):
        old = input("Enter current PIN: ").strip()
        if old != self.pin:
            print("Incorrect current PIN.")
            return
        new_pin = input("Enter new 4-digit PIN: ").strip()
        if len(new_pin) == 4 and new_pin.isdigit():
            self.pin = new_pin
            print("PIN changed successfully!")
        else:
            print("PIN must be exactly 4 digits.")

    def mini_statement(self):
        print("\n" + "=" * 45)
        print("              MINI STATEMENT")
        print("=" * 45)
        last_5 = self.transactions[-5:]
        for t in last_5:
            print(t)
        print("-" * 45)
        print(f"Available Balance: ${self.balance:.2f}")
        print("=" * 45)

def main():
    atm = ATMSimulator(pin="1234", balance=10000.0)
    print("*" * 45)
    print("       WELCOME TO PYTHON BANK ATM")
    print("       (Default Demo PIN is 1234)")
    print("*" * 45)
    
    if not atm.verify_pin():
        return

    while True:
        print("\n--- ATM MAIN MENU ---")
        print("1. Balance Inquiry")
        print("2. Cash Withdrawal")
        print("3. Cash Deposit")
        print("4. Mini Statement")
        print("5. Change PIN")
        print("6. Exit / Eject Card")
        
        choice = input("Select an option (1-6): ").strip()
        if choice == '1':
            print(f"\nYour current available balance is: ${atm.balance:.2f}")
        elif choice == '2':
            atm.withdraw()
        elif choice == '3':
            atm.deposit()
        elif choice == '4':
            atm.mini_statement()
        elif choice == '5':
            atm.change_pin()
        elif choice == '6':
            print("\nPlease take your card. Thank you for using our ATM!")
            break
        else:
            print("Invalid selection.")

if __name__ == '__main__':
    main()
