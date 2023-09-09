var keyboard = document.querySelector("#keyboard");

for (var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    var key = document.createElement("button");
    key.innerHTML = String.fromCharCode(i);

    key.addEventListener("click", function() {
        console.log(this.innerHTML);
    });

    keyboard.appendChild(key);
}

document.addEventListener("keydown", function(event) {
    console.log(event.key.toUpperCase());     
});