#include <stdio.h>

/**
 * 01_hello_world_syntax.c
 * -----------------------
 * Demonstrates the basic anatomy of a C program:
 * - Preprocessor directive (#include)
 * - Standard Input/Output library (<stdio.h>)
 * - Main entry point (int main())
 * - Escape sequences (\n)
 * - Return status code (return 0)
 */

int main(void) {
    // printf() prints formatted output to the standard console
    printf("==========================================\n");
    printf("  Welcome to C Programming Fundamentals!  \n");
    printf("==========================================\n");
    printf("Hello, World! I am learning C programming.\n");
    printf("This program demonstrates basic structure and output.\n");

    // Returning 0 signals successful execution to the operating system
    return 0;
}
