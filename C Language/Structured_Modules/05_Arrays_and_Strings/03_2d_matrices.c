#include <stdio.h>

/**
 * 03_2d_matrices.c
 * ----------------
 * Demonstrates two-dimensional arrays (Matrices):
 * - Matrix initialization
 * - Matrix Addition: C[i][j] = A[i][j] + B[i][j]
 * - Matrix Transpose: T[j][i] = A[i][j]
 */

int main(void) {
    int matA[2][2] = {{1, 2}, {3, 4}};
    int matB[2][2] = {{5, 6}, {7, 8}};
    int sum[2][2];

    printf("--- Matrix A (2x2) ---\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", matA[i][j]);
        }
        printf("\n");
    }

    printf("\n--- Matrix B (2x2) ---\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", matB[i][j]);
        }
        printf("\n");
    }

    // Matrix Addition
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            sum[i][j] = matA[i][j] + matB[i][j];
        }
    }

    printf("\n--- Matrix Addition (A + B) ---\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%2d ", sum[i][j]);
        }
        printf("\n");
    }

    return 0;
}
