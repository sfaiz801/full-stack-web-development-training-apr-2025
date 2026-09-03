# ⚛️ Redux Toolkit Mastery Hub

Comprehensive, real-world interactive Redux Toolkit (RTK) training laboratory with 6 practical tasks and a live Redux store tree inspector.

---

## 🎯 Included Tasks & Redux Concepts

| Task # | Task / Feature | Redux Slice | Key Concepts Practiced |
|--------|----------------|-------------|------------------------|
| **01** | **Counter & Multiplier** | [`counterSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/02_redux_toolkit_mastery_hub/src/features/counter/counterSlice.js) | `createSlice`, `actions`, `reducers`, payload parameters, step multipliers, action history logs |
| **02** | **To-Do Task Manager** | [`todosSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/02_redux_toolkit_mastery_hub/src/features/todos/todosSlice.js) | CRUD state updates, array mutations via Immer, active/completed filter switching |
| **03** | **Shopping Cart & Coupons** | [`cartSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/02_redux_toolkit_mastery_hub/src/features/cart/cartSlice.js) | Nested array manipulation, quantity adjustments, calculated values (subtotal, tax, discount, grand total) |
| **04** | **User Session & Settings** | [`authSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/02_redux_toolkit_mastery_hub/src/features/auth/authSlice.js) | Global authentication state, login/logout session payload, user preferences toggles |
| **05** | **Async Thunk API Fetcher** | [`postsSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/02_redux_toolkit_mastery_hub/src/features/posts/postsSlice.js) | `createAsyncThunk`, async lifecycle handling (`pending`, `fulfilled`, `rejected`), error handling, search filter |
| **06** | **Expense & Budget Ledger** | [`budgetSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/02_redux_toolkit_mastery_hub/src/features/budget/budgetSlice.js) | Financial ledger state, transaction types (income/expense), net savings calculations |

---

## 🔍 Live Store Inspector
App includes a built-in **Live Redux Store Tree Inspector** that displays the complete serialized Redux state in real-time as actions are dispatched!

---

## 🚀 How to Run

1. Navigate into the directory:
   ```powershell
   cd "d:\full-stack-web-development-training-apr-2024\React & Redux\02_redux_toolkit_mastery_hub"
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start development server:
   ```powershell
   npm run dev
   ```

4. Open in browser:
   👉 **http://localhost:5174/**
