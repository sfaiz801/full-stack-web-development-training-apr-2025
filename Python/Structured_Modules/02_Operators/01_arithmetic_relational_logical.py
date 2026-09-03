"""
01_arithmetic_relational_logical.py
-----------------------------------
Demonstrates:
- Arithmetic operators (+, -, *, /, //, %, **)
- Relational / Comparison operators (==, !=, <, >, <=, >=)
- Logical operators (and, or, not)
"""

def main():
    a = 17
    b = 4

    print("--- 1. Arithmetic Operators (a=17, b=4) ---")
    print(f"Addition:           a + b  = {a + b}")
    print(f"Subtraction:        a - b  = {a - b}")
    print(f"Multiplication:     a * b  = {a * b}")
    print(f"Standard Division:  a / b  = {a / b:.4f}")
    print(f"Floor Division:     a // b = {a // b} (integer quotient)")
    print(f"Modulus (Remainder): a % b  = {a % b}")
    print(f"Exponentiation:     a ** b = {a ** b} (17^4)")

    print("\n--- 2. Relational / Comparison Operators ---")
    score = 85
    cutoff = 75
    print(f"Is score >= cutoff? ({score} >= {cutoff}): {score >= cutoff}")
    print(f"Is score == 100?    ({score} == 100):  {score == 100}")
    print(f"Is score != 0?      ({score} != 0):    {score != 0}")

    print("\n--- 3. Logical Operators (and, or, not) ---")
    has_hall_ticket = True
    has_id_proof = False
    is_admin = True

    # 'and' requires both conditions to be True
    can_enter_exam = has_hall_ticket and has_id_proof
    print(f"Can take exam? (ticket AND ID proof): {can_enter_exam}")

    # 'or' requires at least one condition to be True
    has_entry_clearance = can_enter_exam or is_admin
    print(f"Allowed Entry? (Exam Clear OR Admin): {has_entry_clearance}")

    # 'not' reverses truth
    print(f"Inverting clearance (not True):       {not has_entry_clearance}")

if __name__ == "__main__":
    main()
