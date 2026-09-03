#include<stdio.h>
int main()
{
    int k, l;
    printf("please enter any table");
    scanf("%d", &k);

    printf("table of %d: \n" , k);
    for (l = 1; l <= 10; l++)
    {
        printf("%d * %d = %d\n",k,l, k * l);
    }

    return 0;
}