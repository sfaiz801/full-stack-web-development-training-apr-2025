"""
main_runner.py
--------------
Demonstrates:
- Importing built-in standard library modules (math, datetime, random)
- Importing custom packages and functions from 'utility_pkg'
- Code execution under 'if __name__ == "__main__":'
"""

import math
import datetime
import random

# Importing from our custom package
from utility_pkg import calculate_gst, is_prime, slugify, mask_email

def main():
    print("=========================================")
    print(" Python Modules & Packages Demonstration ")
    print("=========================================")

    print("\n--- 1. Python Standard Library Modules ---")
    print(f"math.sqrt(144):          {math.sqrt(144)}")
    print(f"math.pi:                 {math.pi:.5f}")
    print(f"datetime.date.today():   {datetime.date.today()}")
    print(f"random.choice (Lucky #): {random.choice([7, 18, 21, 45, 99])}")

    print("\n--- 2. Custom Package: utility_pkg.math_helpers ---")
    order_amount = 4500.0
    gst_info = calculate_gst(order_amount, rate_percentage=18.0)
    print(f"Base: Rs. {gst_info['base_amount']} | GST: Rs. {gst_info['gst_tax']} | Total: Rs. {gst_info['net_total']}")
    print(f"Is 29 a prime number?    {is_prime(29)}")
    print(f"Is 30 a prime number?    {is_prime(30)}")

    print("\n--- 3. Custom Package: utility_pkg.string_helpers ---")
    blog_title = "Learn Full Stack Web Development in 2025!"
    clean_slug = slugify(blog_title)
    print(f"Original Title: '{blog_title}'")
    print(f"URL Slug:       '{clean_slug}'")

    user_email = "mohammadfaiz801@gmail.com"
    masked = mask_email(user_email)
    print(f"Masked Email:   '{masked}'")

if __name__ == "__main__":
    main()
