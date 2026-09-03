# ⚛️ React & Redux Projects Repository

This repository provides a comprehensive view of the student's journey across React fundamentals, components, JSX, props, state, and hooks to Context API, global state management, Redux Toolkit, actions, reducers, selectors, middleware, API integration, routing, and performance optimization.

---

## 🌟 Structured Student Learning Curriculum: [`Structured_Modules/`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules)

| Module | Directory | Topics Covered | Key Demo / Script |
|--------|-----------|----------------|-------------------|
| **01** | [`01_React_Fundamentals_and_Hooks`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/01_React_Fundamentals_and_Hooks) | Functional Components, Props & Children, `useState`, `useEffect` lifecycle cleanup, `useRef` direct DOM focus | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/01_React_Fundamentals_and_Hooks/index.html) & [`App.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/01_React_Fundamentals_and_Hooks/App.jsx) |
| **02** | [`02_Context_API_Global_State`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/02_Context_API_Global_State) | `createContext`, `ThemeProvider`, `AuthProvider`, custom hooks (`useAuth`, `useTheme`), zero prop-drilling global state | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/02_Context_API_Global_State/index.html) & [`AuthContext.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/02_Context_API_Global_State/AuthContext.jsx) |
| **03** | [`03_Redux_Toolkit_Core`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/03_Redux_Toolkit_Core) | Single source of truth, `createSlice`, `configureStore`, Immer draft mutation, `useDispatch`, `useSelector`, live store inspector | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/03_Redux_Toolkit_Core/index.html) & [`tasksSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/03_Redux_Toolkit_Core/tasksSlice.js) |
| **04** | [`04_Redux_Selectors_Middleware_AsyncThunk`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/04_Redux_Selectors_Middleware_AsyncThunk) | `createAsyncThunk` API lifecycle (`pending`, `fulfilled`, `rejected`), custom action logging middleware, Reselect memoized selectors | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/04_Redux_Selectors_Middleware_AsyncThunk/index.html) & [`postsThunkSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/04_Redux_Selectors_Middleware_AsyncThunk/postsThunkSlice.js) |
| **05** | [`05_React_Router_Navigation`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/05_React_Router_Navigation) | Single Page Application (SPA) declarative routing, active `NavLink` styles, dynamic URL parameters (`useParams`), `useNavigate`, 404 fallback | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/05_React_Router_Navigation/index.html) & [`AppRouter.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/05_React_Router_Navigation/AppRouter.jsx) |
| **06** | [`06_Performance_Optimization`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/06_Performance_Optimization) | Render shielding with `React.memo`, callback reference stabilization with `useCallback`, heavy computation caching with `useMemo` | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/06_Performance_Optimization/index.html) & [`OptimizedList.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/06_Performance_Optimization/OptimizedList.jsx) |

---

## 📂 Projects Directory

### 1. [01_react_bootstrap_ui_dashboard](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/01_react_bootstrap_ui_dashboard)
**Description:** React Bootstrap 5 UI Dashboard with 21 interactive component pages (Badges, Buttons, Cards, Tables, Forms, Modals, Progress Bars, Spinners, etc.).
- **Tech Stack:** React 19, React Bootstrap 5, Vite, React Router v7.
- **Port:** `http://localhost:5173`

---

### 2. [02_redux_toolkit_mastery_hub](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/02_redux_toolkit_mastery_hub)
**Description:** Redux Toolkit (RTK) Practice Lab containing 6 core real-world slices and a real-time Redux Store Tree Inspector.
- **Tech Stack:** React 18, Redux Toolkit (`@reduxjs/toolkit`), `react-redux`, Vite.
- **Port:** `http://localhost:5174`
- **Tasks Included:**
  1. 🧮 **Counter & Multiplier** (`counterSlice.js`) - Fundamental state, actions, payload modifiers, history log.
  2. 📝 **To-Do Task Manager** (`todosSlice.js`) - CRUD collections, state toggles, and filter slices (`all`, `active`, `completed`).
  3. 🛒 **E-Commerce Shopping Cart** (`cartSlice.js`) - Item quantities, catalog integration, coupon discounts, subtotal & tax calculations.
  4. 👤 **User Authentication & Session** (`authSlice.js`) - Global auth state, session payloads, profile updater & preference toggles.
  5. 🌐 **Async Thunk API Fetcher** (`postsSlice.js`) - `createAsyncThunk` lifecycle (`pending`, `fulfilled`, `rejected`), retry mechanism & search filter.
  6. 💰 **Expense & Budget Ledger** (`budgetSlice.js`) - Financial accounting slice, income/expense classification, net savings calculation.
  7. 🔍 **Live Store Tree Inspector** (`StateInspectorModal.jsx`) - Real-time visualizer to view exact Redux store state as actions trigger.

---

## 🚀 How to Run the Projects

### Running Redux Toolkit Mastery Hub:
```powershell
cd "d:\full-stack-web-development-training-apr-2024\React & Redux\02_redux_toolkit_mastery_hub"
npm run dev
```
👉 Open: **http://localhost:5174/**

### Running React Bootstrap UI Dashboard:
```powershell
cd "d:\full-stack-web-development-training-apr-2024\React & Redux\01_react_bootstrap_ui_dashboard"
npm run dev
```
👉 Open: **http://localhost:5173/**
