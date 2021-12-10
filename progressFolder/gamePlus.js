// global variables

alert("Welcome to Fish Spearing! \n Press 't' on your keyboard to start the timer \n Press 'p' to shoot your speargun")

let canvas;
let ctx;
let timerThen = null
let TILESIZE = 64;
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 12;
let allSprites = [];
let walls = [];
let enemies = [];
let allProjectiles = [];
let playerImage = new Image();
playerImage.src = "../cs_principles/images/scubadiver.png"
let blockImage = new Image();
blockImage.src = "../cs_principles/images/sand.png"
let pewImage = new Image();
pewImage.src = "../cs_principles/images/spear.png"
let enemyImage = new Image();
enemyImage.src = "../cs_principles/images/fish.png"
let deadfishImage = new Image ();
deadfishImage.src = "../cs_principles/images/deadfish.png"

let gamePlan = `

..#@@.@..@..@.@....#..
..#..@...@.@@...@..#..
..#@...@.@...@.....#..
..#.@.@..@..@...@..#..
..#................#..
..#................#..
..#......#..#......#..
..#...#.......#....#..
..#................#..
..#................#..
..##################..`;

//..#................#..
//..#................#..
//..#................#..
//..#........@.......#..
//..#................#..
//..#................#..
//..#......#..#......#..
//..#...#.......#....#..
//..#................#..
//..#................#..
//..##################..`;





// get user input from keyboard
let keysDown = {};
let keysUp = {};







    //  let delta = now - timerThen;
  //  return delta*0.001;




//setTimer = timer(0);

//if (timerOn = true){
//    timer = 0;
//}

// let mouseCoords = [];
// let rect = canvas.getBoundingClientRect();
// addEventListener('mousedown', mouseClick);

// function mouseClick(e) {
//     console.log(`
//     Screen X/Y: ${e.screenX}, ${e.screenY}
//     Client X/Y: ${e.clientX - rect.left}, ${e.clientY - rect.top}`);
//     mouseCoords = [e.clientX - rect.left, e.clientY - rect.top];
//     console.log("mouse coords array " + mouseCoords);
//     player1.frost();
// }

addEventListener("keydown", function (event) {
    // keysDown = {};
    keysDown[event.key] = true;
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysUp[event.key] = true;
    delete keysDown[event.key];
    // console.log(event);
}, false);

function drawText(r, g, b, a, font, align, base, text, x, y) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = base;
    ctx.fillText(text, x, y);
}

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    timeA=new Date(); // set time as a value
    document.body.appendChild(canvas);
    gameLoop();
}



class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.spliced = false;
        allSprites.push(this);
    }
    get cx() {
        return this.x + this.w * 0.5;
    }
    get cy() {
        return this.y + this.h * 0.5;
    }
    get left() {
        return this.x
    }
    get right() {
        return this.x + this.w
    }
    get top() {
        return this.y
    }
    get midtop() {
        return this.y + this.w * 0.5;
    }
    get bottom() {
        return this.y + this.h
    }
    get midbottom() {
        return (this.y + this.h) + this.w * 0.5
    }
    get type() {
        return "sprite";
    }
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    collideWith(obj) {
        if (this.x + this.w >= obj.x &&
            this.x <= obj.x + obj.w &&
            this.y + this.h >= obj.y &&
            this.y <= obj.y + obj.h
        ) {
            return true;
        }
    }
    // modified from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/rectangle-collision/rectangle-collision.html
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}


class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.canJump;
        this.canShoot = true;
        //this.gravity = 0.98;
        this.coFriction = 0.2;
        this.jumpPower = 20;
        this.color = color;
        this.hitpoints = hitpoints;
    }

    jump() {
        this.vy = -this.jumpPower;
        this.canJump = false;
    }
    pewpew() {
        let p = new PewPew(this.x + this.w * .333, this.y, TILESIZE / 4, TILESIZE / 4);
    }


    get type() {
        return "player";
    }
    input() {
        // checks for user input
        if ("a" in keysDown) { // Player holding left
            this.vx = -this.speed;
            
        } else if ("d" in keysDown) { // Player holding right
            this.vx = this.speed;
            
        } else if ("w" in keysDown) { // Player holding jump
            this.vy = -this.speed;
            
        } else if ("s" in keysDown) { // Player holding down
            this.vy = this.speed;
            
    
        }
        else if ("p" in keysDown) {
            if (this.canShoot) {
                this.pewpew();
                this.canShoot = false;
                setTimeout(() => this.canShoot = true, 500);
            }
            
        }  
      
        else if ("k" in keysDown) {
            if (this.canShoot) {
                this.pewpew();
                this.canShoot = false;
                setTimeout(() => this.canShoot = true, 1);
            }
        
            
        }
        if ("t" in keysDown) { // Player holding down
            timerThen = performance.now();
            timerStarted = true;
            
        }
        
        //timer() = 0; can be used for stopping the timer when reach 20 fish

    }
    frictionX() {
        if (this.vx > 0.5) {
            this.vx -= this.coFriction;
        } else if (this.vx < -0.5) {
            this.vx += this.coFriction;
        } 
        else {
            this.vx = 0;
        }
    }

    frictionY() {
        if (this.vy > 0.5) {
            this.vy -= this.coFriction;
        } else if (this.vy < -0.5) {
            this.vy += this.coFriction;
        } 
        else {
            this.vy = 0;
        }
    }
 
    update() {
        //this.vy += this.gravity;
        this.input();
        this.frictionX();
        this.frictionY();
        this.x += this.vx;
        this.y += this.vy;
        for (i of allSprites) {
            if (i.type == "wall") {
                if (this.collideWith(i)) {
                    let diff = Math.abs(this.cx - i.cx);
                    if (diff <= 32) {
                        this.y = i.top - this.h;
                        this.canJump = true;
                        this.vy = 0
                    }
                    if (this.cy > i.cy) {
                        if (this.vx > 0) {
                            this.x = i.left - this.w;
                        }
                        else if (this.vx < 0) { this.x = i.right }
                    }

                }
            }
        }

        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
        }
        if (this.y <= 0) {
            this.y = 0;
        }

    }
    draw(){
        ctx.drawImage(playerImage, 0, 0, 880, 933, this.x, this.y, TILESIZE, TILESIZE);
}



}


