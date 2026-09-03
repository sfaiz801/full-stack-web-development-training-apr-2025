#include <stdio.h>

/**
 * 03_recursion_and_math.c
 * -----------------------
 * Demonstrates:
 * - Recursive function calling itself
 * - Base condition termination
 * - Calculating Factorial: n! = n * (n-1)!
 * - Generating Fibonacci sequence recursively
 */

// Recursive Factorial
unsigned long long factorial(int n) {
    // Base Case
    if (n <= 1) {
        return 1;
    }
    // Recursive Case
    return n * factorial(n - 1);
}

// Recursive Fibonacci
int fibonacci(int n) {
    // Base Cases
    if (n <= 0) return 0;
    if (n == 1) return 1;
    // Recursive Case
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main(void) {
    int num = 6;
    printf("--- 1. Recursive Factorial ---\n");
    printf("Factorial of %d (%d!): %llu\n\n", num, num, factorial(num));

    printf("--- 2. Recursive Fibonacci Series (First 8 Terms) ---\n");
    for (int i = 0; i < 8; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\n");

    return 0;
}
