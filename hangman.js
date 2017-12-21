var inquirer = require("inquirer");
var word = require("./word.js");

// Can use inquirer or prompt

// Track user's remaining guesses and prompt the user if they would like to end the game if none remain.


var game = {
  "score": 0,
  "guessesRemaining": 0,
  "lettersGuessed": [],
  "currentWord" : null,
  // "currentState": [],

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
      console.log("You already guessed this letter.  Pick something else.");
      return;
    }

    // Else if letter is not in word, add letter to lettersGuessed, decrease guessesRemaining, and return.
    // -- But if gussesRemaining hits 0, you lose this round.
    else if (!this.currentWord.guess(letter)) {
      this.lettersGuessed.push(letter);
      this.guessesRemaining--;

      if(this.guessesRemaining === 0) {
        console.log("YOU ARE NOT A TREKKIE!!!  You lose this round.  The word was \"" + this.currentWord.word + "\".");
        this.reset(); // restart the game             NOTE-- NEED TO PROMPT TO RESTART INSTEAD!!!
        return;
      }
      else {
        console.log("Sorry.  The letter " + letter + " isn't part of this word.");
      }
    }

    // Letter is in the word and not already guessed
    else {
      // Add letter to list of guessed letters
      this.lettersGuessed.push(letter);

      // We already updated the word's state with the call to currentWord.guess, so just grab it
      var wordState = this.currentWord.getWord();
      console.log(wordState);

      // If the word is complete, we win.
      if(wordState.indexOf("_") === -1) {
        this.score++;
        console.log("Congratulations!  You correctly guessed the word " + this.currentWord.word + ".");
        console.log("Next word!");
        this.reset();
      }

      return;
    }

  },

  // Resets the game and picks a new word.
  reset: function() {
    // this.currentState = [];
    this.lettersGuessed = [];
    this.currentWord = new Word(this.getWord());
    console.log("New word is: " + this.currentWord.word);       // COMMENT THIS OUT LOLLOLCHEATINGLOL
    this.guessesRemaining = this.currentWord.word.length + 5;
    // this.update();
  },

  // Refreshes the display with the latest info
  // update: function() {
  //   $("#wins").text(this.score);
  //   $("#current").text(this.currentState.join(" "));
  //   $("#remaining").text(this.guessesRemaining);
  //   $("#lettersGuessed").text(this.lettersGuessed);
  // }

}


// $(document).ready(function() {

//   game.reset();

//   $(document).keypress(function(event) {

//     // If the key pressed was a letter, then make a guess.
//     if(event.which > 96 && event.which < 123 || event.which === 32) {
//       game.guessLetter(String.fromCharCode(event.which).toUpperCase());
//     }
//   });

// });



game.reset();

// inquirer code for grabbing stuff and printing stuff goes here





function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);

}