"""
Project 20: Multi-Unit Converter
Topic: Functions, Arithmetic Formulas, Dictionaries
Description: Convert units of Length (km, m, mi, ft), Weight (kg, g, lbs, oz), and Temperature (C, F, K).
"""

def temperature_converter():
    print("\n--- TEMPERATURE CONVERTER ---")
    print("1. Celsius to Fahrenheit & Kelvin")
    print("2. Fahrenheit to Celsius & Kelvin")
    print("3. Kelvin to Celsius & Fahrenheit")
    ch = input("Choice (1-3): ").strip()
    try:
        val = float(input("Enter temperature value: "))
        if ch == '1':
            f = (val * 9/5) + 32
            k = val + 273.15
            print(f"{val}°C = {f:.2f}°F | {k:.2f}K")
        elif ch == '2':
            c = (val - 32) * 5/9
            k = c + 273.15
            print(f"{val}°F = {c:.2f}°C | {k:.2f}K")
        elif ch == '3':
            c = val - 273.15
            f = (c * 9/5) + 32
            print(f"{val}K = {c:.2f}°C | {f:.2f}°F")
        else:
            print("Invalid choice.")
    except ValueError:
        print("Invalid number input.")

def length_converter():
    print("\n--- LENGTH CONVERTER ---")
    # Base unit: meters
    to_meters = {
        "m": 1.0,
        "km": 1000.0,
        "cm": 0.01,
        "mm": 0.001,
        "mi": 1609.34,
        "ft": 0.3048,
        "in": 0.0254
    }
    print("Available units: m, km, cm, mm, mi, ft, in")
    from_u = input("Convert from unit: ").strip().lower()
    to_u = input("Convert to unit: ").strip().lower()
    
    if from_u not in to_meters or to_u not in to_meters:
        print("Unsupported unit.")
        return
        
    try:
        val = float(input(f"Enter length in {from_u}: "))
        meters = val * to_meters[from_u]
        result = meters / to_meters[to_u]
        print(f"{val} {from_u} = {result:.4f} {to_u}")
    except ValueError:
        print("Invalid value.")

def weight_converter():
    print("\n--- WEIGHT / MASS CONVERTER ---")
    # Base unit: kilograms
    to_kg = {
        "kg": 1.0,
        "g": 0.001,
        "mg": 0.000001,
        "lbs": 0.453592,
        "oz": 0.0283495
    }
    print("Available units: kg, g, mg, lbs, oz")
    from_u = input("Convert from unit: ").strip().lower()
    to_u = input("Convert to unit: ").strip().lower()

    if from_u not in to_kg or to_u not in to_kg:
        print("Unsupported unit.")
        return

    try:
        val = float(input(f"Enter weight in {from_u}: "))
        kg = val * to_kg[from_u]
        result = kg / to_kg[to_u]
        print(f"{val} {from_u} = {result:.4f} {to_u}")
    except ValueError:
        print("Invalid value.")

def main():
    while True:
        print("\n=== MULTI-UNIT CONVERTER ===")
        print("1. Length / Distance")
        print("2. Weight / Mass")
        print("3. Temperature")
        print("4. Exit")
        
        choice = input("Enter choice (1-4): ").strip()
        if choice == '1':
            length_converter()
        elif choice == '2':
            weight_converter()
        elif choice == '3':
            temperature_converter()
        elif choice == '4':
            print("Goodbye!")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
