#include <stdio.h>

int main() 
{
    int j[10];
    int k = 0;

    printf("Please enter 10 numbers:\n");

    
    do
    {
        scanf("%d", &j[k]);
        k++;
    } while (k < 10);

    
    k = 0;

    do
    {
        printf("Number is %d\n", j[k]);
        k++;
    } while (k < 10);

    return 0;
}
