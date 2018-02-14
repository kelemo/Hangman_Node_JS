// This app is what encapsulate the magic of node.js. Running the app in the terminal will give give the chance to play the game. 

var Word = require('./word.js');
var prompt = require('prompt');

console.log("Welcome to African Savanna!");
console.log("Guess my the letters of favorite beast in African Savanna.");
console.log("Have fun!!!");
console.log("-----------------------------");
prompt.start();



game = {
 	wordBank:  ['lion', 'giraffe', 'rhino', 'hyena', 'buffalo', 'snake', 'tiger'],
 	wordsWon: 0,
 	guessesRemaining: 10,
 	currentWord: null,
 	
 	startGame: function (word) {
 		this.resetGuesses();
 		this.currentWord = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		this.currentWord.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['guessLet'], function(err, result){
 			console.log("Your guess is: " + result.guessLet + ".");
 			var manyGuessed = self.currentWord.checkLetter(result.guessLet);

 			if(manyGuessed ==0) {
 				console.log("Your guess is WRONG.");
 				self.guessesRemaining--;
 				
 			} else {
 				console.log("Your guess is CORRECT.");
 					if(self.currentWord.findWord()){
 						console.log("You gotta it!");
 						console.log("-------------------");
 						return;
 					}
 			}

 			console.log("Guesses remaining: " + self.guessesRemaining +".");
 			console.log("-------------------");
 			if((self.guessesRemaining > 0) && (self.currentWord.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
 				console.log("Game is over. The Correct Word is: ", self.currentWord.target + ".");
 			} else {
 				console.log(self.currentWord.wordRender());
 			}
 		});

 	}


};

game.startGame();
