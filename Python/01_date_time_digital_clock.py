"""
Project 01: Digital Clock & Date-Time Viewer
Topic: datetime, time, os, sys
Description: Displays real-time live digital clock, custom timezone offsets, and date details.
"""

import datetime
import time
import os

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def show_current_datetime():
    now = datetime.datetime.now()
    print("=" * 45)
    print("        CURRENT DATE & TIME DETAILS")
    print("=" * 45)
    print(f"Current Date      : {now.strftime('%A, %d %B %Y')}")
    print(f"Current Time      : {now.strftime('%I:%M:%S %p')}")
    print(f"24-Hour Format    : {now.strftime('%H:%M:%S')}")
    print(f"Day of Year       : {now.strftime('%j')} / 365")
    print(f"Week Number       : Week {now.strftime('%U')}")
    print(f"ISO Format        : {now.isoformat()}")
    print("=" * 45)

def live_digital_clock():
    print("Starting Live Digital Clock (Press Ctrl + C to stop)...")
    time.sleep(1)
    try:
        while True:
            clear_screen()
            now = datetime.datetime.now()
            print("=" * 45)
            print("         * PYTHON LIVE DIGITAL CLOCK *")
            print("=" * 45)
            print(f"          DATE : {now.strftime('%d-%b-%Y')} ({now.strftime('%A')})")
            print(f"          TIME : {now.strftime('%I:%M:%S %p')}")
            print("=" * 45)
            print("        Press Ctrl+C to return to menu")
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nClock stopped.")

def days_until_target_date():
    date_str = input("Enter target date (YYYY-MM-DD): ").strip()
    try:
        target_date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
        today = datetime.date.today()
        diff = (target_date - today).days
        if diff > 0:
            print(f"\nTarget date {target_date} is in {diff} day(s) from today.")
        elif diff == 0:
            print("\nTarget date is TODAY!")
        else:
            print(f"\nTarget date {target_date} passed {-diff} day(s) ago.")
    except ValueError:
        print("Invalid date format! Please use YYYY-MM-DD.")

def main():
    while True:
        print("\n=== DATE TIME & CLOCK UTILITY ===")
        print("1. View Current Date & Time Summary")
        print("2. Launch Live Digital Clock")
        print("3. Calculate Days Until/From Date")
        print("4. Exit")
        choice = input("Enter choice (1-4): ").strip()

        if choice == '1':
            show_current_datetime()
        elif choice == '2':
            live_digital_clock()
        elif choice == '3':
            days_until_target_date()
        elif choice == '4':
            print("Exiting. Have a great day!")
            break
        else:
            print("Invalid selection! Please enter 1-4.")

if __name__ == '__main__':
    main()
