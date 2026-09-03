"""
Project 05: ToDo Task Manager
Topic: Lists, File I/O, datetime, string formatting
Description: Complete task manager with priority, status tracking (pending/completed), and disk saving.
"""

import json
import os
from datetime import datetime

FILE_NAME = "todos.json"

def load_tasks():
    if os.path.exists(FILE_NAME):
        try:
            with open(FILE_NAME, "r") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_tasks(tasks):
    with open(FILE_NAME, "w") as f:
        json.dump(tasks, f, indent=4)

def add_task(tasks):
    title = input("Enter task title: ").strip()
    if not title:
        print("Task title cannot be empty.")
        return
    
    print("Priority options: High, Medium, Low")
    priority = input("Priority (default Medium): ").strip().capitalize()
    if priority not in ["High", "Medium", "Low"]:
        priority = "Medium"
        
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M")
    task = {
        "title": title,
        "priority": priority,
        "completed": False,
        "created_at": created_at
    }
    tasks.append(task)
    save_tasks(tasks)
    print("Task added successfully!")

def list_tasks(tasks):
    if not tasks:
        print("\nYour To-Do list is empty! Awesome!")
        return
    print("\n" + "=" * 65)
    print(f"{'#':<4} | {'Status':<10} | {'Priority':<8} | {'Task Title':<25} | {'Date'}")
    print("=" * 65)
    for i, t in enumerate(tasks, 1):
        status = "[DONE]" if t["completed"] else "[TODO]"
        print(f"{i:<4} | {status:<10} | {t['priority']:<8} | {t['title']:<25} | {t['created_at']}")
    print("=" * 65)

def mark_completed(tasks):
    list_tasks(tasks)
    if not tasks: return
    try:
        idx = int(input("Enter task # to toggle complete/pending: ")) - 1
        if 0 <= idx < len(tasks):
            tasks[idx]["completed"] = not tasks[idx]["completed"]
            save_tasks(tasks)
            status_str = "Completed" if tasks[idx]["completed"] else "Pending"
            print(f"Task status changed to: {status_str}")
        else:
            print("Invalid task number.")
    except ValueError:
        print("Please enter a valid number.")

def delete_task(tasks):
    list_tasks(tasks)
    if not tasks: return
    try:
        idx = int(input("Enter task # to delete: ")) - 1
        if 0 <= idx < len(tasks):
            removed = tasks.pop(idx)
            save_tasks(tasks)
            print(f"Deleted task: '{removed['title']}'")
        else:
            print("Invalid task number.")
    except ValueError:
        print("Please enter a valid number.")

def main():
    tasks = load_tasks()
    while True:
        print("\n=== TO-DO LIST TASK MANAGER ===")
        print("1. View Tasks")
        print("2. Add Task")
        print("3. Toggle Task Status (Complete/Pending)")
        print("4. Delete Task")
        print("5. Clear All Completed Tasks")
        print("6. Exit")
        
        choice = input("Enter choice (1-6): ").strip()
        if choice == '1':
            list_tasks(tasks)
        elif choice == '2':
            add_task(tasks)
        elif choice == '3':
            mark_completed(tasks)
        elif choice == '4':
            delete_task(tasks)
        elif choice == '5':
            tasks = [t for t in tasks if not t["completed"]]
            save_tasks(tasks)
            print("Cleaned all completed tasks.")
        elif choice == '6':
            print("Have a productive day! Bye.")
            break
        else:
            print("Invalid choice. Enter 1-6.")

if __name__ == '__main__':
    main()
