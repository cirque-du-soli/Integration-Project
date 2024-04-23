export default function generatePassword() {

    // Required categories of characters
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    // Pick random character from string
    const randomChar = (str) => str[Math.floor(Math.random() * str.length)];

    // Include minimum one character from each category
    const passwordArray = [
        randomChar(lowerCaseLetters),
        randomChar(upperCaseLetters),
        randomChar(numbers),
        randomChar(symbols)
    ];

    // Fill to 12 characters
    const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + symbols;
    while (passwordArray.length < 12) {
        passwordArray.push(randomChar(allCharacters));
    }

    // Shuffle characters
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]; // ES6 destructuring swap
    }

    return passwordArray.join('');
}