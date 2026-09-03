#include <stdio.h>

/**
 * 01_arithmetic_and_assignment.c
 * ------------------------------
 * Demonstrates:
 * - Basic arithmetic operators: +, -, *, /, % (modulo)
 * - Shorthand compound assignment: +=, -=, *=, /=, %=
 * - Prefix vs Postfix increment/decrement: ++x vs x++
 */

int main(void) {
    int a = 15, b = 4;

    printf("--- Arithmetic Operations (a=%d, b=%d) ---\n", a, b);
    printf("Addition:       a + b = %d\n", a + b);
    printf("Subtraction:    a - b = %d\n", a - b);
    printf("Multiplication: a * b = %d\n", a * b);
    printf("Division:       a / b = %d (integer division)\n", a / b);
    printf("Modulo (Rem):   a %% b = %d\n\n", a % b);

    // Compound assignments
    int balance = 1000;
    printf("--- Compound Assignment Operators ---\n");
    printf("Initial Balance: %d\n", balance);
    balance += 500;  // balance = balance + 500
    printf("After deposit (+= 500):  %d\n", balance);
    balance -= 200;  // balance = balance - 200
    printf("After bill ( -= 200):    %d\n\n", balance);

    // Increment / Decrement prefix vs postfix
    int count = 5;
    printf("--- Prefix vs Postfix Increment ---\n");
    printf("Original count:  %d\n", count);
    printf("Postfix (count++): %d (evaluates first, then increments)\n", count++);
    printf("Now count is:    %d\n", count);
    printf("Prefix (++count):  %d (increments first, then evaluates)\n", ++count);

    return 0;
}
