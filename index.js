const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

const randomGuesser = (min, max) => {
  return Math.floor((min+max) / 2);
}

async function start() {
  let game = await ask("Let's play a game! Please choose either normal or reverse. (N/R)\n")
  if (game === "N") {
    var minNum = await ask("Enter the minimum number in the game's range (cannot be lower than 1):\n");
    minNum = Number(minNum); // converts the user input from a string to a number. And sets the minimum.

  
    var maxNum = await ask(`Enter the maximum number in the game's range (must be greater than ${minNum}):\n`);
    maxNum = Number(maxNum); // converts the user input from a string to a number. And set the maximum.

    if (isNaN(minNum) || isNaN(maxNum) || minNum < 1 || maxNum <= minNum) {
      console.log("Invalid input. Please enter valid numbers.");
    return;
    } // Checks to see make sure the minimum and maximum numbers are set.

    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    console.log('You entered: ' + secretNumber);
  
    var guess; // starts the guessing
    let attempts = 0;

    while (guess != secretNumber){
      var guess = randomGuesser(minNum, maxNum); // Makes an estimated guess based off of max and min.
      attempts ++;
      let answer = await ask (`Is your secret number ${guess}? (Y/N)\n`); //Checks to see if the computers guess is equal to secret number
      console.log("Attempt Number:", attempts, "Minimum Value:", minNum, "Maximum Value:", maxNum, "secret number:", secretNumber);
      if (answer === "N") { // User response
        let answer2 = await ask (`Higher or Lower (H/L)\n`) // Computer asks if the secret number is higher or lower than their guess.
        if (answer2 === "H") {// User response
          if (minNum > maxNum) {

            let answer3 = await ask(`What do you mean Higher? I already guessed ${maxNum}! Would you like to restart the game? (Y/N)?\n`);
            if (answer3 === "Y") {
              start();
            } else if (answer3 === "N"){
              console.log("There must have been an error. End sequence.");
              process.exit();
            }

          } else {
            minNum = guess + 1; // Sets new minimum = to the guessed amount EG: guess was 50 new min is 50.
            maxNum;
            //let answer2 = await ask (`Higher or Lower (H/L)\n`);
          }
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
  } else if (game === "R") {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let guess;
    let attempts = 0;
      
    while (guess != secretNumber) {

      let guess = await ask('Guess a number between 1 and 100. \n'); // User gives an answer between 1 and 100.
      attempts ++;

      if (guess == secretNumber) {
        console.log(`Congratulations! You guessed the correct number. It took you ${attempts} attempts!`);
        let end = await ask (`Thanks for playing! Do you want to play again? (Y/N)?\n`)
        if (end === "Y") {
          start();
        } else if (end === "N") { // User response
        console.log("That was fun! Bye!");
        process.exit();
        }
      } else if (guess > secretNumber) {
          console.log('Try Lower');
      } else if (guess < secretNumber) {
          console.log(`Try Higher`);
      }
    }
  }  
}

start();

