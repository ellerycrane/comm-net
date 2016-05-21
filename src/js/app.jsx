'use strict'
import jQuery from 'jquery'


/**************************** Note **********************************
 Save your api settings like apiKey, defaultRoom and room and save it
 in a file called [config.js]
 *********************************************************************/
var config = {
  apiKey:'21188e14-01c7-4d10-b624-d2e6db1507b3',
  defaultRoom:'TestingItBrotha'
  //forceSSL: true
}

var postMessage = function(msg){
  if (typeof commNetPostMessage !== 'undefined') {
    commNetPostMessage(msg)
  } else {
    console.log("Posting message", msg)
  }
}

var SkylinkDemo = new Skylink();

SkylinkDemo.on('peerJoined', function(peerId, peerInfo, isSelf) {
  var user = 'You';
  console.log("EVENT - peerJoined", {peerId:peerId, peerInfo:peerInfo, isSelf:isSelf})
  if(!isSelf) {
    user = peerInfo ? peerInfo.userData || peerId : peerId;
    var targetItem = document.createElement('option');
    targetItem.id = peerId + '_target';
    targetItem.value = peerId;
    targetItem.innerHTML = 'Send message to ' + peerInfo.userData + ' only';
    document.getElementById('target').appendChild(targetItem);
  } else {
    postMessage({commNetJoinedRoom:true})
    //window.parent.postMessage({commNetJoinedRoom:true}, '*')
  }
  addMessage(user + ' joined the room', 'action');
});

SkylinkDemo.on('peerLeft', function(peerId, peerInfo, isSelf) {
  console.log("EVENT - peerLeft", {peerId:peerId, peerInfo:peerInfo, isSelf:isSelf})
  var user = 'You';
  if(!isSelf) {
    var peerInfo = SkylinkDemo.getPeerInfo(peerId);
    console.info(peerInfo);
    user = peerInfo ? peerInfo.userData || peerId : peerId;
    document.getElementById('target').removeChild(
      document.getElementById(peerId + '_target'));
  }
  addMessage(user + ' left the room', 'action');
});

SkylinkDemo.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {
  console.log("EVENT - incomingMessage", {message:message, peerId:peerId, peerInfo:peerInfo, isSelf:isSelf})
  var user = 'You';
  var messageItem = (message.isDataChannel) ? '[P2P]' : '[Socket]';
  messageItem += (message.isPrivate) ? '<i>(Private)</i>: ' : ': ';
  messageItem += message.content;
  if(!isSelf) {
    var peerInfo = SkylinkDemo.getPeerInfo(peerId);
    user = peerInfo ? peerInfo.userData || peerId : peerId;
  }
  addMessage(user + ': ' + messageItem, isSelf ? 'you' : 'message');
});

SkylinkDemo.init(config, function (error, success) {
  if (success) {
    SkylinkDemo.setUserData('test' + Math.random());
    SkylinkDemo.joinRoom();
    postMessage({commNetServerLoaded:true})
    //window.parent.postMessage({commNetServerLoaded:true}, '*')
  }
});

function setRoom() {
  var input = document.getElementById('room');
  SkylinkDemo.joinRoom(input.value);
}
function setName() {
  var input = document.getElementById('name');
  SkylinkDemo.setUserData(input.value);
}

function sendMessage() {
  var target = document.getElementById('target').value;
  var type = document.getElementById('type').value;
  var input = document.getElementById('message');
  if (type === 'p2p') {
    SkylinkDemo.sendP2PMessage(input.value, (target === 'group') ? null : target);
  } else {
    SkylinkDemo.sendMessage(input.value, (target === 'group') ? null : target);
  }
  input.value = '';
}

function proxySendMessage(msg){
  SkylinkDemo.sendMessage(msg, null);
}

function addMessage(message, className) {
  console.log(`MESSAGE: ${message}`)
  console.log(`CLASSNAME: ${className}`)
  var chatbox = document.getElementById('chatbox'),
    div = document.createElement('div');
  div.className = className;
  div.innerHTML = message;
  chatbox.appendChild(div);
}


window.sendMessage = sendMessage
window.addMessage = addMessage
window.proxySendMessage = proxySendMessage

console.log("iframe Window:")
console.log(window)
console.log("iframe proxy send:")
window.proxySendMessage

function receiveMessage(event) {
  event.preventDefault()
  console.log(event)
  var eventMessage = event.data.message
  if(eventMessage === null){
    console.log("No message - skipping")
  } else {
    proxySendMessage(eventMessage)
  }
  //
  //var eventUrl = event.data.url
  //if(eventUrl == null) {
  //  console.log('No url to load, aborting')
  //} else {
  //  jQuery.ajax({
  //    url: eventUrl,
  //    dataType: 'text'
  //  }).done(function (data) {
  //    console.log('Loaded data from url: '+eventUrl)
  //    event.source.postMessage({data: data, type: event.data.type, url: eventUrl}, event.origin)
  //  })
  //}
}
window.addEventListener('message', receiveMessage, false)
//document.onClick=function(msg){
//  console.log("click message:",msg)
//}
console.log('App!')