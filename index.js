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
  let answer = await ask("Is your number 50? (Y/N)\n");
  if (answer == "Y") {
    console.log(`Your number was ${secretNumber}!`);
  } else if (answer == "N") {
    let answer2 = await ask("Higher or Lower? (H/L)\n");
    if (answer2 === "H") {
      let answer3 = await ask("Is your number 75? (Y/N)\n");
      if (answer3 === "Y") {
        console.log(`Your number was ${secretNumber}!`);
      } else if (answer3 == "N"){
        let answer4 = await ask("Higher or Lower? (H/L)\n");
        if (answer4 ="H") {
          let answer6 = await ask("Is your number 87 (Y/N) \n")
        } else if (answer4 === L) {
          let answer8 = await ask("Higher or Lower (H/L) \n");
        }
      }
    } else {
      if (answer2 == "L") {
        let answer5 = await ask("Is your number 25? (Y/N) \n")
      } 
    }
  } else {
    console.log("ERROR please answer Y or N. \n")
    //process.exit();
  };
}

start();//console.log("test")

