//const socket = io(); // Connect to the server (assuming the server is running on the same host and default port)

const name = prompt('Enter your Name to join');
socket.emit('new-user-joined', name); // Emitting the 'new-user-joined' event to the server with the entered name

const form = document.querySelector('.send-container');
const messageInput = document.getElementById('messageinp'); // Corrected ID
const messageContainer = document.querySelector('.container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;

    append(`You: ${message}`, 'right');
    socket.emit('send', message); // Emitting the 'send' event to the server
    messageInput.value = '';
});

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, "right");
});

socket.on('left', name => {
    append(`${name} left the chat`, "left");
});
