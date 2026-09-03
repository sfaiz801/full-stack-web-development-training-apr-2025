#include <stdio.h>

/**
 * 02_call_by_value_vs_reference.c
 * -------------------------------
 * Demonstrates:
 * - Call by Value (changes inside function do NOT affect original caller)
 * - Call by Reference / Pointers (changes directly modify original memory)
 * - Classical swap function implementation
 */

// Call by Value
void swapByValue(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
    printf("[Inside swapByValue] x=%d, y=%d\n", x, y);
}

// Call by Reference (using pointers)
void swapByReference(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
    printf("[Inside swapByReference] *x=%d, *y=%d\n", *x, *y);
}

int main(void) {
    int num1 = 10, num2 = 50;

    printf("--- 1. Call by Value Test ---\n");
    printf("Before call: num1=%d, num2=%d\n", num1, num2);
    swapByValue(num1, num2);
    printf("After call:  num1=%d, num2=%d (Values UNCHANGED in main!)\n\n", num1, num2);

    printf("--- 2. Call by Reference Test ---\n");
    printf("Before call: num1=%d, num2=%d\n", num1, num2);
    // Pass memory addresses of num1 and num2 using & operator
    swapByReference(&num1, &num2);
    printf("After call:  num1=%d, num2=%d (Values SWAPPED in main!)\n", num1, num2);

    return 0;
}
