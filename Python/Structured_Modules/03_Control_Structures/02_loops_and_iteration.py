"""
02_loops_and_iteration.py
-------------------------
Demonstrates loops and iteration controls in Python:
- for loop with range(start, stop, step)
- while loop
- Loop control: break, continue, pass
- Loop 'else' clause (executes if no break occurs)
- Modern iteration helpers: enumerate() and zip()
"""

def main():
    print("--- 1. For Loop with range(start, stop, step) ---")
    print("Even numbers from 2 to 10: ", end="")
    for i in range(2, 11, 2):
        print(i, end=" ")
    print()

    print("\n--- 2. While Loop & Loop Control (break & continue) ---")
    counter = 0
    while counter < 10:
        counter += 1
        if counter % 2 != 0:
            continue  # Skip odd numbers
        if counter == 8:
            print(f"[Break trigger] Reached {counter}, terminating loop early.")
            break
        print(f"Processed even number: {counter}")

    print("\n--- 3. For-Else Pattern (Searching a Target) ---")
    frameworks = ["Next.js", "FastAPI", "Express", "Django"]
    search_target = "FastAPI"

    for fw in frameworks:
        if fw == search_target:
            print(f"Found target framework: '{fw}'!")
            break
    else:
        # Executes ONLY if the loop finishes naturally without hitting 'break'
        print("Target not found in framework list.")

    print("\n--- 4. Built-in Helpers: enumerate() and zip() ---")
    courses = ["Python Foundations", "FastAPI Mastery", "React Redux", "Next.js Pro"]
    durations = ["2 Weeks", "3 Weeks", "3 Weeks", "4 Weeks"]

    print("Index and Course (enumerate):")
    for idx, course in enumerate(courses, start=1):
        print(f"  {idx}. {course}")

    print("\nPairing Parallel Lists (zip):")
    for course, duration in zip(courses, durations):
        print(f"  * {course:<20} -> {duration}")

if __name__ == "__main__":
    main()
