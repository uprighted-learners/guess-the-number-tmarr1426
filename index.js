const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}


async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  var minNum = await ask("Enter the minimum number in the game's range (cannot be lower than 1):\n");
  minNum = parseInt(minNum); // converts the user input from a string to a number. And sets the minimum.

  
  var maxNum = await ask(`Enter the maximum number in the game's range (must be greater than ${minNum}):\n`);
  maxNum = parseInt(maxNum); // converts the user input from a string to a number. And set the maximum.

  if (isNaN(minNum) || isNaN(maxNum) || minNum < 1 || maxNum <= minNum) {
    console.log("Invalid input. Please enter valid numbers.");
    return;
  } // Checks to see make sure the minimum and maximum numbers are set.

  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  
  var guess; // starts the guessing
  let attempts = 0;

  while (guess != secretNumber){
    var guess = Math.floor((maxNum+minNum) / 2) ; // Makes an estimated guess based off of max and min.
    attempts ++;
    let answer = await ask (`Is your secret number ${guess}? (Y/N)\n`); //Checks to see if the computers guess is equal to secret number
    console.log("Attempt Number:", attempts, "Minimum Value:", minNum, "Maximum Value:", maxNum, "secret number:", secretNumber);
    if (answer === "N") { // User response
      let answer2 = await ask (`Higher or Lower (H/L)\n`) // Computer asks if the secret number is higher or lower than their guess.
      if (answer2 === "H") {// User response
        minNum = guess + 1; // Sets new minimum = to the guessed amount EG: guess was 50 new min is 50.
        maxNum;
      }  else if (answer2 === "L") { 
        var maxNum = guess; // Sets a new maximum = the guessed amount EG: guess was 50 new max is 50.
        var minNum;
        // if (answer2 === "L" && guess != secretNumber) {
        //   console.log(`What do you mean Lower? It can't be higher`)
        // }
      }
    } else if (answer === "Y"){ // User response
          console.log(`Woohoo, your secret number was ${guess}!`)
          let end = await ask (`Thanks for playing! Do you want to play again? (Y/N)?\n`)
      if (end === "Y") { // User response
        start ();
      } else if (end === "N") { // User response
        console.log("That was fun! Bye!");
        process.exit();
      }
    }
  }
}

start();

