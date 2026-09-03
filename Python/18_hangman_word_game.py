"""
Project 18: Hangman Word Guessing Game
Topic: Strings, Sets, ASCII Art, Random Choice
Description: Classic hangman game with visual gallows, letter guessing, and vocabulary hints.
"""

import random

HANGMAN_PICS = [
    """
       +---+
       |   |
           |
           |
           |
           |
    =========""",
    """
       +---+
       |   |
       O   |
           |
           |
           |
    =========""",
    """
       +---+
       |   |
       O   |
       |   |
           |
           |
    =========""",
    """
       +---+
       |   |
       O   |
      /|   |
           |
           |
    =========""",
    """
       +---+
       |   |
       O   |
      /|\\  |
           |
           |
    =========""",
    """
       +---+
       |   |
       O   |
      /|\\  |
      /    |
           |
    =========""",
    """
       +---+
       |   |
       O   |
      /|\\  |
      / \\  |
           |
    ========="""
]

WORDS_WITH_HINTS = {
    "PYTHON": "Popular programming language named after a comedy troupe",
    "DEVELOPER": "A person that creates software applications",
    "ALGORITHM": "Step-by-step procedure for solving a problem",
    "VARIABLE": "Named memory location to store data",
    "FUNCTION": "Reusable block of code that performs an action",
    "DATABASE": "Organized collection of structured information or data",
    "KEYBOARD": "Primary input device with letters and numbers"
}

def play_hangman():
    word, hint = random.choice(list(WORDS_WITH_HINTS.items()))
    word_letters = set(word)
    guessed_letters = set()
    errors = 0
    max_errors = len(HANGMAN_PICS) - 1

    print("\n" + "=" * 45)
    print("           WELCOME TO HANGMAN!")
    print("=" * 45)
    print(f"Hint: {hint}")

    while errors < max_errors and word_letters:
        print(HANGMAN_PICS[errors])
        
        display = [c if c in guessed_letters else "_" for c in word]
        print("\nWord: " + " ".join(display))
        print("Guessed letters: " + ", ".join(sorted(guessed_letters)) if guessed_letters else "Guessed letters: None")
        print(f"Mistakes allowed remaining: {max_errors - errors}")

        guess = input("Guess a letter: ").strip().upper()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single English letter.")
            continue

        if guess in guessed_letters:
            print("You already guessed that letter!")
            continue

        guessed_letters.add(guess)

        if guess in word_letters:
            word_letters.remove(guess)
            print("Good guess! 👍")
        else:
            errors += 1
            print("Wrong letter! ❌")

    if not word_letters:
        print("\n" + "=" * 45)
        print(f"🎉 YOU WON! The word was indeed: {word}")
        print("=" * 45)
    else:
        print(HANGMAN_PICS[errors])
        print("\n" + "=" * 45)
        print(f"💀 GAME OVER! The word was: {word}")
        print("=" * 45)

def main():
    while True:
        play_hangman()
        again = input("\nPlay again? (y/n): ").strip().lower()
        if again != 'y':
            print("Thanks for playing Hangman!")
            break

if __name__ == '__main__':
    main()
