"""
01_lists_and_comprehensions.py
------------------------------
Demonstrates Python Lists:
- Ordered, mutable collections
- Indexing, negative indexing, slicing [start:stop:step]
- Methods: append(), insert(), extend(), pop(), remove(), reverse(), sort()
- List comprehensions with filtering conditions
"""

def main():
    print("--- 1. List Creation & Mutation ---")
    fruits = ["Apple", "Banana", "Cherry", "Mango"]
    print(f"Initial List:   {fruits}")

    fruits.append("Orange")       # Add to end
    fruits.insert(1, "Blueberry") # Add at index 1
    print(f"After inserts:  {fruits}")

    fruits.remove("Banana")       # Remove by value
    popped_item = fruits.pop()    # Remove last item
    print(f"Popped item:    '{popped_item}'")
    print(f"Current List:   {fruits}")

    print("\n--- 2. Indexing & Slicing ---")
    numbers = [10, 20, 30, 40, 50, 60, 70, 80]
    print(f"Numbers:             {numbers}")
    print(f"First element [0]:   {numbers[0]}")
    print(f"Last element [-1]:   {numbers[-1]}")
    print(f"Slice [2:6]:         {numbers[2:6]}")
    print(f"Reversed [::-1]:     {numbers[::-1]}")

    print("\n--- 3. List Comprehensions ---")
    # Generating squares of even numbers from 1 to 10
    even_squares = [x ** 2 for x in range(1, 11) if x % 2 == 0]
    print(f"Even Squares (1-10): {even_squares}")

    words = ["fastapi", "react", "nextjs", "python", "sql"]
    capitalized = [w.upper() for w in words]
    print(f"Capitalized Words:   {capitalized}")

if __name__ == "__main__":
    main()
