var url = "ws://10.39.160.50:8080/bcdemo";
var url = "ws://127.0.0.1:4646/bcdemo";

var output;

function init () {
  output = document.getElementById ("output");
  //doWebSocket ();
}

function doWebSocket () {
	
	try {
  websocket = new WebSocket (url);
	}catch (err){
		 console.log('This never prints');
	}
	
  websocket.onopen = function (e) {
    onOpen (e);
  };

  websocket.onmessage = function (e) {
    onMessage (e);
  };

  websocket.onerror = function (e) {
    onError (e);
  };

  websocket.onclose = function (e) {
    onClose (e);
  };
}

function onOpen (event) {
 if (websocket.readyState == 1) {
                console.log("Connection is made");
				 writeToScreen ("CONNECTED");
				 send ("1,ws://127.0.0.1:4646/bcdemo");
   }else{
	    console.log("wait for connection...");
   }
}

function onMessage (event) {
	
	var div = document.getElementById('messages');
    div.innerHTML = event.data;
	
  //writeToScreen ('<span style="color: blue;">Web Socket Response<br> ' + event.data + '</span>');
  //websocket.close ();
}

function onError (event) {
  writeToScreen ('<span style="color: red;">ERROR: ' + event.data + " : " + event.code + '</span>');
}

function onClose (event) {
	writeToScreen ("DISCONNECTED");
	console.log(event);
	websocket.close ();
  
}

function send (message) {
  try {
		if (websocket.readyState != 1) {
		console.log("Open Connection first");
				
	}else{
		 writeToScreen ("Process message flag sent: " + message);
		  websocket.send (message);
	}
	}catch{
		console.log("Open Connection first");
	}
}

function writeToScreen (message) {
  var pre = document.createElement ("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild (pre);
}

window.addEventListener ("load", init, false);