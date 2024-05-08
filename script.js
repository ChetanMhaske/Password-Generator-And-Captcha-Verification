document.addEventListener('DOMContentLoaded', function() {
    // Retrieving button elements
    const generateBtn = document.getElementById('generateBtn');
    const generatePasswordBtn = document.getElementById('generatePasswordBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const copyBtn = document.getElementById('copyBtn'); // Add reference to the copy button

    // Adding event listeners to buttons
    generateBtn.addEventListener('click', generateCaptchaAndVerify);
    generatePasswordBtn.addEventListener('click', generatePassword);
    verifyBtn.addEventListener('click', verifyCaptcha);

    // Add event listener for the copy button
    copyBtn.addEventListener('click', copyPassword);

    // Function to generate captcha and display it
    function generateCaptchaAndVerify() {
        const captchaField = document.getElementById('captcha');
        const captcha = generateCaptcha(6);
        captchaField.textContent = captcha;
    }

    // Function to verify user-entered captcha
    function verifyCaptcha() {
        const userCaptcha = document.getElementById('userCaptcha').value;
        const generatedCaptcha = document.getElementById('captcha').textContent;
        if (userCaptcha === generatedCaptcha) {
            alert('CAPTCHA Verified!');
        } else {
            alert('CAPTCHA Verification Failed!');
        }
    }

    // Function to generate password based on user preferences
    function generatePassword() {
        const passwordField = document.getElementById('password');
        const lengthField = document.getElementById('length');
        const lowercaseCheckbox = document.getElementById('lowercase');
        const uppercaseCheckbox = document.getElementById('uppercase');
        const numbersCheckbox = document.getElementById('numbers');
        const specialCharsCheckbox = document.getElementById('specialChars');
        const passwordStrength = document.getElementById('passwordStrength');
        const password = generatePasswordString(parseInt(lengthField.value),
                                                lowercaseCheckbox.checked,
                                                uppercaseCheckbox.checked,
                                                numbersCheckbox.checked,
                                                specialCharsCheckbox.checked);
        passwordField.value = password;
        const strength = getPasswordStrength(password);
        passwordStrength.textContent = `Password Strength: ${strength}`;
    }

    // Function to generate a random string for captcha
    function generateCaptcha(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            captcha += characters.charAt(randomIndex);
        }
        return captcha;
    }

    // Function to generate a password string based on user preferences
    function generatePasswordString(length, lowercase, uppercase, numbers, specialChars) {
        let characters = '';
        if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (numbers) characters += '0123456789';
        if (specialChars) characters += '!@#$%^&*()_+{}[]:;<>,.?/';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        return password;
    }

    // Function to calculate password strength
    function getPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*()_+{}[\]:;<>,.?/]/.test(password)) score++;
        if (score <= 2) return 'Weak';
        else if (score <= 3) return 'Moderate';
        else if (score <= 4) return 'Strong';
        else return 'Very Strong';
    }

    // Function to copy password to clipboard
    function copyPassword() {
        const passwordField = document.getElementById('password');
        passwordField.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    }
});