class Enemy extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.vx = 1;
        this.vy - 0;
        this.w = w;
        this.h = h;
        this.alive = true;
        this.speed = 6;
        this.color = "blue";
        enemies.push(this);
        
    }
    create(x, y, w, h) {
        return new Enemy(x, y, w, h);
    }
    get type() {
        return "enemy";
    }
    // if you want to get crazy...do this
    // rotate() {
    //     ctx.save();
    //     ctx.translate(this.x, this.y);
    //     ctx.rotate(127);
    //     ctx.translate(-this.x, -this.y);
    //     ctx.restore();
    // }
    update() {
        
        this.x += this.vx * this.speed;
        // this.rotate();
        for (i of allSprites) {
            if (i.type == "wall") {
                if (this.collideWith(i)) {
                    if (this.cx < i.cx) {
                        this.speed = -6;
                    }
                    else {
                        this.speed = 6;
                    }

                }

            }
        }
    }
    draw(){
        if (this.alive = true){
            ctx.drawImage(enemyImage, 0, 0, 880, 488, this.x, this.y, TILESIZE / 2,  TILESIZE / 2);
        }
        else if (this.alive = false){
            setTimeout(function(){ 
                ctx.drawImage(deadfishImage, 0, 0, 880, 488, this.x, this.y, TILESIZE / 2,  TILESIZE / 2); }, 2000);
        }
}
}




class Wall extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
    }
    get type() {
        return "wall";
    }
    create(x, y, w, h) {
        return new Wall(x, y, w, h);
    }
    draw(){
        ctx.drawImage(blockImage, 0, 0, 1216, 1216, this.x, this.y, TILESIZE, TILESIZE);
    }
}
class PewPew extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
        allProjectiles.push(this);
        console.log('a pewpew was created...');
        console.log(allProjectiles);
    }

    update() {
        this.y -= 20;
    }
    draw(){
        ctx.drawImage(pewImage, 0, 0, 840, 540, this.x, this.y, TILESIZE, TILESIZE);
    }
}


const levelChars = {
    ".": "empty",
    "#": Wall,
    "@": Enemy,

};

function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}

console.log("here's the grid...\n" + makeGrid(gamePlan, 22));

function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {
                    // let t = new type;
                    // let id = Math.floor(100*Math.random());
                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(new type(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22));
console.log("here's the current level");
for (i of currentLevel) {
    
    console.log(i);
}


// instantiations...
let player1 = new Player(WIDTH / 3, HEIGHT / 3, 6, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);

let maxEnemies = 20;
function update() {
    player1.update();
    //if (enemies.length < maxEnemies) {
    //    for (i = 0; i < maxEnemies - enemies.length; i++){
    //        let myRange = Math.floor(Math.random()*500) + TILESIZE*3;
    //        let e = new Enemy(myRange, TILESIZE, TILESIZE, TILESIZE);
    //    }
    //    
    //}
    if (enemies.length <= 0)
    alert("Yay! All fish speared. Check your time below too see how fast you were! To restart the game, reload and then press 'OK'");

    for (e of enemies) {
        for (p of allProjectiles){
            if (p.collideWith(e)){
                console.log('projectile collided with enemy...');
                p.spliced = true;
                e.spliced = true;
                //console.log (this.alive = false);
            }
        }
        
        e.update();
    }
    for (p of allProjectiles) {
        
        if (p.y < 0){
           p.spliced = true;
        }
        p.update();
    }
    for (p in allProjectiles){
        if (allProjectiles[p].spliced){
            allProjectiles.splice(p,1);
            // allSprites.splice(p,1);
        }
    }   
    for (e in enemies){
        if (enemies[e].spliced){
            enemies.splice(e,1);
        }
    }
    for (s in allSprites){
        if (allSprites[s].spliced){
            allSprites.splice(s,1);
        }
    }
    

}



// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
    drawText(0, 0, 0, 1, "26px Helvetica", "left", "top", "FPS: " + fps, 200, 32);
    drawText(0, 0, 0, 1, "26px Helvetica", "left", "top", "Projectiles: " + allProjectiles.length, 200, 64);
    drawText(0, 0, 0, 1, "26px Helvetica", "left", "top", "Enemies: " + enemies.length, 200, 96);
    drawText(0, 0, 0, 1, "26px Helvetica", "left", "top", "Timer: " + currentTimer / 1000, 200, 128);

}

    


let currentTimer = 0;
let timerStarted = false;


function timer() {
    if (timerStarted) {
        let now = performance.now();
        let delta = Math.floor(now - timerThen);
        currentTimer = delta;
        console.log(currentTimer);
        return delta;
    }
        
}

// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (like a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

//console.log("this is perf now " + performance.now())

//setTimeout(() => console.log("testing setTimeout"), 1000);




let then = performance.now();
let now = null;
var runtime = 0;
let fps = null;
console.log("enemies " + enemies);

let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    now = performance.now();
    let delta = now - then;
    fps = (Math.ceil(1000 / delta));
    //runtime = Math.floor(then + delta)*0.001;
    then = now;
    if (timerStarted){
        console.log('timer has stared...');
        timer();
    }
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}