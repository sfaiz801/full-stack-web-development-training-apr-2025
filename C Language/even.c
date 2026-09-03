#include <stdio.h>

int main() 
{
    int arr[5];
    int even_count = 0;
    
    printf("Enter numbers: ");
    for (int i = 0; i < 5; i++) 
    {
        scanf("%d", &arr[i]);
        if (arr[i] % 2 == 0)
         {
            even_count++;
        }
    }
    
    printf("Total even numbers: %d\n", even_count);
    
    int even_arr[even_count];
    int even_index = 0;
    
    for (int i = 0; i < 5; i++)
     {
        if (arr[i] % 2 == 0)
         {
            even_arr[even_index++] = arr[i];
        }
    }
    
    for (int i = 0; i < even_count; i++)
     {
        printf("Even number %d: %d\n", i + 1, even_arr[i]);
    }
    
    return 0;
}