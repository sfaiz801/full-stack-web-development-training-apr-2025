"""
Project 17: Rock, Paper, Scissors Tournament
Topic: random, while loops, condition matrices, score counter
Description: Play Rock-Paper-Scissors against an AI bot with real-time score tracker.
"""

import random

CHOICES = ["rock", "paper", "scissors"]
ICONS = {"rock": "🪨", "paper": "📄", "scissors": "✂️"}

def determine_winner(player, bot):
    if player == bot:
        return "tie"
    elif (player == "rock" and bot == "scissors") or \
         (player == "paper" and bot == "rock") or \
         (player == "scissors" and bot == "paper"):
        return "player"
    else:
        return "bot"

def main():
    player_score = 0
    bot_score = 0
    ties = 0

    print("=" * 45)
    print("     ROCK 🪨  PAPER 📄  SCISSORS ✂️")
    print("=" * 45)

    while True:
        print(f"\nScoreboard -> You: {player_score} | Computer: {bot_score} | Ties: {ties}")
        print("Options: (r)ock, (p)aper, (s)cissors, or (q)uit")
        user_input = input("Your choice: ").strip().lower()

        if user_input in ['q', 'quit', 'exit']:
            print("\nFinal Result:")
            print(f"You: {player_score} | Computer: {bot_score} | Ties: {ties}")
            if player_score > bot_score:
                print("🏆 You won the tournament! Congratulations!")
            elif player_score < bot_score:
                print("🤖 Computer won this time. Better luck next game!")
            else:
                print("🤝 It's a draw overall!")
            break

        shortcuts = {'r': 'rock', 'p': 'paper', 's': 'scissors'}
        player_choice = shortcuts.get(user_input, user_input)

        if player_choice not in CHOICES:
            print("Invalid move! Choose rock, paper, or scissors.")
            continue

        bot_choice = random.choice(CHOICES)

        print(f"\nYou chose: {ICONS[player_choice]} {player_choice.capitalize()}")
        print(f"Computer chose: {ICONS[bot_choice]} {bot_choice.capitalize()}")

        winner = determine_winner(player_choice, bot_choice)
        if winner == "player":
            player_score += 1
            print("🌟 You win this round!")
        elif winner == "bot":
            bot_score += 1
            print("💀 Computer wins this round!")
        else:
            ties += 1
            print("⚖️ It's a tie!")

if __name__ == '__main__':
    main()
