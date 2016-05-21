'use strict'
window.setupCommNet = function (commFrame, commFrameElement) {
}
/*

  var root = 'https://localhost:9091/'
  //var head = document.getElementsByTagName('head')[0]
  //var container = document.createElement('div')
  //container.id = 'comm-net-container'
  //var body = document.getElementsByTagName('body')[0]
  //body.insertBefore(container, body.childNodes[0])
  function onCommNetLoad(event) {
    if (event.data.commNetServerLoaded) {
      console.log('Loaded!')
      window.commServer = event.source
      window.commServerOrigin = event.origin
      //event.source.postMessage({
      //  message: "I just connected brotha",
      //  type: 'js'
      //}, event.origin)
      //event.source.postMessage({
      //  url: root+'dist/foo.js',
      //  type: 'js'
      //}, event.origin)
    }
  }

  function onCommNetJoin(event) {
    if (event.data.commNetJoinedRoom) {
      event.source.postMessage({
        message: "I just connected brotha",
        type: 'js'
      }, event.origin)
    }
  }

  function evalData(event) {
    if (event.data.type == 'css') {
      console.log('Loaded css! url: ' + event.data.url)
    }
    if (event.data.type == 'js') {
      console.log('Loaded javascript! url: ' + event.data.url)
      eval(event.data.data)
      console.log('Got data!')
      //window.MonsterManager.initialize();
      //event.source.postMessage({
      //  url: root+"test.yaml",
      //  type: "yaml"
      //}, event.origin);
    }
    if (event.data.type == 'yaml') {
      console.log('Got yaml!')
      //window.MonsterManager.updateMonsters(event.data.data);
    }
  }

  window.addEventListener('message', onCommNetLoad, false)
  window.addEventListener('message', onCommNetJoin, false)
  window.addEventListener('message', evalData, false)

  //if (window.comm_frame.document) {
  //  window.comm_frame.document.pageLoaded = false;
  //}

  //var iframe = commFrameElement//document.getElementById('comm-frame');

  //var iframe = document.createElement('iframe')
  //iframe.style.display = 'none'
  //iframe.id = 'comm-net-iframe'
  //iframe.src = root + 'index.html'
  commFrame.location.href = root + 'index.html'
  //document.getElementsByTagName('body')[0].appendChild(iframe)

  window.sendMessage = function (message) {
    window.commServer.postMessage({
      message: message
    }, window.commServerOrigin)
  }
}

var head = document.getElementsByTagName('head')[0]
var container = document.createElement('div')
container.id = 'comm-net-container'
var body = document.getElementsByTagName('body')[0]
body.insertBefore(container, body.childNodes[0])

//var iframe = commFrameElement//document.getElementById('comm-frame');

var iframe = document.createElement('iframe')
iframe.style.display = 'none'
iframe.id = 'comm-net-iframe'
//iframe.src = root + 'index.html'
document.getElementsByTagName('body')[0].appendChild(iframe)
setupCommNet(window.frames[0], iframe)

//commFrame.location.href = root + 'index.html'

*/

