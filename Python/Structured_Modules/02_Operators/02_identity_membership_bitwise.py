"""
02_identity_membership_bitwise.py
---------------------------------
Demonstrates:
- Identity operators: 'is', 'is not' (checking memory address identity)
- Membership operators: 'in', 'not in' (checking element in collection)
- Bitwise operators: &, |, ^, ~, <<, >>
"""

def main():
    print("--- 1. Identity Operators (is vs ==) ---")
    list_a = [1, 2, 3]
    list_b = [1, 2, 3]
    list_c = list_a

    print(f"list_a == list_b: {list_a == list_b} (Values are equal)")
    print(f"list_a is list_b: {list_a is list_b} (Different objects in memory!)")
    print(f"list_a is list_c: {list_a is list_c} (Same exact reference in memory)")

    print("\n--- 2. Membership Operators (in, not in) ---")
    skills = ["Python", "JavaScript", "FastAPI", "React", "PostgreSQL"]
    print(f"Full Stack Skills: {skills}")
    print(f"'Python' in skills:    {'Python' in skills}")
    print(f"'Ruby' not in skills:   {'Ruby' not in skills}")

    message = "Mastering Full Stack Development"
    print(f"'Full' in string:       {'Full' in message}")

    print("\n--- 3. Bitwise Operators (x=10, y=4) ---")
    # 10 in binary: 0000 1010
    #  4 in binary: 0000 0100
    x, y = 10, 4
    print(f"x & y (Bitwise AND):  {x & y}")
    print(f"x | y (Bitwise OR):   {x | y}")
    print(f"x ^ y (Bitwise XOR):  {x ^ y}")
    print(f"~x    (Bitwise NOT):  {~x}")
    print(f"x << 1 (Shift Left):  {x << 1} (Multiplies by 2)")
    print(f"x >> 1 (Shift Right): {x >> 1} (Divides by 2)")

if __name__ == "__main__":
    main()
