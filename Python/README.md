# 🐍 Python Practice & Project Repository

This folder contains a complete, progressive Python curriculum mapping each student's journey from fundamentals, variables, and operators up to OOP, exceptions, file handling, modules, and packages, alongside real-world projects and tasks.

---

## 🌟 Structured Student Learning Curriculum: [`Structured_Modules/`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules)

| Module | Directory | Topics Covered | Key Scripts |
|--------|-----------|----------------|-------------|
| **1** | [`01_Fundamentals_Variables_DataTypes`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/01_Fundamentals_Variables_DataTypes) | Primitive types (`int`, `float`, `str`, `bool`, `None`), `type()`, `id()`, typecasting, f-strings | `01_basics_and_datatypes.py`, `02_type_casting_and_fstrings.py` |
| **2** | [`02_Operators`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/02_Operators) | Arithmetic, floor division (`//`), exponent (`**`), comparisons, logical, identity (`is`), membership (`in`), bitwise | `01_arithmetic_relational_logical.py`, `02_identity_membership_bitwise.py` |
| **3** | [`03_Control_Structures`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/03_Control_Structures) | Decision ladders (`if-elif-else`), ternary, `for` with `range()`, `while`, `break`/`continue`, `enumerate()`, `zip()` | `01_conditionals_if_elif_else.py`, `02_loops_and_iteration.py` |
| **4** | [`04_Functions`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/04_Functions) | Type hints, `*args`, `**kwargs`, anonymous `lambda`, `map()`, `filter()`, scopes (`global`, `nonlocal`) | `01_function_basics_and_args.py`, `02_lambdas_and_scope.py` |
| **5** | [`05_Data_Structures`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/05_Data_Structures) | Lists (comprehensions, slicing), Tuples (unpacking), Sets (union, intersection), Dictionaries (methods, `.items()`) | `01_lists_and_comprehensions.py`, `02_tuples_and_unpacking.py`, `03_sets_and_operations.py`, `04_dictionaries_and_methods.py` |
| **6** | [`06_Object_Oriented_Programming`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/06_Object_Oriented_Programming) | Classes, objects, `__init__`, `@classmethod`, `@staticmethod`, Inheritance, Polymorphism, Encapsulation & Abstraction | `01_classes_objects_attributes.py`, `02_inheritance_and_polymorphism.py`, `03_encapsulation_and_abstraction.py` |
| **7** | [`07_Exception_Handling`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/07_Exception_Handling) | `try`, `except`, `else`, `finally`, handling specific exceptions, custom user-defined exceptions with `raise` | `01_try_except_finally.py`, `02_custom_exceptions.py` |
| **8** | [`08_File_Handling`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/08_File_Handling) | Context managers (`with open`), read/write/append modes, JSON serialization/deserialization (`json.dump`, `json.load`) | `01_text_file_io.py`, `02_json_data_persistence.py` |
| **9** | [`09_Modules_and_Packages`](file:///d:/full-stack-web-development-training-apr-2024/Python/Structured_Modules/09_Modules_and_Packages) | Standard library modules (`math`, `datetime`, `random`), custom package creation (`utility_pkg/__init__.py`), imports | `utility_pkg/`, `main_runner.py` |

---

## 🌟 Major Project: [Red Heaven Restaurant Management System](file:///d:/full-stack-web-development-training-apr-2024/Python/restaurant)
A comprehensive, multi-role restaurant management application with 3 user roles:
1. **Admin**: Profile management, employee hiring/records, financial reports, menu configuration.
2. **Staff**: Order processing, table reservations, live billing, and kitchen updates.
3. **Customer**: Authentication (Login/Signup), browsing food menu, placing dining/takeaway orders, and bill generation.
- **Source Code**: [`Python/restaurant/`](file:///d:/full-stack-web-development-training-apr-2024/Python/restaurant)
- **Run**: `cd restaurant; python main.py`

---

## 📂 Project Index (25 Practice Files)

| # | File Name | Topics Covered | Description |
|---|-----------|----------------|-------------|
| 1 | [`01_date_time_digital_clock.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/01_date_time_digital_clock.py) | `datetime`, `time`, `os` | Live console digital clock, date formatting, and days-until calculation. |
| 2 | [`02_stopwatch_and_timer.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/02_stopwatch_and_timer.py) | `time`, formatted output | Stopwatch with lap recorder and a countdown timer. |
| 3 | [`03_scientific_calculator.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/03_scientific_calculator.py) | `math`, functions, exceptions | Arithmetic, trigonometry, powers, roots, logs, and calculation history. |
| 4 | [`04_student_management_system.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/04_student_management_system.py) | CRUD, JSON, dictionaries | Add, search, view, update, delete students and auto-grade calculation. |
| 5 | [`05_todo_list_manager.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/05_todo_list_manager.py) | Lists, JSON persistence | Task planner with priorities, status toggles, and completed task cleaner. |
| 6 | [`06_bank_management_system.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/06_bank_management_system.py) | OOP, Classes, Encapsulation | Account creation, deposits, withdrawals, fund transfers, and passbook statements. |
| 7 | [`07_atm_machine_simulator.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/07_atm_machine_simulator.py) | Security logic, loops | ATM PIN authentication, withdrawals, mini statements, and PIN changing. |
| 8 | [`08_contact_book_manager.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/08_contact_book_manager.py) | Regex, JSON, dictionaries | Phonebook with regex validation for phone numbers and email addresses. |
| 9 | [`09_library_management_system.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/09_library_management_system.py) | OOP, JSON, datetime | Book issuing/returns, catalog tracking, and late-fee fine calculations. |
| 10 | [`10_inventory_stock_management.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/10_inventory_stock_management.py) | Stock valuation, dictionaries | Product inventory, stock adjustments, low-stock warnings, and valuation. |
| 11 | [`11_hotel_billing_system.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/11_hotel_billing_system.py) | Loops, Arithmetic, Receipt formatting | Restaurant food ordering cart, coupon discounts, tax, and itemized invoice. |
| 12 | [`12_employee_payroll_system.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/12_employee_payroll_system.py) | OOP, salary deductions | Basic salary, HRA/DA allowances, PF/tax deductions, and salary slips. |
| 13 | [`13_car_rental_system.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/13_car_rental_system.py) | OOP, State management | Rental car fleet availability, bookings, and fare settlements. |
| 14 | [`14_daily_expense_tracker.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/14_daily_expense_tracker.py) | Aggregation, JSON | Incomes, expenses, savings calculation, and category breakdown reports. |
| 15 | [`15_password_generator_and_validator.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/15_password_generator_and_validator.py) | `random`, `string`, regex | Customizable password generator and password strength evaluator. |
| 16 | [`16_number_guessing_game.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/16_number_guessing_game.py) | Game loop, `random` | Difficulty-based number guessing game with hints and scoring. |
| 17 | [`17_rock_paper_scissors_game.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/17_rock_paper_scissors_game.py) | Condition matrices | Rock-paper-scissors with AI bot and persistent match scoreboard. |
| 18 | [`18_hangman_word_game.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/18_hangman_word_game.py) | ASCII Art, sets, strings | Word guessing game with visual ASCII gallows and category hints. |
| 19 | [`19_interactive_quiz_app.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/19_interactive_quiz_app.py) | Lists of dicts, scoring | Python knowledge quiz with answer explanations and performance score. |
| 20 | [`20_unit_converter.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/20_unit_converter.py) | Formulas, dictionary mappings | Length, weight/mass, and temperature conversion utilities. |
| 21 | [`21_currency_converter.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/21_currency_converter.py) | Currency exchange rates | Convert amounts across USD, INR, EUR, GBP, JPY, CAD, AUD, etc. |
| 22 | [`22_notes_diary_app.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/22_notes_diary_app.py) | File I/O, search | Multi-line personal notes/diary maker with file storage and keyword search. |
| 23 | [`23_file_word_counter_and_analyzer.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/23_file_word_counter_and_analyzer.py) | `collections.Counter`, regex | Word, character, line counts, reading time, and top keyword analysis. |
| 24 | [`24_file_organizer.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/24_file_organizer.py) | `os`, `shutil` | Sorts any folder's files into Images, Docs, Audio, Code, etc. |
| 25 | [`25_medical_store_management.py`](file:///d:/full-stack-web-development-training-apr-2024/Python/Tasks/25_medical_store_management.py) | OOP, date comparison | Pharmacy medicine inventory, billing sales, and expiry date alerts. |

---

## 🚀 How to Run Any File

Kisi bhi program ko chalane ke liye terminal me `Python` folder me jaakar run karein:

```bash
python 01_date_time_digital_clock.py
python 03_scientific_calculator.py
python 06_bank_management_system.py
```
