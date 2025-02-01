const randomQoute = document.getElementById('random-qoute')

const user_input = document.getElementById('user-input')

const start_btn = document.getElementById('start-btn')

let wpm = document.getElementById('wpm')

let accuracy = document.getElementById('accuracy')

let errors = document.getElementById('total-errors')

const restart = document.getElementById('restart-btn')

let timer = document.getElementById('timer')

let mistakes = 0

let Interval_ID
let timeLeft = 60; // 60 seconds

start_btn.addEventListener('click', randomQouteGenerator);
start_btn.addEventListener('click', countdown)

async function randomQouteGenerator() {

    let response = await fetch('https://qapi.vercel.app/api/random');
    let data = await response.json();

    randomQoute.textContent = data.quote;

    qouteArray = data.quote.split("")

}
user_input.addEventListener('input', check_errors)

function countdown() {
    clearInterval(Interval_ID); // Clear any existing timer

    Interval_ID = setInterval(() => {
        timeLeft--;
        timer.textContent = 'Timer :' + ' ' + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(Interval_ID);
            timer.textContent = 'Timer : ' + ' ' + 'Time\'s up!';
        }
    }, 1000);
}

function check_errors() {
    let user_value = user_input.value
    let user_arr = user_value.split("")
    mistakes = 0
        
        for (let index = 0; index < user_arr.length; index++) {
            const user_word = user_arr[index]
            const qoute_word = qouteArray[index]
    
            if (user_word !== qoute_word) {
                mistakes = mistakes + 1
            }
        }
   
}




