// Task 10: String & Algorithm Utilities
// Demonstrates: String manipulation, frequency hash maps, regex sanitation, array comparison

// 1. Palindrome Checker
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}

function checkPal() {
    if (typeof document === 'undefined') return;
    const val = document.getElementById('palInput').value;
    if (!val.trim()) return;
    const result = isPalindrome(val);
    const resultEl = document.getElementById('palResult');
    resultEl.textContent = result ? `✓ "${val}" IS a palindrome!` : `✗ "${val}" is NOT a palindrome.`;
    resultEl.style.color = result ? '#34d399' : '#f87171';
    console.log(`[Task 10 Palindrome] "${val}":`, result);
}

// 2. Anagram Checker
function isAnagram(str1, str2) {
    const normalize = str => str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
    return normalize(str1) === normalize(str2);
}

function checkAna() {
    if (typeof document === 'undefined') return;
    const s1 = document.getElementById('ana1').value;
    const s2 = document.getElementById('ana2').value;
    if (!s1 || !s2) return;
    const result = isAnagram(s1, s2);
    const resultEl = document.getElementById('anaResult');
    resultEl.textContent = result ? `✓ "${s1}" & "${s2}" ARE anagrams!` : `✗ "${s1}" & "${s2}" are NOT anagrams.`;
    resultEl.style.color = result ? '#34d399' : '#f87171';
    console.log(`[Task 10 Anagram] "${s1}" vs "${s2}":`, result);
}

// 3. Frequency Counter
function getFrequency(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const freq = {};
    for (const char of clean) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
}

function countFreq() {
    if (typeof document === 'undefined') return;
    const val = document.getElementById('freqInput').value;
    if (!val.trim()) return;
    const counts = getFrequency(val);
    document.getElementById('freqResult').textContent = JSON.stringify(counts, null, 2);
    console.log(`[Task 10 Frequency] "${val}":`, counts);
}

if (typeof window !== 'undefined') {
    window.checkPal = checkPal;
    window.checkAna = checkAna;
    window.countFreq = countFreq;
} else {
    // Node.js test runs
    console.log('[Task 10 Palindrome Test]:', isPalindrome('racecar'));
    console.log('[Task 10 Anagram Test]:', isAnagram('listen', 'silent'));
    console.log('[Task 10 Frequency Test]:', getFrequency('javascript'));
}
