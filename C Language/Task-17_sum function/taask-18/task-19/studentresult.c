#include <stdio.h>
int main()
{
    int marks[3];
    int sum=0;
    float average=0;

    printf("\n Please Enter English Marks : ");
    scanf("%d", &marks[0]);
    printf("\n Please Enter Hindi Marks : ");
    scanf("%d", &marks[1]);
    printf("\n Please Enter Science Marks : ");
    scanf("%d", &marks[2]);

    sum = marks[0] + marks[1] + marks[2];
    for(int i=0; i<99; i++)
   {
   average = sum / 3.0;

    printf("\nSum of marks: %d", sum);
    printf("\nAverage of marks: %.2f", average);
 
   }


return 0;
}
