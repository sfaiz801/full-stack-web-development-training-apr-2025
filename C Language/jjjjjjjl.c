#include <stdio.h>
int main()
 {
int odd[5];
int oddNumbers [5];
int oddarray= 0;

printf("Enter number: \n");

for (int i = 0; i < 5; i++) 
{
scanf("%d", &odd[i]);
}

for (int i = 0; i < 5; i++)
 {
if (odd[i]% 2 != 0)
{ 
    oddNumbers [oddarray] = odd[i]; oddarray++;
}
 }
printf("total numbers: ");
for (int i = 0; i < oddarray; i++)

{
printf("%d ", oddNumbers[i]);
}
return 0;

 }