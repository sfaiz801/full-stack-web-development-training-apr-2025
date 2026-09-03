"""
Project 21: Currency Converter
Topic: Dictionaries, Mathematical Conversions, String Formatting
Description: Convert between world currencies (USD, INR, EUR, GBP, JPY, CAD, AUD, AED).
"""

# Exchange rates relative to 1 USD (Base currency)
EXCHANGE_RATES_TO_USD = {
    "USD": 1.0,
    "INR": 83.50,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 155.20,
    "CAD": 1.36,
    "AUD": 1.52,
    "AED": 3.67,
    "CNY": 7.24
}

def display_supported_currencies():
    print("\nSupported Currencies:")
    curr_list = list(EXCHANGE_RATES_TO_USD.keys())
    print(", ".join(curr_list))

def convert_currency():
    display_supported_currencies()
    from_curr = input("\nFrom Currency (e.g. USD): ").strip().upper()
    to_curr = input("To Currency (e.g. INR): ").strip().upper()

    if from_curr not in EXCHANGE_RATES_TO_USD or to_curr not in EXCHANGE_RATES_TO_USD:
        print("One or both currencies not supported.")
        return

    try:
        amount = float(input(f"Enter amount in {from_curr}: "))
        if amount < 0:
            print("Amount must be positive.")
            return

        # Convert to USD first, then to target currency
        usd_val = amount / EXCHANGE_RATES_TO_USD[from_curr]
        converted = usd_val * EXCHANGE_RATES_TO_USD[to_curr]

        print("\n" + "=" * 45)
        print(f"  {amount:,.2f} {from_curr} = {converted:,.2f} {to_curr}")
        print(f"  Rate: 1 {from_curr} = {(EXCHANGE_RATES_TO_USD[to_curr] / EXCHANGE_RATES_TO_USD[from_curr]):.4f} {to_curr}")
        print("=" * 45)
    except ValueError:
        print("Invalid amount entered.")

def main():
    while True:
        print("\n=== CURRENCY CONVERTER ===")
        print("1. Convert Currency")
        print("2. View Supported Currencies & Rates vs USD")
        print("3. Exit")
        
        choice = input("Enter choice (1-3): ").strip()
        if choice == '1':
            convert_currency()
        elif choice == '2':
            print("\n" + "-" * 30)
            print(f"{'Currency':<10} | {'1 USD ='}")
            print("-" * 30)
            for c, rate in EXCHANGE_RATES_TO_USD.items():
                print(f"{c:<10} | {rate}")
            print("-" * 30)
        elif choice == '3':
            print("Exiting Currency Converter.")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
