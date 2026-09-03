#include <stdio.h>

void main() {
    int maximumnumber[5];
    int minimumnumber[5]; 

    printf("Please enter 5 numbers for the maximum array:\n");

    for (int i = 0; i < 5; i++) {
        scanf("%d", &maximumnumber[i]); 
    }

    printf("Please enter 5 numbers for the minimum array:\n");

    for (int j = 0; j < 5; j++) {
        scanf("%d", &minimumnumber[j]); 
    }

    
    printf("Maximum numbers entered: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", maximumnumber[i]);
    }
    printf("\n");

    printf("Minimum numbers entered: ");
    for (int j = 0; j < 5; j++) {
        printf("%d ", minimumnumber[j]);
    }
    printf("\n");
}
