"""
04_dictionaries_and_methods.py
------------------------------
Demonstrates Python Dictionaries:
- Key-Value hash map collections
- Accessing, modifying, and adding keys
- Safe access with get(key, default)
- Dictionary iteration methods: keys(), values(), items()
- Dictionary comprehensions and nested dictionary models
"""

def main():
    print("--- 1. Dictionary Operations & Safe Access ---")
    developer_profile = {
        "id": "DEV-101",
        "name": "Mohammad Faiz",
        "role": "Full Stack Engineer",
        "experience_years": 2,
        "is_available": True
    }

    print(f"Profile: {developer_profile}")
    print(f"Developer Name: {developer_profile['name']}")

    # Safe access with .get() avoids KeyError
    salary = developer_profile.get("salary", "Confidential / Not Disclosed")
    print(f"Salary query (.get): {salary}")

    # Adding new key-value pair and updating
    developer_profile["primary_stack"] = "Next.js & FastAPI"
    developer_profile["experience_years"] = 3

    print("\n--- 2. Iterating with .items() ---")
    for key, value in developer_profile.items():
        print(f"  {key:<18}: {value}")

    print("\n--- 3. Dictionary Comprehension ---")
    # Generating a lookup table of item prices with 18% GST tax added
    base_menu_prices = {
        "Chicken Biryani": 250,
        "Butter Paneer": 200,
        "Garlic Naan": 40,
        "Mango Lassi": 60
    }
    taxed_prices = {item: round(price * 1.18, 2) for item, price in base_menu_prices.items()}

    print("Base Menu Prices:       ", base_menu_prices)
    print("Taxed (18% GST) Prices: ", taxed_prices)

if __name__ == "__main__":
    main()
