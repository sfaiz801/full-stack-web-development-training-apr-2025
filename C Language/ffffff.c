#include <stdio.h>

void Numbers(int numbers[], int size)
 {
    int multiply = 1;
    int sum = 0; 
    printf("The numbers entered are: ");
    for(int i = 0; i < size; i++) 
    {
        printf("%d ", numbers[i]);
        multiply *= numbers[i];
        sum += numbers[i];
    }
    printf("\nThe multiply of the numbers is: %d\n", multiply);
    printf("The sum of the numbers is: %d\n", sum);
}

int main()
 {
    int numbers[5];
    printf("Please enter any 5 numbers: ");
    for(int i = 0; i < 5; i++)
     {
        scanf("%d", &numbers[i]);
    }
    Numbers(numbers, 5); 
    return 0;
}
