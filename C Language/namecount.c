#include<stdio.h>
#include<string.h>

int main ()
{
    char name [10];
    printf("please enter your name ");
    scanf("%s", &name);

    printf("my name is %s",name);
    int count=0;
    for(int i=0;i<strlen(name);i++)
    {
        count++;

    }
    printf("\n my name lenght is : %d",count);
}
