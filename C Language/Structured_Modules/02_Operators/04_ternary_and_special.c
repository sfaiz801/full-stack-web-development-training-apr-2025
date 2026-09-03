#include <stdio.h>

/**
 * 04_ternary_and_special.c
 * ------------------------
 * Demonstrates:
 * - Conditional / Ternary Operator (? :)
 * - Comma Operator (,)
 * - Sizeof operator as compile-time unary operator
 */

int main(void) {
    int score = 75;
    
    // Ternary operator: condition ? value_if_true : value_if_false
    char* result = (score >= 40) ? "PASS" : "FAIL";
    printf("--- Ternary Operator (? :) ---\n");
    printf("Score: %d -> Result: %s\n", score, result);

    int num1 = 45, num2 = 82;
    int maxNumber = (num1 > num2) ? num1 : num2;
    printf("Larger of %d and %d is: %d\n\n", num1, num2, maxNumber);

    // Comma operator: evaluates left-to-right, returns value of rightmost expression
    printf("--- Comma Operator ---\n");
    int val = (num1 += 5, num2 += 8, num1 + num2);
    printf("Evaluated val via comma operator: %d\n", val);

    return 0;
}
