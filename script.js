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
        prompt: "Provide a randomly chosen, easy-to-guess noun, with all letters capitalized and no punctuation.",
        max_tokens: 100,
        }),
    });

    const data = await response.json();
    
    for (let i = 2; i < data.choices[0].text.length; i++) {
        randomWord += data.choices[0].text[i];
    }

    wordArr = new Array(randomWord.length).fill("__");
    guess = wordArr.join(" ");

    word.innerHTML = guess;
}

getCompletion();

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

let passageIndex = 0;
const passageContainer = document.querySelector(".passage");

function check(letter) {
    if (passageIndex < 6) {
        let wrong = true;

        for (let i = 0; i < randomWord.length; i++) {
            if (letter === randomWord[i]) {
                wordArr[i] = letter;
                wrong = false;
            }
        }

        guess = wordArr.join(" ");
        word.innerHTML = guess;

        if (wrong) {
            const verse = document.createElement("p");
            verse.innerHTML = passage[passageIndex];
            passageContainer.appendChild(verse);
            passageIndex++;
        }
    } else word.innerHTML = "GAME OVER! THE WORD WAS " + randomWord + ".";
}