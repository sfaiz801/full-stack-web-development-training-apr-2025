#include <stdio.h>

/**
 * 03_user_input_scanf.c
 * ---------------------
 * Demonstrates reading user input from the console using scanf():
 * - Using address-of operator (&)
 * - Reading numbers, floating values, and single characters
 * - Input validation
 */

int main(void) {
    int rollNumber;
    float marks;
    char section;

    printf("Enter Student Roll Number: ");
    if (scanf("%d", &rollNumber) != 1) {
        printf("Invalid input for roll number!\n");
        return 1;
    }

    printf("Enter Marks scored (e.g. 88.5): ");
    if (scanf("%f", &marks) != 1) {
        printf("Invalid input for marks!\n");
        return 1;
    }

    // Space before %c consumes any leftover newline from previous input
    printf("Enter Section (e.g. A, B, C): ");
    scanf(" %c", &section);

    printf("\n=== Student Details Recorded ===\n");
    printf("Roll Number: %d\n", rollNumber);
    printf("Marks:       %.2f\n", marks);
    printf("Section:     %c\n", section);

    return 0;
}
