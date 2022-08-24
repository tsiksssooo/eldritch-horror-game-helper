import ancientsData from './data/ancients.js';
import greenCardsData from './data/mythicCards/green/green.js';
import brownCardsData from './data/mythicCards/brown/brown.js';
import blueCardsData from './data/mythicCards/blue/blue.js';

//////////////////////////// BOSS SELECTION START ////////////////////////////

const boss = document.querySelectorAll('.game-boss-card');
let chosenBoss = '';

const selectBoss = function () {
    chosenBoss = this.alt;
    resetBorder();
    this.style.border = 'dashed red';
}

const resetBorder = function () {
    for (let i = 0; i < boss.length; i++) {
        boss[i].style.border = 'solid #555';
    }
}

for (let i = 0; i < boss.length; i++) {
    boss[i].addEventListener('click', selectBoss);
}

//////////////////////////// BOSS SELECTION END ////////////////////////////


//////////////////////////// DIFFICULTY LEVEL SELECTION START ////////////////////////////
const level = document.querySelectorAll('.difficulty-btn');
let chosenDifficultyLevel = '';

const selectLevel = function () {
    chosenDifficultyLevel = this.innerHTML;
    resetLevel();
    this.style.border = 'dashed red';

}

const resetLevel = function () {
    for (let i = 0; i < level.length; i++) {
        level[i].style.border = 'solid #555';
    }
}

for (let i = 0; i < level.length; i++) {
    level[i].addEventListener('click', selectLevel);
}

//////////////////////////// DIFFICULTY LEVEL SELECTION END ////////////////////////////


//////////////////////////// SHUFFLE DECK START ////////////////////////////
const shuffleBtn = document.querySelector('.shuffle-cards');
const nextCard = document.querySelector('.next-card');

const shuffleArray = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      };
      return(array);
    };

const formMiniDecks = function () {
    let stageOneDeck = [];
    let stageTwoDeck = [];
    let stageThreeDeck = [];
    const bossData = ancientsData.find(element => element.id === chosenBoss);
    let firstStageCards = bossData.firstStage;
    let secondStageCards = bossData.secondStage;
    let thirdStageCards = bossData.thirdStage;
    let greenCardsNumber = firstStageCards.greenCards + secondStageCards.greenCards + thirdStageCards.greenCards;
    let brownCardsNumber = firstStageCards.brownCards + secondStageCards.brownCards + thirdStageCards.brownCards;
    let blueCardsNumber = firstStageCards.blueCards + secondStageCards.blueCards + thirdStageCards.blueCards;
    let shuffledGreenArray = shuffleArray(greenCardsData).slice(0, greenCardsNumber);
    let shuffledBrownArray = shuffleArray(brownCardsData).slice(0, brownCardsNumber);
    let shuffledBlueArray = shuffleArray(blueCardsData).slice(0, blueCardsNumber);

    for (let i=0; i < bossData.firstStage.greenCards; i++) {
        stageOneDeck.push(shuffledGreenArray[i]);
    }
    shuffledGreenArray = shuffledGreenArray.slice(firstStageCards.greenCards);

    for (let i=0; i < bossData.firstStage.brownCards; i++) {
        stageOneDeck.push(shuffledBrownArray[i]);
    }
    shuffledBrownArray = shuffledBrownArray.slice(firstStageCards.brownCards);

    for (let i=0; i < bossData.firstStage.blueCards; i++) {
        stageOneDeck.push(shuffledBlueArray[i]);
    }
    shuffledBlueArray = shuffledBlueArray.slice(firstStageCards.blueCards);
    shuffleArray(stageOneDeck);

    for (let i=0; i < bossData.secondStage.greenCards; i++) {
        stageTwoDeck.push(shuffledGreenArray[i]);
    }
    shuffledGreenArray = shuffledGreenArray.slice(secondStageCards.greenCards);

    for (let i=0; i < bossData.secondStage.brownCards; i++) {
        stageTwoDeck.push(shuffledBrownArray[i]);
    }
    shuffledBrownArray = shuffledBrownArray.slice(secondStageCards.brownCards);

    for (let i=0; i < bossData.secondStage.blueCards; i++) {
        stageTwoDeck.push(shuffledBlueArray[i]);
    }
    shuffledBlueArray = shuffledBlueArray.slice(secondStageCards.blueCards);
    shuffleArray(stageTwoDeck);

    for (let i=0; i < bossData.thirdStage.greenCards; i++) {
        stageThreeDeck.push(shuffledGreenArray[i]);
    }
    shuffledGreenArray = shuffledGreenArray.slice(thirdStageCards.greenCards);

    for (let i=0; i < bossData.thirdStage.brownCards; i++) {
        stageThreeDeck.push(shuffledBrownArray[i]);
    }
    shuffledBrownArray = shuffledBrownArray.slice(thirdStageCards.brownCards);

    for (let i=0; i < bossData.thirdStage.blueCards; i++) {
        stageThreeDeck.push(shuffledBlueArray[i]);
    }
    shuffledBlueArray = shuffledBlueArray.slice(thirdStageCards.blueCards);
    shuffleArray(stageThreeDeck);


    return [stageOneDeck, stageTwoDeck, stageThreeDeck];
};

