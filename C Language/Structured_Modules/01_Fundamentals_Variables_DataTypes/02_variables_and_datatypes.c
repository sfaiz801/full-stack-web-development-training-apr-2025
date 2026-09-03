#include <stdio.h>

/**
 * 02_variables_and_datatypes.c
 * ----------------------------
 * Demonstrates primitive data types, memory sizes, and format specifiers:
 * - int (%d)
 * - float (%f)
 * - double (%lf)
 * - char (%c)
 * - sizeof operator for checking byte sizes
 */

int main(void) {
    // Variable declarations and initializations
    int studentAge = 22;
    float courseFee = 45000.50f;
    double exactCgpa = 9.456789;
    char gradeLetter = 'A';

    printf("--- C Primitive Data Types ---\n");
    printf("Student Age:       %d years  (Size: %zu bytes)\n", studentAge, sizeof(studentAge));
    printf("Course Fee:        Rs. %.2f (Size: %zu bytes)\n", courseFee, sizeof(courseFee));
    printf("Exact CGPA:        %.6lf (Size: %zu bytes)\n", exactCgpa, sizeof(exactCgpa));
    printf("Final Grade:       '%c'       (Size: %zu byte)\n", gradeLetter, sizeof(gradeLetter));

    printf("\n--- Memory Size Summary of Data Types ---\n");
    printf("sizeof(short):     %zu bytes\n", sizeof(short));
    printf("sizeof(int):       %zu bytes\n", sizeof(int));
    printf("sizeof(long):      %zu bytes\n", sizeof(long));
    printf("sizeof(float):     %zu bytes\n", sizeof(float));
    printf("sizeof(double):    %zu bytes\n", sizeof(double));
    printf("sizeof(char):      %zu byte\n", sizeof(char));

    return 0;
}
