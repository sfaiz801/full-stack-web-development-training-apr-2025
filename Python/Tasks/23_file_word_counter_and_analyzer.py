"""
Project 23: Text & File Word Counter and Analyzer
Topic: File I/O, string methods, collections.Counter
Description: Analyze any text or text file to count characters, words, lines, top keywords, and reading time.
"""

from collections import Counter
import re
import os

def analyze_text(content):
    lines = content.splitlines()
    num_lines = len(lines)
    num_chars = len(content)
    num_chars_no_spaces = len(content.replace(" ", "").replace("\n", "").replace("\t", ""))
    
    words = re.findall(r'\b[a-zA-Z0-9_\'-]+\b', content.lower())
    num_words = len(words)
    
    # Reading time estimation (avg reading speed ~ 200 words per minute)
    reading_time_mins = num_words / 200.0

    # Word frequencies (excluding common stop words)
    stop_words = {"the", "a", "an", "is", "in", "and", "to", "of", "it", "that", "on", "for", "with", "as", "this", "by", "i", "you", "he", "she"}
    filtered_words = [w for w in words if w not in stop_words and len(w) > 2]
    top_5_words = Counter(filtered_words).most_common(5)

    print("\n" + "=" * 45)
    print("           TEXT ANALYSIS REPORT")
    print("=" * 45)
    print(f"Total Lines               : {num_lines}")
    print(f"Total Word Count          : {num_words}")
    print(f"Total Characters (w/ spaces): {num_chars}")
    print(f"Characters (no spaces)    : {num_chars_no_spaces}")
    print(f"Estimated Reading Time    : {reading_time_mins:.2f} minute(s)")
    print("-" * 45)
    print("Most Frequent Key Words:")
    for word, freq in top_5_words:
        print(f"  • {word:<15}: {freq} time(s)")
    print("=" * 45)

def main():
    while True:
        print("\n=== TEXT & FILE ANALYZER ===")
        print("1. Analyze Direct Text Input")
        print("2. Analyze an Existing Text File")
        print("3. Exit")
        
        choice = input("Enter choice (1-3): ").strip()
        if choice == '1':
            print("\nEnter or paste text (Enter a single line with 'EOF' to submit):")
            lines = []
            while True:
                line = input()
                if line.strip() == "EOF":
                    break
                lines.append(line)
            text = "\n".join(lines)
            if text:
                analyze_text(text)
            else:
                print("No text provided.")
        elif choice == '2':
            path = input("Enter path to text file: ").strip()
            if os.path.exists(path) and os.path.isfile(path):
                try:
                    with open(path, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                    analyze_text(content)
                except Exception as e:
                    print(f"Error reading file: {e}")
            else:
                print("File does not exist.")
        elif choice == '3':
            print("Goodbye!")
            break
        else:
            print("Invalid choice.")

if __name__ == '__main__':
    main()
