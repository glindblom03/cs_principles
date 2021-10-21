// global variables go at the top
// similar to in C except uses the word "let"

/*
1. get input from user
2. run through Letters array
3. convert to newLetters array
4. combine new string
5. press Encrypt button to turn original string in encrypted 
6. display the new encrypted code
7. Decrpyt button takes encrypted string and turns it back to orignal string
8. Return encrypted string to original string
*/

//added " " in the index so spaces are allowed for input
//these indexes are a-z and z-a
let Letters = [" ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let newLetters = [" ", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"];

// return index values by associating the index of Letters with newLetters array
function getNew(letter){
  let index = Letters.indexOf(letter);
  return newLetters[index];
}

// get index values by taking newLetters and equivalating that to Letters
function getOld(letter){
  let index = newLetters.indexOf(letter);
  return Letters[index];
}

//function will make take the input and reverse that to its opposite index
function computeString(word){
  // sets string to "" (empty value) and goes through each character in the word
    let string = "";
    for (i = 0, n = word.length; i < n; i++){
        // Takes one letter, states the converted letter based on the array, and adds to make final encrypted string
        console.log("Given letter is " + (word[i]));
        console.log("Letter becomes " + getNew(word[i]));
        string += getNew(word[i]);
        console.log("Encryption string: " + string);
    }
    return string;
}

//this is for the decryption button, it will take the encrypted code and turn it into orignal text
function computeFlip(word){
  // sets string to "" (empty value) and goes through each character in the word
  let string = "";
  for (i = 0, n = word.length; i < n; i++){
  
        // Takes one letter, states the converted letter based on the array, and adds to make final encrypted string
        console.log("This letter is " + (word[i]));
        console.log("This letter becomes " + getOld(word[i]));
        string += getOld(word[i]);
        console.log("Decrypted string: " + string);
    }
    return string;
}

// SCOPE>>>>>>>>>>>

//gets the input and value, then returns and displays element, used in the encrypt and decrypt functions
function getInputValue() {
    // Selecting the input element and get its value 
    return document.getElementById("inputId").value;
    // Displaying the value
  }

//connects to the button in the html that will encrypt the original string
 function encrypt(){
    let string = computeString(getInputValue())
    output("The encrypted message is " + string);
  }

//connects to button in html to decipher the encrypted string
  function decrypt(){
    let flip = computeFlip(getInputValue())
    output("The decrypted message is " + flip)
  }

  // failing function due to inability to access element on page and alter it dynamically
  //this function will display the outputs from the console onto teh website
  function output(content){
    document.getElementById("display").innerHTML = content;
  }
