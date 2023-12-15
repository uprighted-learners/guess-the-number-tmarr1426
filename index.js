const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
  var minNum = 1; // sets a minimum
  var maxNum = 100 // sets a maximum
  var guess; // starts the guessing
  do { // Do While loop that alters the high and low end of the variables to 
    var guess = Math.floor((maxNum-minNum) / 2) + 1; // Makes an estimated guess based off of max and min.
    let answer = await ask (`Is your secret number ${guess}? (Y/N)\n`); //Checks to see if the computers guess is equal to secret number
    if (answer === "N") { // User response
      let answer2 = await ask (`Higher or Lower (H/L)\n`) // Computer asks if the secret number is higher or lower than their guess.
      if (answer2 === "H") { // User response
        var minNum = guess; // Sets new minimum = to the guessed amount EG: guess was 50 new min is 50.
        var maxNum = 100;
      } else if (answer2 === "L"){ // User response
        var minNum = 1; 
        var maxNum = guess; // Sets a new maximum = the guessed amount EG: guess was 50 new max is 50.
      }
    } else if (answer === "Y"){ // User response
      console.log(`Woohoo, your secret number was ${guess}!`)
      break;
    }
  }
  while (guess != secretNumber){
      let end = await ask (`Thanks for playing! Do you want to play again? (Y/N)?\n`)
      if (end === "Y") { // User response
        start ();
      } else if (end === "N") { // User response
        console.log("That was fun! Bye!");
      }
    }
  }
start();

