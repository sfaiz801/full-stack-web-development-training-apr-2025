#include<stdio.h>
void main()
{
    int number[5];
    int max, min;

      printf("\n Please enter 5 numbers for the maximum array");

    for(int i=0; i < 5; i++)
    {
        scanf("%d", &number[i]);
    }
    min=max=number[0];
for(int a=1; a<5; a++)

{

    if (number[a]<min)
    {
        min=number[a];
    }
    if(number[a]>max)
    {
        max=number[a];
    }   
}
printf("User Entered Number :");
for(int b=0; b<5; b++)
{
    printf("%d,", number[b]);
}
printf("\n Minimum : %d\n", min);
printf("Maximum : %d\n", max);
}
