const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function reverse_start() {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let guess;
  let attempts = 0;
    
  while (guess != secretNumber) {
    let guess = await ask('Guess a number between 1 and 100. \n');
    attempts ++;

    if (guess = secretNumber) {
      console.log(`Congratulations! You guessed the correct number. It took you ${attempts} attempts!`);
      let end = await ask (`Thanks for playing! Do you want to play again? (Y/N)?\n`)
      if (end === "Y") {
        reverse_start();
      } else if (end === "N") { // User response
      console.log("That was fun! Bye!");
      process.exit();
        }
    } else  if (guess > secretNumber) {
        console.log('Try Lower');
    } else if (guess < secretNumber) {
        console.log(`Try Higher`);
    }
  }
}  
reverse_start();