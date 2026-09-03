# ⚛️ React & Redux: Student Learning Journey

A comprehensive structured curriculum mapping each student's journey from React fundamentals, components, JSX, props, state, and hooks to Context API, global state management, Redux Toolkit (RTK), actions, reducers, selectors, middleware, REST API integration with `createAsyncThunk`, client-side routing, and performance optimization.

---

## 🗺️ Curriculum Architecture

```
React & Redux/Structured_Modules/
├── 01_React_Fundamentals_and_Hooks/               # Functional components, JSX, props composition, useState, useEffect cleanup, useRef
├── 02_Context_API_Global_State/                   # createContext, Provider pattern, custom hooks (useAuth, useTheme), eliminating prop-drilling
├── 03_Redux_Toolkit_Core/                         # createSlice, configureStore, Immer draft updates, useDispatch, useSelector, actions & reducers
├── 04_Redux_Selectors_Middleware_AsyncThunk/      # createAsyncThunk REST API integration, action logger middleware, memoized Reselect selectors
├── 05_React_Router_Navigation/                    # Declarative SPA routing, NavLink active styles, dynamic params (useParams), 404 routes
└── 06_Performance_Optimization/                   # React.memo, useCallback function stabilization, useMemo computation caching, avoiding re-renders
```

---

## 📂 Detailed Module Index

| # | Module Folder | Key Topics Covered | Interactive Demo / Code |
|---|---------------|--------------------|-------------------------|
| **01** | [`01_React_Fundamentals_and_Hooks`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/01_React_Fundamentals_and_Hooks) | Functional Components, Props & Children, `useState` reactive counter, `useEffect` interval cleanup, `useRef` direct DOM focus | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/01_React_Fundamentals_and_Hooks/index.html) & [`App.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/01_React_Fundamentals_and_Hooks/App.jsx) |
| **02** | [`02_Context_API_Global_State`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/02_Context_API_Global_State) | `createContext`, `ThemeProvider`, `AuthProvider`, custom hooks (`useAuth`, `useTheme`), zero prop-drilling global state | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/02_Context_API_Global_State/index.html) & [`AuthContext.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/02_Context_API_Global_State/AuthContext.jsx) |
| **03** | [`03_Redux_Toolkit_Core`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/03_Redux_Toolkit_Core) | Single source of truth, `createSlice`, `configureStore`, Immer draft mutation, `useDispatch`, `useSelector`, live store JSON inspector | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/03_Redux_Toolkit_Core/index.html) & [`tasksSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/03_Redux_Toolkit_Core/tasksSlice.js) |
| **04** | [`04_Redux_Selectors_Middleware_AsyncThunk`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/04_Redux_Selectors_Middleware_AsyncThunk) | `createAsyncThunk` API lifecycle (`pending`, `fulfilled`, `rejected`), custom action logging middleware, Reselect memoized selectors | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/04_Redux_Selectors_Middleware_AsyncThunk/index.html) & [`postsThunkSlice.js`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/04_Redux_Selectors_Middleware_AsyncThunk/postsThunkSlice.js) |
| **05** | [`05_React_Router_Navigation`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/05_React_Router_Navigation) | Single Page Application (SPA) declarative routing, active `NavLink` styles, dynamic URL parameters (`useParams`), `useNavigate`, 404 fallback | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/05_React_Router_Navigation/index.html) & [`AppRouter.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/05_React_Router_Navigation/AppRouter.jsx) |
| **06** | [`06_Performance_Optimization`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/06_Performance_Optimization) | Render shielding with `React.memo`, callback reference stabilization with `useCallback`, heavy computation caching with `useMemo` | [`index.html`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/06_Performance_Optimization/index.html) & [`OptimizedList.jsx`](file:///d:/full-stack-web-development-training-apr-2024/React%20&%20Redux/Structured_Modules/06_Performance_Optimization/OptimizedList.jsx) |

---

## ⚡ Execution Instructions

- **Standalone In-Browser Execution**:
  All 6 modules feature zero-dependency standalone `index.html` showcases powered by React 18 & Babel Standalone. Simply open any `index.html` in your browser or with VSCode Live Server.
- **Vite / Next.js Production Components**:
  Each module includes corresponding `.jsx` / `.js` source files ready to be imported directly into any modern Vite, Create-React-App, or Next.js project.
