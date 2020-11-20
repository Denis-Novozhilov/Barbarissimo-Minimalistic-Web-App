/* eslint-disable no-useless-escape */
'use strict';

const taskArea = document.querySelector(`#task-string`);
const answerArea = document.querySelector(`#answer-string`);
const checkButton = document.querySelector(`#check-button`);
const modeSelector = document.querySelector(`#mode`);
const propArea = document.querySelector(`.proposeds`);

window.gameStatus = {
    isRoundActivated: false,
    isRoundCompleted: false,
    isAnswerCorrect: false
};

// all function askNewQuestion should be refactored
const askNewQuestion = function () {
    // coild be separated function resetStatus and cleanAreas ↓↓↓
    answerArea.innerHTML = ``;
    propArea.innerHTML = ``;
    window.gameStatus.isAnswerCorrect = false;
    window.gameStatus.isRoundActivated = false;
    window.gameStatus.isRoundCompleted = false;
    checkButton.setAttribute(`disabled`, `disabled`);
    // ↑↑↑

    const randomTaskNumber = window.randomiser.getRandomFromInterval(0, window.vocabulary.Tasks.length - 1);
    const selectedMode = modeSelector.value;
    const questionLang = window.mode[selectedMode].Question;
    const answerLang = window.mode[selectedMode].Answer;

    // checkButton.classList.remove(`victory`);
    checkButton.value = window.mode[selectedMode].ChekWord;

    const currentTask = window.vocabulary.Tasks[randomTaskNumber];

    window.currentTaskItem = currentTask;

    const questionString = currentTask[questionLang];
    const answerString = currentTask[answerLang];

    taskArea.innerText = `${questionString}`;

    const arrAnswer = window.randomiser.getIndexedArrFromString(answerString);

    const errorsQuantity = window.randomiser.getRandomFromInterval((arrAnswer.length) / 3, (arrAnswer.length) / 2);
    const arrWithErrors = window.randomiser.getRandomSetFromArrayInQuantity(window.vocabulary.AddWords[answerLang], errorsQuantity);

    const encryptedArray = window.randomiser.arrayShaker(arrAnswer, arrWithErrors);

    window.render.renderFragment(encryptedArray, propArea, `proposeds-words`);
};

// ↓↓↓
// clear and DRY ↓↓↓
propArea.addEventListener(`click`, function (evt) {
    // could be separated funcion activatedRound
    if (!window.gameStatus.isRoundActivated) {
        window.gameStatus.isRoundActivated = true;
        checkButton.removeAttribute(`disabled`);
    }
    // could be separated funcion replaceElement
    if (evt.target.nodeName === `SPAN`) {
        window.render.renderWord(evt.target.textContent, answerArea, `answer-words`);
        evt.target.remove();
    }
});

answerArea.addEventListener(`click`, function (evt) {
    // could be separated funcion activatedRound
    if (!window.gameStatus.isRoundActivated) {
        window.gameStatus.isRoundActivated = true;
        checkButton.removeAttribute(`disabled`);
    }
    // could be separated funcion replaceElement
    if (evt.target.nodeName === `SPAN`) {
        window.render.renderWord(evt.target.textContent, propArea, `proposeds-words`);
        evt.target.remove();
    }
});
// clear and DRY ↑↑↑
// ↑↑↑

modeSelector.addEventListener(`change`, function () {
    askNewQuestion();
});

const checkAnswer = function () {
    const currentTask = window.currentTaskItem;
    const selectedMode = modeSelector.value;
    const answerLang = window.mode[selectedMode].Answer;

    const cleanRightAnswer = (currentTask[answerLang].toLowerCase());
    const cleanUserAnswer = answerArea.textContent;

    // ↓↓↓
    // clear and DRY ↓↓↓
    const answerArray = cleanRightAnswer.split(/[!"#$%&*+, \.:;<=>?@[\]^_`{|}~]+/g);
    let answerString = answerArray.join(`_`);
    if (answerString.slice(answerString.length - 1) === `_`) {
        answerString = answerString.slice(0, answerString.length - 1);
    };
    // console.log(answerString);

    const yourArray = cleanUserAnswer.split(/[!"#$%&*+, \.:;<=>?@[\]^_`{|}~]+/g);
    let yourString = yourArray.join(`_`);
    if (yourString.slice(yourString.length - 1) === `_`) {
        yourString = yourString.slice(0, yourString.length - 1);
    };
    // console.log(yourString);
    // clear and DRY ↑↑↑
    // ↑↑↑

    const scoreRank = document.querySelector(`#scoreRank`).querySelector(`.rank`);
    const failRank = document.querySelector(`#failRank`).querySelector(`.rank`);

    if (window.gameStatus.isRoundCompleted) {
        // could be separated function returnGame
        checkButton.classList.remove(`victory`);
        checkButton.classList.remove(`fail`);
        propArea.innerHTML = ``;
        askNewQuestion();
    } else {
        if (answerString === yourString) {
            // this code should be refactored DRY ↓↓↓↓↓
            window.gameStatus.isAnswerCorrect = true;
            window.gameStatus.isRoundCompleted = true;
            scoreRank.textContent = +(scoreRank.textContent) + 1;
            taskArea.classList.add(`victory`);
            answerArea.classList.add(`victory`);
            propArea.classList.add(`victory`);
            propArea.innerHTML = `=^_^=`;
            setTimeout(function () {
                taskArea.classList.remove(`victory`);
                answerArea.classList.remove(`victory`);
                propArea.classList.remove(`victory`);
                checkButton.classList.add(`victory`);
                checkButton.value = window.mode[selectedMode].NextWord;
            }, 600);
            // ↑↑↑↑↑ DRY and clear
        } else {
            // this code should be refactored DRY ↓↓↓↓↓
            window.gameStatus.isAnswerCorrect = false;
            window.gameStatus.isRoundCompleted = true;
            console.log(cleanRightAnswer);
            failRank.textContent = +(failRank.textContent) + 1;
            taskArea.classList.add(`fail`);
            answerArea.classList.add(`fail`);
            checkButton.classList.add(`fail`);
            checkButton.value = window.mode[selectedMode].NextWord;
            propArea.innerHTML = `${cleanRightAnswer}`;
            propArea.classList.add(`fail`);
            setTimeout(function () {
                taskArea.classList.remove(`fail`);
                answerArea.classList.remove(`fail`);
                propArea.classList.remove(`fail`);
            }, 400);
            // ↑↑↑↑↑ DRY and clear
        }
    }
};

// start game ↓↓↓
askNewQuestion();
checkButton.addEventListener(`click`, checkAnswer);