
#include <stdio.h>

/**
 * 04_constants_and_typecasting.c
 * ------------------------------
 * Demonstrates:
 * - Symbolic constants using #define
 * - Constant variables using const keyword
 * - Implicit type conversion (automatic promotion)
 * - Explicit type casting ((type) expression)
 */

#define PI 3.14159265
#define PASSING_PERCENTAGE 40

int main(void) {
    const int maxDaysInWeek = 7;
    double radius = 5.0;
    double circleArea = PI * radius * radius;

    printf("--- Constants Demonstration ---\n");
    printf("Value of PI:               %.5f\n", PI);
    printf("Max Days in Week (const):  %d\n", maxDaysInWeek);
    printf("Area of Circle (r=5.0):    %.2f\n\n", circleArea);

    // Type Casting Demonstration
    int totalMarks = 425;
    int totalSubjects = 5;

    // Integer division loses fraction: 425 / 5 = 85 (or 426 / 5 = 85 instead of 85.2)
    int studentMarks = 426;
    float wrongAverage = studentMarks / totalSubjects; // integer division!
    float correctAverage = (float)studentMarks / totalSubjects; // explicit casting!

    printf("--- Type Casting Demonstration ---\n");
    printf("Total Marks:   %d in %d subjects\n", studentMarks, totalSubjects);
    printf("Without cast:  %.2f (lost decimal precision!)\n", wrongAverage);
    printf("With cast:     %.2f (accurate fractional percentage)\n", correctAverage);

    return 0;
}
