#include <stdio.h>

int main()
 {
    int hindi, english, science;

    printf("Enter Marks in Hindi, English, and Science: ");
    scanf("%d %d %d", &hindi, &english, &science);

    if (hindi < 0 || hindi > 100 || english < 0 || english > 100 || science < 0 || science > 100)
     {
        printf("Error: Marks should be between 0 and 100.\n");
        return 1;
    }

    int total = hindi + english + science;
    float percentage = (float)total / 3;

    printf("Result: ");
    if (percentage >= 60) 
    {
        printf("First Division\n");
    } else if (percentage >= 40) 
    {
        printf("Second Division\n");
    } else
     {
        printf("Third Division\n");
    }

    return 0;
}

