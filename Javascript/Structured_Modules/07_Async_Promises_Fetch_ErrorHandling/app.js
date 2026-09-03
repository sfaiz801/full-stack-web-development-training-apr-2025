/**
 * 07_Async_Promises_Fetch_ErrorHandling/app.js
 * --------------------------------------------
 * Demonstrates:
 * - Asynchronous execution with Promises & async/await
 * - Consuming REST APIs with Fetch API
 * - Error handling with try/catch/finally
 * - Concurrency with Promise.all()
 */

const output = document.getElementById("outputConsole");
const btnFetchUsers = document.getElementById("btnFetchUsers");
const btnPromiseAll = document.getElementById("btnPromiseAll");
const btnTriggerError = document.getElementById("btnTriggerError");

function log(msg) {
    output.textContent = msg;
}

// 1. Fetch Users using Async/Await & Try/Catch
async function fetchUsers() {
    log("⏳ Initiating HTTP GET request to JSONPlaceholder API...");
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const users = await response.json();
        
        let outputText = "✅ Successfully fetched 3 users via Fetch API:\n\n";
        users.forEach(u => {
            outputText += `[ID: ${u.id}] ${u.name.padEnd(22)} | Email: ${u.email.padEnd(25)} | City: ${u.address.city}\n`;
        });
        log(outputText);
    } catch (err) {
        log(`❌ Error caught in catch block: ${err.message}`);
    } finally {
        console.log("Fetch operation lifecycle completed.");
    }
}

// 2. Concurrency with Promise.all()
async function runParallelPromises() {
    log("⏳ Dispatching 2 concurrent asynchronous API requests with Promise.all()...");
    const start = performance.now();

    try {
        const [postsRes, commentsRes] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts?_limit=2"),
            fetch("https://jsonplaceholder.typicode.com/comments?_limit=2")
        ]);

        const posts = await postsRes.json();
        const comments = await commentsRes.json();
        const duration = (performance.now() - start).toFixed(1);

        let outputText = `🚀 Promise.all() completed in parallel (${duration}ms):\n\n`;
        outputText += `--- Posts (${posts.length} items) ---\n`;
        posts.forEach(p => outputText += `* [Post #${p.id}] ${p.title}\n`);
        
        outputText += `\n--- Comments (${comments.length} items) ---\n`;
        comments.forEach(c => outputText += `* [Comment #${c.id}] By: ${c.email}\n`);

        log(outputText);
    } catch (err) {
        log(`❌ Promise.all encountered a rejected promise: ${err.message}`);
    }
}

// 3. Error Boundary Simulation
async function simulateError() {
    log("⏳ Requesting a non-existent API endpoint...");
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/invalid-route-404");
        if (!response.ok) {
            throw new Error(`Endpoint not found! HTTP Status ${response.status} (Not Found)`);
        }
    } catch (err) {
        log(`🛡️ Error Gracefully Handled by Try/Catch Boundary:\n\n${err.message}\n\n-> The user application remained intact without crashing.`);
    }
}

btnFetchUsers.addEventListener("click", fetchUsers);
btnPromiseAll.addEventListener("click", runParallelPromises);
btnTriggerError.addEventListener("click", simulateError);
