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
    var guess = Math.floor((maxNum-minNum) / 2) + 1;
    let answer = await ask (`Is your secret number ${guess}? (Y/N)\n`);
    if (answer === "N") {
      let answer2 = await ask (`Higher or Lower (H/L)\n`)
      if (answer2 === "H") {
        var minNum = guess;
        var maxNum = 100;
      } else if (answer2 === "L"){
        var minNum = 1;
        var maxNum = guess;
      }
    } else if (answer === "Y"){
      console.log(`Woohoo, your secret number was ${guess}!`)
      break;
    }
  }
  while (guess != secretNumber){
      let end = await ask (`Thanks for playing! Do you want to play again? (Y/N)?\n`)
      if (end === "Y") {
        start ();
      } else if (end === "N"){
        console.log("That was fun! Bye!");
      }
    }
  }
start();

