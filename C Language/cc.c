#include <stdio.h>

int main()
 {
    int arr[5];
    int arrodd[5];
    int count = 0;

    printf("Enter numbers: ");
    for (int i = 0; i < 5; i++)
     {
        scanf("%d", &arr[i]);
    }

    for (int j = 0; j < 5; j++) 
    {
        if (arr[j] % 2 != 0)
         {
            arrodd[count] = arr[j];
            count++;
        }
    }

    printf("Total odd numbers: %d\n", count);
    for (int j = 0; j < count; j++) 
    {
        printf("Odd number %d: %d\n", j + 1, arrodd[j]);
    }

    return 0;
}