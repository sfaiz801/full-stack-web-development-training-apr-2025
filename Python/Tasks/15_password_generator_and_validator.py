"""
Project 15: Password Generator & Strength Validator
Topic: random, string, regular expressions
Description: Generate strong passwords with customized rules and evaluate strength level of user passwords.
"""

import random
import string
import re

def generate_password(length=12, use_upper=True, use_digits=True, use_special=True):
    pool = list(string.ascii_lowercase)
    guaranteed = [random.choice(string.ascii_lowercase)]

    if use_upper:
        pool.extend(string.ascii_uppercase)
        guaranteed.append(random.choice(string.ascii_uppercase))
    if use_digits:
        pool.extend(string.digits)
        guaranteed.append(random.choice(string.digits))
    if use_special:
        symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?"
        pool.extend(symbols)
        guaranteed.append(random.choice(symbols))

    if length < len(guaranteed):
        length = len(guaranteed)

    remaining = [random.choice(pool) for _ in range(length - len(guaranteed))]
    pwd_list = guaranteed + remaining
    random.shuffle(pwd_list)
    return "".join(pwd_list)

def check_password_strength(pwd):
    score = 0
    feedback = []

    if len(pwd) >= 8:
        score += 1
    else:
        feedback.append("Increase length to at least 8 characters.")

    if len(pwd) >= 12:
        score += 1

    if re.search(r"[a-z]", pwd) and re.search(r"[A-Z]", pwd):
        score += 1
    else:
        feedback.append("Mix lowercase and uppercase letters.")

    if re.search(r"\d", pwd):
        score += 1
    else:
        feedback.append("Include at least one numeric digit (0-9).")

    if re.search(r"[!@#$%^&*()-_=+[\]{}|;:,.<>?]", pwd):
        score += 1
    else:
        feedback.append("Include special characters (e.g. @, #, $, %).")

    levels = {
        0: "Very Weak ❌",
        1: "Weak ⚠️",
        2: "Moderate 🟡",
        3: "Strong 🟢",
        4: "Very Strong 🔒",
        5: "Excellent / Unbreakable 🛡️"
    }

    return levels.get(score, "Weak"), feedback

def main():
    while True:
        print("\n=== PASSWORD TOOLBOX ===")
        print("1. Generate Custom Secure Password")
        print("2. Check Password Strength")
        print("3. Exit")
        
        choice = input("Enter choice (1-3): ").strip()
        if choice == '1':
            try:
                length = int(input("Enter password length (recommended 12-20): ") or 12)
                upper = input("Include uppercase? (y/n, default y): ").strip().lower() != 'n'
                nums = input("Include numbers? (y/n, default y): ").strip().lower() != 'n'
                spec = input("Include symbols? (y/n, default y): ").strip().lower() != 'n'
                
                pwd = generate_password(length, upper, nums, spec)
                print("\n" + "=" * 40)
                print(f"Generated Password: {pwd}")
                print("=" * 40)
            except ValueError:
                print("Invalid input.")
        elif choice == '2':
            test_pwd = input("Enter password to test: ").strip()
            rating, tips = check_password_strength(test_pwd)
            print(f"\nStrength Level: {rating}")
            if tips:
                print("Recommendations:")
                for tip in tips:
                    print(f"- {tip}")
            else:
                print("Your password meets all good security criteria!")
        elif choice == '3':
            print("Stay safe online! Bye.")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
