
/* Creates the Character Object */
function Coject(width,height){
  this.x=.00;
  this.y=.00;
  this.magy=0;
  this.magx = 0;
  this.SPEEED = 0.005;
  this.width = width;
  this.height = height;
  this.background="green";
  this.backgroundSize="30px";
  this.halfWidth = width/3;
  this.halfHeight = height/3;
  this.borders = {"left":false,"right":false,"top":false,"bottom":false}
  this.outside = false;
  
  this.cdiv = document.createElement('div');
  this.cdiv.setAttribute('id','chobochar');
  this.cdiv.style.position = "fixed";
  this.cdiv.style.zIndex = "100000";
  this.movingdir = 0;
  this.style = this.cdiv.style;

  this.canvas = document.createElement('canvas');
  this.canvas.setAttribute('id','chobocanvas');
  this.canvas.style.position = "absolute";
  this.canvas.style.zIndex = "1000000";
  this.cdiv.appendChild(this.canvas);

  this.adventurewindow = document.createElement('div');
  this.adventurepanel = document.createElement('div');

  this.adventurewindow.style.position = "fixed";
  this.adventurewindow.style.zIndex = "100000000000000000";
  this.adventurewindow.setAttribute("id","venturewin");

  this.adventurewindow.appendChild(this.adventurepanel);

  this.self = this;

  this.move = function(x,y,magx,magy){
    this.magx = magx;
    this.magy = magy;
    this.x = ((x)*this.magx);
    this.y = ((y)*this.magy);
    this.cdiv.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    this.self.update();
  };
  this.magitude =function(x,y,magx,magy){
    this.magx = magx;
    this.magy = magy;
    //console.log(this.y,"k");
    this.x = ((x)*this.magx)+this.x;
    this.y = ((y)*this.magy)+this.y;
  
    this.cdiv.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    
    this.self.update();
  }

  this.autoupdate = function(x,y,func){
    this.x = x;
    this.y = y;
    func(this.x,this.y);
  }
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

  this.keypress = function(event,func){
    func(event,this.self);
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
    return this.cdiv.getClientRects();
  };
  this.bondaries = function(html,display){
    //console.log(html.getBoundingClientRect(), c.cdiv.getBoundingClientRect());
    //console.log(display);
  /*{"x":xtext,"y":ytext,"left":leftwall,"right":rightwall,"top":topwall,"bottom":bottomwall}*/  
    var xch = (this.width/3)+c.x;
    var ych = (this.height/3)+c.y;
    //halfway -=  this.halfWidth;
    //display["outside"].value = `"html x ,${(html.getBoundingClientRect().x)}, pet ${xch}"`;
    display["x"].value=`"html x ,${(html.getBoundingClientRect().x)}, pet x  ${xch}"`;
    display["y"].value=`"html x ,${(html.getBoundingClientRect().x)}, pet y  ${ych}"`;
    if(xch <= html.getBoundingClientRect().left){
      //console.log("touched left");
      this.borders["left"] = true;
    }else{
      this.borders["left"] = false;
    }
    if(xch >= (html.getBoundingClientRect().right-this.halfWidth)){
      //console.log("touched right");
      this.borders["right"] = true;
    }else{
      this.borders["right"] = false;
    }
    if(ych < html.getBoundingClientRect().top){
      this.borders["top"] = true;
    }else{
      this.borders["top"] = false;
    }
    if(ych >= (html.getBoundingClientRect().bottom-this.halfWidth)){
      //console.log("touched bottom");
      this.borders["bottom"] = true;
    }else{
      this.borders["bottom"] = false;
    }


    // if(xch <= html.getBoundingClientRect().left-1000){
    //   //console.log("touched left");
    //   this.borders["left"] = true;
    // }else{
    //   this.borders["left"] = false;
    // }

    // if(xch >= (html.getBoundingClientRect().right-this.halfWidth+1000)){
    //   //console.log("touched right");
    //   this.borders["right"] = true;
    // }else{
    //   this.borders["right"] = false;
    // }

  }

  this.outofbounds = function(htm){
    if(xch <= html.getBoundingClientRect().left-this.width){
      //console.log("touched left");
      this.borders["left"] = true;
    }else{
      this.borders["left"] = false;
    }
    if(xch >= (html.getBoundingClientRect().right-this.halfWidth)+this.width){
      //console.log("touched right");
      this.borders["right"] = true;
    }else{
      this.borders["right"] = false;
    }
    if(ych < html.getBoundingClientRect().top-this.height){
      this.borders["top"] = true;
    }else{
      this.borders["top"] = false;
    }
    if(ych >= (html.getBoundingClientRect().bottom-this.halfWidth)+this.height){
      //console.log("touched bottom");
      this.borders["bottom"] = true;
    }else{
      this.borders["bottom"] = false;
    }
  }

  this.AI = function(htm,display,func){
    display["left"].value = this.borders["left"];
    display["right"].value = this.borders["right"];
    display["top"].value = this.borders["top"];
    display["bottom"].value = this.borders["bottom"];
    func(this.self);
  }
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
var img = chrome.extension.getURL("assets/dog_1.gif");

c.background = 'url("'+img+'") center no-repeat';
c.backgroundSize= "200px";

c.update();

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

var xtext = document.createElement("input")
var ytext = document.createElement("input")

var leftwall = document.createElement("input");
var rightwall = document.createElement("input");
var topwall = document.createElement("input");
var bottomwall = document.createElement("input");
var charteroutside = document.createElement("input");

var display = {"x":xtext,"y":ytext,"left":leftwall,"right":rightwall,"top":topwall,"bottom":bottomwall,"outside":charteroutside}

var obj = Object.entries(display);

function sendConnection(val,func)
{
  var port=chrome.runtime.connect({name:"workingpage"});
  port.postMessage({workingMessage:val});
  port.onMessage.addListener(function (msg){
    k = msg.backgrounds;
    
    if(k !== undefined){
      if(k===true){
        rn = k;
        doitonce = true;
      }else if(k === false){
        rn= k;
      }
    }

    func(k);  
  });
}

// function interval(func, wait, times){
//     var run;
//     var interv = function(w, t){
//         return function(){
//             if(typeof t === "undefined" || t-- > 0){
//                 setTimeout(interv, w);
//                 try{
//                     func.call(null);
//                 }
//                 catch(e){
//                     t = 0;
//                     console.log(e.toString());
//                     throw e.toString();
//                 }
//             }
//         };
//     }(wait, times);

//     setTimeout(interv, wait);
// };

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
    if(c.cdiv.getClientRects()[0].left <= htm.getClientRects()[0].left){
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
}
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
var randx, randy;
var xaction =0, yaction=0;




var thinking = setInterval(function(){
  console.log("here in thinking");
  //randActions = Math.floor((Math.random() * 4 ));
   setTimeout(function(){
      display["outside"].value = "dd"
      randx = Math.floor((Math.random() * 3 ));
      randy = Math.floor((Math.random() * 3 ));

      switch(randx){
        case 0:{
          xaction = 0;
          break;
        }
        case 1:{
          xaction = 1;
          break;
        }
        case 2:{
          xaction = -1;
          break;
        }
      }
      switch(randy){
        case 0:{
          yaction = 0;
          break;
        }
        case 1:{
          yaction = 1;
          break;
        }
        case 2:{
          yaction = -1;
          break;
        }
      }
      
    },1000)
},9000)

 // interval(function(){
 //  if(doitonce != undefined){
 //    if(doitonce){
 //      htm.insertBefore(cdiv,b);
 //    }
 //  }
 //  console.log("skjhh");
 // }, 10, 2000);
// var textnode = document.createElement("input");
// b.appendChild(textnode);
var contentself = this;
sendConnection('here too',function(k){
  if(rn != undefined){

    if(rn){
      if(doitonce != undefined){
        if(doitonce){
          htm.insertBefore(c.cdiv,b);
          htm.insertBefore(c.adventurewindow,b);
          console.log(contentself);
          if(!visible){
            visible = true;
          }

          for(var [i,elem] of obj){
            // if (obj.hasOwnProperty(elem)) {
            //   // Do things here
            // }
            //console.log(i, elem);
            elem.setAttribute("class","diag");
            elem.style.zIndex = "1000000000000000!important";
            if(doitonce){
              htm.insertBefore(elem,b);
            }
          }
        }
      }

    }else{

      /* This is where the object is removed */
      thisX = 0;
      thisY = 0;
      if(c.cdiv !== undefined ||c.cdiv != null){
        
        if(htm.children.namedItem('charct') !== null){  
          htm.children.namedItem('charct').remove();
          c.cdiv.remove();
        }
         
      }

      if(c.adventurewindow !== undefined ||c.adventurewindow != null){
        
        if(htm.children.namedItem('venturewin') !== null){  
          htm.children.namedItem('venturewin').remove();
          c.adventurewindow.remove();
        }
         
      }
      alert("d");
      // for(var [i,elem] of obj){
      //   console.log(elem);
      //   if(htm.children.namedItem('diag') !== null){
      //     alert("dsfh");
      //     htm.children.namedItem('diag').remove();
      //   }

      //   htm.removeChild(elem);
      //   //elem.remove();

      // }

      // for(var i of htm.document.childNodes){
      //   for(var j of i.document.childNodes){
      //     if(j.cla)
      //   }
      // }



      
    }

  }
});

var count =0;
var visible = false;
var thisself = this;

c.x=0;
c.y=0;



randActions = 1;
// xaction = -1;
var runnning = setInterval(function(){
  thisX = c.x;
  thisY = c.y;
  
  if(visible){

    //c.move(thisX++,thisY++,0,1);
    // c.autoupdate(thisX,thisY,function(x,y){
    //   thisX = x;
    //   thisY = y;

    // });
     /*Tells what direction pet is facing*/
    direction = c.direction(right,up);

    c.bondaries(htm,display);
    c.AI(htm,display,function(callback){
      //console.log(callback.borders);
      if(callback.borders["left"]){
        c.move(thisX,thisY,1,1)
      }else
      if(callback.borders["right"]){

      }else
      if(callback.borders["top"]){

      }else
      if(callback.borders["bottom"]){

      }else{
        if(randActions===1){
          
          display["outside"].value = xaction;
          
          // c.x++;
          // c.y++;
        }
      }
      if(randActions === 0){
         
      }else{
        if(xaction === 0){
          c.x = thisX;
          thisX = c.x;
        }else
        if(xaction === 1){
          //thisX = thisX+1;
          thisX++;
          c.x = thisX;
        }else
        if(xaction === -1){
          //thisX = thisX-1;
          thisX--;
          c.x -= thisX;
        }

        if(yaction === 0){
          c.y = thisY;
          thisY = c.y;
        }else
        if(yaction === 1){
          //thisX = thisX+1;
          thisY++;
          c.y = thisY;
        }else
        if(yaction === -1){
          //thisX = thisX-1;
          thisY--;
          c.y -= thisY;
        }
      }
      if(c.x < htm.getBoundingClientRect().left-1600){
        thisX = htm.getBoundingClientRect().left-1600;
        c.x = thisX;
        console.log("ouside left");
      }
      console.log(htm.getBoundingClientRect().right-callback.halfWidth)
      if(c.x >= (htm.getBoundingClientRect().right-callback.halfWidth)+1600){
        console.log("ouside right");
       thisX = (htm.getBoundingClientRect().right-callback.halfWidth)+1600;
       c.x = thisX;
      }
      if(c.y < htm.getBoundingClientRect().top-1600){
        thisY = htm.getBoundingClientRect().top-1600;
        c.y = thisX;
        console.log("ouside top");
      }
      if(c.y >= (htm.getBoundingClientRect().bottom-callback.halfHeight)+1600){
        console.log("ouside bottom");
       thisY = (htm.getBoundingClientRect().bottom-callback.halfHeight)+1600;
       c.y = thisY;
      }
      c.move(thisX,thisY,1,1);
      
      c.update();

    });
    //c.thisX = thisX;
    //c.thisY = thisY;
  }else{

    setTimeout(function(){
         hasKilled = true;
      
         if(hasKilled)
         {  
           clearInterval(runnning);
           //clearInterval(thinking);
         }   
    },1000);
  }
  
  count++;
},10);

document.body.addEventListener('keydown',function(event){
  c.keypress(event,function(key){
    ///console.log(key);
    if(key.key === "w"){

      c.magitude(thisX,thisY,0,1);
      c.y-= 4.01;
      
    }
    if(key.key === "s"){

      c.magitude(thisX,thisY,0,1);
      c.y+= 4.01;
    }
    if(key.key === "d"){
      c.magitude(thisX,thisY,1,0);
      c.x+= 4.01;
    }
    if(key.key === "a"){
      c.magitude(thisX,thisY,1,0);
      c.x-= 4.01;
    }
    //console.log(c.x,"x",c.y,"y");
  });
  //alert("sdf");
});


// var runnning =
// setInterval(function(){
//   rand = Math.floor((Math.random() * 5 ));
  
//   fpss = fps.getFPS();
//   if(rn !== undefined){
//     if(rn === true){
//       if(doitonce != undefined){
//         if(doitonce){
//           //htm.insertBefore(c.cdiv,b);
//           htm.appendChild(c.cdiv);
//         }
//         /* This is the movment of the character */
//         c.move((thisX)+1,(thisY)+1);
//         /*Tells what direction pet is facing*/
// 		direction = c.direction(right,up);
//         //console.log(fpss);
//         console.log(c.comeback());
        
//         if(randActions === 0){
//           rand = Math.floor((Math.random() * 5 ));
//           console.log('waiting');
          
//         }else if(randActions === 1){
        
//           fullscreenpatrol();
//           thisX = thisX + (right * 1);
//           thisY =  thisY + (up * 1);
//           console.log('walking around');
        
//         }else if(randActions === 2){
        
//           borderPatrol();
//           thisX = thisX + (right * 1);
//           thisY =  thisY + (up * 1);
//           console.log('going around boarder');
        
//         }else if(randActions === 3){
        
//           borderPatrolreversed();
//           thisX = thisX + (right * 1);
//           thisY =  thisY + (up * 1);
//           console.log('going backwards around boarder');
        
//         }
        
        
//         // if(c.y > htm.getClientRects()[0].bottom){
//         //   console.log('here');
//         //   //clearTimeout(walkingouttimer);
//         //   walkingouttimer = setTimeout(function(){
//         //     if(c.y > htm.getClientRects()[0].bottom){
//         //       console.log('here so');
//         //       up = -1;
//         //       right = 0;
//         //       thisX = thisX + (right * 1);
//         //       thisY =  thisY + (up * 1);
              
//         //     }
//         //   },1000);
//         // }
        
       
        
//       }
//       //console.log("running" + k);
//     }else if(rn === false){
	  
// 	  /* This is where the object is removed */
//       thisX = 0;
//       thisY = 0;
    
//       if(c.cdiv !== undefined ||c.cdiv != null){
        
//         if(htm.children.namedItem('charct') !== null){  
//           htm.children.namedItem('charct').remove();
//           c.cdiv.remove();
         
//         }

//       }
    
// 		setTimeout(function(){
// 		  hasKilled = true;
		 
// 		  if(hasKilled)
// 		  {  
//   			clearInterval(runnning);
//   			clearInterval(thinking);
// 		  }
// 		},1000);
        
//     }
//     //console.log(fpss);
//   }
  
// },10);

  
