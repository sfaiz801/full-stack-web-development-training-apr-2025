#include <stdio.h>

/**
 * 02_relational_and_logical.c
 * ---------------------------
 * Demonstrates:
 * - Relational comparison operators: ==, !=, <, >, <=, >=
 * - Boolean logic in C (0 is False, Non-zero is True)
 * - Logical operators: && (AND), || (OR), ! (NOT)
 */

int main(void) {
    int x = 20, y = 10, z = 30;

    printf("--- Relational Operators (x=%d, y=%d) ---\n", x, y);
    printf("Is x equal to y? (x == y):        %d (0=False)\n", x == y);
    printf("Is x not equal to y? (x != y):    %d (1=True)\n", x != y);
    printf("Is x greater than y? (x > y):     %d\n", x > y);
    printf("Is x less than or equal? (x <= y): %d\n\n", x <= y);

    printf("--- Logical Operators (x=%d, y=%d, z=%d) ---\n", x, y, z);
    // AND operator: both conditions must be true
    int isBetween = (x > y) && (x < z);
    printf("(x > y) && (x < z) -> Is 20 between 10 and 30? %d\n", isBetween);

    // OR operator: at least one condition must be true
    int eitherMatches = (x == 5) || (y == 10);
    printf("(x == 5) || (y == 10) -> At least one true?    %d\n", eitherMatches);

    // NOT operator: inverts truth value
    printf("!(x == y) -> Inverting false to true:          %d\n", !(x == y));

    return 0;
}
