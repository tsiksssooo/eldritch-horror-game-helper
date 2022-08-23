import ancientsData from './data/ancients.js';

//////////////////////////// BOSS SELECTION START ////////////////////////////

const boss = document.querySelectorAll('.game-boss-card');
let chosenBoss = '';

const selectBoss = function() {
    chosenBoss = this.alt;
    resetBorder();
    this.style.border = 'dashed red';
}

const resetBorder = function() {
    for (let i=0; i<boss.length; i++) {
        boss[i].style.border = 'solid #555';
    }
}

for (let i=0; i<boss.length; i++) {
    boss[i].addEventListener('click', selectBoss);
}

//////////////////////////// BOSS SELECTION END ////////////////////////////


//////////////////////////// DIFFICULTY LEVEL SELECTION START ////////////////////////////
const level = document.querySelectorAll('.difficulty-btn');
let chosenDifficultyLevel = '';

const selectLevel = function() {
    chosenDifficultyLevel = this.innerHTML;
    resetLevel();
    this.style.border = 'dashed red';

}

const resetLevel = function() {
    for (let i=0; i<level.length; i++) {
        level[i].style.border = 'solid #555';
    }
}

for (let i=0; i<level.length; i++) {
    level[i].addEventListener('click', selectLevel);
}

//////////////////////////// DIFFICULTY LEVEL SELECTION END ////////////////////////////

//////////////////////////// SHUFFLE DECK START ////////////////////////////

const shuffleBtn = document.querySelector('.shuffle-cards');


const getNeededCards = function() { 
    const bossData = ancientsData.find(element => element.id === chosenBoss);
    let firstStageCards = bossData.firstStage;
    let secondStageCards = bossData.secondStage;
    let thirdStageCards = bossData.thirdStage;
    let greenCards = firstStageCards.greenCards + secondStageCards.greenCards + thirdStageCards.greenCards;
    let brownCards = firstStageCards.brownCards + secondStageCards.brownCards + thirdStageCards.brownCards;
    let blueCards = firstStageCards.blueCards + secondStageCards.blueCards + thirdStageCards.blueCards;
    // console.log(greenCards, brownCards, blueCards)
    // console.log(greenCards);
    // console.log(firstStageCards, secondStageCards, thirdStageCards)
    // console.log(bossData);
};








const startGame = function() {
    if (chosenDifficultyLevel === '' || chosenBoss === '') {
        alert('Please select the Boss and the Difficulty level')
    } else {
        getNeededCards();
    }
}
shuffleBtn.addEventListener('click', startGame);




//////////////////////////// SHUFFLE DECK END ////////////////////////////