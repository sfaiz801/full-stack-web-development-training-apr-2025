#include <stdio.h>

int main()
 {
    int rollNumbers[2];
    char names[2][100];
    char addresses[2][100];

    for (int j = 0; j < 2; j++)
     {
        printf("Please enter student %d roll number: ", j+1);
        scanf("%d", &rollNumbers[j]);
    

        printf("Please enter student %d name: ", j+1);
        fgets(names[j], sizeof(names[j]), stdin);
        names[j][strcspn(names[j], "\n")] = 0;

        printf("Please enter student %d address: ", j+1);
        fgets(addresses[j], sizeof(addresses[j]), stdin);
        addresses[j][strcspn(addresses[j], "\n")] = 0;
    }

    for (int j = 0; j < 2; j++)
     {
        printf("\n Student %d roll number: %d", j+1, rollNumbers[j]);
        printf("\n Student %d name: %s", j+1, names[j]);
        printf("\n Student %d address: %s\n", j+1, addresses[j]);
    }

    return 0;
}
