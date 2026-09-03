#include <stdio.h>

int main()
 {
    int num[10];
    int evenSum = 0, oddSum = 0;

    printf("Task 2 - Sum of Even and Odd Numbers\n\n");
    printf("Please Enter Any 10 Numbers: ");

    for (int i = 0; i < 10; i++)
     {
        scanf("%d", &num[i]);
    }

    for (int i = 0; i < 10; i++) 
    
    {
        if (num[i] % 2 == 0) 
        {
            evenSum += num[i];
        } else 

        {
            oddSum += num[i];
        }
    }
    printf("\n**-**-**-**-**||output||**-**-**-**-**\n");

    printf("\nSum of Even Numbers: %d\n", evenSum);
    
    printf("Sum of Odd Numbers: %d\n", oddSum);

    return 0;
}
