#include <stdio.h>

int main()
 {
    int hindi, english, science, percentage = 0;

    printf("Please Enter Marks in Hindi: ");
    scanf("%d", &hindi);
    printf("Please Enter Marks in English: ");
    scanf("%d", &english);
    printf("Please Enter Marks in Science: ");
    scanf("%d", &science);

    if ((hindi <= 100 && hindi >= 0) && (english <= 100 && english >= 0) && (science <= 100 && science >= 0))
     {
        percentage = (hindi + english + science) * 100 / 300;

        printf("\nResult: ");
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
    } else

    {
        printf("Error: Please Enter Correct Marks. Each Subject Marks should be between 0-100.\n");
    }

    return 0;
}
