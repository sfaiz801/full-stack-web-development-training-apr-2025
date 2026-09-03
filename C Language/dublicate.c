/*#include<stdio.h>

int main()
{
    int arr[10] = {1, 2, 3, 2, 4, 5, 4, 6, 7, 6};

    printf("dublicate number  are:");

     for (int i = 0; i < 10; i++)

     printf("\n");

     return 0;
    
}
*/


#include <stdio.h>

int main() {
    int arr[10] = {1, 2, 3, 2, 4, 5, 4, 6, 7, 6};
    int size = 10;
    int count[10] = {0}; // Assuming the numbers are in the range 0-9

    // Count occurrences of each number
    for (int i = 0; i < size; i++) {
        count[arr[i]]++;
    }

    printf("Duplicate numbers are:");

    // Print duplicates
    for (int i = 0; i < 10; i++) {
        if (count[i] > 1) {
            printf(" %d", i);
        }
    }

    printf("\n");

    return 0;
}
