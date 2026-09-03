#include <stdio.h>

#include <string.h>

void reverse(void)

{

char name [20];

printf("Please enter your back name: ");

scanf("%s", name);

for (int i = strlen(name) - 1; i >= 0; i--)

{

printf("%c", name[i]);

}

printf("\n");

}

int main()

{

reverse();

return 0;
}