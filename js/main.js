'use strict';

const taskArea = document.querySelector(`#task-string`);
const answerArea = document.querySelector(`#answer-string`);
const checkButton = document.querySelector(`#check-button`);
const modeSelector = document.querySelector(`#mode`);
const propArea = document.querySelector(`.proposeds`);

const askNewQuestion = function () {
    answerArea.innerHTML = ``;
    propArea.innerHTML = ``;
    window.answerIsCorrect = false;

    const randomTaskNumber = window.randomiser.getRandomFromInterval(0, window.vocabulary.Tasks.length - 1);
    const selectedMode = modeSelector.value;
    const questionLang = window.mode[selectedMode].Question;
    const answerLang = window.mode[selectedMode].Answer;

    checkButton.classList.remove(`victory`);
    checkButton.value = window.mode[selectedMode].ChekWord;

    const currentTask = window.vocabulary.Tasks[randomTaskNumber];

    window.currentTaskItem = currentTask;

    const questionString = currentTask[questionLang];
    const answerString = currentTask[answerLang];

    taskArea.innerText = `${questionString}`;

    // const arrQuestion = window.randomiser.getIndexedArrFromString(questionString);
    const arrAnswer = window.randomiser.getIndexedArrFromString(answerString);
    // console.log(`arrAnswer -> ${arrAnswer}`);

    const errorsQuantity = window.randomiser.getRandomFromInterval((arrAnswer.length) / 3, (arrAnswer.length) / 2);
    const arrWithErrors1st = window.randomiser.getRandomSetFromArrayInQuantity(window.vocabulary.AddWords[answerLang], errorsQuantity);

    const encryptedArray = window.randomiser.arrayShaker(arrAnswer, arrWithErrors1st);

    window.render.renderFragment(encryptedArray, propArea, `proposeds-words`);
};

askNewQuestion();

propArea.addEventListener(`click`, function (evt) {
    if (evt.target.nodeName === `SPAN`) {
        window.render.renderWord(evt.target.textContent, answerArea, `answer-words`);
        evt.target.remove();
    }
});

answerArea.addEventListener(`click`, function (evt) {
    if (evt.target.nodeName === `SPAN`) {
        window.render.renderWord(evt.target.textContent, propArea, `proposeds-words`);
        evt.target.remove();
    }
});

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
    const answerArray = cleanRightAnswer.split(/[!"#$%&*+, \-.:;<=>?@[\]^_`{|}~]+/g);
    let answerString = answerArray.join(`_`);
    if (answerString.slice(answerString.length - 1) === `_`) {
        answerString = answerString.slice(0, answerString.length - 1);
    };
    // console.log(answerString);

    const yourArray = cleanUserAnswer.split(/[!"#$%&*+, \-.:;<=>?@[\]^_`{|}~]+/g);
    let yourString = yourArray.join(`_`);
    if (yourString.slice(yourString.length - 1) === `_`) {
        yourString = yourString.slice(0, yourString.length - 1);
    };
    // console.log(yourString);
    // clear and DRY ↑↑↑
    // ↑↑↑

    const scoreRank = document.querySelector(`#scoreRank`).querySelector(`.rank`);
    const failRank = document.querySelector(`#failRank`).querySelector(`.rank`);

    if (window.answerIsCorrect) {
        checkButton.classList.remove(`victory`);
        propArea.innerHTML = ``;
        window.answerIsCorrect = false;
        askNewQuestion();
    } else {
        if (answerString === yourString) {
            window.answerIsCorrect = true;
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
        } else {
            window.answerIsCorrect = false;
            console.log(cleanRightAnswer);
            failRank.textContent = +(failRank.textContent) + 1;
            taskArea.classList.add(`fail`);
            answerArea.classList.add(`fail`);
            setTimeout(function () {
                taskArea.classList.remove(`fail`);
                answerArea.classList.remove(`fail`);
            }, 400);
        }
    }
};

checkButton.addEventListener(`click`, checkAnswer);