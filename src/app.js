const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const Port = process.env.Port || 3003;

const static_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../views');

app.use(express.static(static_path));
app.set('views',views_path);
app.set("view engine", "hbs");

http.listen(Port,()=>{
    console.log(`connection is done on ${Port}`);
});

app.get('/',(req,res)=>{
    res.render("index")
})

// for socket
const io = require('socket.io')(http);

const users ={}

io.on('connection', (socket)=>{
    console.log("connection is ok");
    // if any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', Name=>{
        users[socket.id] = Name;
        socket.broadcast.emit('user-joined', Name);
    });

    // if someone sends a message, broadcast it to other people
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, Name: users[socket.id]});
    });

    // if someone leaves the chat, let others know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        // console.log(users)
        delete users[socket.id];
        // console.log(users)
    })

})