#include <stdio.h>

/**
 * 01_1d_array_operations.c
 * ------------------------
 * Demonstrates:
 * - One-dimensional array declaration and initialization
 * - Traversal using loops
 * - Finding Maximum, Minimum, and Average elements
 */

int main(void) {
    int numbers[] = {34, 78, 12, 89, 55, 91, 23};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Array Elements (%d items): ", size);
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    int min = numbers[0];
    int max = numbers[0];
    int sum = 0;

    for (int i = 0; i < size; i++) {
        if (numbers[i] < min) min = numbers[i];
        if (numbers[i] > max) max = numbers[i];
        sum += numbers[i];
    }

    double average = (double)sum / size;

    printf("-------------------------------\n");
    printf("Minimum Value: %d\n", min);
    printf("Maximum Value: %d\n", max);
    printf("Total Sum:     %d\n", sum);
    printf("Average:       %.2lf\n", average);

    return 0;
}
