"use strict";

const taskArea = document.querySelector(`#task-string`);
const answerArea = document.querySelector(`#answer-string`);
const checkButton = document.querySelector(`#check-button`);
const modeSelector = document.querySelector(`#mode`);
const propArea = document.querySelector(`.proposeds`);





const askNewQuestion = function() {

    answerArea.innerHTML = ``;
    propArea.innerHTML = ``;
    
    let randomTaskNumber = window.randomiser.getRandomFromInterval(0, 9);
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

    // console.log(typeof rightAnswer);
    // let preClean = rightAnswer.toLowerCase();
    console.log(rightAnswer.length);
    let cleanRightAnswer = rightAnswer.slice(0, rightAnswer.length-1);
    cleanRightAnswer = cleanRightAnswer.replace(/, /g, ` `);

    console.log(`HERE->[${cleanRightAnswer}]`);

    // console.log(`!!![${cleanRightAnswer}]!!!`);


    let usersAnswer = answerArea.textContent;

    // console.log(usersAnswer);
    // console.log(typeof usersAnswer);

    let cleanAnswer = (usersAnswer.replace(/  /g, ` `).slice(1));
    let cleanUserAnswer = cleanAnswer.slice(0, cleanAnswer.length-1);
    console.log(`HERE->[${cleanUserAnswer}]`);

    console.log(cleanRightAnswer === cleanUserAnswer);

    if (cleanRightAnswer === cleanUserAnswer) {
        taskArea.classList.add(`victory`);
        answerArea.classList.add(`victory`);
        propArea.classList.add(`victory`);
        propArea.innerHTML = `Правильно =^_^=`;
        setTimeout(function(){
            taskArea.classList.remove(`victory`);
            answerArea.classList.remove(`victory`);
            propArea.classList.remove(`victory`);
            propArea.innerHTML = ``;
            askNewQuestion();
        },2600);
    } else {
        taskArea.classList.add(`fail`);
        answerArea.classList.add(`fail`);
        setTimeout(function(){
            taskArea.classList.remove(`fail`);
            answerArea.classList.remove(`fail`);
        },1900);
    }
});


/*
    let selectedMode = modeSelector.value;
    let questionLang = window.mode[selectedMode].Question;
    let answerLang = window.mode[selectedMode].Answer;

    let questionString = window.vocabulary.Tasks[randomTaskNumber][questionLang];

    let writeAnswer = window.vocabulary.Tasks[randomTaskNumber][answerLang];

    writeAnswer = writeAnswer.toLowerCase();

    writeAnswer = Array.from(writeAnswer);
    // writeAnswer = Array.from(writeAnswer);
    // console.log(x);
    writeAnswer = writeAnswer.filter(function(el) {
        return el != null;
    });

    console.log(writeAnswer[20]);

    // writeAnswer = Object.toString(writeAnswer);

    let usersAnswer = answerArea.textContent;

    console.log(usersAnswer);
 */