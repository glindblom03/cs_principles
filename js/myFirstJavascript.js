// only javascript goes here NO HTML...
alert("Click OK. Trust me bro");
console.log("this is coming from a separate file...")
let myVar = 5;
// allows programmer to send message to console
console.log("my first console message");
console.log(myVar); 

// bool
//x and y control the location of item and text, the width and height control what the text looks like
let playing = true;
let width = 200;
let height = 450;
let y = 34;
let x = 300;
var player1 = "Tim";
const player2 = "Ralph";
//player2 = "tim";

// for loops in js
for (i=0; i<10; i++){
    console.log(i);
}

function draw() {
    // variable that allows the code to look for an element in the html document with and ID of 'canvas'
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(200, 0, 0)';
      //movements defined above that are then put into this draw function
      ctx.fillRect(x, y, width, height);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    }
  }
draw();