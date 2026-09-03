"""
02_type_casting_and_fstrings.py
-------------------------------
Demonstrates:
- Type conversion (implicit and explicit: int, float, str, bool)
- Modern formatted string literals (f-strings)
- Number formatting, decimal precision, and alignments
"""

def main():
    print("--- 1. Explicit Type Casting ---")
    str_num = "450"
    converted_int = int(str_num)
    converted_float = float(converted_int)

    print(f"Original String: '{str_num}' (type: {type(str_num).__name__})")
    print(f"As Integer:       {converted_int} (type: {type(converted_int).__name__})")
    print(f"As Float:         {converted_float:.2f} (type: {type(converted_float).__name__})")

    # Boolean conversions (truthy and falsy values)
    print("\n--- 2. Truthy and Falsy Values in Python ---")
    falsy_values = [0, "", [], {}, None, False]
    for val in falsy_values:
        print(f"bool({repr(val)}) -> {bool(val)}")

    # Formatted String Literals (f-strings)
    print("\n--- 3. Advanced f-string Formatting ---")
    course_fee = 45500.7589
    discount_pct = 0.15
    student_count = 1420

    print(f"Original Fee:       Rs. {course_fee:,.2f}")
    print(f"Discount Rate:      {discount_pct:.1%}")
    print(f"Final Total (Net):  Rs. {course_fee * (1 - discount_pct):,.2f}")
    print(f"Enrolled Students:  {student_count:>8d} (right aligned)")

if __name__ == "__main__":
    main()
