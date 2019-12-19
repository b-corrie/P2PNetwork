var url = "ws://10.39.160.50:8080/bcdemo";
var url = "ws://127.0.0.1:4646/bcdemo";

var output;

function init () {
  output = document.getElementById ("output");
  //doWebSocket ();

  openApp();
  
}

function send (message) {
  try {
		if (websocket.readyState != 1) {
		console.log("Open Connection first");
				
	}else{
		 //writeToScreen ("Process message flag sent: " + message);
		  websocket.send (message);
	}
	}catch{
		console.log("Open Connection first");
	}
}

// Utitlities

function writeToScreen (message) {
  // var pre = document.createElement ("p");
  // pre.style.wordWrap = "break-word";
  // pre.innerHTML = message;
  // output.appendChild (pre);
}

function hideElement(id){
  var elem = $('#' + id);
  if(!elem.hasClass('hidden')){
    elem.addClass('hidden');
  }
}

function showElement(id){
  var elem = $('#' + id);
  if(elem.hasClass('hidden')){
    elem.removeClass('hidden');
  }
}

// Web Socket

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
  
  if (hasJsonStructure(event.data)){
    $("#admincard").html("<pre><code>" + event.data + "</pre></code>");
    //document.getElementById('admincard').innerHTML = "<pre><code>" + event.data + "</pre></code>";
  }else{
    var div = document.getElementById('journalData');
    div.innerHTML = createJournalData(event.data);
  }

  //writeToScreen ('<span style="color: blue;">Web Socket Response<br> ' + event.data + '</span>');
  //websocket.close ();
}




function hasJsonStructure(str) {
  if (typeof str !== 'string') return false;
  try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === '[object Object]' 
          || type === '[object Array]';
  } catch (err) {
      return false;
  }
}

function onError (event) {
  writeToScreen ('<span style="color: red;">ERROR: ' + event.data + " : " + event.code + '</span>');
}

function onClose (event) {
	writeToScreen ("DISCONNECTED");
	console.log(event);
	websocket.close ();
  
}

// PageFunctions

function openTrans(){
  send('5');
  // window.setTimeout(send('5'), 1);
}

function openJournal(){
  send('5');
  // window.setTimeout(send('5'), 1);
}

function createJournalData(journal){

  console.log(journal);

  var previousEntry = "";
  var entries = journal.split("~");

  var result = '<table><th>Clip</th><th>Street Address</th><th>City</th><th>State</th><th>Zip</th><th>Property Value</th><th>Lender</th><th>Customer</th><tr>';
  entries.forEach(function (entry){

    if (entry !== '' && entry != previousEntry) {
      result += '<tr>';

      var items = entry.split(',');
      
      items.forEach(function (item, index){
      
        if (item !== '') {
                result += '<td>'+ item + '</td>';
        }

      });
        result += '</tr>';
      }
      previousEntry = entry;
    });
    result += '</tr></table>';
  return result;
}

// App Start

function openApp(){
  // document.getElementById('home').addEventListener('click',function(e){
  //   showElement('homecard');
  //   hideElement('journalcard');
  //   hideElement('transcard');
  //   hideElement('admincard');
  //   });

  document.getElementById('journal').addEventListener('click',function(e){
    // hideElement('homecard');
    showElement('journalcard');
    hideElement('transcard');
    hideElement('admincard');
  });

  document.getElementById('trans').addEventListener('click',function(e){
    // hideElement('homecard');
    hideElement('journalcard');
    showElement('transcard');
    showElement('admincard');
  });

  // document.getElementById('admin').addEventListener('click',function(e){
  //   hideElement('homecard');
  //   hideElement('journalcard');
  //   hideElement('transcard');
  //   showElement('admincard');
  // });

  $(document).ready(function() {
    $(".menu").click(function () {
        $(this).addClass("active");
        $(".menu").not(this).removeClass("active");
    });
    
    });

    doWebSocket();
}

window.addEventListener ("load", init, false);