import json
import os


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKYELLOW = '\033[93m'
    ENDC = '\033[0m'


class RestaurantProfileManager:
    def __init__(self):
        """Initializes the file path for storing JSON data."""
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.json_file = os.path.join(base_dir, '..', 'Database', 'restaurent_profile.json')
        # Ensure the directory exists
        os.makedirs(os.path.dirname(self.json_file), exist_ok=True)

    def load_profile(self):
        """Loads the restaurant profile from the JSON file."""
        if os.path.exists(self.json_file):
            try:
                with open(self.json_file, 'r') as file:
                    data = json.load(file)
                    if isinstance(data, dict):
                        return data
                    else:
                        print(f"{bcolors.HEADER}Invalid JSON format. Resetting to default profile.{bcolors.ENDC}")
            except json.JSONDecodeError:
                print(f"{bcolors.HEADER}Error decoding JSON. Resetting to default profile.{bcolors.ENDC}")
            except Exception as e:
                print(f"{bcolors.HEADER}Unexpected error: {str(e)}{bcolors.ENDC}")
        
        # Return default profile if file doesn't exist or is invalid
        return {
            "name": "Gourmet Delight",
            "address": "123 Culinary Ave, Food City",
            "contact": "+123456789",
            "open_hours": "10:00 AM - 11:00 PM",
            "rating": 4.5  # Default rating
        }

    def save_profile(self, profile):
        """Saves the restaurant profile to the JSON file."""
        if not isinstance(profile, dict):
            print(f"{bcolors.HEADER}Error: Profile data must be a dictionary. Operation aborted.{bcolors.ENDC}")
            return
        with open(self.json_file, 'w') as file:
            json.dump(profile, file, indent=4)
            print(f"{bcolors.OKBLUE}Profile saved successfully at {self.json_file}!{bcolors.ENDC}")

    def view_restaurant_profile(self):
        """Displays restaurant profile details."""
        profile = self.load_profile()
        if not isinstance(profile, dict):
            print(f"{bcolors.HEADER}Error: Profile data is not valid. Please reset the file.{bcolors.ENDC}")
            return
        print(f"{bcolors.OKBLUE}\nRestaurant Profile Details:{bcolors.ENDC}")
        print(f"Name: {profile['name']}")
        print(f"Address: {profile['address']}")
        print(f"Contact: {profile['contact']}")
        print(f"Open Hours: {profile['open_hours']}")
        print(f"Rating: {profile['rating']}")

    def update_restaurant_profile(self):
        """Allows admin to update restaurant profile details."""
        profile = self.load_profile()

        if not isinstance(profile, dict):
            print(f"{bcolors.HEADER}Error: Profile data is not valid. Please reset the file.{bcolors.ENDC}")
            return

        print(f"{bcolors.OKBLUE}\nUpdating Restaurant Profile...{bcolors.ENDC}")
        profile["name"] = input(f"Enter new name of the restaurant [{profile['name']}]: ") or profile["name"]
        profile["address"] = input(f"Enter new address [{profile['address']}]: ") or profile["address"]
        profile["contact"] = input(f"Enter new contact number [{profile['contact']}]: ") or profile["contact"]
        profile["open_hours"] = input(f"Enter new opening hours [{profile['open_hours']}]: ") or profile["open_hours"]

        # Optionally update the rating
        try:
            new_rating = input(f"Enter new average rating (out of 5) [{profile['rating']}]: ")
            if new_rating:
                profile["rating"] = round(float(new_rating), 1)
        except ValueError:
            print(f"{bcolors.HEADER}Invalid rating! Keeping the previous value.{bcolors.ENDC}")

        self.save_profile(profile)

    def restaurant_profile_menu(self):
        """Displays the Restaurant Profile submenu and handles user choices."""
        while True:
            print(f"{bcolors.OKYELLOW}\n======================================================")
            print(f"{bcolors.HEADER}================ RESTAURANT PROFILE =================")
            print(f"{bcolors.OKYELLOW}======================================================")
            print(f"{bcolors.OKBLUE}1. VIEW RESTAURANT PROFILE")
            print("2. UPDATE RESTAURANT PROFILE")
            print("3. BACK")
            
            choice = input(f"{bcolors.OKYELLOW}Enter your choice: {bcolors.ENDC}")
            
            if choice == "1":
                self.view_restaurant_profile()
            elif choice == "2":
                self.update_restaurant_profile()
            elif choice == "3":
                print(f"{bcolors.OKBLUE}\nReturning to Admin Menu...{bcolors.ENDC}")
                break
            else:
                print(f"{bcolors.HEADER}Invalid choice! Please try again.{bcolors.ENDC}")
