var letters = require("./letter.js");

function Word(word) {
  this.word = word;
  this.letters = setLetters(word);
}

// Takes in a string and returns an array of letter objects
function setLetters(word) {

  var letterArray = [];

  for(var i = 0; i < word.length; i++) {
    letterArray.push(new Letter(word.charAt(i)));
  }
  return letterArray;
}

// Returns true & unhides the letter(s) if the letter was found
// Otherwise just returns false
Word.prototype.guess = function(letter) {

  for(var i = 0; i < this.letters.length; i++) {

    if(this.letters[i].matches(letter)) {
      return true;
    }
  }
  return false;
}

// Prints the current state of the word
Word.prototype.printWord = function() {

  var printString = '';

  for(var i = 0; i < this.letters.length; i++) {
    if(this.letters[i].visible) {
      printString += this.letters[i].letter;
    }
    else {
      printString += '_';
    }

    if(i < this.letters.length - 1) {
      printString += " ";
    }
  }
  console.log(printString);
}

module.exports = Word;