#include <stdio.h>

int main() 
{
    int i = 1;
    printf("Please enter 10 numbers:\n");

    
    do 
    {
        printf("%d\n", i++);
        
    } while (i <= 10);
    
    printf("User entered 10 numbers\n");
    
    
    i = 0; 
    do {
        printf("%d", i);
        i++;
    } while (i < 10);
    
    return 0;
}
