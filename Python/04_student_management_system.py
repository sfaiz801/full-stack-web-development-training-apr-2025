"""
Project 04: Student Management System
Topic: Dictionaries, Lists, JSON file storage, CRUD operations
Description: Add, view, update, delete, search student records and calculate GPA/grades.
"""

import json
import os

DATA_FILE = "students_data.json"

def load_students():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_students(students):
    with open(DATA_FILE, "w") as f:
        json.dump(students, f, indent=4)

def calculate_grade(marks):
    if marks >= 90: return "A+"
    elif marks >= 80: return "A"
    elif marks >= 70: return "B"
    elif marks >= 60: return "C"
    elif marks >= 50: return "D"
    else: return "F (Fail)"

def add_student(students):
    roll = input("Enter Roll Number: ").strip()
    if roll in students:
        print("Student with this Roll Number already exists!")
        return
    name = input("Enter Student Name: ").strip()
    course = input("Enter Course/Department: ").strip()
    try:
        marks = float(input("Enter Marks Percentage (0-100): "))
        if marks < 0 or marks > 100:
            print("Marks must be between 0 and 100.")
            return
    except ValueError:
        print("Invalid marks format!")
        return

    grade = calculate_grade(marks)
    students[roll] = {
        "name": name,
        "course": course,
        "marks": marks,
        "grade": grade
    }
    save_students(students)
    print(f"Student '{name}' added successfully with Grade: {grade}!")

def view_all_students(students):
    if not students:
        print("\nNo student records found.")
        return
    print("\n" + "=" * 70)
    print(f"{'Roll No':<10} | {'Name':<20} | {'Course':<15} | {'Marks':<8} | {'Grade':<6}")
    print("=" * 70)
    for roll, details in students.items():
        print(f"{roll:<10} | {details['name']:<20} | {details['course']:<15} | {details['marks']:<8.2f} | {details['grade']:<6}")
    print("=" * 70)

def search_student(students):
    query = input("Enter Roll Number or Name to search: ").strip().lower()
    found = False
    for roll, details in students.items():
        if query == roll.lower() or query in details['name'].lower():
            print("\n--- STUDENT FOUND ---")
            print(f"Roll Number : {roll}")
            print(f"Name        : {details['name']}")
            print(f"Course      : {details['course']}")
            print(f"Marks       : {details['marks']}%")
            print(f"Grade       : {details['grade']}")
            found = True
    if not found:
        print("No matching student found.")

def update_student(students):
    roll = input("Enter Roll Number to update: ").strip()
    if roll not in students:
        print("Student not found!")
        return
    
    print("Leave field blank to keep current value.")
    curr = students[roll]
    name = input(f"New Name [{curr['name']}]: ").strip() or curr['name']
    course = input(f"New Course [{curr['course']}]: ").strip() or curr['course']
    marks_str = input(f"New Marks [{curr['marks']}]: ").strip()
    
    if marks_str:
        try:
            marks = float(marks_str)
        except ValueError:
            print("Invalid marks! Keeping previous.")
            marks = curr['marks']
    else:
        marks = curr['marks']
        
    grade = calculate_grade(marks)
    students[roll] = {"name": name, "course": course, "marks": marks, "grade": grade}
    save_students(students)
    print("Record updated successfully!")

def delete_student(students):
    roll = input("Enter Roll Number to delete: ").strip()
    if roll in students:
        deleted = students.pop(roll)
        save_students(students)
        print(f"Student '{deleted['name']}' deleted.")
    else:
        print("Student not found.")

def main():
    students = load_students()
    while True:
        print("\n" + "=" * 40)
        print("    STUDENT MANAGEMENT SYSTEM")
        print("=" * 40)
        print("1. Add New Student")
        print("2. View All Students")
        print("3. Search Student")
        print("4. Update Student Record")
        print("5. Delete Student Record")
        print("6. Total Students Count")
        print("7. Exit")
        
        choice = input("Enter option (1-7): ").strip()
        if choice == '1':
            add_student(students)
        elif choice == '2':
            view_all_students(students)
        elif choice == '3':
            search_student(students)
        elif choice == '4':
            update_student(students)
        elif choice == '5':
            delete_student(students)
        elif choice == '6':
            print(f"\nTotal Registered Students: {len(students)}")
        elif choice == '7':
            print("Exiting Student Management. Goodbye!")
            break
        else:
            print("Invalid choice, please select 1-7.")

if __name__ == '__main__':
    main()
