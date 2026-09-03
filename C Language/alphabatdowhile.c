#include <stdio.h>

int main() 
{
    char i = 'a'; 
    
    do 
    {
        printf("%c \t", i); 
        i++; 
    } while (i <= 'z');  
    
    return 0;
}
