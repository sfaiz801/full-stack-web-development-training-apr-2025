#include <stdio.h>

/**
 * 02_switch_case_menu.c
 * ---------------------
 * Demonstrates multi-way branching using switch-case:
 * - switch statement with integer/char expressions
 * - case labels and fall-through prevention using break
 * - default fallback clause
 */

int main(void) {
    int choice = 2; // Simulating user choosing Option 2
    double num1 = 20.0, num2 = 5.0;

    printf("=== Simple Calculator Menu ===\n");
    printf("1. Addition (+)\n");
    printf("2. Subtraction (-)\n");
    printf("3. Multiplication (*)\n");
    printf("4. Division (/)\n");
    printf("Selected Option: %d\n", choice);
    printf("------------------------------\n");

    switch (choice) {
        case 1:
            printf("Result: %.2lf + %.2lf = %.2lf\n", num1, num2, num1 + num2);
            break;
        case 2:
            printf("Result: %.2lf - %.2lf = %.2lf\n", num1, num2, num1 - num2);
            break;
        case 3:
            printf("Result: %.2lf * %.2lf = %.2lf\n", num1, num2, num1 * num2);
            break;
        case 4:
            if (num2 != 0) {
                printf("Result: %.2lf / %.2lf = %.2lf\n", num1, num2, num1 / num2);
            } else {
                printf("Error: Division by zero is undefined!\n");
            }
            break;
        default:
            printf("Error: Invalid choice! Please select 1, 2, 3, or 4.\n");
            break;
    }

    return 0;
}
