#include <stdio.h>

int main()
 {
    int studentrollno[2];
    char studentname[2][10];
    char studentaddress[2][20];
    int count = 0;

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
        count++;
        printf("\n*** %d Student Details ***\n", count);
        printf("Student Roll Number: %d\n", studentrollno[i]);
        printf("Student Name: %s\n", studentname[i]);
        printf("Student Address: %s\n", studentaddress[i]);
    }

    return 0;


    
}
