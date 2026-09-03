"""
01_basics_and_datatypes.py
--------------------------
Demonstrates Python fundamentals, variables, and primitive data types:
- Dynamic typing
- Integer, Float, String, Boolean, NoneType
- Checking data types via type()
- Object identity in memory via id()
"""

def main():
    # Variable assignment and dynamic typing
    student_name = "Mohammad Faiz"   # str
    student_age = 22                 # int
    cgpa = 9.45                      # float
    is_enrolled = True               # bool
    scholarship = None               # NoneType

    print("=" * 45)
    print(" Python Fundamentals: Variables & Data Types")
    print("=" * 45)

    print(f"Student Name: {student_name:<16} | Type: {type(student_name).__name__} | ID: {id(student_name)}")
    print(f"Student Age:  {student_age:<16} | Type: {type(student_age).__name__} | ID: {id(student_age)}")
    print(f"Current CGPA: {cgpa:<16} | Type: {type(cgpa).__name__} | ID: {id(cgpa)}")
    print(f"Is Enrolled:  {str(is_enrolled):<16} | Type: {type(is_enrolled).__name__} | ID: {id(is_enrolled)}")
    print(f"Scholarship:  {str(scholarship):<16} | Type: {type(scholarship).__name__} | ID: {id(scholarship)}")

    # Demonstrating Python's dynamic typing: a variable can change type
    print("\n--- Dynamic Typing in Action ---")
    data_holder = 100
    print(f"Initially: {data_holder} ({type(data_holder).__name__})")
    data_holder = "Now I am a String"
    print(f"Reassigned: '{data_holder}' ({type(data_holder).__name__})")

if __name__ == "__main__":
    main()
