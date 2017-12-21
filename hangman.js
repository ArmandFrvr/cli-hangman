var inquirer = require("inquirer");

// Can use inquirer or prompt

// Constructor function Word in a separate file

// Constructor function Letter in a separate file



// Track user's remaining guesses and prompt the user if they would like to end the game if none remain.



/*

Start with array of words
Pick one randomly
Create new Word object filled with Letters

Display the currrent state of the word to the user
displayWord(word)?

May as well store previous guesses in an array and check for already guessed letters before proceeding







*/







var game = {
  "score": 0,
  "guessesRemaining": 0,
  "lettersGuessed": [],
  "currentWord" : "",
  "currentState": [],

  "dictionary": ["PICARD", "ENTERPRISE", "ROMULAN", "PHASER", "IMZADI", "Q",
                 "HOLODECK", "FERENGI", "KLINGON", "PRIME DIRECTIVE", "TURBOLIFT",
                 "JEFFERIES TUBE", "BETAZOID", "DATA", "WESLEY", "CAPTAIN",
                 "WARP CORE", "WORMHOLE", "STARFLEET", "CARDASSIAN", "GEORDI",
                 "NEUTRAL ZONE", "GUINAN", "ENGINEERING", "TASHA YAR"],

  // Returns a random word.
  getWord: function() {
    return this.dictionary[randomNum(0, this.dictionary.length - 1)];
  },

  guessLetter: function(letter) {
    // If key was not a letter, return because somebody wasn't doing their input validation.
    // if(!letter.match(/[A-Z]/)) {
    //   console.log ("Bad key: " + letter);
    //   return;
    // }

    // If letter was already guessed, return.
    if (this.lettersGuessed.indexOf(letter) >= 0) {
      return;
    }

    // Else if letter is not in word, add letter to lettersGuessed, decrease guessesRemaining, and return.
    // -- But if gussesRemaining hits 0, you lose this round.
    else if (!this.currentWord.includes(letter)) {
      this.lettersGuessed.push(letter);
      this.guessesRemaining--;
      this.update();

      if(this.guessesRemaining === 0) {
        alert("YOU ARE NOT A TREKKIE!!!  You lose this round.  The word was \"" + this.currentWord + "\".");
        this.reset(); // restart the game
        return;
      }
    }

    // Letter is in the word and not already guessed, so let's update stuff.
    else {
      // Add letter to list of guessed letters
      this.lettersGuessed.push(letter);

      // Replace the underscores with the letter for all occurrences of the letter in the word
      for(var i=0; i<this.currentWord.length; i++) {
        if(this.currentWord.charAt(i) === letter) {
         this.currentState[i] = letter;
        }
      }
      // console.log(this.currentState);
      this.update();

      // If the word is complete, we win.
      if(this.currentState.indexOf("_") === -1) {
        this.score++;


        var that=this;

        var test = setTimeout(function() {
          console.log("Congratulations!  You correctly guessed the word " + that.currentWord + ".");
          game.reset();
        }, 1000);

      }

      return;
    }

  },

  // Resets the game and picks a new word.
  reset: function() {
    this.currentState = [];
    this.lettersGuessed = [];
    this.currentWord = this.getWord();
    console.log("New word is: " + this.currentWord);
    this.guessesRemaining = this.currentWord.length + 5;

    for(var i = 0; i < this.currentWord.length; i++) {
      this.currentState.push("_");
    }

    this.update();
  },

  // Refreshes the display with the latest info
  update: function() {
    $("#wins").text(this.score);
    $("#current").text(this.currentState.join(" "));
    $("#remaining").text(this.guessesRemaining);
    $("#lettersGuessed").text(this.lettersGuessed);
  }

}


$(document).ready(function() {

  game.reset();

  $(document).keypress(function(event) {

    // If the key pressed was a letter, then make a guess.
    if(event.which > 96 && event.which < 123 || event.which === 32) {
      game.guessLetter(String.fromCharCode(event.which).toUpperCase());
    }
  });

});


function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);

}