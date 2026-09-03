#include <stdio.h>

void selectionSort(int arr[], int n) {
    int i, j, min_idx;

    
    for (i = 0; i < n-1; i++) {
        
        min_idx = i;
        for (j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;

        
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}

int main() {
    int num[5] = {50, 20, 30, 10, 60};
    printf("task-2 sorting numbers in ascending order\n");

    for (int i = 0; i < 5; i++) {
        scanf("%d", &num[i]);
    }

    selectionSort(num, 5);

    printf("Numbers in ascending order:\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", num[i]);
    }

    return 0;
}
