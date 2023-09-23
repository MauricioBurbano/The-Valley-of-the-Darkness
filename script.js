const API_KEY = data.key;
const word = document.querySelector("h2");
let randomWord = "";
let wordArr;
let guess;

async function getCompletion() {
    const response = await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Provide a randomly chosen, relatively easy-to-guess noun, with all letters capitalized and no punctuation.",
        max_tokens: 100,
        }),
    });

    const data = await response.json();
    
    for (let i = 2; i < data.choices[0].text.length; i++) {
        randomWord += data.choices[0].text[i];
    }

    wordArr = new Array(randomWord.length).fill("__");
    guess = wordArr.join(" ");

    word.innerHTML = guess + " " + randomWord;
}

// getCompletion();

const keyboard = document.querySelector("#keyboard");

for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    const key = document.createElement("button");
    key.innerHTML = String.fromCharCode(i);

    key.addEventListener("click", function() {
        check(this.innerHTML);
    });

    keyboard.appendChild(key);
}

document.addEventListener("keydown", event => check(event.key.toUpperCase()));

function check(letter) {
    for (let i = 0; i < randomWord.length; i++) {
        if (letter === randomWord[i]) {
            wordArr[i] = letter;
        }

        guess = wordArr.join(" ");
        word.innerHTML = guess;
    }
}