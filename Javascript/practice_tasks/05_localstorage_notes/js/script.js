// Task 9: Persistent LocalStorage CRUD Operations
// Demonstrates: localStorage.getItem/setItem, JSON.stringify/parse, DOM synchronization

const STORAGE_KEY = 'js_test_01_notes';
const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const notesList = document.getElementById('notesList');

// Get notes from storage
function getStoredNotes() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['Review JavaScript Closures', 'Practice Async/Await Patterns'];
}

// Save notes to storage
function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    renderNotes();
}

// Render notes to UI
function renderNotes() {
    const notes = getStoredNotes();
    notesList.innerHTML = notes.length === 0 
        ? '<li style="color: #64748b;">No notes saved yet. Add one above!</li>'
        : notes.map((note, index) => `
            <li>
                <span>📌 ${note}</span>
                <button class="del-btn" onclick="deleteNote(${index})">✕ Delete</button>
            </li>
        `).join('');
}

// Add note
function addNote() {
    const text = noteInput.value.trim();
    if (!text) return;

    const notes = getStoredNotes();
    notes.unshift(text);
    saveNotes(notes);
    noteInput.value = '';
    console.log('[Task 9 Note Added]:', text);
}

// Delete note
window.deleteNote = function(index) {
    const notes = getStoredNotes();
    const removed = notes.splice(index, 1);
    saveNotes(notes);
    console.log('[Task 9 Note Deleted]:', removed[0]);
};

addBtn.addEventListener('click', addNote);
noteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addNote();
});

// Initial render
renderNotes();
