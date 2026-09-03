# 🐍 Python Programming: Student Learning Journey

A comprehensive, structured curriculum mapping the complete progression of Python mastery—from fundamentals, variables, and operators to control structures, functions, advanced data structures, OOP, exception handling, file I/O, modules, and packages.

---

## 🗺️ Curriculum Architecture

```
Python/Structured_Modules/
├── 01_Fundamentals_Variables_DataTypes/  # Primitive types, dynamic typing, type casting, f-strings
├── 02_Operators/                         # Arithmetic, relational, logical, identity, membership, bitwise
├── 03_Control_Structures/                # if-elif-else, ternary, for/while loops, enumerate, zip
├── 04_Functions/                         # *args, **kwargs, lambda expressions, map, filter, scopes
├── 05_Data_Structures/                   # Lists, Tuples, Sets, Dictionaries & comprehensions
├── 06_Object_Oriented_Programming/       # Classes, inheritance, polymorphism, encapsulation, abstraction
├── 07_Exception_Handling/                # try/except/else/finally, custom user-defined exceptions
├── 08_File_Handling/                     # Context managers, text I/O, JSON serialization & persistence
└── 09_Modules_and_Packages/              # Standard modules, custom packages (__init__.py, helpers)
```

---

## 📂 Detailed Module Index

### 1. 🧱 Fundamentals, Variables & Data Types
* [`01_basics_and_datatypes.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/01_Fundamentals_Variables_DataTypes/01_basics_and_datatypes.py): Variables, dynamic typing, primitive data types (`int`, `float`, `str`, `bool`, `NoneType`), `type()`, and memory object identity via `id()`.
* [`02_type_casting_and_fstrings.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/01_Fundamentals_Variables_DataTypes/02_type_casting_and_fstrings.py): Explicit type conversion, truthy/falsy evaluation, and advanced f-strings with numeric padding and formatting.

### 2. ⚙️ Operators & Expressions
* [`01_arithmetic_relational_logical.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/02_Operators/01_arithmetic_relational_logical.py): Standard & floor division (`/`, `//`), exponentiation (`**`), comparisons, and Boolean logic (`and`, `or`, `not`).
* [`02_identity_membership_bitwise.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/02_Operators/02_identity_membership_bitwise.py): Identity checks (`is`, `is not`), collection membership (`in`, `not in`), and bitwise manipulation (`&`, `|`, `^`, `~`, `<<`, `>>`).

### 3. 🔀 Control Structures & Loops
* [`01_conditionals_if_elif_else.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/03_Control_Structures/01_conditionals_if_elif_else.py): Multi-tier `if-elif-else` grading ladders, ternary expressions, and nested auth flow conditions.
* [`02_loops_and_iteration.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/03_Control_Structures/02_loops_and_iteration.py): `range(start, stop, step)`, `while` loops, `break`, `continue`, `for-else` search pattern, `enumerate()`, and `zip()`.

### 4. 🧩 Functions & Functional Programming
* [`01_function_basics_and_args.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/04_Functions/01_function_basics_and_args.py): Type annotations, docstrings, default arguments, variable positional arguments (`*args`), and keyword arguments (`**kwargs`).
* [`02_lambdas_and_scope.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/04_Functions/02_lambdas_and_scope.py): Anonymous `lambda` functions, `map()`, `filter()`, `sorted(..., key=...)`, and variable scope (`global`, `nonlocal`).

### 5. 📊 Core Data Structures
* [`01_lists_and_comprehensions.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/05_Data_Structures/01_lists_and_comprehensions.py): Mutable sequences, slicing, list mutation methods, and list comprehensions with filters.
* [`02_tuples_and_unpacking.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/05_Data_Structures/02_tuples_and_unpacking.py): Immutable tuples, return packing, multiple variable unpacking, and extended unpacking with `*rest`.
* [`03_sets_and_operations.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/05_Data_Structures/03_sets_and_operations.py): Deduplication, set methods, and mathematical operations (Union `|`, Intersection `&`, Difference `-`, Symmetric Difference `^`).
* [`04_dictionaries_and_methods.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/05_Data_Structures/04_dictionaries_and_methods.py): Key-value hash maps, safe retrieval via `.get()`, `.items()` iteration, and dictionary comprehensions.

### 6. 🏛️ Object-Oriented Programming (OOP)
* [`01_classes_objects_attributes.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/06_Object_Oriented_Programming/01_classes_objects_attributes.py): Class constructors (`__init__`), instance vs class variables, magic methods (`__str__`), `@classmethod`, and `@staticmethod`.
* [`02_inheritance_and_polymorphism.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/06_Object_Oriented_Programming/02_inheritance_and_polymorphism.py): Subclassing, method overriding, `super()` delegation, and polymorphic interfaces.
* [`03_encapsulation_and_abstraction.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/06_Object_Oriented_Programming/03_encapsulation_and_abstraction.py): Private state variables (`__balance`), `@property` getters/setters, and Abstract Base Classes (`abc.ABC`, `@abstractmethod`).

### 7. 🛡️ Exception Handling
* [`01_try_except_finally.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/07_Exception_Handling/01_try_except_finally.py): Safe division guarding with `try`, `except ValueError`, `except ZeroDivisionError`, `else`, and guaranteed `finally` cleanup.
* [`02_custom_exceptions.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/07_Exception_Handling/02_custom_exceptions.py): Creating application-specific custom exceptions (`AuthenticationError`, `InsufficientBalanceError`) and error propagation with `raise`.

### 8. 💾 File Handling & Persistence
* [`01_text_file_io.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/08_File_Handling/01_text_file_io.py): Safe file handling with `with open(...)` context managers, writing (`w`), appending (`a`), and reading (`r`).
* [`02_json_data_persistence.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/08_File_Handling/02_json_data_persistence.py): Serializing dictionaries/lists to JSON (`json.dump`) and deserializing data back to Python structures (`json.load`).

### 9. 📦 Modules and Packages
* [`utility_pkg/`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/09_Modules_and_Packages/utility_pkg): Modular package containing `__init__.py`, `math_helpers.py`, and `string_helpers.py`.
* [`main_runner.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/09_Modules_and_Packages/main_runner.py): Importing standard library modules (`math`, `datetime`, `random`) alongside package imports.
