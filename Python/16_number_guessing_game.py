"""
Project 16: Number Guessing Game
Topic: random, while loops, input validation, score calculations
Description: Fun guessing game with difficulty levels (Easy, Medium, Hard), hints, and attempt limits.
"""

import random

def play_game(difficulty):
    configs = {
        "1": {"name": "Easy (1 to 50)", "max_val": 50, "attempts": 10},
        "2": {"name": "Medium (1 to 100)", "max_val": 100, "attempts": 7},
        "3": {"name": "Hard (1 to 200)", "max_val": 200, "attempts": 5}
    }
    
    cfg = configs.get(difficulty, configs["2"])
    secret = random.randint(1, cfg["max_val"])
    attempts_left = cfg["attempts"]

    print(f"\n--- Starting {cfg['name']} ---")
    print(f"You have {attempts_left} attempts to guess the secret number!")

    while attempts_left > 0:
        try:
            guess = int(input(f"\n[Attempts left: {attempts_left}] Enter your guess: "))
            if guess < 1 or guess > cfg["max_val"]:
                print(f"Please guess between 1 and {cfg['max_val']}.")
                continue

            attempts_left -= 1

            if guess == secret:
                score = (attempts_left + 1) * 10
                print(f"\n🎉 CONGRATULATIONS! You guessed it right: {secret}!")
                print(f"🏆 Score: {score} points!")
                return
            elif guess < secret:
                diff = secret - guess
                hint = "a little" if diff <= 5 else "much"
                print(f"📉 Too low! Try {hint} higher.")
            else:
                diff = guess - secret
                hint = "a little" if diff <= 5 else "much"
                print(f"📈 Too high! Try {hint} lower.")

        except ValueError:
            print("Invalid input! Please enter a valid whole number.")

    print(f"\n💥 Game Over! You ran out of attempts. The secret number was: {secret}")

def main():
    while True:
        print("\n" + "=" * 40)
        print("      NUMBER GUESSING CHALLENGE")
        print("=" * 40)
        print("1. Easy (1-50, 10 guesses)")
        print("2. Medium (1-100, 7 guesses)")
        print("3. Hard (1-200, 5 guesses)")
        print("4. Exit")
        
        choice = input("Select difficulty (1-4): ").strip()
        if choice in ['1', '2', '3']:
            play_game(choice)
        elif choice == '4':
            print("Thanks for playing! See you next time.")
            break
        else:
            print("Invalid option.")

if __name__ == '__main__':
    main()
