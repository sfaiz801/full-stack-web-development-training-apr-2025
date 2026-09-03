"""
01_try_except_finally.py
------------------------
Demonstrates Python Exception Handling:
- try, except, else, and finally blocks
- Handling multiple specific exception types (ValueError, ZeroDivisionError)
- Clean resource teardown inside finally
"""

def safe_divide(numerator_str: str, denominator_str: str) -> float | None:
    """Safely converts input strings and performs division with full error guarding."""
    try:
        num = float(numerator_str)
        den = float(denominator_str)
        result = num / den
    except ValueError as val_err:
        print(f"  [Error Handled] Invalid number format: {val_err}")
        return None
    except ZeroDivisionError:
        print("  [Error Handled] Division by zero is mathematically undefined!")
        return None
    else:
        # Executes ONLY if NO exception was raised in the try block
        print(f"  [Success] Division completed successfully: {result:.4f}")
        return result
    finally:
        # Executes unconditionally (ideal for closing connections/files)
        print("  [Cleanup] Execution exited safe_divide().")

def main():
    print("--- Test 1: Successful Division (50 / 8) ---")
    safe_divide("50", "8")

    print("\n--- Test 2: Zero Division (100 / 0) ---")
    safe_divide("100", "0")

    print("\n--- Test 3: Invalid Input String ('abc' / 5) ---")
    safe_divide("abc", "5")

if __name__ == "__main__":
    main()
