
/* Creates the Character Object */
function Coject(width,height){
  this.x=1.00;
  this.y=1.00;
  this.width = width;
  this.height = height;
  this.background="green";
  this.backgroundSize="30px";
  
  this.cdiv = document.createElement('div');
  this.cdiv.setAttribute('id','charct');
  this.cdiv.style.position = "fixed";
  this.cdiv.style.zIndex = "100000000000000000";
  this.movingdir = 0;
  this.style = this.cdiv.style;
  this.move = function(x,y){
    this.x = x;
    this.y = y;
    this.cdiv.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    //
  };
  this.direction = function(dirX,dirY){
    var result = "";
    if(dirX === 1 && dirY ===0){
      //console.log('right');
      result = "right";
    }else if(dirX === -1 && dirY === 0){
      //console.log('left');
      result = "left";
    }else if(dirX === 0 && dirY === 1){
      //console.log('down')
      result = "down";
    }else if(dirX === 0 && dirY === -1){
      //console.log('up');
      result = "up";
    }
    return result;
    
  }
  this.getCdiv =function(){
	  return this.cdiv;
  }
  this.setbackgroundSize = function(val){
	  this.cdiv.style.backgroundSize = val;
  }
  this.getStyle = function(){
	  return this.cdiv.style;
  }
  this.comeback = function(){
    return this.x;
  };
  
  this.update = function(){
    this.x = this.x;
    this.y = this.y;
    this.cdiv.style.width = this.width+"px";
    this.cdiv.style.height = this.height+"px";
    this.cdiv.style.background = this.background;
	this.cdiv.style.backgroundSize = this.backgroundSize;
	//this.cdiv.style = this.style;
  };
  this.update();
 
}

var htm = document.querySelector('html');
var b = document.querySelector('body');
var cdiv = document.createElement('img'); 
var k,rn;
var doitonce = false;
var c = new Coject(300,300);
var img = chrome.extension.getURL("apple.png");
//c.cdiv.style.background = "url("+img+")";
//c.cdiv.src =  "./apple.png";
console.log(img);
//c.background = 'url("apple.png") center no-repeat';
c.background = 'url("'+img+'") center no-repeat';
c.backgroundSize= "90px";
c.update();

cdiv.style.position = "fixed";
cdiv.style.width = "300px";
cdiv.style.height = "300px";
cdiv.src=img;
//cdiv.style.backgroundColor='url("walking_right.png")';
cdiv.setAttribute('id','chracs');
cdiv.style.transform = "tanslate(1em,5em)"; 

//htm.insertBefore(cdiv,b);
 //document.body.innerHTML = "here";
//console.log(chrome);
var fps = {	startTime : 0,	
          frameNumber : 0,	
          getFPS : function(){
            this.frameNumber++;		
            var d = new Date().getTime(),			
            currentTime = ( d - this.startTime ) / 1000,
            result = Math.floor( ( this.frameNumber / currentTime ) );		
            if( currentTime > 1 ){			
              this.startTime = new Date().getTime();			
              this.frameNumber = 0;		
            }		
            return result;	
          }	
      };
  
function movement(x,y,xff,yff){
  var xmov=x,ymov=y;
//  if(x <= document.clientWidth && x >= 0){
//    x += x * xff;
//  
//    console.log('here');
//  }
//  else if(x < 0){
//    x = 0;
//  }else if(x > document.clientWidth){
//    x = (document.clientWidth);
//    alert('here');
//  }
  if(x <0){
    x = 0;
  }
  if(x >=0){
    x++;
    if( x >= (document.offsetWidth - cdiv.offsetWidth))
    {
      console.log('here');
    }
  }
  
//  if(x <0){
//    xmov = 0;
//  }else if(x > document.clientWidth){
//    xmov = ((document.clientWidth)- xff); 
//  }
//  else if(x >0 && x< document.clientWidth){
//    console.log('here');
//    xmov = x++;
//  }
  y += y * yff;
  cdiv.style.transform = "translate("+x+"px,"+y+"px)";
  
  y++;
  return {X:x,Y:y}
}
function direction(directX,directY){
  var dir = ""
  if(directX == 1){
    
  }
}
function sendConnection(val)
{
  var port=chrome.runtime.connect({name:"workingpage"});
  port.postMessage({workingMessage:val});
  port.onMessage.addListener(function (msg){
    //alert(msg.backgrounds);
    k = msg.backgrounds;
    //console.log(msg.passing);
    //port.postMessage({passing:"here"});
     //messgages.innerHTML=msg;
      //alert(msg.popupMessage);
    if(k !== undefined){
  
      if(k===true){
//        console.log("heres");
        
        rn = k;
        doitonce = true;
      }else if(k === false){
//        console.log(k);
        rn= k;
      }

    }
     
    
  });
}
sendConnection('here too');

