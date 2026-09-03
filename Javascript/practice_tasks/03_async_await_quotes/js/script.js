// Task 7: Async/Await with Error Handling & Fallback
// Demonstrates: async/await, try/catch/finally, Promise handling, API response checks

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const statusMsg = document.getElementById('statusMsg');
const fetchBtn = document.getElementById('fetchBtn');

// Fallback quotes list in case network is disconnected
const fallbackQuotes = [
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" }
];

async function fetchQuote() {
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Fetching...';
    statusMsg.textContent = 'Contacting REST API...';

    try {
        // Fetch from public API
        const response = await fetch('https://dummyjson.com/quotes/random');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `- ${data.author}`;
        statusMsg.textContent = `Fetched online at ${new Date().toLocaleTimeString()}`;
        console.log('[Task 7 Success]:', data);

    } catch (error) {
        console.warn('[Task 7 Warning] API failed, using fallback:', error.message);
        
        // Select random fallback quote
        const randomItem = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        quoteText.textContent = `"${randomItem.text}"`;
        quoteAuthor.textContent = `- ${randomItem.author} (Offline Cache)`;
        statusMsg.textContent = `Network offline or blocked. Displayed cached quote.`;

    } finally {
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Get Another Quote';
    }
}

// Initial fetch on page load
fetchQuote();
