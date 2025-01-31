const id = document.getElementById('timer')

const randomQoute = document.getElementById('random-qoute')

const user_input = document.getElementById('user-input')

const start_btn = document.getElementById('start-btn')

let wpm = document.getElementById('wpm')

let accuracy = document.getElementById('accuracy')

let errors = document.getElementById('total-errors')

const restart =  document.getElementById('restart-btn')



start_btn.addEventListener('click', randomQouteGenerator);

async function randomQouteGenerator() {
    try {
        let response = await fetch('https://qapi.vercel.app/api/random');
        let data = await response.json();

        randomQoute.textContent = data.quote;
        
        qouteArray = new Array(data.quote.split(""))

        user_input.addEventListener('input', check_errors)
    
        function check_errors() {
            let user_value = new Array (user_input.value.split())
        }
    }
     catch (error) {
        console.error('Error fetching quote:', error);
    }
    
}







