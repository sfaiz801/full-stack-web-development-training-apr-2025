#include<stdio.h>

int main()
 {
    int rollNumber;
    int totalSubjects;
    int marks[3]; 
    float averagemarks;
    

    printf("Enter Roll Number: ");
    scanf("%d", &rollNumber);

     printf("Enter total number of subjects: ");
    scanf("%d", &totalSubjects);

    printf("Enter marks for Subject 1 biology: ");
    scanf("%d", &marks[0]);

    printf("Enter marks for Subject 2 physics: ");
    scanf("%d", &marks[1]);

    printf("Enter marks for Subject 3 chemistry: ");
    scanf("%d", &marks[2]);
    
    int totalMarks = marks[0] + marks[1] + marks[2];
    float averageMarks = (float)totalMarks / totalSubjects;
     printf("Total marks for Number %d: %d\n", rollNumber, totalMarks);
    printf("Average marks: %.2f \n", averageMarks);

    return 0;
}



 


