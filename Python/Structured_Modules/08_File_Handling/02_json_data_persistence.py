"""
02_json_data_persistence.py
---------------------------
Demonstrates JSON serialization and deserialization in Python:
- json.dump() / json.dumps() for writing Python dicts/lists to JSON
- json.load() / json.loads() for reading JSON data back into Python objects
- Indentation formatting (pretty printing)
"""

import json
from pathlib import Path

def main():
    json_file = Path("student_database.json")

    students_data = [
        {
            "id": 1,
            "name": "Mohammad Faiz",
            "enrolled_course": "Full Stack Web Development",
            "skills": ["Python", "FastAPI", "Next.js", "SQL"],
            "is_active": True,
            "scores": {"attendance": 98, "assignments": 94}
        },
        {
            "id": 2,
            "name": "Amit Sharma",
            "enrolled_course": "Backend Engineering",
            "skills": ["Python", "Django", "PostgreSQL"],
            "is_active": True,
            "scores": {"attendance": 90, "assignments": 88}
        }
    ]

    print("--- 1. Serializing & Writing to JSON File (json.dump) ---")
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(students_data, f, indent=4)
    print(f"Successfully saved {len(students_data)} records to '{json_file}'.")

    print("\n--- 2. Deserializing & Reading from JSON File (json.load) ---")
    with open(json_file, "r", encoding="utf-8") as f:
        loaded_data = json.load(f)

    for student in loaded_data:
        print(f"ID: {student['id']} | Name: {student['name']:<15} | Skills: {', '.join(student['skills'])}")

    # Clean up test JSON file
    if json_file.exists():
        json_file.unlink()
        print("\nCleaned up temporary JSON file.")

if __name__ == "__main__":
    main()
