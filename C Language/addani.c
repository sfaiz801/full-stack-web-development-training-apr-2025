#include<stdio.h>
int main()
{
printf("****Task- Sorting Numbers in Ascending Order****\n");
int number[]=(50,20,30,10,60);
int temp=0;

printf("\nList Of Elements: \n");
for(int i=0;i<5;i++)
printf("%d ", number[i]);
}
for(int i=0;i<5;i++)
for(int j=i+1;j<5;j++)
if(number[i]>number[j])
{
temp=number[i];
number[i]=number[j];
number[j]=temp;
}

printf("\n");
printf("\nAscending Order: \n");
for(int i=0;i<5;i++)
{
printf("%d", number[i]);
}
{
printf("\n");

return 0;
}