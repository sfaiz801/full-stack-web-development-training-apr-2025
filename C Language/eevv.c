#include <stdio.h>

void printEvenNumbers(int arr[], int count)
 {
    printf("Total even numbers :");
    for (int j = 0; j < count; j++)
     {
        printf("%d ", arr[j]);
    }
    printf("\n");
}

int main() 
{
    int arr[5];
    int arreven[5];
    int count = 0;

    printf("Enter numbers: ");
    for (int i = 0; i < 5; i++)
     {
        scanf("%d", &arr[i]);
    }

    for (int j = 0; j < 5; j++)
     {
        if (arr[j] % 2 == 0) 
        {
            arreven[count] = arr[j];
            count++;
        }
    }

    printEvenNumbers(arreven, count);

    return 0;
}