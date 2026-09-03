#include <stdio.h>

int main()
 {
    int arr[10];
   // int size = 10

   int lenth =sizeof(arr)/sizeof(arr[0]);
   printf("lenth of arry is %d ", lenth);
    int count[10] = {0};

    
    printf("\n Enter 10 numbers: ");
    for (int i = 0; i < lenth; i++) 
    {
        scanf("%d", &arr[i]);
    }

    
    for (int i = 0; i < lenth; i++) 
    {
        count[arr[i]]++;
    }

    
    printf("\n Duplicate numbers are: ");
    for (int i = 0; i < 10; i++)
     {
        if (count[i] > 1)

         {
            printf("\n count i %d", count[i]);
            printf("\n %d ", i);

        }
    }
    printf("\n");

    return 0;
}