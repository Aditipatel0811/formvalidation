const form = document.getElementById('registration-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const dobInput = document.getElementById('dob');
const submitButton = document.getElementById('submit-button');

// Regular expressions for validation
const nameRegex = /^[A-Za-z\s]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Real-time validation
fullNameInput.addEventListener('input', validateFullName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
dobInput.addEventListener('input', validateDOB);

// Form submission handling
form.addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});

// Validation functions
function validateFullName() {
    const isValid = nameRegex.test(fullNameInput.value);
    updateValidationStatus(fullNameInput, isValid);
}

function validateEmail() {
    const isValid = emailRegex.test(emailInput.value);
    updateValidationStatus(emailInput, isValid);
}

function validatePassword() {
    const isValid = passwordRegex.test(passwordInput.value);
    updateValidationStatus(passwordInput, isValid);
    validateConfirmPassword();
}

function validateConfirmPassword() {
    const isValid = passwordInput.value === confirmPasswordInput.value;
    updateValidationStatus(confirmPasswordInput, isValid);
}

function validateDOB() {
    const dob = new Date(dobInput.value);
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    const isValid = dob <= minAgeDate;
    updateValidationStatus(dobInput, isValid);
    submitButton.disabled = !isValid;
}

function updateValidationStatus(inputElement, isValid) {
    const statusElement = inputElement.nextElementSibling;
    statusElement.textContent = isValid ? '✓' : '✗';
    statusElement.className = isValid ? 'valid' : 'invalid';
}

function validateForm() {
    let isValid = true;
    const inputs = [fullNameInput, emailInput, passwordInput, confirmPasswordInput, dobInput];
    inputs.forEach(input => {
        const statusElement = input.nextElementSibling;
        if (!input.value) {
            isValid = false;
            statusElement.textContent = 'This field is required.';
            statusElement.className = 'invalid';
        }
    });
    return isValid;
}
