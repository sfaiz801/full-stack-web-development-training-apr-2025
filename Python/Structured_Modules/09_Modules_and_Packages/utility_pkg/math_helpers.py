"""
utility_pkg/math_helpers.py
---------------------------
Provides mathematical and financial helper functions.
"""

def calculate_gst(amount: float, rate_percentage: float = 18.0) -> dict:
    """Calculates GST amount and gross total."""
    tax = amount * (rate_percentage / 100.0)
    return {
        "base_amount": round(amount, 2),
        "tax_rate": f"{rate_percentage}%",
        "gst_tax": round(tax, 2),
        "net_total": round(amount + tax, 2)
    }

def is_prime(number: int) -> bool:
    """Returns True if number is a prime number, False otherwise."""
    if number <= 1:
        return False
    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            return False
    return True
