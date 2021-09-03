const socket = io();
const textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message-area');
const btn = document.querySelector('#btn');

let Name;

do {
    Name = prompt("please enter your name");
    socket.emit('new-user-joined', Name);
    //    const phone = prompt("please enter your phone mobile number");
} while (!Name);

socket.on('user-joined', Name => {
    newAppend(`${Name} joined the Group`, 'center')
})

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
});
let audio = new Audio('../ting.mp3');

function newAppend(message) {

}

function append(message, position) {
    const mainBox = document.createElement('div');
    console.log(message)
    if (position === 'center') {
        mainBox.classList.add(position);
        mainBox.innerHTML = message;
        messageArea.appendChild(mainBox);
    } else {
        mainBox.classList.add('mbox', position);
        const markup = `
                    <p>${message}`
        mainBox.innerHTML = markup;
        messageArea.appendChild(mainBox);
        if(position === 'left'){
            audio.play();
        }
    }
    // if (position === 'center') {
    //     mainBox.classList.add(position);
    //     mainBox.innerHTML = message;
    //     messageArea.appendChild(mainBox);
    // }if (position === 'left') {
    //     const msgName = message.Name;
    //     const msgMessage = message.msg;
    //     console.log(msgName, msgMessage);
    //     mainBox.classList.add('mbox', position);
    //     const markup = `<h4>${Name}</h4>
    //                 <p>${message}`
    //     mainBox.innerHTML = markup;
    //     messageArea.appendChild(mainBox);
    //     audio.play();
    // } else {
    //     mainBox.classList.add('mbox', position);
    //     const markup = `<h4>${Name}</h4>
    //                 <p>${message}`
    //     mainBox.innerHTML = markup;
    //     messageArea.appendChild(mainBox);
    // }
    

}

// if a new user joins, for other show his name
socket.on('user-joined', Name => {
    append(`${Name} joined the chat`, 'center');
    scrollToBottom(18)
});

//if server sends a message, receive it
socket.on('receive', data => {
    append(`${data.Name}: ${data.message}`, 'left');
    scrollToBottom(43)
})

// if a user leaves the chat, append the info to the container
socket.on('left', Name=>{
    append(`${Name} left the chat`, 'center');
    scrollToBottom(18)
})

// if the form gets submitted, send server the message
function sendMessage(message) {
    append(`<storng>You:</strong> ${message}`, 'right');
    scrollToBottom(43)
    socket.emit('send', message);
    textarea.value = "";

}

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    // const message = textarea.value;
    // // const msg = {
    // //     user: Name,
    // //     message: textarea.value.trim()
    // // }
    // append(`You: ${message}`, 'right');
    // socket.emit('send', message);
    // textarea.value = "";
    sendMessage(textarea.value)
})

function scrollToBottom(H) {
    console.log(H)
    const height = H; 
    console.log(messageArea.scrollTop,messageArea.scrollHeight, height)
    messageArea.scrollBottom = messageArea.scrollHeight - height
}
