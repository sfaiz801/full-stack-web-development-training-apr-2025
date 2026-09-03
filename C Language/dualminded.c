#include<stdio.h>
#include<string.h>

int main()
 {
    char name[10];
    char character;
    int flag = 0;

    printf("Please Enter Any Name: ");
    scanf("%s", name);  

    printf("Please Enter Any Character: ");
    scanf(" %c", &character); 
    
    int length = strlen(name);

    for (int i = 0; i < length; i++)
     {
        if (name[i] == character)
         {
            flag = 1;
            break; 
        }
    }

    if (flag == 1) 
    {
        printf("Character '%c' found in the name.\n", character);

    } else

     {
        printf("Character '%c' not found in the name.\n", character);
    }

    return 0;
}
