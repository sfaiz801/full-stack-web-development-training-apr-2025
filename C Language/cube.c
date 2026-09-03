#include <stdio.h>

int main() 
{
    int number;
    int cube;


    printf("Please enter any 5  number (1, 2, 3, 4, 5): ");
    
    
    scanf("%d", &number);
    
    
    cube = number * number * number;
    

    printf("The cube of %d =  %d\n", number, cube);
    
    return 0;
}