function borderPatrol(){
  
  if(c.cdiv.getClientRects()[0].right === htm.getClientRects()[0].right){
    right = 0;
    up = 1;
  }
  
  

  if(c.cdiv.getClientRects()[0].left <= htm.getClientRects()[0].left ){
   
    right = 0;
    up = 1
  }
 

  if(c.cdiv.getClientRects()[0].top <= htm.getClientRects()[0].top){
    if(c.cdiv.getClientRects()[0].right === htm.getClientRects()[0].right){
      up = 1;
      right = 0;
    }
    if(c.cdiv.getClientRects()[0].left === htm.getClientRects()[0].left ){
      up = 1;
      right = 0;
    }
    
  }

  if(c.cdiv.getClientRects()[0].bottom === htm.getClientRects()[0].bottom){
    //up = -1;
    up = 0;
    right = -1;
    if(c.cdiv.getClientRects()[0].left <= htm.getClientRects()[0].left ){
      right = 0;
      up=-1;
    }
  }
 
}


function borderPatrolreversed(){
  if(direction == "right"){
    right = 0;
    up = 1;
  }
  if(c.cdiv.getClientRects()[0].right === htm.getClientRects()[0].right){
    right = 0;
    up = -1;
  }
  
  

  if(c.cdiv.getClientRects()[0].left <= htm.getClientRects()[0].left ){
   
    right = 0;
    up = 1;
  }
 

  if(c.cdiv.getClientRects()[0].top <= htm.getClientRects()[0].top){
    if(c.cdiv.getClientRects()[0].right === htm.getClientRects()[0].right){
      up = 0;
      right = -1;
    }
    if(c.cdiv.getClientRects()[0].left <= htm.getClientRects()[0].left ){
      up = 1;
      right = 0;
    }
    
  }

  if(c.cdiv.getClientRects()[0].bottom === htm.getClientRects()[0].bottom){
    //up = -1;
    up = 0;
    right = 1;
    if(c.cdiv.getClientRects()[0].right === htm.getClientRects()[0].right ){
      up = -1;
      right = 0;
    }
  }
 
}


function fullscreenpatrol(){
  if(c.cdiv.getClientRects()[0].right === htm.getClientRects()[0].right){
    right = 0;
    //right = -1;
    
    if(rand == 0){
      right = 0;
      up = 0;
    }
    if(rand == 1){
      right = -1
    }else if(rand == 2){
      up = 1
    }else if(rand == 3){
     
      right = 0;
    }else if(rand == 4){
      up = -1;
    }


  //          if(c.cdiv.getClientRects()[0].right === htm.getClientRects()[0].right){
  //            right = -1;
  //          }
  }
  
  if(c.x > htm.getClientRects()[0].right){
    right = -1;
  }

  if(c.cdiv.getClientRects()[0].left <= htm.getClientRects()[0].left ){
    //right = 1;
    right = 0;
    if(rand == 0){
      right = 0;
      up = 0;
    }
    if(rand == 1){
      right = 0;
    }else if(rand == 2){
      up = -1;
    }else if(rand == 3){
      //console.log('here in 3');
      right = 1;
    }else if(rand == 4){
      up = 1;
    }

    //thisX = htm.getClientRects()[0].left;
  //          if(c.cdiv.getClientRects()[0].left < htm.getClientRects()[0].left ){
  //            right = 1;
  //          }
  }
  if(c.x < htm.getClientRects()[0].left ){
    right = 1;
  }

  if(c.cdiv.getClientRects()[0].top <= htm.getClientRects()[0].top){
    //up= 1
    up = 0;
    if(rand == 0){
      right = 0;
      up = 0;
    }
    if(rand == 1){
      right = -1;
    }else if(rand == 2){
      up = 0;
    }else if(rand == 3){
    
      right = 1;
    }else if(rand == 4){
      up = 1;
    }

  }
  if(c.y > htm.getClientRects()[0].top){
    up = 1;
  }

  if(c.cdiv.getClientRects()[0].bottom === htm.getClientRects()[0].bottom){
    //up = -1;
    up = 0;
    if(rand == 0){
      right = 0;
      up = 0;
    }
    if(rand == 1){
      right = -1;
    }else if(rand == 2){
      up = -1;
    }else if(rand == 3){
 
      right = 1;
    }else if(rand == 4){
      up = -1;
      
    }

  }
  if(c.y > htm.getClientRects()[0].bottom){
    up = -1;
  }
  
//  if(c.y > htm.getClientRects()[0].bottom + 200){
//	 up=-1; 
//  }

}

