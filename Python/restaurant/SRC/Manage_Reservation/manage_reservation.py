import json
import os
from datetime import datetime, timedelta
from SRC.Controllers.User_controller.User_state import UserState

class bcolors:
    HEADER= '\033[95m'
    OKBLUE= '\033[94m'
    OKCYAN= '\033[96m'
    OKGREEN= '\033[92m'
    OKYELLOW= '\033[33m'
    WARNING= '\033[93m'
    FAIL= '\033[91m'
    ENDC= '\033[0m'
    BOLD= '\033[1m'
    UNDERLINE= '\033[4m'


class Reservation:
    def __init__(self, id, table_number, date, time_slot, persons, name, mobile_no, status="Pending"):
        self.id = id
        self.name = name
        self.mobile_no = mobile_no
        self.table_number = table_number
        self.date = date
        self.time_slot = time_slot
        self.persons = persons
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "mobile_no": self.mobile_no,
            "table_number": self.table_number,
            "date": self.date,
            "time_slot": self.time_slot,
            "persons": self.persons,
            "status": self.status
        }

class ReservationSystem:
    def __init__(self, reservation_filename="reservation.json", table_filename="table.json"):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        
        self.reservation_path = os.path.join(base_dir, 'database', reservation_filename)
        self.table_path = os.path.join(base_dir, 'database', table_filename)

        self.reservations = []  
        self.tables = []        
        self.next_id = 1        
        self.load_reservations() 
        self.load_tables()      

    def load_reservations(self):
        if os.path.exists(self.reservation_path):
            with open(self.reservation_path, 'r') as file:
                try:
                    data = json.load(file)
                    for item in data:
                        reservation = Reservation(**item)  
                        self.reservations.append(reservation)
                    if self.reservations:
                        self.next_id = max(res.id for res in self.reservations) + 1 
                except json.JSONDecodeError:
                    print("Error decoding JSON data. Starting with an empty reservation list.")
        else:
            print("No existing reservations found, starting fresh.")

    def load_tables(self):
        if os.path.exists(self.table_path):
            with open(self.table_path, 'r') as file:
                try:
                    self.tables = json.load(file).get("tables", [])  
                except json.JSONDecodeError:
                    print("Error decoding table JSON data.")
        else:
            print(f"Table file {self.table_path} not found.")

    def save_reservations(self):
        with open(self.reservation_path, 'w') as file:
            json.dump([res.to_dict() for res in self.reservations], file, indent=4)
        print(f"Saved {len(self.reservations)} reservations to {self.reservation_path}")

    def save_tables(self):
        with open(self.table_path, 'w') as file:
            json.dump({"tables": self.tables}, file, indent=4)
        print(f"Saved updated table data to {self.table_path}")

    def is_time_slot_available(self, date, time_slot, table_number):
        requested_time = datetime.strptime(f"{date} {time_slot}", "%Y-%m-%d %H:%M")
        
        for reservation in self.reservations:
            if reservation.date == date and reservation.table_number == table_number:
                reserved_time = datetime.strptime(f"{reservation.date} {reservation.time_slot}", "%Y-%m-%d %H:%M")
                if abs((requested_time - reserved_time).total_seconds()) < 3600:
                    print(f"Time slot conflict: {reservation.time_slot} on {reservation.date} for table {table_number}.")
                    return False
        return True


    def get_available_tables(self, date, time_slot):
        """Filters available tables by checking the reservation list and table status."""
        available_tables = []
        for table in self.tables:
            # Check if the table is available and not booked at the specified time
            if table.get("status", "available") == "available":
                if self.is_time_slot_available(date, time_slot, table["number"]):
                    available_tables.append(table)
        return available_tables

    def add_reservation(self, table_number, date, time_slot, persons, name, mobile_no, status="Pending"):
        try:
            # Ensure the date and time format is correct
            reservation_datetime = datetime.strptime(f"{date} {time_slot}", "%Y-%m-%d %H:%M")
        except ValueError:
            print("Invalid date or time format. Please ensure the date is in YYYY-MM-DD format and the time is in HH:MM format.")
            return

        now = datetime.now()

        if reservation_datetime < now:
            print("Cannot book a time slot in the past. Please choose a future time.")
            return

        if not self.is_time_slot_available(date, time_slot, table_number):
            print("This table is not available at the chosen time. Please choose a different table or time.")
            return

        reservation = Reservation(self.next_id, table_number, date, time_slot, persons, name, mobile_no, status)
        self.reservations.append(reservation)
        self.next_id += 1
        print(f"Reservation for {name} has been added with ID {reservation.id}.")

        # Update table status
        table_updated = False
        for table in self.tables:
            if int(table["number"]) == int(table_number):
                table["status"] = "booked"
                table_updated = True
                break

        if not table_updated:
            print(f"Table number {table_number} not found in the tables list. Please verify the table data.")

        self.save_reservations()
        self.save_tables()



    def cancel_reservation(self, reservation_id):
        """Cancels a reservation by ID and updates the table's availability."""
        for reservation in self.reservations:
            if reservation.id == reservation_id:
                if reservation.status != "Canceled":
                    reservation.status = "Canceled"
                    print(f"Reservation ID {reservation_id} has been canceled.")
                    
                    # Mark the table as available
                    for table in self.tables:
                        if int(table["number"]) == int(reservation.table_number):
                            table["status"] = "available"
                            print(f"Table {table['number']} is now available.")
                            break

                    self.save_reservations()
                    self.save_tables()
                    return
                else:
                    print(f"Reservation ID {reservation_id} is already canceled.")
                    return
        print(f"Reservation ID {reservation_id} not found.")



    def cancel_expired_reservations(self):
        now = datetime.now()
        updated_reservations = []
        print(f"Total reservations: {len(self.reservations)}")
        for reservation in self.reservations:
            reserved_time = datetime.strptime(f"{reservation.date} {reservation.time_slot}", "%Y-%m-%d %H:%M")
            if reservation.status == "Pending" and now > reserved_time + timedelta(hours=1):
                print(f"Reservation ID {reservation.id} has been auto-canceled due to no-show.")
            else:
                updated_reservations.append(reservation)

        if len(updated_reservations) != len(self.reservations):
            print("Some reservations were canceled.")
            self.reservations = updated_reservations
            self.save_reservations()
        else:
            print("No expired reservations to cancel.")

    def view_reservations(self):
        if not self.reservations:
            print("No reservations available.")
            return
        print(f"{bcolors.OKYELLOW}\n================================================ VIEW ALL RESERVATION ===================================================")
        
        for reservation in self.reservations:
            print(f"{bcolors.OKGREEN}ID: {reservation.id}, Name: {reservation.name}, Mobile: {reservation.mobile_no}, "
                  f"Table Number: {reservation.table_number}, Date: {reservation.date}, Time Slot: {reservation.time_slot}, "
                  f"Persons: {reservation.persons}, Status: {reservation.status}")
    
    def view_customer_reservations(self):
        if not self.reservations:
            print("No reservations available.")
            return
        print(f"{bcolors.OKYELLOW}\n================================================ VIEW ALL RESERVATION ===================================================")
        
        user = UserState().get_state
        for reservation in self.reservations:
            if(user['phone'] == reservation.mobile_no and user['name'] == reservation.name):
                print(f"{bcolors.OKGREEN}ID: {reservation.id}, Name: {reservation.name}, Mobile: {reservation.mobile_no}, "
                    f"Table Number: {reservation.table_number}, Date: {reservation.date}, Time Slot: {reservation.time_slot}, "
                    f"Persons: {reservation.persons}, Status: {reservation.status}")

    def update_status(self, reservation_id, new_status):
        for reservation in self.reservations:
            if reservation.id == reservation_id:
                reservation.status = new_status
                print(f"Reservation ID {reservation_id} status updated to {new_status}.")
                self.save_reservations()
                return
        print(f"Reservation ID {reservation_id} not found.")

