#include <stdio.h>

/**
 * 04_loop_control_break_continue.c
 * --------------------------------
 * Demonstrates loop jump / flow alteration statements:
 * - break: immediately terminates the nearest enclosing loop
 * - continue: skips the remaining statements of the current iteration
 */

int main(void) {
    // 1. BREAK: Stop loop when target is found
    printf("--- 1. Break Statement: Stop loop when searching for 7 ---\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 7) {
            printf("Target 7 reached! Breaking out of the loop.\n");
            break;
        }
        printf("Visiting number: %d\n", i);
    }

    // 2. CONTINUE: Skip odd numbers, only process evens
    printf("\n--- 2. Continue Statement: Print only Even Numbers between 1 and 10 ---\n");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 != 0) {
            // Skips printing for odd numbers
            continue;
        }
        printf("Even number: %d\n", i);
    }

    return 0;
}
