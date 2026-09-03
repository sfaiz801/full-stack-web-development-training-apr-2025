/*#include <stdio.h>

int main()
 {
    char names1[3][100]; 
    char names2[3][100];

    printf("Please enter any 3 names for the first array:\n");
    for (int a = 0; a < 3; a++) 
    {
        printf("Enter name %d: ", a + 1);
        scanf("%s", names1[a]);
    }

    printf("Please enter any 3 names for the second array:\n");
    for (int a = 0; a < 3; a++)
     {
        printf("Enter name %d: ", a + 1);
        scanf("%s", names2[a]);
    }

    printf("\nArray one Entered Names:\n");
    for (int b = 0; b < 3; b++)
     {
        printf("%s\n", names1[b]);
    }

    printf("\nArray two Entered Names:\n");
    for (int b = 0; b < 3; b++)
     {
        printf("%s\n", names2[b]);
    }

    return 0;
}*/

#include <stdio.h>
#include <string.h>

int main() {
    char names1[3][100]; 
    char names2[3][100]; 

    printf("Please enter any 3 names for the first array:\n");
    for (int a = 0; a < 3; a++)
     {
        printf("Enter name %d: ", a + 1);
        scanf("%s", names1[a]);
    }

    
    for (int a = 0; a < 3; a++) 
    {
        strcpy(names2[a], names1[a]);
    }

    printf("\nArray one Entered Names:\n");
    for (int b = 0; b < 3; b++) 
    {
        printf("%s\n", names1[b]);
    }

    printf("\nArray two Copy Names:\n");
    for (int b = 0; b < 3; b++) 
    {
        printf("%s\n", names2[b]);
    }

    return 0;
}

