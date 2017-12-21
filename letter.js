function Letter(letter) {
  this.letter = letter;
  this.visible = false;
}

// Returns true & unhides letter if the letter matches the guess
Letter.prototype.matches = function(guess) {
  if(this.letter === guess) {
    this.visible = true;
    return true;
  }

  return false;
}

module.exports = Letter;