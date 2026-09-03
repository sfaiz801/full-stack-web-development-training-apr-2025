#include <stdio.h>

/**
 * 02_linear_and_bubble_sort.c
 * ---------------------------
 * Demonstrates:
 * - Linear Search algorithm (finding an element by index)
 * - Bubble Sort algorithm (ordering elements in ascending order)
 */

int main(void) {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 22;

    printf("Original Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n\n");

    // 1. Linear Search
    int foundIndex = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            foundIndex = i;
            break;
        }
    }
    if (foundIndex != -1) {
        printf("--- Linear Search ---\nFound target %d at index %d!\n\n", target, foundIndex);
    } else {
        printf("--- Linear Search ---\nTarget %d not found in array.\n\n", target);
    }

    // 2. Bubble Sort (Ascending)
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    printf("--- Bubble Sort Result (Ascending) ---\nSorted Array:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    return 0;
}
