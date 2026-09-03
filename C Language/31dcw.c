#include <stdio.h>

int main()
 {
    int num[10];

    
    printf("Enter any 10 numbers: ");
    for (int i = 0; i < 10; i++)
     {
        scanf("%d", &num[i]);
    }

    
    printf("Positive Numbers: ");
    for (int i = 0; i < 10; i++) 
    {
        if (num[i] > 0)
         {
            printf("%d ", num[i]);
        }
    }
    printf("\n");


    printf("Negative Numbers: ");
    for (int i = 0; i < 10; i++)
     {
        if (num[i] < 0)
         {
            printf("%d ", num[i]);
        }
    }
    printf("\n");

    return 0;
}
