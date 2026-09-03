#include <stdio.h>
#include <string.h>

/**
 * 04_string_manipulation.c
 * ------------------------
 * Demonstrates string operations in C:
 * - Strings as null-terminated ('\0') character arrays
 * - Standard string functions: strlen, strcpy, strcat, strcmp
 * - Checking if a word is a Palindrome (reads same forwards and backwards)
 */

int isPalindrome(const char *str) {
    int left = 0;
    int right = strlen(str) - 1;

    while (left < right) {
        if (str[left] != str[right]) {
            return 0; // Not a palindrome
        }
        left++;
        right--;
    }
    return 1; // Is a palindrome
}

int main(void) {
    char greeting[50] = "Hello";
    char name[] = " Developer";
    char copy[50];

    printf("--- Standard String Functions (<string.h>) ---\n");
    printf("Original: '%s' (Length: %zu)\n", greeting, strlen(greeting));

    // String copy: strcpy(dest, src)
    strcpy(copy, greeting);
    printf("Copied:   '%s'\n", copy);

    // String concatenation: strcat(dest, src)
    strcat(greeting, name);
    printf("Concat:   '%s'\n", greeting);

    // String comparison: strcmp(str1, str2)
    printf("Comparing '%s' with 'Hello': %d (non-zero means different)\n\n", greeting, strcmp(greeting, "Hello"));

    // Palindrome check
    printf("--- Palindrome Word Checker ---\n");
    char word1[] = "madam";
    char word2[] = "program";

    printf("Word '%s': %s\n", word1, isPalindrome(word1) ? "Palindrome! (Reads same backwards)" : "Not a Palindrome");
    printf("Word '%s': %s\n", word2, isPalindrome(word2) ? "Palindrome!" : "Not a Palindrome");

    return 0;
}
