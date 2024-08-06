var username = '';
var message = '';
var textBox = '';

document.addEventListener("DOMContentLoaded", function() {
    loadMessages();
    if (!username) {
        document.getElementById('usernameModal').style.display = 'block';
    }
});

function setUsername() {
    username = document.getElementById('username-input').value.trim();
    if (username === '') {
        alert('Please enter your name');
    } else {
        document.getElementById('usernameModal').style.display = 'none';
    }
}

function submit(event) {
    event.preventDefault();
    textBox = document.getElementById('text-box').value.trim();
    if (textBox === '') {
        alert('Please enter text');
        return false;
    }

    const time = new Date();
    document.getElementById('text-container').innerHTML += `<div class="text"><p class="username">${username}:</p> <p class="message">${textBox}</p><p class="time">${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}</p></div><hr>`;
    message = textBox;
    saveMessage(username, message);
    displayMessage(username, message, `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`);
    document.getElementById('text-box').value = '';
    return false;
}

function saveMessage(username, message) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    const timestamp = new Date().toLocaleTimeString();
    messages.push({ username: username, text: message, time: timestamp });
    localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(msg => displayMessage(msg.username, msg.text, msg.time));
}

function displayMessage(username, message, time = new Date().toLocaleTimeString()) {
    const textContainer = document.getElementById("text-container");
    const messageDiv = document.createElement("div");
    messageDiv.id="text";
    messageDiv.classList.add("text");

    const usernamePara = document.createElement("p");
    usernamePara.textContent = `${username}:`;
    usernamePara.classList.add("username");

    const messagePara = document.createElement("p");
    messagePara.textContent = message;
    messagePara.classList.add("message");

    const timePara = document.createElement("p");
    timePara.textContent = time;
    timePara.classList.add("time");

    messageDiv.appendChild(usernamePara);
    messageDiv.appendChild(messagePara);
    messageDiv.appendChild(timePara);
    textContainer.appendChild(messageDiv);

    const hr = document.createElement("hr");
    textContainer.appendChild(hr);
}
