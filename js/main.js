"use strict";

const taskArea = document.querySelector(`#task-string`);
const answerArea = document.querySelector(`#answer-string`);
const checkButton = document.querySelector(`#check-button`);
const modeSelector = document.querySelector(`#mode`);
const propArea = document.querySelector(`.proposeds`);

const askNewQuestion = function() {

    answerArea.innerHTML = ``;
    propArea.innerHTML = ``;
    
    let randomTaskNumber = window.randomiser.getRandomFromInterval(0, window.vocabulary.Tasks.length-1);
    let selectedMode = modeSelector.value;
    let questionLang = window.mode[selectedMode].Question;
    let answerLang = window.mode[selectedMode].Answer;

    let currentTask = window.vocabulary.Tasks[randomTaskNumber];

    window.currentTaskItem = currentTask;

    let questionString = currentTask[questionLang];
    let answerString = currentTask[answerLang];

    taskArea.innerText = `${questionString}`;
    
    let arrQuestion = window.randomiser.getArrFromString(questionString);
    let arrAnswer = window.randomiser.getArrFromString(answerString);

    let errorsQuantity = window.randomiser.getRandomFromInterval((arrAnswer.length) / 3 , (arrAnswer.length) / 2);
    let arrWithErrors1st = window.randomiser.getRandomSetFromArrayInQuantity( window.vocabulary.AddWords[answerLang] , errorsQuantity);
    let arrWithErrors2nd = window.randomiser.getRandomSetFromArrayInQuantity( window.vocabulary.AddWords[answerLang] , errorsQuantity);

    let encryptedArray1st = window.randomiser.arrayShaker(arrAnswer, arrWithErrors1st.slice(1, 2));
    let encryptedArray2nd = window.randomiser.arrayShaker(arrAnswer, arrWithErrors2nd.slice(2, -1));
    let encryptedArray = window.randomiser.arrayShaker(encryptedArray1st, encryptedArray2nd);

    window.render.renderFragment(encryptedArray, propArea, window.randomiser.proposedStyle);

};

askNewQuestion();

propArea.addEventListener('click', function(evt){
    if(evt.target.nodeName === `SPAN`) {
        window.render.renderWord(evt.target.textContent, answerArea, window.randomiser.answerWordStyle);
        evt.target.remove();
    }
});

answerArea.addEventListener('click', function(evt){
    if(evt.target.nodeName === `SPAN`) {
        window.render.renderWord(evt.target.textContent, propArea, window.randomiser.proposedStyle);
        evt.target.remove();
    }
});

modeSelector.addEventListener('change', function(){
    answerArea.innerHTML = ``;
    propArea.innerHTML = ``;
    askNewQuestion();
});

checkButton.addEventListener('click', function(evt){
    let currentTask = window.currentTaskItem;

    let selectedMode = modeSelector.value;
    let answerLang = window.mode[selectedMode].Answer;
    let rightAnswer = (currentTask[answerLang].toLowerCase());

    let cleanRightAnswer = rightAnswer.slice(0, rightAnswer.length-1);
    cleanRightAnswer = cleanRightAnswer.replace(/, /g, ` `);

    console.log(`HERE IS ANSWER->[${cleanRightAnswer}]`);

    let usersAnswer = answerArea.textContent;
    let cleanAnswer = (usersAnswer.replace(/  /g, ` `).slice(1));
    let cleanUserAnswer = cleanAnswer.slice(0, cleanAnswer.length-1);

    let scoreRank = document.querySelector(`#scoreRank`).querySelector(`.rank`);
    let failRank = document.querySelector(`#failRank`).querySelector(`.rank`);

    if (cleanRightAnswer === cleanUserAnswer) {
        scoreRank.textContent = +(scoreRank.textContent) + 1;
        taskArea.classList.add(`victory`);
        answerArea.classList.add(`victory`);
        propArea.classList.add(`victory`);
        propArea.innerHTML = `Правильно =^_^=`;
        setTimeout(function(){
            taskArea.classList.remove(`victory`);
            answerArea.classList.remove(`victory`);
            propArea.classList.remove(`victory`);
            // +(document.querySelector(`#scoreRank`).querySelector(`.rank`).textContent)+1;
            // scoreRank.textContent = +(scoreRank.textContent) + 1;
            propArea.innerHTML = ``;
            askNewQuestion();
        },2600);
    } else {
        failRank.textContent = +(failRank.textContent) + 1;
        taskArea.classList.add(`fail`);
        answerArea.classList.add(`fail`);
        setTimeout(function(){
            taskArea.classList.remove(`fail`);
            answerArea.classList.remove(`fail`);
            // +(document.querySelector(`#failRank`).querySelector(`.rank`).textContent)+1;
            // failRank.textContent = +(failRank.textContent) + 1;
        },1900);
    }
});


// document.querySelector(`#scoreRank`);
// document.querySelector(`#scoreRank`).querySelector(`.rank`);

// +(document.querySelector(`#scoreRank`).querySelector(`.rank`).textContent)+1;


// document.querySelector(`#failRank`).querySelector(`.rank`);

// +(document.querySelector(`#failRank`).querySelector(`.rank`).textContent)+1;