class ReservationMenu:
    def __init__(self):
        self.system = ReservationSystem()

    def cancel_reservation(self):
        """Allows admin to manually cancel a reservation."""
        res_id = int(input("Enter the reservation ID to cancel: "))
        self.system.cancel_reservation(res_id)



    def make_reservation(self):
        name = input("Enter your name: ")
        while True:
            mobile_no = input("Enter your mobile number (10 digits): ")
            if mobile_no.isdigit() and len(mobile_no) == 10:
                break
            else:
                print("Invalid mobile number. Please enter a 10-digit number.")

        # Validate date and time inline
        while True:
            date = input("Enter reservation date (YYYY-MM-DD): ")
            time_slot = input("Enter time slot (e.g., 18:00): ")
            try:
                # Try to parse the date and time correctly
                reservation_datetime = datetime.strptime(f"{date} {time_slot}", "%Y-%m-%d %H:%M")
                if reservation_datetime < datetime.now():
                    print("The reservation date and time must be in the future.")
                else:
                    break  # Input is valid
            except ValueError:
                print("Invalid date or time format. Please enter again in the correct format (YYYY-MM-DD for date, HH:MM for time).")

        persons = int(input("Enter number of persons: "))

        available_tables = self.system.get_available_tables(date, time_slot)
        if not available_tables:
            print("No tables are available for the selected time slot.")
            return

        print("\nAvailable tables:")
        for table in available_tables:
            print(f"Table {table['number']}: Type {table['type']}, Capacity {table['capacity']}")

        table_number = input("Enter the table number you want to reserve: ")
        self.system.add_reservation(table_number, date, time_slot, persons, name, mobile_no)
        
        
    def make_customer_reservation(self):
        #name = input("Enter your name: ")
        name = UserState().get_state['name']
        mobile_no = UserState().get_state['phone']

        # Validate date and time inline
        while True:
            date = input("Enter reservation date (YYYY-MM-DD): ")
            time_slot = input("Enter time slot (e.g., 18:00): ")
            try:
                # Try to parse the date and time correctly
                reservation_datetime = datetime.strptime(f"{date} {time_slot}", "%Y-%m-%d %H:%M")
                if reservation_datetime < datetime.now():
                    print("The reservation date and time must be in the future.")
                else:
                    break  # Input is valid
            except ValueError:
                print("Invalid date or time format. Please enter again in the correct format (YYYY-MM-DD for date, HH:MM for time).")

        persons = int(input("Enter number of persons: "))

        available_tables = self.system.get_available_tables(date, time_slot)
        if not available_tables:
            print("No tables are available for the selected time slot.")
            return

        print("\nAvailable tables:")
        for table in available_tables:
            print(f"Table {table['number']}: Type {table['type']}, Capacity {table['capacity']}")

        table_number = input("Enter the table number you want to reserve: ")
        self.system.add_reservation(table_number, date, time_slot, persons, name, mobile_no)



    def reservation_main(self):
        while True:
            print(F"{bcolors.OKYELLOW}\n=======================================================")
            print(f"{bcolors.HEADER}****************** MANAGE RESERVATION *****************")
            print(F"{bcolors.OKYELLOW}=======================================================")

            print(f"{bcolors.OKBLUE}\n1. MAKE A RESERVATION")
            print("2. VIEW ALL RESERVATIONS")
            print("3. UPDATE RESERVATION STATUS")
            print("4. CANCEL A RESERVATION")
            print("5. EXIT")
            choice = input(f"{bcolors.OKGREEN}Enter your choice: ")

            if choice == '1':
                self.make_reservation()
            elif choice == '2':
                self.system.view_reservations()
            elif choice == '3':
                res_id = int(input("Enter reservation ID to update: "))
                new_status = input("Enter new status (e.g., Confirmed, Canceled): ")
                self.system.update_status(res_id, new_status)
            elif choice == '4':
                self.cancel_reservation()
            elif choice == '5':
                break
            else:
                print(f"{bcolors.FAIL}Invalid choice, please try again.")

            while True:
                print(f"{bcolors.OKBLUE}\nDO YOU WANT TO:")
                print("1. CONTINUE (PERFORM ANOTHER ACTION)")
                print("2. GO BACK TO ADMIN MENU")
                
                choice = input(f"{bcolors.OKGREEN}Enter your choice (1/2): ")
                if choice == '1':
                    break  # Continue to perform another action
                elif choice == '2':    
                    return 
                else:
                    print(f"{bcolors.FAIL}Invalid choice. Please enter 1 or 2.")
   
    def reservation_admin_main(self):
        while True:
            print(F"{bcolors.OKYELLOW}\n=======================================================")
            print(f"{bcolors.HEADER}****************** MANAGE RESERVATION *****************")
            print(F"{bcolors.OKYELLOW}=======================================================")

            print(f"{bcolors.OKBLUE}\n1. VIEW ALL RESERVATION")
            print("2. DELETE RESERVATION")
            print("3. BACK")
            choice = input(f"{bcolors.OKGREEN}Enter your choice: ")

            if choice == '1':
                self.system.view_reservations()
            elif choice == '2':
                self.cancel_reservation()
            elif choice == '3':
                break
            else:
                print(f"{bcolors.FAIL}Invalid choice, please try again.")

            while True:
                print(f"{bcolors.OKBLUE}\nDO YOU WANT TO:")
                print("1. CONTINUE (PERFORM ANOTHER ACTION)")
                print("2. GO BACK TO ADMIN MENU")
                
                choice = input(f"{bcolors.OKGREEN}Enter your choice (1/2): ")
                if choice == '1':
                    break  # Continue to perform another action
                elif choice == '2':    
                    return 
                else:
                    print(f"{bcolors.FAIL}Invalid choice. Please enter 1 or 2.")

    def reservation_staff_main(self):
        while True:
            print(F"{bcolors.OKYELLOW}\n=======================================================")
            print(f"{bcolors.HEADER}****************** MANAGE RESERVATION *****************")
            print(F"{bcolors.OKYELLOW}=======================================================")

            print(f"{bcolors.OKBLUE}\n1. MAKE A RESERVATION")
            print("2. VIEW ALL RESERVATIONS")
            print("3. UPDATE RESERVATION STATUS")
            print("4. EXIT")
            choice = input(f"{bcolors.OKGREEN}Enter your choice: ")

            if choice == '1':
                self.make_reservation()
            elif choice == '2':
                self.system.view_reservations()
            elif choice == '3':
                res_id = int(input("Enter reservation ID to update: "))
                new_status = input("Enter new status (e.g., Confirmed, Canceled): ")
                self.system.update_status(res_id, new_status)
            elif choice == '4':
                break
            else:
                print(f"{bcolors.FAIL}Invalid choice, please try again.")

    def reservation_customer_main(self):
        while True:
            print(F"{bcolors.OKYELLOW}\n=======================================================")
            print(f"{bcolors.HEADER}****************** MANAGE RESERVATION *****************")
            print(F"{bcolors.OKYELLOW}=======================================================")

            print(f"{bcolors.OKBLUE}\n1. MAKE A RESERVATION")
            print("2. VIEW ALL RESERVATIONS")
            print("3. UPDATE RESERVATION STATUS")
            print("4. CANCEL A RESERVATION")
            print("5. EXIT")
            choice = input(f"{bcolors.OKGREEN}Enter your choice: ")

            if choice == '1':
                self.make_customer_reservation()
            elif choice == '2':
                self.system.view_customer_reservations()
            elif choice == '3':
                res_id = int(input("Enter reservation ID to update: "))
                new_status = input("Enter new status (e.g., Confirmed, Canceled): ")
                self.system.update_status(res_id, new_status)
            elif choice == '4':
                self.cancel_reservation()
            elif choice == '5':
                break
            else:
                print(f"{bcolors.FAIL}Invalid choice, please try again.")

            while True:
                print(f"{bcolors.OKBLUE}\nDO YOU WANT TO:")
                print("1. CONTINUE (PERFORM ANOTHER ACTION)")
                print("2. GO BACK TO ADMIN MENU")
                
                choice = input(f"{bcolors.OKGREEN}Enter your choice (1/2): ")
                if choice == '1':
                    break  # Continue to perform another action
                elif choice == '2':    
                    return 
                else:
                    print(f"{bcolors.FAIL}Invalid choice. Please enter 1 or 2.")
   

if __name__ == "__main__":
    menu = ReservationMenu()
    #menu.reservation_main()
    menu.reservation_admin_main()

