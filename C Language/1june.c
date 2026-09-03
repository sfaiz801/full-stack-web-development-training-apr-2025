#include <stdio.h>

int main()
 {
    char name[10];
    printf("Please enter your name: ");
    scanf("%s", name); 

    printf("My name is %s\n", name);

    int count = 0;
    while (name[count] != '\0') 
    {
        count++;
    }
    
    printf("My name length is: %d\n", count);

    return 0;
}

