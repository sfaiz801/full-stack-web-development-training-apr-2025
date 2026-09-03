#include <stdio.h>

/**
 * 03_bitwise_operators.c
 * ----------------------
 * Demonstrates bit-level operations in C:
 * - Bitwise AND (&)
 * - Bitwise OR (|)
 * - Bitwise XOR (^)
 * - Bitwise NOT (~)
 * - Left Shift (<<) and Right Shift (>>)
 */

int main(void) {
    unsigned char a = 12; // Binary: 0000 1100
    unsigned char b = 25; // Binary: 0001 1001

    printf("--- Bitwise Operators (a=12, b=25) ---\n");
    printf("Binary a:        0000 1100 (12)\n");
    printf("Binary b:        0001 1001 (25)\n");
    printf("--------------------------------\n");
    printf("Bitwise AND (a & b):   %d  (0000 1000 = 8)\n", a & b);
    printf("Bitwise OR  (a | b):   %d (0001 1101 = 29)\n", a | b);
    printf("Bitwise XOR (a ^ b):   %d (0001 0101 = 21)\n", a ^ b);
    printf("Bitwise NOT (~a):      %d\n\n", (char)~a);

    // Bit shifts (useful for fast multiplication/division by 2)
    int num = 8; // 0000 1000
    printf("--- Shift Operators (num = 8) ---\n");
    printf("Left shift (num << 1):  %d (multiplies by 2 -> 16)\n", num << 1);
    printf("Left shift (num << 2):  %d (multiplies by 4 -> 32)\n", num << 2);
    printf("Right shift (num >> 1): %d (divides by 2 -> 4)\n", num >> 1);

    return 0;
}
