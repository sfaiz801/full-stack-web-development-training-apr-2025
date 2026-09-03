// Task 6: Debounce Function & Real-time DOM Filtering
// Demonstrates: Closures, higher-order functions, setTimeout/clearTimeout, DOM manipulation

const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React.js',
    'Next.js (App Router)',
    'Node.js',
    'FastAPI (Python)',
    'PostgreSQL & SQL',
    'Docker & Containers',
    'AWS Cloud Services',
    'Redux Toolkit',
    'Bootstrap 5',
    'Tailwind CSS',
    'Git & GitHub Workflow'
];

let queryExecutionCount = 0;

// Custom debounce implementation
function debounce(fn, delay = 300) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const searchInput = document.getElementById('searchInput');
const skillsList = document.getElementById('skillsList');
const callCountEl = document.getElementById('callCount');

function renderList(items) {
    skillsList.innerHTML = items.length
        ? items.map(skill => `<li>⚡ ${skill}</li>`).join('')
        : '<li style="color: #ef4444;">No matching skills found</li>';
}

// Initial render
renderList(skills);

// Search handler that will be debounced
function handleSearch(query) {
    queryExecutionCount++;
    callCountEl.textContent = queryExecutionCount;

    const filtered = skills.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    );

    console.log(`[Debounce Executed] Query: "${query}" | Results: ${filtered.length}`);
    renderList(filtered);
}

// Attach debounced listener
const debouncedSearch = debounce((e) => handleSearch(e.target.value), 300);
searchInput.addEventListener('input', debouncedSearch);
