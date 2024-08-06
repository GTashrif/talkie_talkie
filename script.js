var username = '';
var message = '';
var textBox = '';

function getName() {
    username = prompt('Enter your name: ');
    if (username == null || username.trim() === '') {
        getName();
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
    // document.getElementById('text-container').innerHTML += `<div id="text"><p id="username">${username}:</p> <p id="message">${textBox}</p><p id="time">${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}</p></div><hr>`;
    message = textBox;
    saveMessage(username, message);
    displayMessage(username, message, `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`);
    document.getElementById('text-box').value = '';
    return false;
}

document.addEventListener("DOMContentLoaded", loadMessages);

function func(event) {
    if (!username) {
        getName();
    }
    submit(event);
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
    messageDiv.id = 'text';
    messageDiv.classList.add("message");

    const usernamePara = document.createElement("p");
    usernamePara.textContent = `${username}:`;
    usernamePara.id = "username";

    const messagePara = document.createElem ent("p");
    messagePara.textContent = message;
    messagePara.id = "message";

    const timePara = document.createElement("p");
    timePara.textContent = time;
    timePara.id = "time";

    messageDiv.appendChild(usernamePara);
    messageDiv.appendChild(messagePara);
    messageDiv.appendChild(timePara);
    textContainer.appendChild(messageDiv);

    const hr = document.createElement("hr");
    textContainer.appendChild(hr);
}
