#include <stdio.h>

/**
 * 03_loops_iteration.c
 * --------------------
 * Demonstrates all three fundamental looping constructs in C:
 * 1. for loop (counting / fixed iteration)
 * 2. while loop (entry-controlled loop)
 * 3. do-while loop (exit-controlled loop, runs at least once)
 */

int main(void) {
    // 1. FOR LOOP: Multiplication table of 5
    printf("--- 1. For Loop: Multiplication Table of 5 ---\n");
    for (int i = 1; i <= 5; i++) {
        printf("5 x %d = %d\n", i, 5 * i);
    }

    // 2. WHILE LOOP: Sum of first N natural numbers
    printf("\n--- 2. While Loop: Sum of Numbers from 1 to 5 ---\n");
    int n = 5;
    int sum = 0;
    int counter = 1;
    while (counter <= n) {
        sum += counter;
        counter++;
    }
    printf("Sum of 1 to %d = %d\n", n, sum);

    // 3. DO-WHILE LOOP: Executes at least once regardless of condition
    printf("\n--- 3. Do-While Loop: Guaranteeing At Least 1 Run ---\n");
    int status = 0;
    do {
        printf("Do-while executed! (status is %d, condition check happens after execution)\n", status);
    } while (status > 0);

    return 0;
}
