#include <stdio.h>

void main()
{
    int firstnumber[5];
    int secondnumber[5];

    printf("Please enter any 5 numbers:\n");

    for (int i = 0; i < 5; i++)
    {
        scanf("%d", &firstnumber[i]);
    }

    for (int j = 0; j < 5; j++)
    {
        secondnumber[j] = firstnumber[j];
    }

    printf("The numbers in the first array are:\n");

    for (int k = 0; k < 5; k++)
    {
        printf("%d ", secondnumber[k]);
    }

    printf("\n\nThe numbers in the second array are:");

    for (int l = 0; l < 5; l++)
    {
        printf("%d ", secondnumber[l]);
    }

    

}
