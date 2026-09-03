#include <stdio.h>

int main() 
{
    int numbers[5]; 
    int cubes[5];   
    int i;

    
    printf("Please enter 5 number ");
    
    
    for(i = 0; i < 5; i++) 
    {
        scanf("%d", &numbers[i]);
    }
    
    
    for(i = 0; i < 5; i++)
     {
        cubes[i] = numbers[i] * numbers[i] * numbers[i];
    }

    
    for(i = 0; i < 5; i++) 
    {
        printf("The cube of %d = %d\n", numbers[i], cubes[i]);
    }
    
    return 0;
}
