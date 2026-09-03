"""
Project 02: Stopwatch & Countdown Timer
Topic: time, threading, math
Description: Includes a stopwatch with lap-record functionality and a countdown timer.
"""

import time
import sys

def format_time(seconds):
    mins = int(seconds // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 100)
    return f"{mins:02d}:{secs:02d}.{millis:02d}"

def stopwatch():
    print("\n--- STOPWATCH ---")
    print("Press ENTER to start. Press ENTER again for each LAP. Type 'stop' + ENTER to finish.")
    input("Press Enter to begin...")
    start_time = time.time()
    lap_start = start_time
    lap_count = 1
    
    try:
        while True:
            cmd = input(f"Running... [Lap {lap_count}] (Press Enter for lap, type 'q' to stop): ").strip().lower()
            now = time.time()
            total_elapsed = now - start_time
            lap_elapsed = now - lap_start
            
            if cmd == 'q' or cmd == 'stop':
                print(f"\nFinal Total Time: {format_time(total_elapsed)}")
                break
            else:
                print(f"-> Lap {lap_count}: {format_time(lap_elapsed)} | Total: {format_time(total_elapsed)}")
                lap_start = now
                lap_count += 1
    except KeyboardInterrupt:
        print("\nStopwatch stopped.")

def countdown_timer():
    print("\n--- COUNTDOWN TIMER ---")
    try:
        minutes = int(input("Enter minutes: ") or 0)
        seconds = int(input("Enter seconds: ") or 0)
        total_seconds = minutes * 60 + seconds
        
        if total_seconds <= 0:
            print("Please enter a positive time duration.")
            return

        print("\nCountdown started...")
        while total_seconds > 0:
            m, s = divmod(total_seconds, 60)
            timer_display = f"{m:02d}:{s:02d}"
            sys.stdout.write(f"\rTime Remaining: {timer_display} ")
            sys.stdout.flush()
            time.sleep(1)
            total_seconds -= 1

        sys.stdout.write("\rTime Remaining: 00:00 \n")
        print("⏰ TIME'S UP! ⏰")
    except ValueError:
        print("Invalid input! Please enter integer numbers.")

def main():
    while True:
        print("\n=== STOPWATCH & TIMER MENU ===")
        print("1. Stopwatch (with Laps)")
        print("2. Countdown Timer")
        print("3. Exit")
        choice = input("Enter choice (1-3): ").strip()
        
        if choice == '1':
            stopwatch()
        elif choice == '2':
            countdown_timer()
        elif choice == '3':
            print("Goodbye!")
            break
        else:
            print("Invalid choice! Try again.")

if __name__ == '__main__':
    main()
