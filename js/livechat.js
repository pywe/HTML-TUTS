
  document.querySelector('#msg').focus();
  document.querySelector('#msg').onkeyup = function(e) {
      if (e.keyCode === 13) {  // enter, return
          document.querySelector('#submit').click();
      }
  };
document.querySelector('#submit').onclick = function(e) {
      var query = document.querySelector('#msg').value;
      if (query === ""){
        alert("Enter a message")
      }
      else{
        sendNewMsg(query,thisuser['username'],otheruser['username']);
        document.querySelector('#msg').value = ""
      }

      }
window.onload = function Load(){
message();
}
function updateOnline() {
var x = navigator.onLine;
  const obj = {status:x,username:thisuser['username']}
//   document.getElementById("status").innerHTML = "Online";
//   tell other browser
var url = "https://www.pywe.org/accounts/update_online/"
const http = new XMLHttpRequest();
              http.open('POST', url);
              http.setRequestHeader('Content-type', 'application/json');
              // http.setRequestHeader('Authentication','id_token');
              http.send(JSON.stringify(obj));
              http.onload = function() {
          var resp = http.responseText;
          var json_resp = JSON.parse(resp);
          // console.log(json_resp);

              }

}

function checkOnline() {
var x = navigator.onLine;
  const obj = {username:otheruser['username']}

//   ask other browser
var url = "https://www.pywe.org/accounts/check_online/"
const http = new XMLHttpRequest();
              http.open('POST', url);
              http.setRequestHeader('Content-type', 'application/json');
              // http.setRequestHeader('Authentication','id_token');
              http.send(JSON.stringify(obj));
              http.onload = function() {
          var resp = http.responseText;
          var json_resp = JSON.parse(resp);
          // console.log(json_resp);
          document.getElementById("status").innerHTML = json_resp['status'];

              }

}


function receiveNewMsg(){
var url = "https://www.pywe.org/messageapi/Message/?username="+thisuser['username']+"&api_key="+apikey+"&otheruser="+otheruser['username']
const http = new XMLHttpRequest();
              http.open('GET', url);
              http.setRequestHeader('Content-type', 'application/json');
              // http.setRequestHeader('Authentication','id_token');
              http.send();
              http.onload = function() {
          var resp = http.responseText;
          var json_resp = JSON.parse(resp);
          var msgs = json_resp['objects']
          if (msgs.length > 0){
            for (i = 0; i < msgs.length; i++){
              if (ids.includes(msgs[i]['message_id'])){

              }
              else{
              var msg = msgs[i]['content']
              var msg_id = msgs[i]['message_id']
              var time = msgs[i]['date_sent']
              var username = msgs[i]['from_user']
              if (username === thisuser['username']){
                var user = thisuser;
                  }
              else{
                var user = otheruser;
                  }
              // var avatar = "w3images/avatar_g2.jpg"
              msgbox.innerHTML += constmsg(msg,time,user);
              ids.push(msg_id);
              window.scrollTo(0,document.querySelector("#chatbox").scrollHeight);
                }
        }

    }
  }
}

function sendNewMsg(msg,t_user,o_user){
// Adding message to the box
var d = new Date(); // for now
// d.getSeconds();
var time = d.getHours() + ":" + d.getMinutes();
msgbox.innerHTML += constmsg(msg,time,thisuser)
window.scrollTo(0,document.querySelector("#chatbox").scrollHeight);
const obj = {content:msg,
from_user:t_user,
to_user:o_user
}
var url = "https://www.pywe.org/messageapi/Message/?username="+thisuser['username']+"&api_key="+apikey
const http = new XMLHttpRequest();
              http.open('POST', url);
              http.setRequestHeader('Content-type', 'application/json');
              // http.setRequestHeader('Authentication','id_token');
              http.send(JSON.stringify(obj));
              http.onload = function() {
          var resp = http.responseText;
          var json_resp = JSON.parse(resp);
          // console.log(resp)
          msg_id = json_resp['message_id']
          // add sent message id to the ids
          if (ids.includes(msg_id)){

          }else{
            ids.push(msg_id)
            }
          //   console.log(ids)
          }
        }

        function constmsg(msg,time,user){
            if (user === thisuser){
              var pos = "time-right";
              var color = "container"
              var right;
              var avatar_alt = "You";
              var msg_align =' class="left"';
            }
            else {
              var pos = "time-left";
              var color = "container darker";
              var right = ' class="right"';
              var avatar_alt = user['username'];
              var msg_align = ' class="right"'
            }
            var avatar = user['avatar']
            return `<div class="`+color+`">
                  <img src="`+avatar+`" alt="`+avatar_alt+`"`+right+` style="width:100%;">
                  <p`+msg_align+`>`+msg+`</p>
                  <span class="`+pos+`">`+time+`</span>
                  </div>`
          }

function message(){
              msgbox.innerHTML = ""
              head.innerHTML = otheruser['username'];
              var state = false;
              var url = "https://www.pywe.org/messageapi/Message/?username="+thisuser['username']+"&api_key="+apikey+"&otheruser="+otheruser['username']
              // console.log("called signUp function...")
              const http = new XMLHttpRequest();
              http.open('GET', url);
              http.setRequestHeader('Content-type', 'application/json');
              // http.setRequestHeader('Authentication','id_token');
              // http.send(JSON.stringify(info));
              http.send() // Make sure to stringify

          http.onload = function() {
          state = true;
          var resp = http.responseText;
          var json_resp = JSON.parse(resp);
          // console.log(json_resp)
          // You can now use the response for what you want


          msgs = json_resp['objects']
          console.log(msgs)
          if (msgs.length > 0){
            for (i = 0; i < msgs.length; i++){

              var msg = msgs[i]['content']
              var msg_id = msgs[i]['message_id']
              var time = msgs[i]['date_sent']
              var username = msgs[i]['from_user']
              if (username === thisuser['username']){
                var user = thisuser;
              }
              else{
                var user = otheruser;
              }
                if (i === 0){
                day = msgs[i]['day'];
                msgbox.innerHTML += `<p style="text-align:center;float:center;">- - - - - - - - - `+day+` - - - - - - - - -</p>`
              }
              else{
                  if(day === msgs[i]['day']){

              }else{
                  day = msgs[i]['day'];
                  msgbox.innerHTML += `<p style="text-align:center;float:center;">- - - - - - - - - `+day+` - - - - - - - - -</p>`
              }

              }
              // var avatar = "w3images/avatar_g2.jpg"
              msgbox.innerHTML += constmsg(msg,time,user);
              ids.push(msg_id);
              }
            }
          //   else{
          //      msgbox.innerHTML += "<p>No Messages</p>"
          //   }
            var typing = document.getElementById("typing").style.display = "block";
//              document.querySelector("#chatbox").innerHTML += `<div id="typing" style="bottom:0">
//     <textarea id="msg" placeholder="Your Message Here"></textarea>
//     <button id="submit" class="btn success">Send</button>
// </div>`

            // window.scrollTo(0,document.querySelector("#chatcontainer").scrollHeight);
            // window.scrollTo(0,document.body.scrollHeight);
            // var scrollingElement = (document.scrollingElement || document.body);
            // scrollingElement.scrollTop = scrollingElement.scrollHeight;
            var container = document.querySelector("#chatinbox");
            var containerHeight = container.clientHeight;
            var contentHeight = container.scrollHeight;
            container.scrollTop = contentHeight - containerHeight;
            setInterval(receiveNewMsg,3000);
            setInterval(checkOnline,15000);
            setInterval(updateOnline,5000);
          }
      }