"""
Project 19: Interactive Multiple Choice Quiz App
Topic: Lists of dictionaries, score calculation, loops
Description: Quiz with multiple-choice questions, answer validation, score report card and explanations.
"""

QUIZ_QUESTIONS = [
    {
        "question": "Which keyword is used to define a function in Python?",
        "options": ["A. func", "B. def", "C. function", "D. define"],
        "answer": "B",
        "explanation": "'def' is the reserved keyword to define functions in Python."
    },
    {
        "question": "Which data type is immutable in Python?",
        "options": ["A. List", "B. Dictionary", "C. Tuple", "D. Set"],
        "answer": "C",
        "explanation": "Tuples are immutable; their values cannot be changed after creation."
    },
    {
        "question": "What is the output of print(2 ** 3)?",
        "options": ["A. 6", "B. 8", "C. 9", "D. 5"],
        "answer": "B",
        "explanation": "** is the exponentiation operator in Python (2^3 = 8)."
    },
    {
        "question": "Which method is used to add an item to the end of a list?",
        "options": ["A. push()", "B. add()", "C. insert()", "D. append()"],
        "answer": "D",
        "explanation": "list.append() adds an item to the end of a list."
    },
    {
        "question": "What is the correct file extension for Python files?",
        "options": ["A. .pyth", "B. .pt", "C. .py", "D. .p"],
        "answer": "C",
        "explanation": "Standard Python source files have the '.py' extension."
    }
]

def run_quiz():
    score = 0
    total = len(QUIZ_QUESTIONS)
    print("\n" + "=" * 50)
    print("        PYTHON PROGRAMMING KNOWLEDGE QUIZ")
    print("=" * 50)

    for i, q in enumerate(QUIZ_QUESTIONS, 1):
        print(f"\nQ{i}. {q['question']}")
        for opt in q["options"]:
            print(f"   {opt}")

        user_ans = input("Your answer (A, B, C, D): ").strip().upper()
        if user_ans == q["answer"]:
            print("✅ Correct!")
            score += 1
        else:
            print(f"❌ Incorrect! Correct answer was: {q['answer']}")
        print(f"💡 Explanation: {q['explanation']}")

    percentage = (score / total) * 100
    print("\n" + "=" * 50)
    print("                QUIZ RESULTS")
    print("=" * 50)
    print(f"Score: {score} out of {total} ({percentage:.1f}%)")
    if percentage >= 80:
        print("Rating: 🌟 Master! Excellent understanding of Python.")
    elif percentage >= 60:
        print("Rating: 👍 Good Job! Keep practicing.")
    else:
        print("Rating: 📚 Needs review. Re-read Python fundamentals.")
    print("=" * 50)

def main():
    while True:
        run_quiz()
        replay = input("\nWould you like to try again? (y/n): ").strip().lower()
        if replay != 'y':
            print("Thanks for playing the quiz!")
            break

if __name__ == '__main__':
    main()
