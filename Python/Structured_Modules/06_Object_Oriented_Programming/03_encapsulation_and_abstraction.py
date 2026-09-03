"""
03_encapsulation_and_abstraction.py
-----------------------------------
Demonstrates:
- Encapsulation: Protecting internal object state using private attributes (__balance)
- Getters and Setters using the @property decorator
- Abstraction: Abstract Base Classes (ABC) and @abstractmethod interfaces
"""

from abc import ABC, abstractmethod

# 1. ABSTRACTION: Interface blueprint using ABC
class PaymentGateway(ABC):
    """Abstract class defining the contract for payment processors."""

    @abstractmethod
    def process_payment(self, amount: float) -> bool:
        """Subclasses MUST implement this method."""
        pass

    @abstractmethod
    def get_provider_name(self) -> str:
        pass

class UPIPayment(PaymentGateway):
    def __init__(self, upi_id: str):
        self.upi_id = upi_id

    def process_payment(self, amount: float) -> bool:
        print(f"[UPI] Successfully transferred Rs. {amount:,.2f} to {self.upi_id}")
        return True

    def get_provider_name(self) -> str:
        return "National Payments Corporation (UPI)"

# 2. ENCAPSULATION: Bank Account with private balance
class BankAccount:
    def __init__(self, account_holder: str, initial_balance: float = 0.0):
        self.account_holder = account_holder
        # Private variable prefixed with double underscore
        self.__balance = max(0.0, initial_balance)

    @property
    def balance(self) -> float:
        """Getter: Read-only access to private balance."""
        return self.__balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive!")
        self.__balance += amount
        print(f"Deposited Rs. {amount:,.2f} | New Balance: Rs. {self.__balance:,.2f}")

    def withdraw(self, amount: float) -> bool:
        if amount > self.__balance:
            print(f"Transaction Rejected: Insufficient funds! Current: Rs. {self.__balance:,.2f}")
            return False
        self.__balance -= amount
        print(f"Withdrew Rs. {amount:,.2f} | Remaining: Rs. {self.__balance:,.2f}")
        return True

def main():
    print("--- 1. Encapsulation: Bank Account ---")
    acc = BankAccount("Mohammad Faiz", 5000.0)
    print(f"Account Holder: {acc.account_holder}")
    print(f"Current Balance (via property): Rs. {acc.balance:,.2f}")

    acc.deposit(2500.0)
    acc.withdraw(1200.0)
    acc.withdraw(10000.0) # should fail cleanly

    print("\n--- 2. Abstraction: Payment Gateway ---")
    payment: PaymentGateway = UPIPayment("faiz@okaxis")
    print(f"Provider: {payment.get_provider_name()}")
    payment.process_payment(3500.0)

if __name__ == "__main__":
    main()
