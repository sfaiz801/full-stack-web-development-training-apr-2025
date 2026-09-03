#include <stdio.h>
int Add(int num1,int num2);
int subtraction(int num1,int num2);
int multiply(int num1,int num2);
int divide(int num1,int num2);

int main()
{

    int firstnumber ,secondnumber;
    int tasknumber;
    int output=0;

   
    printf("1- press 1 for addition\n");
    printf("2- press 2 for subtraction\n");
    printf("3- press 3 for multiply\n");
    printf("4- press 4 for divide\n");

    printf("please enter any two number:\t");
    scanf("%d %d", &firstnumber,&secondnumber);

    printf("\n please enter task number:\n");
    scanf("%d",&tasknumber);

    if(tasknumber==1)
    {
        output=Add(firstnumber,secondnumber);
        printf("\n output Is: %d",output);

    }
    else if(tasknumber==2)
    {
        output=subtraction(firstnumber,secondnumber);
        printf("\n output Is: %d",output);
    }
    else if(tasknumber==3)
    {
         output=multiply(firstnumber,secondnumber);
        printf("\n output Is: %d",output);
    }
    else if(tasknumber==4)
    {
         output=divide(firstnumber,secondnumber);
        printf("\n output Is: %d",output);
    }
    else
    {

        printf("this is not correct task number,please run code agian");

    }
    return 0;


}
int add(int num1,int num2)
{
    return num1+num2;

}
int subtraction(int num1,int num2)
{
    return num1-num2;
}
int multiply(int num1,int num2)
{
    return num1*num2;
}
int divide(int num1,int num2)
{
     return num1/num2;
}


