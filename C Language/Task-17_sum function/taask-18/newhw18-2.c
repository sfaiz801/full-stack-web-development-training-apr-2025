#include <stdio.h>

int main() 
{
    int studentrollno[2];
    char studentname[2][10];
    char studentaddress[2][20];

    for(int i = 0; i < 2; i++) 
    {
        printf("\n*** %d Student ***\n", i + 1);
        printf("Please Enter Student Roll Number: ");
        scanf("%d", &studentrollno[i]);
        
        printf("Please Enter Student Name: ");
        scanf("%s", studentname[i]);
        
        printf("Please Enter Student Address: ");
        scanf("%s", studentaddress[i]);
    }

    printf("\n****** Student Details Are *******\n");
    for(int i = 0; i < 2; i++)
     {
         printf("\n****** Student Details Are *******\n");
        printf("\nStudent Roll Number: %d", studentrollno[i]);
        printf("\nStudent Name: %s", studentname[i]);
        printf("\nStudent Address: %s\n", studentaddress[i]);
    }

    return 0;
}
