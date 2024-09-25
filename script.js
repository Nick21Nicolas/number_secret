let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 5;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
const fireworkContainer = document.getElementById("fireworkContainer");

guessButton.addEventListener("click", function() {
    const userGuess = parseInt(guessInput.value);
    attempts++;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Por favor, insira um número válido entre 1 e 100.";
        message.style.color = "red";
    } else if (userGuess === randomNumber) {
        message.textContent = `🎉 Parabéns! Você acertou o número ${randomNumber} em ${attempts} tentativas! 🎉`;
        message.style.color = "green";
        showFireworks();
        restartButton.style.display = "block";
    } else if (attempts >= maxAttempts) {
        message.textContent = `Você esgotou suas tentativas. O número era ${randomNumber}.`;
        message.style.color = "red";
        restartButton.style.display = "block";
    } else {
        const hint = userGuess < randomNumber ? "maior" : "menor";
        message.textContent = `Tente um número ${hint}! Você ainda tem ${maxAttempts - attempts} tentativas.`;
        message.style.color = "orange";
    }
});

restartButton.addEventListener("click", function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.textContent = "";
    guessInput.value = "";
    restartButton.style.display = "none";
    fireworkContainer.innerHTML = ""; // Remove fogos existentes
});

function showFireworks() {
    for (let i = 0; i < 20; i++) {
        const firework = document.createElement("div");
        firework.className = "firework";
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.bottom = `${Math.random() * 100}vh`;
        firework.style.backgroundColor = getRandomColor();
        fireworkContainer.appendChild(firework);

        // Remove o fogo após a animação
        firework.addEventListener("animationend", () => {
            firework.remove();
        });
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

