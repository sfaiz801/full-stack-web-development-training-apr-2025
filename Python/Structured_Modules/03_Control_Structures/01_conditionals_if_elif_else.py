"""
01_conditionals_if_elif_else.py
-------------------------------
Demonstrates decision making control structures in Python:
- if, elif, else ladders
- Nested conditionals
- Ternary conditional expressions (value_if_true if condition else value_if_false)
"""

def grade_student(marks: float) -> str:
    """Returns grade and remarks based on percentage marks."""
    if marks < 0 or marks > 100:
        return "Invalid marks range (0-100 allowed)"
    elif marks >= 90:
        return "Grade A+ (Distinction)"
    elif marks >= 80:
        return "Grade A (First Class with Honours)"
    elif marks >= 60:
        return "Grade B (First Class)"
    elif marks >= 40:
        return "Grade C (Pass)"
    else:
        return "Grade F (Needs Improvement)"

def main():
    print("--- 1. if-elif-else Decision Ladder ---")
    test_marks = [95.5, 82.0, 68.5, 45.0, 32.0]
    for m in test_marks:
        print(f"Marks: {m:5.1f} -> {grade_student(m)}")

    print("\n--- 2. Python Ternary Operator ---")
    age = 20
    # Syntax: X if condition else Y
    voting_status = "Eligible to Vote" if age >= 18 else "Minor / Ineligible"
    print(f"Age: {age} -> Status: {voting_status}")

    print("\n--- 3. Nested Conditionals (Account Login & 2FA) ---")
    has_valid_credentials = True
    two_factor_verified = True

    if has_valid_credentials:
        if two_factor_verified:
            print("Access Granted: Welcome to the Secure Dashboard!")
        else:
            print("Authentication Paused: Please complete 2FA OTP prompt.")
    else:
        print("Access Denied: Invalid username or password.")

if __name__ == "__main__":
    main()
