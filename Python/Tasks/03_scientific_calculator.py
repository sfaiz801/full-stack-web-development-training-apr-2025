"""
Project 03: Comprehensive CLI Calculator
Topic: math, functions, exceptions, conditionals
Description: Standard arithmetic and scientific calculation functions with history tracker.
"""

import math

history = []

def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero!")
    return a / b

def modulus(a, b): return a % b
def power(a, b): return a ** b

def log_calc(val, base=10):
    if val <= 0:
        raise ValueError("Logarithm undefined for non-positive numbers.")
    return math.log10(val) if base == 10 else math.log(val)

def sqrt_calc(val):
    if val < 0:
        raise ValueError("Square root undefined for negative numbers.")
    return math.sqrt(val)

def factorial_calc(val):
    if val < 0 or not val.is_integer():
        raise ValueError("Factorial is only defined for non-negative integers.")
    return math.factorial(int(val))

def show_history():
    if not history:
        print("\nNo calculation history yet.")
    else:
        print("\n--- CALCULATION HISTORY ---")
        for i, item in enumerate(history, 1):
            print(f"{i}. {item}")

def main():
    while True:
        print("\n" + "=" * 40)
        print("          PYTHON CALCULATOR")
        print("=" * 40)
        print("1. Addition (+)")
        print("2. Subtraction (-)")
        print("3. Multiplication (*)")
        print("4. Division (/)")
        print("5. Power (x^y)")
        print("6. Square Root (√x)")
        print("7. Factorial (n!)")
        print("8. Logarithm (log10)")
        print("9. Sine / Cosine / Tangent (Trigonometry)")
        print("10. View History")
        print("11. Clear History")
        print("12. Exit")
        
        choice = input("Select an option (1-12): ").strip()
        
        if choice in ['1', '2', '3', '4', '5']:
            try:
                num1 = float(input("Enter first number: "))
                num2 = float(input("Enter second number: "))
                if choice == '1':
                    res = add(num1, num2)
                    expr = f"{num1} + {num2} = {res}"
                elif choice == '2':
                    res = subtract(num1, num2)
                    expr = f"{num1} - {num2} = {res}"
                elif choice == '3':
                    res = multiply(num1, num2)
                    expr = f"{num1} * {num2} = {res}"
                elif choice == '4':
                    res = divide(num1, num2)
                    expr = f"{num1} / {num2} = {res}"
                elif choice == '5':
                    res = power(num1, num2)
                    expr = f"{num1} ^ {num2} = {res}"
                print(f"Result: {res}")
                history.append(expr)
            except Exception as e:
                print(f"Error: {e}")
                
        elif choice == '6':
            try:
                val = float(input("Enter number: "))
                res = sqrt_calc(val)
                expr = f"√{val} = {res}"
                print(f"Result: {res}")
                history.append(expr)
            except Exception as e:
                print(f"Error: {e}")

        elif choice == '7':
            try:
                val = float(input("Enter integer: "))
                res = factorial_calc(val)
                expr = f"{int(val)}! = {res}"
                print(f"Result: {res}")
                history.append(expr)
            except Exception as e:
                print(f"Error: {e}")

        elif choice == '8':
            try:
                val = float(input("Enter number: "))
                res = log_calc(val)
                expr = f"log10({val}) = {res}"
                print(f"Result: {res}")
                history.append(expr)
            except Exception as e:
                print(f"Error: {e}")

        elif choice == '9':
            try:
                deg = float(input("Enter angle in degrees: "))
                rad = math.radians(deg)
                print(f"sin({deg}°) = {math.sin(rad):.4f}")
                print(f"cos({deg}°) = {math.cos(rad):.4f}")
                try:
                    print(f"tan({deg}°) = {math.tan(rad):.4f}")
                except Exception:
                    print("tan is undefined for this angle.")
            except Exception as e:
                print(f"Error: {e}")

        elif choice == '10':
            show_history()
        elif choice == '11':
            history.clear()
            print("History cleared.")
        elif choice == '12':
            print("Thanks for using Python Calculator!")
            break
        else:
            print("Invalid option. Please choose 1-12.")

if __name__ == '__main__':
    main()
