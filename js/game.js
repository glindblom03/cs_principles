// global variables
let canvas;
let ctx;
let WIDTH = 1408;
let HEIGHT = 800;
let TILESIZE = 64;
let allSprites = [];
let walls = [];



// get user input from keyboard
let keysDown = {};
let keysUp = {};


//this is the setup of our map that we have, # are sprites, and . are empty space
let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;



addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    // console.log("key down is " + keysDown[event.key]);
}, false);

addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
}, false);

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
//initializes the funcition so it can run on the html
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}


//main class that everyrhing is based off on, AKA super class
class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        allSprites.push(this);
    }
    get type() {
        return "sprite";
    }
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

//subclass that bases its structure off of sprited
class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    collideWith(obj){
        //this collission shows when our player is colliding with the sprite
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h
            ){
                //to comfirm this, console log to get the player sprite collidign with the object
                console.log(this.type + ' collides with ' + obj.type);
                return true;
            }
    }    
    get type() {
        return "player";
    }

    //this makes the keys on our keyboard operate the direction of the player sprite
    input() {
        if ('w' in keysDown) {
            this.dy = -1;
            //making dx and dy in other if statements helps us in the future when working on barriers with the sprite on objects
            this.dx = 0;
            // console.log("dy is: " + this.dy)
            this.y -= this.speed;
        }
        if ('a' in keysDown) {
            this.dx = -1;
            this.dy = 0;
            // console.log("dx is: " + this.dx)
            this.x -= this.speed;
        }
        if ('s' in keysDown) {
            this.dy = 1
            this.dx = 0;
            // console.log("dy is: " + this.dy)
            this.y += this.speed;

        }
        if ('d' in keysDown) {
            this.dx = 1;
            this.dy = 0;
            // console.log("dx is: " + this.dx)
            this.x += this.speed;
        }

    }
    update() {
        this.input();

        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
//makes the borders and will stop x and y from going outsdie the barrier. setting it to being less than width and height 
        if (this.x <= 0) {
            this.x = 0;
        }

        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
        }
       
        if (this.y <=0) {
            this.y = 0;
        }
       
    };
}


//new subclass for enemy that extends player which extends sprite
class Enemy extends Player{
    constructor(x, y, speed, w, h, color, hitpoints){
        super(x, y, speed, w, h, color, hitpoints);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }

    get type(){
        return "enemy";
    }

}

let badguy = new Enemy();
console.log("here's the example of a sub-sub class " + badguy.type);
console.log("badguy stats " + badguy.speed);


//this makes walls that would prevent a player from gooing through it when made opaque
class Wall extends Sprite{
    constructor(x, y, w, h, color){
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    create(x, y, w, h, color) {
        return new Wall(x, y, w, h, color);
    }
    get type(){
        return "wall";
    }
}

//declares how  the grid will look like when put on the html browser
const levelChars = {
    ".": "empty",
    "#": Wall,
};


//this is used to create the grid
//make the row and push that into the grid so it compiles into a useable structure for the sprites
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
    //makes y in grid first because y[0] of x[0] starts first then y[0] of x[1] and it runs through array that way 
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
                    let t = new type;
                    // let id = Math.floor(100*Math.random());
                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log('current level');
console.log(currentLevel);

// instantiations...
//declares the player properties of height width, speed, tilesize, color...all that was in the constructor function
let player1 = new Player(WIDTH / 2, HEIGHT / 2.25, 10, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);
// let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
// let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
// let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

console.log(allSprites);
console.log(walls);


//this funciton lets player collide with the wall unfortunately the player sticks to the wall when it touches
function update() {
    for (i of allSprites) {
        //this is a nested loop and will look through if statements to make sure player hits a wall when it contacts it
        if (i.type == "wall") {
            // console.log(i)
            if (player1.collideWith(i)) {
                if (player1.dx == 1){
                    playet1.x = i.x - player1.w;
                }
            
                else if (player1.dx == -1){
                    playet1.x = i.x + i.w;
                }

                else if (player1.dy == 1){
                    playet1.y = i.y - player1.h;
                }

                else if (player1.dy == -1){
                    playet1.y = i.y + i.h;
                }

                // console.log("player collided with walls")
                console.log("player1 dx is:" + player1.dx);
            }
        }
    }
    player1.update();

    // oneSquare.update();
    // twoSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}