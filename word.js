var Letter = require("./letter.js");

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

  var result = false;

  for(var i = 0; i < this.letters.length; i++) {

    if(this.letters[i].matches(letter)) {
      result = true;
    }
  }
  return result;
}

// Returns the current state of the word
Word.prototype.getWord = function() {

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
  return (printString);
}

module.exports = Word;