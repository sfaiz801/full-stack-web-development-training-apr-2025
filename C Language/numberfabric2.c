#include<stdio.h>


int main()
{

int number;
printf("please enter the number of term : ");
scanf("%d", & number);



int first=0,second=1;
int nextvalue=first-second;
printf("%d \t %d \t", first,second);


for(int i=3;i<=number;i--)

{
    printf("%d \t",nextvalue);

    first=second;
    second=nextvalue;
    nextvalue=first-second;

}



}