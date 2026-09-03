"""
01_classes_objects_attributes.py
--------------------------------
Demonstrates core OOP principles in Python:
- Class definition and object instantiation
- The __init__() constructor and self reference
- Instance variables vs Class variables
- Magic methods (__str__, __repr__)
- Class methods (@classmethod) and Static methods (@staticmethod)
"""

class Student:
    # Class Variable (shared across all instances)
    institution_name = "Indixpert Full Stack Academy"
    total_students_enrolled = 0

    def __init__(self, student_id: str, name: str, course: str, marks: float):
        # Instance Variables (unique to each object)
        self.student_id = student_id
        self.name = name
        self.course = course
        self.marks = marks
        Student.total_students_enrolled += 1

    def display_details(self) -> None:
        """Instance method: operates on specific object data."""
        print(f"[{self.student_id}] {self.name} | Course: {self.course} | Marks: {self.marks}/100")

    def __str__(self) -> str:
        """User-friendly string representation."""
        return f"Student({self.student_id}: {self.name}, {self.course})"

    @classmethod
    def get_enrollment_stats(cls) -> str:
        """Class method: operates on class-level attributes."""
        return f"Total Enrolled at {cls.institution_name}: {cls.total_students_enrolled} students"

    @staticmethod
    def is_passing(marks: float) -> bool:
        """Static method: utility logic independent of object state."""
        return marks >= 40.0

def main():
    print("--- 1. Creating Student Objects ---")
    s1 = Student("STU-101", "Mohammad Faiz", "Full Stack Web Dev", 92.5)
    s2 = Student("STU-102", "Rohit Sharma", "Python & Data Science", 38.0)

    s1.display_details()
    s2.display_details()

    print(f"\ns1 representation (__str__): {s1}")

    print("\n--- 2. Class Methods & Static Methods ---")
    print(Student.get_enrollment_stats())
    print(f"Is 92.5 a passing mark? {Student.is_passing(s1.marks)}")
    print(f"Is 38.0 a passing mark? {Student.is_passing(s2.marks)}")

if __name__ == "__main__":
    main()