//////////////////////////// SHUFFLE DECK END ////////////////////////////
let activeDeck;
let cardColour;
let count = 0;

const setDecks = function(n) {
let decksArray = formMiniDecks();
return decksArray[n];
};

const restart = function() {
    location.reload();
}

const showCard = function(deck) {

    if (activeDeck.length > 0) {
        cardColour = deck[0].color;
        updateCounter(count, cardColour);
        let currentCardFace = document.querySelector('.current-card');
        let currentImage = document.querySelector('.current-image');
        currentCardFace.style.display = 'flex';
        currentImage.src = `/assets/MythicCards/${deck[0].color}/${deck[0].id}.png`;

        console.log(cardColour);
        currentImage.style.display = 'flex';
        activeDeck = deck.slice(1);

    } else if (count < 2) {
        console.log('Here Comes a new deck')
        count++;
        activeDeck = setDecks(count)
        showCard(activeDeck);
    } else {
        document.querySelector('.blocker').style.display = 'flex';
        document.querySelector('.blocker').addEventListener('click', restart)
    }

}

const setCounter = function () {
    let deck1 = setDecks(0);
    let deck2 = setDecks(1);
    let deck3 = setDecks(2);
    let green1 = 0;
    let green2 = 0;
    let green3 = 0;
    let brown1 = 0;
    let brown2 = 0;
    let brown3 = 0;
    let blue1 = 0;
    let blue2 = 0;
    let blue3 = 0;
    for (let i= 0; i<deck1.length; i++) {
        if (deck1[i].color === 'brown') {
            brown1++
        } else if (deck1[i].color === 'blue') {
            blue1++
        } else {
            green1++
        };
    };
    for (let i= 0; i<deck2.length; i++) {
        if (deck2[i].color === 'brown') {
            brown2++
        } else if (deck2[i].color === 'blue') {
            blue2++
        } else {
            green2++
        };
    };
    for (let i= 0; i<deck3.length; i++) {
        if (deck3[i].color === 'brown') {
            brown3++
        } else if (deck3[i].color === 'blue') {
            blue3++
        } else {
            green3++
        };
    };
    document.querySelector('.green-cards1').textContent = green1;
    document.querySelector('.brown-cards1').textContent = brown1;
    document.querySelector('.blue-cards1').textContent = blue1;
    document.querySelector('.green-cards2').textContent = green2;
    document.querySelector('.brown-cards2').textContent = brown2;
    document.querySelector('.blue-cards2').textContent = blue2;
    document.querySelector('.green-cards3').textContent = green3;
    document.querySelector('.brown-cards3').textContent = brown3;
    document.querySelector('.blue-cards3').textContent = blue3;
};

const updateCounter = function(count, cardColour) {
    if (count === 0) {
        if (cardColour === 'brown') {
            document.querySelector('.brown-cards1').textContent--;           
        } else if (cardColour === 'blue') {
            document.querySelector('.blue-cards1').textContent--;            
        } else {
            document.querySelector('.green-cards1').textContent--;   
        }
    } else if (count === 1) {
        if (cardColour === 'brown') {
            document.querySelector('.brown-cards2').textContent--;           
        } else if (cardColour === 'blue') {
            document.querySelector('.blue-cards2').textContent--;            
        } else {
            document.querySelector('.green-cards2').textContent--;   
        } 
    } else {
        if (cardColour === 'brown') {
            document.querySelector('.brown-cards3').textContent--;           
        } else if (cardColour === 'blue') {
            document.querySelector('.blue-cards3').textContent--;            
        } else {
            document.querySelector('.green-cards3').textContent--;   
        }    
    }
}


const playCard = function(){
    showCard(activeDeck);
}


const startGame = function () {
    if (chosenDifficultyLevel === '' || chosenBoss === '') {
        alert('Please select the Boss and the Difficulty level')
    } else {
        shuffleBtn.style.display = 'none';
        nextCard.style.display = 'flex';
        activeDeck = setDecks(count);
        setCounter();
        showCard(activeDeck);

    }
}


shuffleBtn.addEventListener('click', startGame);
nextCard.addEventListener('click', playCard);




