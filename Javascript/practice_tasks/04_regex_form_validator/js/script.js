// Task 8: Client-Side Regex Validation & Password Strength
// Demonstrates: Regular expressions, input events, form submit prevention, UI feedback

const form = document.getElementById('regForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const userErr = document.getElementById('userErr');
const emailErr = document.getElementById('emailErr');
const passErr = document.getElementById('passErr');
const strengthFill = document.getElementById('strengthFill');
const successBox = document.getElementById('successBox');

// Regex patterns
const patterns = {
    username: /^[a-zA-Z0-9_]{4,15}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

// Password strength evaluator
function calculatePasswordStrength(pass) {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
}

passwordInput.addEventListener('input', () => {
    const score = calculatePasswordStrength(passwordInput.value);
    const colors = ['#f87171', '#fb923c', '#facc15', '#34d399'];
    const percentages = ['25%', '50%', '75%', '100%'];

    if (passwordInput.value.length === 0) {
        strengthFill.style.width = '0%';
    } else {
        strengthFill.style.width = percentages[score - 1] || '10%';
        strengthFill.style.background = colors[score - 1] || '#f87171';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    successBox.style.display = 'none';

    let isValid = true;

    // Validate Username
    if (!patterns.username.test(usernameInput.value.trim())) {
        userErr.style.display = 'block';
        isValid = false;
    } else {
        userErr.style.display = 'none';
    }

    // Validate Email
    if (!patterns.email.test(emailInput.value.trim())) {
        emailErr.style.display = 'block';
        isValid = false;
    } else {
        emailErr.style.display = 'none';
    }

    // Validate Password (at least score >= 3)
    const score = calculatePasswordStrength(passwordInput.value);
    if (score < 3) {
        passErr.style.display = 'block';
        isValid = false;
    } else {
        passErr.style.display = 'none';
    }

    if (isValid) {
        console.log('[Task 8 Valid Submission]:', {
            username: usernameInput.value,
            email: emailInput.value,
            strengthScore: score
        });
        successBox.style.display = 'block';
        form.reset();
        strengthFill.style.width = '0%';
    }
});
