var inquirer = require('inquirer');

function BasicCard(front, back){
	this.front = front;
	this.back = back;
}

function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;

	this.fulltext = function(){
		return this.text + this.cloze;
	}
}

var b1 = new BasicCard("What is the meaning of life?","42");
var b2 = new BasicCard("What are Anakin and Luke missing?","a hand");
var b3 = new BasicCard("In Pulp Fiction, in which round is Butch supposed to go down?","5th");
var b4 = new BasicCard("In Fast and the Furious, where does Jesse overnight parts from?","Japan");
var b5 = new BasicCard("Which team blew a 3-1 lead in the finals?","The Warriors");

var z1 = new ClozeCard("What is the meaning of life?","42");
var z2 = new ClozeCard("What are Anakin and Luke missing?","a hand");
var z3 = new ClozeCard("In Pulp Fiction, in which round is Butch supposed to go down?","5th");
var z4 = new ClozeCard("In Fast and the Furious, where does Jesse overnight parts from?","Japan");
var z5 = new ClozeCard("Which team blew a 3-1 lead in the finals?","The Warriors");

var count = 0;
var questions = [b1, b2, b3, b4, b5];
var clozeCards = [z1, z2, z3, z4, z5];

var ask = function(){
	if(count < questions.length){

		inquirer.prompt([
		{
			name: "response",
			message: questions[count].front
		}
		]).then(function(answers){
			if(answers.response===questions[count].back){
				console.log("That's correct!");
			}else{
				console.log("Wrong! The correct answer is " + questions[count].back);
			}

			count++;
			ask();
		});

	}else{
		var end = true;
		count = 0;
		if(end === true){
			inquirer.prompt([
			{
				type: "confirm",
				name: "game",
				message: "Again?"
			}
			]).then(function(answers){
				if(answers.game === true){
					start();
					end = false;
				}else{
					console.log("Bye.");
				}
			});
		}
	}
}

var askCloze = function() {
	if(count < clozeCards.length) {
		inquirer.prompt([
		{
			name: "response",
			message: clozeCards[count].text + "____________"
		}
		]).then(function(answers){
			if(answers.response === clozeCards[count].cloze){
				console.log("That's correct!")
			}
			count++;
			askCloze();
		});
	}else{
		var end = true;
		count = 0;
		if (end === true){
			inquirer.prompt([
			{
				type: "confirm",
				name: "game",
				message: "Again?"
			}
			]).then(function(answers){
				if(answers.game === true){
					start();
					end = false;
				}else{
					console.log("Bye.")
				}
			});
		}
	}
}


var  start = function(){
	inquirer.prompt([
	{
		name: "start",
		message: "Choose your destiny. Type Basic or Cloze."
	}
	]).then(function(answers){
		if(answers.start === "Basic"){
			ask();
		}else{
			askCloze();
		}
	});
}

start();















