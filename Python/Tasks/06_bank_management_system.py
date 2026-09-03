"""
Project 06: Bank Account Management System (OOP)
Topic: Object Oriented Programming (Classes, Objects, Encapsulation)
Description: Create bank accounts, deposit, withdraw, transfer money, and check balance.
"""

import random

class BankAccount:
    def __init__(self, acc_no, holder_name, initial_deposit=0.0):
        self.acc_no = acc_no
        self.holder_name = holder_name
        self.__balance = float(initial_deposit)
        self.transaction_history = [f"Account opened with initial deposit: ${initial_deposit:.2f}"]

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive!")
            return False
        self.__balance += amount
        self.transaction_history.append(f"Deposited: +${amount:.2f} (Balance: ${self.__balance:.2f})")
        print(f"Successfully deposited ${amount:.2f}. New Balance: ${self.__balance:.2f}")
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive!")
            return False
        if amount > self.__balance:
            print("Insufficient funds!")
            return False
        self.__balance -= amount
        self.transaction_history.append(f"Withdrew: -${amount:.2f} (Balance: ${self.__balance:.2f})")
        print(f"Successfully withdrew ${amount:.2f}. Remaining Balance: ${self.__balance:.2f}")
        return True

    def get_balance(self):
        return self.__balance

    def print_statement(self):
        print("\n" + "=" * 50)
        print(f"       STATEMENT FOR ACC: {self.acc_no}")
        print(f"       Holder Name: {self.holder_name}")
        print("=" * 50)
        for t in self.transaction_history:
            print(f"- {t}")
        print(f"\nFinal Available Balance: ${self.__balance:.2f}")
        print("=" * 50)


class Bank:
    def __init__(self, name="Python National Bank"):
        self.name = name
        self.accounts = {}

    def create_account(self):
        name = input("Enter Account Holder Name: ").strip()
        if not name:
            print("Name cannot be empty.")
            return
        try:
            init_dep = float(input("Enter Initial Deposit ($): "))
            if init_dep < 0:
                print("Initial deposit cannot be negative.")
                return
        except ValueError:
            print("Invalid amount.")
            return

        acc_no = str(random.randint(100000, 999999))
        acc = BankAccount(acc_no, name, init_dep)
        self.accounts[acc_no] = acc
        print(f"\nAccount created successfully!")
        print(f"Account Number: {acc_no} | Holder: {name} | Balance: ${init_dep:.2f}")

    def get_account(self, acc_no):
        return self.accounts.get(acc_no)

    def transfer(self):
        src_no = input("Enter your Account Number: ").strip()
        src_acc = self.get_account(src_no)
        if not src_acc:
            print("Source account not found.")
            return

        dest_no = input("Enter Beneficiary Account Number: ").strip()
        dest_acc = self.get_account(dest_no)
        if not dest_acc:
            print("Beneficiary account not found.")
            return
        
        if src_no == dest_no:
            print("Cannot transfer to the same account.")
            return

        try:
            amount = float(input("Enter transfer amount ($): "))
        except ValueError:
            print("Invalid amount.")
            return

        if src_acc.withdraw(amount):
            dest_acc.deposit(amount)
            src_acc.transaction_history.append(f"Transfer to {dest_no}: -${amount:.2f}")
            dest_acc.transaction_history.append(f"Transfer from {src_no}: +${amount:.2f}")
            print(f"Transfer of ${amount:.2f} completed successfully!")

def main():
    bank = Bank()
    # Sample preloaded account
    demo = BankAccount("101010", "Demo User", 1500.0)
    bank.accounts["101010"] = demo

    while True:
        print("\n" + "=" * 40)
        print(f"    {bank.name}")
        print("=" * 40)
        print("1. Open New Bank Account")
        print("2. Deposit Money")
        print("3. Withdraw Money")
        print("4. Check Balance")
        print("5. Account Statement / Passbook")
        print("6. Transfer Funds")
        print("7. Exit")
        
        choice = input("Enter choice (1-7): ").strip()
        
        if choice == '1':
            bank.create_account()
        elif choice in ['2', '3', '4', '5']:
            acc_no = input("Enter Account Number: ").strip()
            acc = bank.get_account(acc_no)
            if not acc:
                print("Account does not exist.")
                continue

            if choice == '2':
                try:
                    amt = float(input("Enter deposit amount: $"))
                    acc.deposit(amt)
                except ValueError:
                    print("Invalid amount.")
            elif choice == '3':
                try:
                    amt = float(input("Enter withdraw amount: $"))
                    acc.withdraw(amt)
                except ValueError:
                    print("Invalid amount.")
            elif choice == '4':
                print(f"Current Balance for {acc.holder_name}: ${acc.get_balance():.2f}")
            elif choice == '5':
                acc.print_statement()
        elif choice == '6':
            bank.transfer()
        elif choice == '7':
            print("Thank you for banking with us!")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
