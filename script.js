// Get references to DOM elements
const timerElement = document.getElementById('timer');
const randomQoute = document.getElementById('random-qoute');
const user_input = document.getElementById('user-input');
const start_btn = document.getElementById('start-btn');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const errorsElement = document.getElementById('total-errors');
const restart = document.getElementById('restart-btn');

let quoteArray = [];        // To store the characters of the quote
let userInputArray = [];    // To store the characters typed by the user
let mistakes = 0;           // Mistake counter
let timeLeft = 60;          // Timer duration in seconds
let totalTime = 60;         // Total time for calculating WPM
let intervalID;             // To store the interval ID
let isTimerRunning = false; // Flag to check if the timer is running

start_btn.addEventListener('click', startTest);
restart.addEventListener('click', resetTest);

// Function to start the test
function startTest() {
    resetTest();
    randomQouteGenerator();
    user_input.disabled = false;    // Enable the input field
    user_input.focus();             // Set focus to the input field
    if (!isTimerRunning) {
        countdown();
    }
    isTimerRunning = true;
}

// Function to reset the test
function resetTest() {
    clearInterval(intervalID);
    isTimerRunning = false;
    timeLeft = totalTime;
    mistakes = 0;
    timerElement.textContent = 'Timer: ' + timeLeft;
    wpmElement.textContent = 0;
    accuracyElement.textContent = 100;
    errorsElement.textContent = 0;
    user_input.value = '';
    user_input.disabled = true;
    randomQoute.textContent = 'Click Start to begin the test.';
}

// Fetch and display a random quote
async function randomQouteGenerator() {
    let response = await fetch('https://qapi.vercel.app/api/random');
    let data = await response.json();

    randomQoute.textContent = data.quote;
    quoteArray = data.quote.split("");
}

// Timer function
function countdown() {
    timerElement.textContent = 'Timer: ' + timeLeft;
    intervalID = setInterval(() => {
        timeLeft--;
        timerElement.textContent = 'Timer: ' + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(intervalID);
            timerElement.textContent = 'Time\'s up!';
            finishTest();
        }
    }, 1000);
}

// Event listener for user input
user_input.addEventListener('input', checkErrors);

// Function to check errors and progress
function checkErrors() {
    let userValue = user_input.value;
    userInputArray = userValue.split("");

    mistakes = 0;

    // Compare user input with the quote
    for (let index = 0; index < userInputArray.length; index++) {
        const userChar = userInputArray[index];
        const quoteChar = quoteArray[index];

        if (userChar !== quoteChar) {
            mistakes++;
        }
    }

    // Update mistakes
    errorsElement.textContent = mistakes;

    // Check if user has finished typing the quote
    if (userInputArray.length === quoteArray.length) {
        finishTest();
    }
}

// Function to finish the test
function finishTest() {
    clearInterval(intervalID);
    user_input.disabled = true;
    isTimerRunning = false;

    // Calculate WPM and accuracy
    let timeSpent = totalTime - timeLeft;
    let wordsTyped = user_input.value.split(' ').length;
    let wpm = Math.round((wordsTyped / timeSpent) * 60);
    let accuracy = Math.round(((quoteArray.length - mistakes) / quoteArray.length) * 100);

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;
}