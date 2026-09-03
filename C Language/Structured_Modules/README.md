
# 🎓 C Programming: Student Learning Journey

This structured curriculum presents the complete progressive path of learning C programming—from core fundamentals, variables, and operators up to control flow, modular functions, arrays, and string algorithms.

---

## 🗺️ Curriculum Roadmap

```
Structured_Modules/
├── 01_Fundamentals_Variables_DataTypes/   # Anatomy, primitive types, input/output, constants
├── 02_Operators/                          # Arithmetic, relational, logical, bitwise, ternary
├── 03_Control_Structures/                 # if-else, switch-case, loops (for, while, do-while)
├── 04_Functions/                          # Modular design, call by value vs reference, recursion
└── 05_Arrays_and_Strings/                 # 1D/2D arrays, searching, bubble sort, strings & palindrome
```

---

## 📂 Detailed Module Index

### 1. 🧱 Fundamentals, Variables & Data Types
* [`01_hello_world_syntax.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/01_Fundamentals_Variables_DataTypes/01_hello_world_syntax.c): Structure of a C program, preprocessor directives, `main()`, and formatted console output.
* [`02_variables_and_datatypes.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/01_Fundamentals_Variables_DataTypes/02_variables_and_datatypes.c): Primitive types (`int`, `float`, `double`, `char`), format specifiers, and memory sizes via `sizeof`.
* [`03_user_input_scanf.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/01_Fundamentals_Variables_DataTypes/03_user_input_scanf.c): Interactive terminal inputs using `scanf()`, memory addresses (`&`), and input verification.
* [`04_constants_and_typecasting.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/01_Fundamentals_Variables_DataTypes/04_constants_and_typecasting.c): `#define` macros, `const` variables, and explicit type conversion.

### 2. ⚙️ Operators & Expressions
* [`01_arithmetic_and_assignment.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/02_Operators/01_arithmetic_and_assignment.c): Basic arithmetic, modulo (`%`), compound assignments (`+=`, `-=`), and prefix vs postfix (`++x` vs `x++`).
* [`02_relational_and_logical.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/02_Operators/02_relational_and_logical.c): Comparisons (`==`, `!=`, `<`, `>`), and Boolean logic (`&&`, `||`, `!`).
* [`03_bitwise_operators.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/02_Operators/03_bitwise_operators.c): Binary level operations (`&`, `|`, `^`, `~`), and fast bit shifting (`<<`, `>>`).
* [`04_ternary_and_special.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/02_Operators/04_ternary_and_special.c): Conditional ternary operator (`? :`) and comma evaluation operator.

### 3. 🔀 Control Structures & Loops
* [`01_if_else_decision.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/03_Control_Structures/01_if_else_decision.c): Single `if`, `if-else`, and multi-tier `else if` grading ladders.
* [`02_switch_case_menu.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/03_Control_Structures/02_switch_case_menu.c): Multi-way branch calculator menu with `switch`, `case`, `break`, and `default`.
* [`03_loops_iteration.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/03_Control_Structures/03_loops_iteration.c): Counting `for` loop, entry-controlled `while` loop, and exit-controlled `do-while` loop.
* [`04_loop_control_break_continue.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/03_Control_Structures/04_loop_control_break_continue.c): Flow control with `break` (early exit) and `continue` (skip iteration).

### 4. 🧩 Functions & Recursion
* [`01_function_basics.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/04_Functions/01_function_basics.c): Declarations, definitions, parameters, and return types.
* [`02_call_by_value_vs_reference.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/04_Functions/02_call_by_value_vs_reference.c): Call by value vs Call by pointer reference with variable swap demo.
* [`03_recursion_and_math.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/04_Functions/03_recursion_and_math.c): Recursive functions with base cases (Factorial and Fibonacci generation).

### 5. 📊 Arrays & Strings
* [`01_1d_array_operations.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/05_Arrays_and_Strings/01_1d_array_operations.c): 1D array traversal, finding minimum, maximum, and average.
* [`02_linear_and_bubble_sort.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/05_Arrays_and_Strings/02_linear_and_bubble_sort.c): Searching an element via Linear Search and sorting numbers via Bubble Sort.
* [`03_2d_matrices.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/05_Arrays_and_Strings/03_2d_matrices.c): 2D array representation, matrix addition, and nested traversal.
* [`04_string_manipulation.c`](file:///d:/full-stack-web-development-training-apr-2024/C%20Language/Structured_Modules/05_Arrays_and_Strings/04_string_manipulation.c): Null-terminated character arrays, `strlen`, `strcpy`, `strcat`, `strcmp`, and palindrome testing.

---

## ⚡ How to Compile and Run Any File

Using GCC in Windows PowerShell:
```powershell
gcc "01_hello_world_syntax.c" -o hello.exe
.\hello.exe
```
