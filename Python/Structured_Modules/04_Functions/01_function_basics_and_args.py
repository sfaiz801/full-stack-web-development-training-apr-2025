"""
01_function_basics_and_args.py
------------------------------
Demonstrates Python function design:
- Function definitions, type annotations, and docstrings
- Positional, keyword, and default parameters
- Variable-length arguments (*args)
- Variable-length keyword arguments (**kwargs)
"""

def calculate_invoice(customer_name: str, *item_prices: float, discount: float = 0.0, **metadata) -> dict:
    """
    Calculates final total after applying optional discount and attaches metadata.
    
    :param customer_name: Full name of client
    :param item_prices: Variable number of item prices (*args)
    :param discount: Flat percentage discount (0.0 to 1.0)
    :param metadata: Arbitrary key-value details (**kwargs)
    :return: Formatted summary dictionary
    """
    subtotal = sum(item_prices)
    discount_amount = subtotal * discount
    grand_total = subtotal - discount_amount

    return {
        "customer": customer_name,
        "item_count": len(item_prices),
        "subtotal": round(subtotal, 2),
        "discount_applied": f"{discount * 100:.0f}%",
        "grand_total": round(grand_total, 2),
        "extra_info": metadata
    }

def main():
    print("--- 1. Testing Flexible Function with *args and **kwargs ---")
    order1 = calculate_invoice(
        "Faiz",
        1200.50, 450.00, 890.00, 199.99,
        discount=0.10,
        payment_method="UPI",
        order_status="Paid",
        delivery_city="Bengaluru"
    )

    for k, v in order1.items():
        print(f"  {k:<18}: {v}")

    print("\n--- 2. Default Argument Test (No discount, no kwargs) ---")
    order2 = calculate_invoice("Ayaan", 500.0, 750.0)
    print(f"Customer: {order2['customer']} | Total: Rs. {order2['grand_total']}")

if __name__ == "__main__":
    main()
