#include<stdio.h>

void naturalnumber();
void testing(int x);

int main()
{
    naturalnumber();
     return 0;
}
void naturalnumber()
{
    int number;
    printf("please enter any number");
    scanf("%d",&number);
    if("number>=0 && number<=9")
    {
        printf("this is naturalnumber");
    }
    else
    {
        printf("this is normalnumber");
    }
    testing(number);
}
void testing(int x)
{
    if(x>0)
    {
        printf("this is a positive number");
    }
    else
    {
        printf("this is a nagative number");
    }

}

