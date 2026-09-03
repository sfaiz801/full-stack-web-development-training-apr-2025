#include <stdio.h>
int main()
{
    int number[10];

    printf("please enter 10 number");

    for(int i=0; i<10; i++)

    {
        scanf("%d",&number[i]);
    }
    for(int j=9; j>=0; j--)

    {
        printf("%d", number[j]);
    }

    return 0;


    
    
}