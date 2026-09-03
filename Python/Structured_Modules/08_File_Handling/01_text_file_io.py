"""
01_text_file_io.py
------------------
Demonstrates standard file I/O operations in Python:
- Context manager ('with open(...) as f:') ensuring automated file closing
- Writing to a file ('w' mode)
- Appending lines to a file ('a' mode)
- Reading file contents ('r' mode, read(), readline(), readlines())
- Path cleanup using pathlib
"""

from pathlib import Path

def main():
    file_path = Path("sample_training_log.txt")

    print("--- 1. Writing to Text File ('w' mode) ---")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write("Full Stack Training Session Log\n")
        f.write("Batch: April 2025\n")
        f.write("Modules Completed: C Language, HTML & CSS, Python\n")
    print(f"File created and written at: {file_path}")

    print("\n--- 2. Appending to Text File ('a' mode) ---")
    with open(file_path, "a", encoding="utf-8") as f:
        f.write("Upcoming Modules: FastAPI, React & Redux, Next.js\n")
    print("New log entry appended.")

    print("\n--- 3. Reading File Contents ('r' mode) ---")
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        for idx, line in enumerate(lines, start=1):
            print(f"Line {idx}: {line.strip()}")

    # Clean up temporary test file
    if file_path.exists():
        file_path.unlink()
        print("\nTemporary log file cleaned up successfully.")

if __name__ == "__main__":
    main()
