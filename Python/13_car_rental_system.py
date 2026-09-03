"""
Project 13: Car Rental Management System
Topic: OOP, Dictionaries, State Management
Description: Rent cars, return cars, track available fleet, calculate rental fare by days/hours.
"""

class CarRentalService:
    def __init__(self):
        self.fleet = {
            "C1": {"brand": "Toyota Corolla", "type": "Sedan", "rate_per_day": 40, "available": True},
            "C2": {"brand": "Honda Civic", "type": "Sedan", "rate_per_day": 45, "available": True},
            "C3": {"brand": "Ford Mustang", "type": "Sports", "rate_per_day": 95, "available": True},
            "C4": {"brand": "Toyota RAV4", "type": "SUV", "rate_per_day": 60, "available": True},
            "C5": {"brand": "Tesla Model 3", "type": "Electric", "rate_per_day": 80, "available": True}
        }
        self.active_rentals = {}

    def show_available_cars(self):
        print("\n" + "=" * 65)
        print("                 AVAILABLE CARS FOR RENT")
        print("=" * 65)
        print(f"{'Code':<6} | {'Model':<18} | {'Type':<12} | {'Daily Rate':<12} | {'Status'}")
        print("-" * 65)
        for code, info in self.fleet.items():
            status = "AVAILABLE" if info["available"] else "RENTED OUT"
            print(f"{code:<6} | {info['brand']:<18} | {info['type']:<12} | ${info['rate_per_day']}/day{'':<4} | {status}")
        print("=" * 65)

    def rent_car(self):
        self.show_available_cars()
        code = input("\nEnter Car Code to rent (e.g. C1): ").strip().upper()
        if code not in self.fleet:
            print("Car not found.")
            return
        if not self.fleet[code]["available"]:
            print("Sorry, this car is already rented.")
            return

        customer = input("Enter Customer Name: ").strip()
        try:
            days = int(input("Number of days to rent: "))
            if days <= 0:
                print("Days must be > 0.")
                return
        except ValueError:
            print("Invalid input.")
            return

        total_cost = self.fleet[code]["rate_per_day"] * days
        self.fleet[code]["available"] = False
        self.active_rentals[code] = {
            "customer": customer,
            "days": days,
            "total_cost": total_cost
        }
        print(f"\nBooking Confirmed for {customer}!")
        print(f"Vehicle: {self.fleet[code]['brand']} for {days} day(s).")
        print(f"Total Estimated Rent: ${total_cost:.2f}")

    def return_car(self):
        code = input("Enter Car Code to return: ").strip().upper()
        if code not in self.active_rentals:
            print("No active rental record found for this car.")
            return

        record = self.active_rentals.pop(code)
        self.fleet[code]["available"] = True
        print("\n--- RENTAL SETTLEMENT ---")
        print(f"Customer: {record['customer']}")
        print(f"Vehicle: {self.fleet[code]['brand']}")
        print(f"Total Paid: ${record['total_cost']:.2f}")
        print("Car successfully returned to fleet. Thank you!")

def main():
    service = CarRentalService()
    while True:
        print("\n=== PYTHON CAR RENTAL SYSTEM ===")
        print("1. View Car Fleet")
        print("2. Rent a Car")
        print("3. Return a Car")
        print("4. Exit")
        
        choice = input("Enter choice (1-4): ").strip()
        if choice == '1':
            service.show_available_cars()
        elif choice == '2':
            service.rent_car()
        elif choice == '3':
            service.return_car()
        elif choice == '4':
            print("Thanks for using Car Rental System!")
            break
        else:
            print("Invalid option.")

if __name__ == '__main__':
    main()
