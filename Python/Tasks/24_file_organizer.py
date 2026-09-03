"""
Project 24: Automatic File Organizer
Topic: os, shutil, pathlib, automation scripting
Description: Scans a target directory and sorts files into categorized subfolders (Images, Documents, Audio, Videos, Archives, Code).
"""

import os
import shutil

CATEGORIES = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"],
    "Documents": [".pdf", ".docx", ".doc", ".txt", ".xlsx", ".pptx", ".csv"],
    "Audio": [".mp3", ".wav", ".aac", ".flac", ".m4a"],
    "Videos": [".mp4", ".mkv", ".avi", ".mov", ".flv"],
    "Archives": [".zip", ".rar", ".7z", ".tar", ".gz"],
    "Code": [".py", ".c", ".cpp", ".java", ".js", ".html", ".css", ".json", ".sql"]
}

def get_category(ext):
    ext = ext.lower()
    for cat, extensions in CATEGORIES.items():
        if ext in extensions:
            return cat
    return "Others"

def organize_folder(folder_path):
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        print("Directory does not exist!")
        return

    files_moved = 0
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        
        # Skip subdirectories
        if os.path.isdir(item_path):
            continue

        _, ext = os.path.splitext(item)
        if not ext:
            category = "Others"
        else:
            category = get_category(ext)

        target_dir = os.path.join(folder_path, category)
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)

        dest_path = os.path.join(target_dir, item)
        shutil.move(item_path, dest_path)
        print(f"Moved: '{item}' -> [{category}/]")
        files_moved += 1

    print(f"\nOrganization Complete! Total files organized: {files_moved}")

def main():
    print("=== AUTOMATIC FILE ORGANIZER ===")
    print("This tool sorts files into subdirectories based on their file extensions.")
    folder = input("\nEnter target folder path to organize (e.g. ./test_folder): ").strip()
    
    if folder:
        organize_folder(folder)
    else:
        print("No folder path entered.")

if __name__ == '__main__':
    main()
