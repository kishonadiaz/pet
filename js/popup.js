var htm = document.querySelector('html');
var b = document.querySelector('body');
var cdiv = document.createElement('div');
var opened =  chrome.extension.getBackgroundPage().v;

function sendConnection(val)
{
  var port=chrome.runtime.connect({name:"popup"});
  port.postMessage({popupMessage:val});
  port.onMessage.addListener(function (msg){
    //console.log(msg.passing);
    //port.postMessage({passing:"here"});
     //messgages.innerHTML=msg;
     
    
  });
}

//cdiv.style.width = "300px";
//cdiv.style.height = "300px";
//cdiv.style.backgroundColor="green";
//htm.insertBefore(cdiv,b);
document.body.style.background = 'url("apple.png")';
//chrome.tabs.executeScript(null,{
//  code:'document.body.appendChild("'+cdiv+'")',
//});

function onopen(){
  //
  if(!opened){
    //alert('opened');
    chrome.extension.getBackgroundPage().v = true;
    sendConnection("here");
    chrome.tabs.executeScript({file:"js/workingpage.js"});
  }
}
function charaters(){
  sendConnection("send on click");
    //chrome.tabs.executeScript(null,{
      
      //code:'document.querySelector("html").insertBefore('+div+','+b+')'
    
      //code:'document.body +="'+h+'"'
      //code: 'document.insertBefore('+cdiv+','+b+')'
      
      
    //});
    //chrome.extension.getBackgroundPage().v = true;
    //console.log(chrome.extension.getBackgroundPage().v);
    //document.body.innerHTML = "here";
}
function onlogout(){
  chrome.extension.getBackgroundPage().v = false;
  sendConnection("out");
    chrome.tabs.executeScript({file:"js/workingpage.js"});
}
function main(){
  var c = document.getElementsByTagName('a');
  var m = document.querySelectorAll('a');
  var b = document.querySelector('body');
  //var div = document.createElement('div');
  
  //var h = "here";
  for(var i=0 ; i < m.length; i++){
    console.log(i);
    m.item(i).addEventListener('click',function(e){
      alert(e.target.innerHTML); 
      switch(e.target.innerHTML){
        case "charater":{
          charaters();
          break;
        }
        case "charater clothen":{
          break;
        }
        case "charater stats":{
          break;
        }
        case "log out":{
          onlogout();
          break;
        }
      }
    
      
    });
    
  }
}

onopen();
//chrome.tabs.executeScript({file:"workingpage.js"});
document.addEventListener('DOMContentLoaded',function(){
  main(); 
//  document.body.innerHTML = "here";
});