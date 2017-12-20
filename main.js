const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
var firebase = require('firebase');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join( __dirname, './public');

var socketObject = [];

//recieves data
firebase.initializeApp({
    databaseURL: 'https://stayinalive-189208.firebaseio.com/',
});
let day = new Date().toDateString();
var database = firebase.database();
var listenStatus = database.ref('/' + day);

//whenever data is updated send to clients if they are connected
listenStatus.on('value', function(snapshot){
    if(socketObject.length !== 0){
        socketObject.forEach( (socket) => {
            var array = [];
            snapshot.forEach(function(childSnapShot) {
                var item = childSnapShot.val();
                item.key = childSnapShot.key;
                array.push(item);
            });
            socket.emit('event', [array[array.length - 1]]);
        });
    }
});


//sends initial data
function sendInitial() {
    firebase.database().ref('/' + day).once('value').then(function(snapshot) {
        console.log("sent data once");
        var array = [];
        snapshot.forEach(function(childSnapShot) {
            var item = childSnapShot.val();
            item.key = childSnapShot.key;
            array.push(item);
        });
        socketObject[socketObject.length - 1].emit('event', array);
    });
}

// Start all the GUI part
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("user connected");
    socketObject.push(socket);
    setTimeout(sendInitial, 1000)
});

// //Start the server
server.listen(8010, () =>{
    console.log('Server up');
});

//this function shows all of the tables in firebase
database.ref('/').orderByKey().once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.key);
    })
});