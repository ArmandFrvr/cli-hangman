var prompt = require("prompt");
prompt.message = "";

var Word = require("./word.js");

var game = {
  "score": 0,
  "guessesRemaining": 0,
  "lettersGuessed": [],
  "currentWord" : null,

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

    // If letter was already guessed, return.
    if (this.lettersGuessed.indexOf(letter) >= 0) {
      console.log("You already guessed this letter.  Pick something else.");
      game.askForLetter();
      return;
    }

    // Else if letter is not in word, add letter to lettersGuessed, decrease guessesRemaining, and return.
    // -- But if gussesRemaining hits 0, you lose this round.
    else if (!this.currentWord.guess(letter)) {
      this.lettersGuessed.push(letter);
      this.guessesRemaining--;

      if(this.guessesRemaining === 0) {
        console.log("YOU ARE NOT A TREKKIE!!!  You lose this round.  The word was \"" + this.currentWord.word + "\".");
        console.log("Your current score is: " + this.score + ".\n");
        game.askToContinue();
        return;
      }
      else {
        console.log("Sorry.  The letter " + letter + " isn't part of this word.");
        console.log("You have " + this.guessesRemaining + " guesses left.");
        console.log("\n" + this.currentWord.getWord() + "\n");
        game.askForLetter();
      }
    }

    // Letter is in the word and not already guessed
    else {
      // Add letter to list of guessed letters
      this.lettersGuessed.push(letter);

      // We already updated the word's state with the call to currentWord.guess, so just grab it
      var wordState = this.currentWord.getWord();
      console.log("\n" + wordState + "\n");

      // If the word is complete, we win.
      if(wordState.indexOf("_") === -1) {
        this.score++;
        console.log("Congratulations!  You correctly guessed the word " + this.currentWord.word + ".");
        console.log("Your score is now: " + this.score + ".\n");
        console.log("Next word!");
        this.reset();
      }
      else {
        game.askForLetter();
      }
    }
  },

  // Uses Prompt to request the user's next guess
  askForLetter: function() {
    prompt.get({
      properties: {
        letter: {
          description: "Guess a letter",
          pattern: /^[a-zA-Z ]{1}$/,
          message: "Please enter a single character or space.",
          required: true
        }
      }
    }, function(err, result) {

      if(err) {
        return console.log(err);
      }

      game.guessLetter(result.letter.toUpperCase());

      });
  },

  askToContinue: function() {
    prompt.get({
      properties: {
        continue: {
          description: "Would you like to continue?  Y/N"
        }
      }
    }, function(err, result) {

      if(err) {
        return console.log(err);
      }

      if(result.continue.toUpperCase() == 'Y') {
        console.log("\nAwesome.  New word!");
        game.reset();
      }
      else if(result.continue.toUpperCase() === 'N') {
        console.log("\nToo bad.  Thanks for playing!\n");
      }
      else {
        console.log("\nI'm sorry, I didn't understand that response.");
        game.askToContinue();
      }

    });
  },

  // Resets the game and picks a new word.
  reset: function() {
    this.lettersGuessed = [];
    this.currentWord = new Word(this.getWord());
    // console.log("New word is: " + this.currentWord.word);       // CHEAT CODE
    this.guessesRemaining = this.currentWord.word.length + 5;
    console.log("\n" + this.currentWord.getWord() + "\n");
    prompt.start();
    game.askForLetter();
  },

}

console.log("\nWelcome to Command-Line Star Trek:TNG Hangman!");
game.reset();


function randomNum(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}