#include<stdio.h>

int main()

{

int i, n, start, end, r, sum=0;

printf("Enter start number:");

scanf("%d", &start);

printf("Enter end number:");

scanf("%d",&end);

printf("\nPalindrome Number Series:\n"); 

for(i=start; i<=end; i++)

{

sum=0;

n=i;

while(n != 0)

{

r = n % 10;

sum=(sum*10) + r;

n = n / 10;

}

if(i == sum)

{

printf("%d ",i);

}

}

return 0;

}