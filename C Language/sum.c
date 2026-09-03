#include <stdio.h>

int sum(int num1, int num2)
{
    return num1 + num2;
}
void main()
{
    int firstnumber;
    int secondnumer;;
    int result = 0;
    printf("please enter first number");
    scanf("%d", &firstnumber);
    printf("please enter secondnumber ");
    scanf("%d", &secondnumer);
    result = sum(firstnumber , secondnumer);
    printf("sum of tow number is %d", result);    
}