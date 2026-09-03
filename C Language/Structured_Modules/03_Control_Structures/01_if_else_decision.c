#include <stdio.h>

/**
 * 01_if_else_decision.c
 * ---------------------
 * Demonstrates decision making in C:
 * - Simple if condition
 * - if-else condition (voting eligibility)
 * - else-if ladder (student grade classification)
 */

int main(void) {
    int age = 19;
    int marks = 82;

    printf("--- 1. if-else: Voting Eligibility ---\n");
    if (age >= 18) {
        printf("Age: %d -> Eligible to vote in elections!\n\n", age);
    } else {
        printf("Age: %d -> Not eligible to vote. Wait for %d more years.\n\n", age, 18 - age);
    }

    printf("--- 2. else-if Ladder: Grade Classifier ---\n");
    printf("Student Marks: %d / 100\n", marks);
    if (marks >= 90) {
        printf("Grade: Distinction (A+)\n");
    } else if (marks >= 80) {
        printf("Grade: First Class with Honours (A)\n");
    } else if (marks >= 60) {
        printf("Grade: First Class (B)\n");
    } else if (marks >= 40) {
        printf("Grade: Pass (C)\n");
    } else {
        printf("Grade: Fail (Need Improvement)\n");
    }

    return 0;
}
