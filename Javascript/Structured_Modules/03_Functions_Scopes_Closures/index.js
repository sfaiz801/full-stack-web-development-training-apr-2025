/**
 * 03_Functions_Scopes_Closures/index.js
 * ------------------------------------
 * Demonstrates:
 * - Function declarations, expressions & arrow functions
 * - Default parameters and Rest parameters (...args)
 * - Higher-Order Functions (functions accepting or returning functions)
 * - Lexical Scoping and Closures (encapsulation & private state)
 */

// 1. Function Forms
function standardAdd(a, b = 0) {
    return a + b;
}

const multiply = function(a, b) {
    return a * b;
};

const calculateTax = (amount, rate = 0.18) => amount * rate;

// 2. Rest Parameters (...numbers)
const sumAll = (...numbers) => numbers.reduce((acc, curr) => acc + curr, 0);

// 3. Higher-Order Functions
function createLogger(prefix) {
    return function(message) {
        console.log(`[${prefix}] ${message}`);
    };
}

// 4. Closures & Private State (Encapsulation)
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable enclosed in lexical scope

    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                return `Deposited Rs. ${amount}. New Balance: Rs. ${balance}`;
            }
            return "Invalid deposit amount";
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
                return `Withdrew Rs. ${amount}. Remaining Balance: Rs. ${balance}`;
            }
            return "Insufficient funds!";
        },
        getBalance() {
            return balance;
        }
    };
}

function main() {
    console.log("==========================================");
    console.log(" Functions, Lexical Scopes & Closures     ");
    console.log("==========================================");

    console.log("\n--- 1. Function Syntax & Rest Parameters ---");
    console.log(`standardAdd(15, 25):       ${standardAdd(15, 25)}`);
    console.log(`multiply(6, 7):            ${multiply(6, 7)}`);
    console.log(`calculateTax(5000):        Rs. ${calculateTax(5000)}`);
    console.log(`sumAll(10, 20, 30, 40, 50): ${sumAll(10, 20, 30, 40, 50)}`);

    console.log("\n--- 2. Higher-Order Functions ---");
    const authLog = createLogger("AUTH_SERVICE");
    const dbLog = createLogger("DATABASE_POOL");
    authLog("User 'faiz@indixpert.com' generated JWT token.");
    dbLog("Connection established to PostgreSQL host:5432.");

    console.log("\n--- 3. Closure in Action (Private State) ---");
    const myAccount = createBankAccount(10000);
    console.log(`Initial Balance: Rs. ${myAccount.getBalance()}`);
    console.log(myAccount.deposit(2500));
    console.log(myAccount.withdraw(4000));
    console.log(myAccount.withdraw(15000)); // Attempt overdraft
    console.log(`Final Protected Balance: Rs. ${myAccount.getBalance()}`);
}

main();
