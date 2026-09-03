#include <stdio.h>

void even(int f[5]);

int main() 
{
    int num[5];

    printf("Please enter 5 numbers: ");
    for(int i = 0; i < 5; i++)
     {
        scanf("%d", &num[i]);
    }

    printf("Original numbers: ");
    for(int j = 0; j < 5; j++)
     {
        printf("%d ", num[j]);
    }
    printf("\n");

    even(num);

    return 0;
}

void even(int f[5])
 {
    int evenNumber[5];
    int arrye = 0;

    for(int i = 0; i < 5; i++) 
    {
        if(f[i] % 2 == 0) 
        {
            evenNumber[arrye] = f[i];
            arrye++;
        }
    }

    printf("Even numbers: ");
    for(int k = 0; k < arrye; k++)
     {
        printf("%d ", evenNumber[k]);
    }
    printf("\n");
}
