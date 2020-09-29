var htm = document.querySelector('html');

if(htm.children.namedItem('charct') !== null){  
  htm.children.namedItem('charct').remove();
}

window.onunload = function(){
  console.log(document.querySelector('html').childNodes);
}