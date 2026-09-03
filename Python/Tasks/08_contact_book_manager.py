"""
Project 08: Contact Book Manager
Topic: Dictionaries, JSON Storage, Regular Expressions (Email/Phone validation)
Description: Store, search, export and manage contacts with phone, email, and tags.
"""

import json
import os
import re

CONTACTS_FILE = "contacts_data.json"

def load_contacts():
    if os.path.exists(CONTACTS_FILE):
        try:
            with open(CONTACTS_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_contacts(contacts):
    with open(CONTACTS_FILE, "w") as f:
        json.dump(contacts, f, indent=4)

def validate_phone(phone):
    return re.match(r"^\+?[0-9\s-]{7,15}$", phone) is not None

def validate_email(email):
    return re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email) is not None

def add_contact(contacts):
    name = input("Enter contact name: ").strip()
    if not name:
        print("Name cannot be empty.")
        return
    if name in contacts:
        print("A contact with this name already exists. Use update option.")
        return

    phone = input("Enter Phone Number: ").strip()
    if not validate_phone(phone):
        print("Warning: Phone format looks unusual, but saving anyway.")

    email = input("Enter Email Address: ").strip()
    if email and not validate_email(email):
        print("Warning: Email format is invalid, but saving.")

    category = input("Category (Friends / Work / Family / Other): ").strip() or "Other"

    contacts[name] = {
        "phone": phone,
        "email": email,
        "category": category
    }
    save_contacts(contacts)
    print(f"Contact '{name}' saved successfully!")

def view_all_contacts(contacts):
    if not contacts:
        print("\nContact book is empty.")
        return
    print("\n" + "=" * 65)
    print(f"{'Name':<20} | {'Phone':<15} | {'Category':<10} | {'Email'}")
    print("=" * 65)
    for name, info in sorted(contacts.items()):
        print(f"{name:<20} | {info['phone']:<15} | {info['category']:<10} | {info['email']}")
    print("=" * 65)

def search_contact(contacts):
    query = input("Search by Name or Phone: ").strip().lower()
    found = False
    for name, info in contacts.items():
        if query in name.lower() or query in info["phone"]:
            print("\n-------------------------")
            print(f"Name     : {name}")
            print(f"Phone    : {info['phone']}")
            print(f"Email    : {info['email']}")
            print(f"Category : {info['category']}")
            found = True
    if not found:
        print("No matching contact found.")

def delete_contact(contacts):
    name = input("Enter Name to delete: ").strip()
    if name in contacts:
        del contacts[name]
        save_contacts(contacts)
        print(f"Contact '{name}' removed.")
    else:
        print("Contact not found.")

def main():
    contacts = load_contacts()
    while True:
        print("\n=== CONTACT BOOK MANAGER ===")
        print("1. View All Contacts")
        print("2. Add New Contact")
        print("3. Search Contact")
        print("4. Delete Contact")
        print("5. Total Contacts Count")
        print("6. Exit")
        
        choice = input("Enter option (1-6): ").strip()
        if choice == '1':
            view_all_contacts(contacts)
        elif choice == '2':
            add_contact(contacts)
        elif choice == '3':
            search_contact(contacts)
        elif choice == '4':
            delete_contact(contacts)
        elif choice == '5':
            print(f"\nTotal Contacts: {len(contacts)}")
        elif choice == '6':
            print("Goodbye!")
            break
        else:
            print("Invalid option.")

if __name__ == '__main__':
    main()
