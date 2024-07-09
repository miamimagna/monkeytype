// text generation using top 100 words of english
let words = 'time year people way day man thing woman life child world school state family student group country problem hand part place case week company system program question work government number night point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name president team minute idea kid body information back parent face others level office door health person art war history party result change morning reason research girl guy moment air teacher force education';
words = words.split(' ');
let text = '';
const p = document.getElementById('text');
var pending, i;

// generate will around 20 words in p#text container
function generate() {
    text = '';
    while (text.length < 140) {
        if (text.length) text += ' ';
        // randomly choosing one of the word
        let x = Math.floor(Math.random() * words.length);
        text = text + words[x];
    }
    text = text.split('');

    // adding each element as a span with class pending
    for (ch of text) {
        const span = document.createElement('span');
        span.innerText = ch;
        span.classList.add('pending');
        p.appendChild(span);
    }
    // storing all pending elements together(for future updates)
    pending = [...document.querySelectorAll('.pending')];
    // i will be iterator to pending
    i = 0;

    // first letter will have class current
    pending[0].classList.replace('pending', 'current');
}
generate();


const content = document.querySelector('.content-area');
// intervalId will help us reset time
let intervalId = null;
// cur will store start time
let cur = 0;

// this will be format for result
function showResult() {
    clearInterval(intervalId);
    intervalId = null;
    p.innerText = 'Well done !!!'
    p.innerText += ' WPM: ';
    // wpm will be shown according to every 5 characters entered in one minute 
    // hence (60 * text.length / 5) / time => 12 * text.length / time
    p.innerHTML += '<span class = "wpm">' + Math.floor(12 * text.length / parseInt(time.innerText)) + "</span>";
    p.innerText += ' {Press Tab+Enter to continue}';
}


// progress is the actual Key Event handler
function progress(event) {
    // when the key entered is same as current key, move forward
    if (event.key === pending[i].innerText) {
        pending[i].classList.replace('current', 'done');
        i++;
        // when the first letter is entered, start timer
        if (i === 1) {
            pending[i].classList.replace('pending', 'current');
            cur = Date.now();
            showTime();
            intervalId = setInterval(showTime, 1000);
        }
        // when the list ends, show result
        if (i === pending.length) {
            showResult();
            p.removeEventListener('keydown', progress);
            return;
        }
        // move forward by moving current
        pending[i].classList.replace('pending', 'current');
    }
}
// adding listener
p.addEventListener('keydown', progress);


const time = document.getElementById('time');
// this function will show time using Date.now()
function showTime() {
    time.innerText = Math.floor((Date.now() - cur) / 1000);
}


