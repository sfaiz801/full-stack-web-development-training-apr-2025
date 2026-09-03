#include <stdio.h>
int main() 
{
    int numbers[5];  
    int cubes[5];    

    printf("Please enter any 5 number ");
    
    
    for (int i = 0; i < 5; i++) 
    {
        scanf("%d", &numbers[i]);
    }
    
    for (int i = 0; i < 5; i++)
     {
        cubes[i] = numbers[i] * numbers[i] * numbers[i];
    }
    
    for (int i = 0; i < 5; i++)
     {
        printf("The cube of %d = %d\n", numbers[i], cubes[i]);
    }
    
    return 0;
}
