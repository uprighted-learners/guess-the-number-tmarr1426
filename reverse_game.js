const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function guessNumber() {
    const secretNumber = Math.floor(Math.random() * 10) + 1;
    let guess;
    
    while (true) {
      guess = prompt('Guess a number between 1 and 10:');
      
      if (guess === secretNumber) {
        alert('Congratulations! You guessed the correct number.');
        break;
      } else {
        alert('Try again!');
      }
    }
  }
  
  guessNumber();