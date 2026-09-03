"""
Project 09: Library Management System
Topic: OOP, File Persistence, Datetime calculation
Description: Add books, issue books to members, return books, and calculate late fines.
"""

import datetime
import json
import os

LIB_FILE = "library_data.json"

class Library:
    def __init__(self):
        self.books = self.load_data()

    def load_data(self):
        if os.path.exists(LIB_FILE):
            try:
                with open(LIB_FILE, "r") as f:
                    return json.load(f)
            except Exception:
                return {}
        return {
            "B101": {"title": "Python Crash Course", "author": "Eric Matthes", "issued_to": None, "issue_date": None},
            "B102": {"title": "Clean Code", "author": "Robert C. Martin", "issued_to": None, "issue_date": None},
            "B103": {"title": "Automate the Boring Stuff", "author": "Al Sweigart", "issued_to": None, "issue_date": None}
        }

    def save_data(self):
        with open(LIB_FILE, "w") as f:
            json.dump(self.books, f, indent=4)

    def display_books(self):
        print("\n" + "=" * 70)
        print(f"{'Book ID':<8} | {'Title':<28} | {'Author':<20} | {'Status'}")
        print("=" * 70)
        for b_id, info in self.books.items():
            status = "Available" if not info["issued_to"] else f"Issued to {info['issued_to']}"
            print(f"{b_id:<8} | {info['title']:<28} | {info['author']:<20} | {status}")
        print("=" * 70)

    def add_book(self):
        b_id = input("Enter Book ID (e.g. B104): ").strip().upper()
        if b_id in self.books:
            print("Book ID already exists!")
            return
        title = input("Enter Book Title: ").strip()
        author = input("Enter Author Name: ").strip()
        self.books[b_id] = {"title": title, "author": author, "issued_to": None, "issue_date": None}
        self.save_data()
        print(f"Book '{title}' added to library catalog.")

    def issue_book(self):
        b_id = input("Enter Book ID to issue: ").strip().upper()
        if b_id not in self.books:
            print("Book not found in library.")
            return
        if self.books[b_id]["issued_to"]:
            print(f"Book is already issued to {self.books[b_id]['issued_to']}.")
            return
        
        member = input("Enter borrower name: ").strip()
        today_str = datetime.date.today().isoformat()
        self.books[b_id]["issued_to"] = member
        self.books[b_id]["issue_date"] = today_str
        self.save_data()
        print(f"Book '{self.books[b_id]['title']}' issued to {member} on {today_str}.")

    def return_book(self):
        b_id = input("Enter Book ID to return: ").strip().upper()
        if b_id not in self.books:
            print("Book not found.")
            return
        if not self.books[b_id]["issued_to"]:
            print("This book is not currently issued.")
            return

        issued_date_str = self.books[b_id]["issue_date"]
        issued_date = datetime.datetime.strptime(issued_date_str, "%Y-%m-%d").date()
        today = datetime.date.today()
        days_borrowed = (today - issued_date).days
        
        # Free period: 14 days; Fine: $1 per extra day
        fine = max(0, (days_borrowed - 14) * 1)

        borrower = self.books[b_id]["issued_to"]
        self.books[b_id]["issued_to"] = None
        self.books[b_id]["issue_date"] = None
        self.save_data()

        print(f"Book returned by {borrower}. Days kept: {days_borrowed}")
        if fine > 0:
            print(f"Late return fine: ${fine}")
        else:
            print("Returned on time! No fine.")

def main():
    lib = Library()
    while True:
        print("\n=== CENTRAL LIBRARY MANAGEMENT ===")
        print("1. View All Books Catalog")
        print("2. Issue a Book")
        print("3. Return a Book")
        print("4. Add New Book")
        print("5. Exit")
        
        choice = input("Enter choice (1-5): ").strip()
        if choice == '1':
            lib.display_books()
        elif choice == '2':
            lib.issue_book()
        elif choice == '3':
            lib.return_book()
        elif choice == '4':
            lib.add_book()
        elif choice == '5':
            print("Library management closed.")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
