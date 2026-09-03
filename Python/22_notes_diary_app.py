"""
Project 22: Personal Notes & Diary App
Topic: File Handling, datetime, search algorithms
Description: Create, view, search, export and delete personal notes with timestamp logs.
"""

import os
import datetime

NOTES_DIR = "my_notes"

def ensure_notes_dir():
    if not os.path.exists(NOTES_DIR):
        os.makedirs(NOTES_DIR)

def create_note():
    ensure_notes_dir()
    title = input("Enter Note Title: ").strip()
    if not title:
        print("Title cannot be empty.")
        return

    safe_title = "".join(c for c in title if c.isalnum() or c in (' ', '_', '-')).rstrip()
    filename = os.path.join(NOTES_DIR, f"{safe_title}.txt")

    print("\nEnter your note content below. Enter a single '.' on a new line to finish:")
    lines = []
    while True:
        line = input()
        if line == ".":
            break
        lines.append(line)

    content = "\n".join(lines)
    now = datetime.datetime.now().strftime("%Y-%m-%d %I:%M %p")

    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"Title: {title}\n")
        f.write(f"Created: {now}\n")
        f.write("=" * 40 + "\n\n")
        f.write(content)

    print(f"\nNote saved as '{safe_title}.txt' in '{NOTES_DIR}' directory.")

def list_notes():
    ensure_notes_dir()
    files = [f for f in os.listdir(NOTES_DIR) if f.endswith(".txt")]
    if not files:
        print("\nNo notes found.")
        return []
    print("\n--- SAVED NOTES ---")
    for i, file in enumerate(files, 1):
        print(f"{i}. {file[:-4]}")
    return files

def read_note():
    files = list_notes()
    if not files: return
    try:
        idx = int(input("\nSelect Note Number to read: ")) - 1
        if 0 <= idx < len(files):
            file_path = os.path.join(NOTES_DIR, files[idx])
            with open(file_path, "r", encoding="utf-8") as f:
                print("\n" + "~" * 45)
                print(f.read())
                print("~" * 45)
        else:
            print("Invalid note number.")
    except ValueError:
        print("Please enter a valid integer.")

def search_notes():
    ensure_notes_dir()
    query = input("Enter search keyword: ").strip().lower()
    files = [f for f in os.listdir(NOTES_DIR) if f.endswith(".txt")]
    found_count = 0

    print(f"\n--- Search results for '{query}' ---")
    for file in files:
        path = os.path.join(NOTES_DIR, file)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            if query in content.lower():
                print(f"📄 Found in: {file[:-4]}")
                found_count += 1

    if found_count == 0:
        print("No matching notes found.")

def delete_note():
    files = list_notes()
    if not files: return
    try:
        idx = int(input("\nSelect Note Number to delete: ")) - 1
        if 0 <= idx < len(files):
            file_path = os.path.join(NOTES_DIR, files[idx])
            os.remove(file_path)
            print(f"Deleted '{files[idx]}'.")
        else:
            print("Invalid number.")
    except ValueError:
        print("Please enter a valid integer.")

def main():
    while True:
        print("\n=== PERSONAL NOTES & DIARY APP ===")
        print("1. Create New Note")
        print("2. List All Notes")
        print("3. Read Note Content")
        print("4. Search in Notes")
        print("5. Delete Note")
        print("6. Exit")
        
        choice = input("Enter choice (1-6): ").strip()
        if choice == '1':
            create_note()
        elif choice == '2':
            list_notes()
        elif choice == '3':
            read_note()
        elif choice == '4':
            search_notes()
        elif choice == '5':
            delete_note()
        elif choice == '6':
            print("Notes closed. Keep writing!")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
