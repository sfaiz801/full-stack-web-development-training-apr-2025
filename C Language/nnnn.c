#include<stdio.h>

void main()
{
    int number[5];
    int odd = 0;


    printf("Please enter any 5 numbers:\n");

    for(int i = 0; i < 5; i++)
    {
        scanf("%d", &number[i]);
    }

    printf("The odd numbers are : \n");

    for(int i = 0; i < 5; i++)
    {
        if(number[i] % 2 != 0)
        {
            printf("%d ", number[i]);
            odd++;
        }
    }
    

}