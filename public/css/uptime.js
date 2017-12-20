//socket starting
const socket = io.connect();

socket.on('connect', function(){
    console.log("connected");
});

socket.on('event', function(data) {
    console.log("Data length is " + data.length);
    data.forEach(function(childData){
        var status = ( childData.status ? "Its up" : "Its down");
        var date = new Date(childData.time * 1000);
        document.getElementById("status").innerText = status;
        document.getElementById("time").innerText = date.toTimeString();
        document.getElementById("date").innerText = date.toLocaleDateString();
    });
});

socket.on('disconnect', function(){
    console.log("disconnected")
});