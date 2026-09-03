#include <stdio.h>

int subtration(int num1, int num2)
{
    return num1 - num2;
}
void main()
{
    int firstnumber; 
    int secondnumber;
    int result = 0;
    printf("please enter first number");
    scanf("%d", &firstnumber);
    printf("please enter second number");
    scanf("%d", &secondnumber);
    result = subtration (firstnumber, secondnumber);
    printf("substract of two number is %d", result);
    }