"""
02_lambdas_and_scope.py
-----------------------
Demonstrates:
- Anonymous functions (lambda expressions)
- Higher-order functional tools: map(), filter(), sorted(..., key=...)
- Variable scope resolution: LEGB rule (Local, Enclosing, Global, Built-in)
- global and nonlocal keywords
"""

# Global variable
app_version = "v2.5.0"

def demonstrate_scope():
    global app_version
    counter = 100

    def inner_function():
        nonlocal counter
        counter += 10
        print(f"[Inside inner_function] Enclosing modified counter: {counter}")

    inner_function()
    print(f"[Inside demonstrate_scope] counter is now: {counter}")
    app_version = "v2.5.1-updated"

def main():
    print("--- 1. Lambda Expressions & Functional Tools ---")
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    # lambda for squaring numbers using map()
    squares = list(map(lambda n: n ** 2, numbers))
    print(f"Original numbers: {numbers}")
    print(f"Squares (map):    {squares}")

    # lambda for filtering evens using filter()
    evens = list(filter(lambda n: n % 2 == 0, numbers))
    print(f"Evens (filter):   {evens}")

    # Sorting list of dictionaries by key
    students = [
        {"name": "Faiz", "score": 92},
        {"name": "Rahul", "score": 78},
        {"name": "Ayesha", "score": 98},
        {"name": "Zaid", "score": 85}
    ]
    sorted_by_score = sorted(students, key=lambda s: s["score"], reverse=True)
    print("\nStudents Ranked by Score (High to Low):")
    for rank, s in enumerate(sorted_by_score, start=1):
        print(f"  #{rank}: {s['name']:<10} - {s['score']} pts")

    print("\n--- 2. Scope Demonstration (Global & Nonlocal) ---")
    print(f"Initial Global app_version: {app_version}")
    demonstrate_scope()
    print(f"Modified Global app_version: {app_version}")

if __name__ == "__main__":
    main()
