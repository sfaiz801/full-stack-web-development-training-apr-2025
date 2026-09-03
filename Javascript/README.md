# ⚡ JavaScript Training & Practice Repository

This folder contains a complete, progressive JavaScript curriculum mapping each student's journey from language fundamentals, variables, data types, operators, and control flow to functions, arrays, objects, DOM manipulation, event handling, ES6+ features, asynchronous JavaScript, Promises, Fetch API, and error handling.

---

## 🌟 Structured Student Learning Curriculum: [`Structured_Modules/`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules)

| Module | Directory | Topics Covered | Key Demo / Script |
|--------|-----------|----------------|-------------------|
| **01** | [`01_Fundamentals_Variables_DataTypes`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/01_Fundamentals_Variables_DataTypes) | `let`, `const`, `var`, block scope, TDZ, 7 primitives, `typeof`, strict equality (`===`), `??` vs `\|\|` | [`index.js`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/01_Fundamentals_Variables_DataTypes/index.js) |
| **02** | [`02_Control_Flow_Conditions_Loops`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/02_Control_Flow_Conditions_Loops) | `if-else` ladders, ternary, `switch-case`, prime number loop, `for...of` (arrays), `for...in` (objects) | [`index.js`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/02_Control_Flow_Conditions_Loops/index.js) |
| **03** | [`03_Functions_Scopes_Closures`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/03_Functions_Scopes_Closures) | Declarations, arrow functions, rest params (`...numbers`), higher-order functions, private closures | [`index.js`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/03_Functions_Scopes_Closures/index.js) |
| **04** | [`04_Arrays_and_Objects_Mastery`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/04_Arrays_and_Objects_Mastery) | `map()`, `filter()`, `reduce()`, `find()`, `every()`, `some()`, `Object.entries()`, `Object.freeze()` | [`index.js`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/04_Arrays_and_Objects_Mastery/index.js) |
| **05** | [`05_DOM_Manipulation_and_Events`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/05_DOM_Manipulation_and_Events) | Dynamic DOM nodes (`createElement`), real-time character/word counter, event delegation on `#taskList` | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/05_DOM_Manipulation_and_Events/index.html) |
| **06** | [`06_ES6_Plus_Modern_Features`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/06_ES6_Plus_Modern_Features) | Destructuring, spread (`...`), optional chaining (`?.`), ES6 class inheritance (`extends`, `super`) | [`index.js`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/06_ES6_Plus_Modern_Features/index.js) |
| **07** | [`07_Async_Promises_Fetch_ErrorHandling`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/07_Async_Promises_Fetch_ErrorHandling) | Asynchronous Fetch API, `async`/`await`, concurrency with `Promise.all()`, graceful UI `try...catch` | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/Javascript/Structured_Modules/07_Async_Promises_Fetch_ErrorHandling/index.html) |

---

## 📂 Directory Organization

```
Javascript/
│
├── 📁 JavaScript_Test_01/                 # Cloned official test repository (branch: development)
│   ├── 📁 Task1/                          # QuadHex Condition Loops
│   ├── 📁 Task2/                          # Sum of Prime Numbers
│   ├── 📁 Task3/                          # Interactive Click Counter & DOM Toggle
│   ├── 📁 Task4/                          # User Data Table via Fetch API & Promises
│   └── 📄 README.md                       # Test 01 documentation
│
├── 📁 practice_tasks/                     # 6 Modular hands-on practice tasks & utilities
│   ├── 📄 index.html                      # Interactive Hub to launch all 6 practice tasks
│   ├── 📁 01_array_higher_order_functions/# Map, filter, reduce & sort inventory valuation
│   ├── 📁 02_debounced_search_filter/     # Debounce utility (300ms) with closure & DOM search
│   ├── 📁 03_async_await_quotes/          # Async/await REST fetcher with fallback cache
│   ├── 📁 04_regex_form_validator/        # Regex validator with dynamic password meter
│   ├── 📁 05_localstorage_notes/          # Persistent LocalStorage CRUD notes app
│   └── 📁 06_algorithm_utilities/         # Palindrome, Anagram & Character frequency counter
│
└── 📄 README.md                           # Master JavaScript module guide
```

---

## 🌟 Modules Detail

### 1. [JavaScript_Test_01](./JavaScript_Test_01) (Official Assessment)
- **Repo URL:** `https://github.com/sfaiz801/JavaScript_Test_01.git`
- **Active Branch:** `development`
- **Covers:** Loop branching, algorithm helpers, DOM event delegation, and asynchronous Promises with `fetch()`.

### 2. [practice_tasks](./practice_tasks) (Interactive Practice Lab)
- **Interactive Launcher:** Open [`practice_tasks/index.html`](./practice_tasks/index.html) in your browser to test all 6 tasks through a unified UI.
- **Topics Covered:** Functional programming (`map`/`filter`/`reduce`), Closures & Timers (Debouncing), Modern Async/Await with error boundaries, Client-side Form Validation with RegEx, Browser `localStorage` API, and core algorithm questions.

---

## 🚀 How to Run & Test
- **Practice Tasks Hub:** Open [`practice_tasks/index.html`](./practice_tasks/index.html) with Live Server or double-click to launch in any browser.
- **Assessment Tasks:** Navigate into [`JavaScript_Test_01`](./JavaScript_Test_01) and open `Task1/index.html`, `Task2/index.html`, `Task3/index.html`, or `Task4/promise.html`.
- **Browser Console:** Press `F12` to view formatted console outputs.
