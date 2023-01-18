var capchaArea = document.querySelector('.capcha-area'); 
var error = document.querySelector('.error');  
var capArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var capcha = [];
var canvas = document.createElement('CANVAS');
var element = canvas.getContext("2d");


function createCanvas(){
  canvas.height = 50;
  canvas.width = 150;
  element.strokeStyle = "#ddd";
  element.strokeRect(0, 0, 150, 50);
  element.font="20px Arial"
  capchaArea.appendChild(canvas);
  for(var i = 0; i < 6; i++){
     var data = Math.floor(Math.random() * capArray.length);
     capcha.push(capArray[data]);
  }
  element.fillText(capcha.toString().split(',').join(' '), 25,30);
}

     
function createCapcha(){
  const text = document.querySelector('.text').value;  
  if(text == capcha.toString().split(',').join('')){
    error.innerText = 'Link is: https://bit.ly/bzot9gcl';
    error.classList.add("text-success")
   } else{
    error.innerText = 'Wrong code! Please retry!';
    error.classList.remove("text-success") 
    error.classList.add("text-danger")
     
   }

  // create capcha
  capcha = [];
  element.clearRect(0, 0, canvas.width, canvas.height);
  element.strokeRect(0, 0, 150, 50);
  element.clearRect ( 0 , 0 , 0 , 0 );
  for(var i = 0; i < 6; i++){
    var data = Math.floor(Math.random() * capArray.length);
    capcha.push(capArray[data]);
   }
  element.fillText(capcha.toString().split(',').join(' '), 25,30);
}

createCanvas();