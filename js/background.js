var v = false;
var character = false;
var port;
function connection()
{
  var passing;
  chrome.runtime.onConnect.addListener(function (ported){
  this.port = ported;
    if (ported.name === "popup"){
      ported.onMessage.addListener(function(msg){
//        setInterval(function (){setpopmsg(msg.popupMessage);},100);
        console.log(msg.popupMessage);
        passing = msg.popupMessage;
      });
      
    }
    if(ported.name === "workingpage"){
      ported.onMessage.addListener(function(msg){
        
        console.log(msg.workingMessage);
        if(passing != null || passing != undefined){
          ported.postMessage({backgrounds:v});
        }
      });
    }
  });
}

connection();
//chrome.tabs.executeScript( {file:"workingpage.js"});
//chrome.browserAction.onClicked.addEventListener(function(tab){
//  chrome.storage.sync.get('state',function(data){
//    if(data.state ==='on'){
//      chrome.storage.sync.set({state:'off'});
//    }else{
//      chrome.storage.sync.set({state:'on'});
//    }
//  });
//  
//});
chrome.runtime.onMessage.addListener(function (response,sender,sendResponse){  
  //console.log(response);
  
  //update();
  alert(newResponse);
});