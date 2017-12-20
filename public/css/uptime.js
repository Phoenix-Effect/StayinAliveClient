//socket starting
const socket = io.connect();

//when socket is connected
socket.on('connect', function(){
    console.log("connected");
});

//when data is recieved
socket.on('event', function(data) {
    console.log("Data length is " + data.length);
    data.forEach(function(childData){
        var status = ( childData.status ? "Its up!" : "Its down");
        var date = new Date(childData.time * 1000);
        addToTable(childData.status, date.toTimeString());
        document.getElementById("status").innerText = status;
        document.getElementById("time").innerText = date.toTimeString();
        document.getElementById("date").innerText = date.toLocaleDateString();
        if(childData.status){
            document.getElementById("statusArrow").className = "fa fa-arrow-up fa-5x";
            document.getElementById("statusArrow").style.color = "green";
        } else{
            document.getElementById("statusArrow").className = "fa fa-arrow-down fa-5x";
            document.getElementById("statusArrow").style.color = "red";
        }


    });
});

//function adds status to table
function addToTable(status, time ){
    var table = document.getElementById("statusTable");
    var row = table.insertRow(1);
    var rowClass = (status ? "success" : "danger");
    var statusText = (status ? "Up" : "Down");
    row.className = rowClass;
    row.insertCell(0).innerHTML = statusText;
    row.insertCell(1).innerHTML = time;
}

//when socket is disconnected
socket.on('disconnect', function(){
    console.log("disconnected")
});