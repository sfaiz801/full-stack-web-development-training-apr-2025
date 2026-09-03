#include <stdio.h>

int main() 
{
    int number[5];
    int sum = 0;
    printf("Please enter any 5 numbers: ");
    for(int i = 0; i < 5; i++)
     {
        scanf("%d", &number[i]);
        sum += number[i];
    }

    printf("The numbers entered are: ");
    for(int i = 0; i < 5; i++)
     {
        printf("%d ", number[i]);
    }
    printf("\nThe sum of the numbers is: %d\n", sum);

    return 0;
}