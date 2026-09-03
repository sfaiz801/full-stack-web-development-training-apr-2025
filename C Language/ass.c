#include <stdio.h>

int main()
 {
    int num[5] = {50, 20, 30, 10, 60};
    printf("task-2 sorting numbers in ascending order\n");
    
    
    
    for (int i = 0; i < 5; i++) 
    {
        scanf("%d", &num[i]);
    }
    
    
    for (int i = 0; i < 4; i++) 
     {
        for (int j = 0; j < 4 - i; j++)
         {
            if (num[j] > num[j + 1])
             {
                
                int temp = num[j];
                num[j] = num[j + 1];
                num[j + 1] = temp;
            }
        }
    }
    
    
    printf("Numbers in ascending order:\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", num[i]);
    }
    
    return 0;
}
