const port = process.env.PORT || 8000
const io = require("socket.io")(port,{
    cors:{
        origin:"*"
    }
}
   
    )
const users = {}

console.log("hello11");

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("users",users);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    })
    // socket.on('send', msg=>{
        
    //     socket.broadcast.emit('receive',{msg:msg , name:users[socket.id]})
    // } )
    socket.on('send', msg=>{
        socket.broadcast.emit('recive',{msg:msg,name:users[socket.id]})
    })
    socket.on('disconnect', msg=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    } )
})