#include <stdio.h>

int main() {
    int arr[10] = {1, 2, 3, 2, 4, 5, 4, 6, 7, 6}; 
    int size = 10;
    int count[100] = {0};


    for (int i = 0; i < size; i++) {
        count[arr[i]]++;
    }

    printf("Duplicate numbers are: ");
    for (int i = 0; i < 100; i++) {
        if (count[i] > 1) {
            printf("%d ", i);
        }
    }
    printf("\n");

    return 0;
}
