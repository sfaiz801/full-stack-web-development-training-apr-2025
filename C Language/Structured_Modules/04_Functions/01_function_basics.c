#include <stdio.h>

/**
 * 01_function_basics.c
 * --------------------
 * Demonstrates:
 * - Function Declaration (Prototype)
 * - Function Definition (Implementation)
 * - Function Call with arguments and return values
 * - Void functions without return values
 */

// Function Prototypes
int calculateSum(int a, int b);
double findAverage(int totalMarks, int subjectCount);
void printBanner(void);

int main(void) {
    printBanner();

    int score1 = 85, score2 = 92;
    int sum = calculateSum(score1, score2);
    double avg = findAverage(sum, 2);

    printf("Score 1: %d, Score 2: %d\n", score1, score2);
    printf("Total Sum: %d\n", sum);
    printf("Average:   %.2lf\n", avg);

    return 0;
}

// Function Definitions
void printBanner(void) {
    printf("=========================================\n");
    printf("   Student Performance Grading System    \n");
    printf("=========================================\n");
}

int calculateSum(int a, int b) {
    return a + b;
}

double findAverage(int totalMarks, int subjectCount) {
    if (subjectCount <= 0) return 0.0;
    return (double)totalMarks / subjectCount;
}
