const socket = io('http://localhost:8000');


const form = document.getElementById('send-container')
const msgInp = document.getElementById('msgInp')
const msgContainer = document.querySelector('.container')
console.log("hello ");
var audio = new Audio('ting.mp3')

const append = (msg, position) => {
    const msgElement = document.createElement('div')
    msgElement.innerText = msg
    msgElement.classList.add('msg')
    msgElement.classList.add(position)
    msgContainer.append(msgElement)
    if(position=='left'){
        audio.play()
    }

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mesg = msgInp.value;
    append(`You:${mesg}`,'right')
    socket.emit('send',mesg)
    msgInp.value='';
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined`, 'right')
})
socket.on('recive', data => {
    console.log("data", data.name);
    append(`${data.name}:${data.msg}`, 'left')
})
socket.on('left', name => {
    append(`${name} is left`)
})






