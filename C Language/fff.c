#include <stdio.h>

int main() 
{
    int number[5];
    int multiply = 1;
    printf("Please enter any 5 numbers: ");
    for(int i = 0; i < 5; i++)
     {
        scanf("%d", &number[i]);
        multiply *= number[i];
    }

    printf("The numbers entered are: ");
    for(int i = 0; i < 5; i++)
     {
        printf("%d ", number[i]);
    }
    printf("\nThe multiply of the numbers is: %d\n", multiply);

    return 0;
}