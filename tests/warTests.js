

function dealTheCards(array){
    shuffleDeck(array);
    const halfTheDeck = Math.ceil(array.length/2);
    playerOneCards = array.splice(0, halfTheDeck);
    playerTwoCards = array.splice(-halfTheDeck);
    return playerOneCards, playerTwoCards; 
}

function getRandomInt(min, max) { 
    
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}



function shuffleDeck(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function gameOfWar(playerOne, playerTwo){
    const playerOneName = playerOne;
    const playerTwoName = playerTwo;

    // toying with the idea of being able to replay the game without refreshing the browser
    // and not manipulating the original array of cards, but copying them 
    // code example from here: https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
    let deck = JSON.parse(JSON.stringify(acesHighDeck)); 
    
    // original way of doing it. acesHighDeck is emptied as a result
    //let deck = acesHighDeck
    let a, b;
    if(playerOne && playerTwo !== undefined){
        dealTheCards(deck);
        a = playerOneCards;
        b = playerTwoCards
        let warHand = [];
        let warFlop1, warFlop2;
        let warFlop1Value, warFlop2Value;
        let count = 1;
        if(a.length === b.length){
            while(a.length || b.length > 0){
                console.log("Round:",count);
                console.log("Total Cards:", a.length + b.length);
                console.log(`${playerOneName}'s cards`, a);
                console.log(`${playerTwoName}'s cards`, b);
                if(a.length === 0){
                    //console.log("player 2 wins");
                    //break;
                    return `${playerTwoName} wins!`;
                }
                if(b.length === 0){
                    //console.log("player 1 wins");
                    //break;
                    return `${playerOneName} wins!`;
                }
                let firstElement = a.shift();
                let secondElement = b.shift();
                let topCardOneValue = firstElement.value;
                let topCardTwoValue = secondElement.value;
                console.log("Player 1 plays:", firstElement);
                console.log("Player 2 plays:", secondElement);
                if(topCardOneValue > topCardTwoValue){
                    console.log("Player 1's card is higher");
                    a.push(firstElement);
                    a.push(secondElement);
                }
                else if(topCardOneValue < topCardTwoValue){
                    console.log("Player 2's card is higher");
                    b.push(secondElement);
                    b.push(firstElement);
                }

                if(topCardOneValue === topCardTwoValue){
                    console.log("The cards are equal, let's battle!");
                    warHand.push(firstElement);
                    warHand.push(secondElement);
                    // could add a ternary here for array.length to dtermine how big the war flop will be
                    
                    warHand.push(a.splice(0,3));
                    warHand.push(b.splice(0,3));
                    if(a.length === 0){
                        //console.log("player 2 wins");
                        //return;
                        return `${playerTwoName} wins!`;
                    }
                    if(b.length === 0){
                        //console.log("player 1 wins");
                        //return;
                        return `${playerOneName} wins!`;
                    }
                    warFlop1 = a.shift();
                    warFlop2 = b.shift();
                    warFlop1Value = warFlop1.value 
                    warFlop2Value = warFlop2.value 
                    console.log("This is the War flop 1:", warFlop1);
                    console.log("This is the War flop 2:", warFlop2);
                    if(warFlop1Value > warFlop2Value){
                        console.log("Player 1 wins the WarHand");
                        warHand.push(warFlop1);
                        warHand.push(warFlop2);
                        a = a.concat(warHand.flat());
                        warHand = [];
                    }
                    else if(warFlop1Value < warFlop2Value){
                        console.log("Player 2 wins the WarHand");
                        warHand.push(warFlop1);
                        warHand.push(warFlop2);
                        b = b.concat(warHand.flat());
                        warHand = [];
                    }
                    else if(warFlop1Value === warFlop2Value){
                        warHand.push(firstElement);
                        warHand.push(secondElement);
                        warHand.push(a.splice(0,3));
                        warHand.push(b.splice(0,3));
                        if(a.length === 0){
                            // console.log("player 2 wins");
                            // return;
                            return `${playerTwoName} wins!`;
                        }
                        if(b.length === 0){
                            // console.log("player 1 wins");
                            // return;
                            return `${playerOneName} wins!`;
                        }
                        warFlop1 = a.shift();
                        warFlop2 = b.shift();
                        warFlop1Value = warFlop1.value 
                        warFlop2Value = warFlop2.value 
                        console.log("This is the War flop 1:", warFlop1);
                        console.log("This is the War flop 2:", warFlop2);
                        if(warFlop1Value > warFlop2Value){
                            console.log("Player 1 wins the second WarHand");
                            warHand.push(warFlop1);
                            warHand.push(warFlop2);
                            a = a.concat(warHand.flat());
                            warHand = [];
                        }
                        else if(warFlop1Value < warFlop2Value){
                            console.log("Player 2 wins the second WarHand");
                            warHand.push(warFlop1);
                            warHand.push(warFlop2);
                            b = b.concat(warHand.flat());
                            warHand = [];
                        }
                    }  
                }
            
                
                count ++
                if(count > 2000){
                    return console.log("This game has reached its limit.");
                } 
            }
        }
        else {
            return console.log("Please reshuffle and start a new game.");
        }
            //singleHandTest(playerOneCards, playerTwoCards);
            //singleHandTest(testCards1, testCards2);
        }
    else {
        console.log("Please enter two names to play.");
    }
}


module.exports = {
    dealTheCards,
    getRandomInt,
    shuffleDeck,
    gameOfWar
}