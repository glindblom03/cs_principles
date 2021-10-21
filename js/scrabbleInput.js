//// int POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};
//
//// global variables go at the top
////correlates with each point to a letter: a=1, b=3, c=3, etc.
////this POINTS and Letters are indexes
//let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
//let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//let player1score = 0;
//let player2score = 0;
//
//// utility functions
//// check if is upper
////boolean function to check if uppercase, if true return equal to uppercase value
//function isupper(str) {
//  return str === str.toUpperCase();
//}
//
//// check if is lower
////boolean function, if lower return to lowercase value
//function islower(str) {
//  return str === str.toLowerCase();
//}
////gets the points with letters, searches through index to find the letters and converts that to in integer
//function getPoints(letter){
//  let index = Letters.indexOf(letter);
//  return POINTS[index];
//}
//
////tests the value of points with letters once checked if upper or lower
//console.log("testing point function " + getPoints("x"));
//
////tests the letters inside of the index
//console.log("testing index " + Letters.indexOf("c"));
//
////combines the letters in the array to get a sum of it
//function add(x,y){
//  let sum = x + y;
//  let string = '$(sum)'; 
//  console.log(string.length);
//  console.log("the sum is ", sum);
//}
////combines these x and y values and seen on element inspection side information, used for testing
//add(6,7);
//
//// can you in JS perform an islower/isupper and strlen
//function compute_score(word){
//    let score = 0;
//    let index = 0;
//    //make a for loop to run through the index to get the letters, find if they are upper or lower
//    for (i = 0, n = word.length; i < n; i++){
//        //if (islower(word[i])){
//        //  console.log(word[i] + "this is lower case");
//        //    // printf("accounting for lower case\n");
//        //    // index = word[i]-'a';
//        //}
//        //if (isupper(word[i])){
//        //  console.log(word[i] + " is upper case");
//        //    // printf("accounting for upper case\n");
//        //    // index = word[i]-'A';
//        //}
//        console.log("testing word i " + (word[i]));
//        console.log("testing point function " + getPoints(word[i].toLowerCase()));
//        //force to lowercase
//        score += getPoints(word[i].toLowerCase());
//        console.log("final score here " + score);
//        // score += getPoints(word[i]);
//        // console.log("testing the score " + score);
//    }
//    //at end of for loop, we need to know the score so return score
//    return score;
//}
//
////test "hello" to make sure not bugged
//compute_score("Hello");
//
////SCOPE>>>>>>>>>>>>>
////make it a global variable
//let inputVal = null;
//
////concatonating
////if -1, then not present in the index
////console.log("testing index of something not in index" + Letters.indexOf["A"] == -1);
//
//  function getInputValue() {
//    // Selecting the input element and get its value 
//    return document.getElementById("inputId").value;
//    // Displaying the value
//  }
//
// function doSomething(){
//   //gives alert of what the score is
//    alert("You scored " + computeScore(getInputValue()));
//  }
//
//  function output(){
//    document.getElementById("display").value = 4;
//  }

  
// global variables go at the top
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let player1score = 0;
let player2score = 0;

// utility functions
// check if is upper
function isupper(str) {
  return str === str.toUpperCase();
}

// check if is lower
function islower(str) {
  return str === str.toLowerCase();
}

// return points by associating the index of the letter with the POINTS array
function getPoints(letter){
  let index = Letters.indexOf(letter);
  return POINTS[index];
}

// can you in JS perform an islower/isupper and strlen?
function computeScore(word){
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
        // if (islower(word[i])){
        //   console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //   console.log(word[i] + " is upper case");
        // }
        console.log("letter is " + (word[i]));
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        score += getPoints(word[i].toLowerCase());
        console.log("final score here " + score);
    }
    return score;
}

computeScore("hello");


// SCOPE>>>>>>>>>>>

function getInputValue() {
    // Selecting the input element and get its value 
    return document.getElementById("inputId").value;
    // Displaying the value
  }

 function doSomething(){
    let score = computeScore(getInputValue())
    output("you scored " + score + " points.");
  }

  // failing function due to inability to access element on page and alter it dynamically
  function output(content){
    document.getElementById("display").innerHTML = content;
  }