//alert(window.outerWidth);
var x = 0;
var y = 0;
var thisX= 0,thisY = 0;
var right = 1;
var up = 0;
var rand = 0;
var randActions = 0;
var fpss =0;
var timeout;
var dothiswhilewaiting;
var hasKilled = false;
var direction="";
var walkingouttimer; 
var startoff = false;




var thinking = setInterval(function(){
  console.log("here in thinking");
  randActions = Math.floor((Math.random() * 4 ));
},9000)


var runnning =
setInterval(function(){
  rand = Math.floor((Math.random() * 5 ));
//  timeout = setTimeout(function(){
//    
//    randActions = Math.floor((Math.random() * 2 ));
//    console.log(randActions);
//  },9000);
  
  
  
  fpss = fps.getFPS();
  if(rn !== undefined){

    if(rn === true){
      if(doitonce != undefined){
        //clearTimeout(walkingouttimer);
        //console.log("heresd");
        if(doitonce){
          //htm.insertBefore(c.cdiv,b);
          
          htm.insertBefore(c.cdiv,b);
        
          //document.body.appendChild(c.cdiv);
          //console.log("heret");
          //console.log(document.querySelector('html').clientWidth);
          
        }
        //x = movement(x,0,1,1).X;
        /* This is the movment of the character */
        c.move((thisX)+1,(thisY)+1);
		direction = c.direction(right,up);
        //console.log(fpss);
        console.log(c.comeback());
        
        //fullscreenpatrol();
        //borderPatrolreversed();
        //borderPatrol();
        
        
//        if(randActions === 0){
//          
//         
//         
//            right = 0;
//            up = 0;
//            console.log('waiting')
//          
//        }else if(randActions === 1){
//          console.log('not waiting');
//          fullscreenpatrol();
//          thisX = thisX + (right * 1);
//          thisY =  thisY + (up * 1);
//        
//        }
        //
        if(randActions === 0){
          rand = Math.floor((Math.random() * 5 ));
          console.log('waiting');
          
        }else if(randActions === 1){
        
          fullscreenpatrol();
          thisX = thisX + (right * 1);
          thisY =  thisY + (up * 1);
          console.log('walking around');
        
        }else if(randActions === 2){
        
          borderPatrol();
          thisX = thisX + (right * 1);
          thisY =  thisY + (up * 1);
          console.log('going around boarder');
        
        }else if(randActions === 3){
        
          borderPatrolreversed();
          thisX = thisX + (right * 1);
          thisY =  thisY + (up * 1);
          console.log('going backwards around boarder');
        
        }
        
        
        if(c.y > htm.getClientRects()[0].bottom){
          console.log('here');
          //clearTimeout(walkingouttimer);
          walkingouttimer = setTimeout(function(){
            if(c.y > htm.getClientRects()[0].bottom){
              console.log('here so');
              up = -1;
              right = 0;
              thisX = thisX + (right * 1);
              thisY =  thisY + (up * 1);
              
            }
          },1000);
        }
        
       
        
      }
      //console.log("running" + k);
    }else if(rn === false){
	  
	  /* This is where the object is removed */
      thisX = 0;
      thisY = 0;
    
      if(c.cdiv !== undefined ||c.cdiv != null){
        
        if(htm.children.namedItem('charct') !== null){  
          htm.children.namedItem('charct').remove();
          c.cdiv.remove();
         
        }

      }
    
		setTimeout(function(){
		  hasKilled = true;
		 
		  if(hasKilled)
		  {  
			clearInterval(runnning);
			clearInterval(thinking);
		  }
		},1000);
        
    }
    //console.log(fpss);
  }
  
},10);

  
