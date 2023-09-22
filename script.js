const API_KEY = data.key;
const word = document.querySelector("h2");

async function getCompletion() {
    const response = await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "A random easy noun. No punctuation. All letters capitalized.",
        max_tokens: 100,
        }),
    });

    const data = await response.json();
    word.innerHTML = data.choices[0].text;
}

getCompletion();

const keyboard = document.querySelector("#keyboard");

for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    const key = document.createElement("button");
    key.innerHTML = String.fromCharCode(i);

    key.addEventListener("click", function() {
        console.log(this.innerHTML);
    });

    keyboard.appendChild(key);
}

document.addEventListener("keydown", function(event) {
    console.log(event.key.toUpperCase());     
});