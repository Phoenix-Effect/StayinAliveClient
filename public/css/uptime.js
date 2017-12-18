//socket starting
const socket = io.connect();

socket.on('connect', function(){
    console.log("connected");
});

socket.on('event', function(data) {
    console.log("yes recieved");
    for (var key in data){
        var date = new Date(data[key].time * 1000);
        document.getElementById("status").innerText = data[key].status;
        document.getElementById("time").innerText = date.toTimeString();
        document.getElementById("date").innerText = date.toLocaleDateString();
    }
});

socket.on('disconnect', function(){
    console.log("disconnected")
});