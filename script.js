document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const verifyBtn = document.getElementById('verifyBtn');

    generateBtn.addEventListener('click', generatePasswordAndCaptcha);
    verifyBtn.addEventListener('click', verifyCaptcha);

    function generatePasswordAndCaptcha() {
        const passwordField = document.getElementById('password');
        const lengthField = document.getElementById('length');
        const lowercaseCheckbox = document.getElementById('lowercase');
        const uppercaseCheckbox = document.getElementById('uppercase');
        const numbersCheckbox = document.getElementById('numbers');
        const specialCharsCheckbox = document.getElementById('specialChars');
        const passwordStrength = document.getElementById('passwordStrength');
        const captchaField = document.getElementById('captcha');

        // Generate password
        const password = generatePassword(parseInt(lengthField.value), 
                                            lowercaseCheckbox.checked,
                                            uppercaseCheckbox.checked,
                                            numbersCheckbox.checked,
                                            specialCharsCheckbox.checked);
        passwordField.value = password;

        // Check password strength
        const strength = getPasswordStrength(password);
        passwordStrength.textContent = `Password Strength: ${strength}`;

        // Generate CAPTCHA
        const captcha = generateCaptcha(6);
        captchaField.textContent = captcha;
    }

    function verifyCaptcha() {
        const userCaptchaField = document.getElementById('userCaptcha');
        const captchaField = document.getElementById('captcha');

        const userCaptcha = userCaptchaField.value;
        const captcha = captchaField.textContent;

        if (userCaptcha === captcha) {
            alert('CAPTCHA verified! You can proceed.');
        } else {
            alert('Incorrect CAPTCHA. Please try again.');
        }
    }

    function generatePassword(length, lowercase, uppercase, numbers, specialChars) {
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

    function generateCaptcha(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            captcha += characters.charAt(randomIndex);
        }
        return captcha;
    }
});
