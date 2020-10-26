"use strict";

const taskArea = document.querySelector(`#task-string`);
const answerArea = document.querySelector(`#answer-string`);
const checkButton = document.querySelector(`#check-button`);
const modeSelector = document.querySelector(`#mode`);
const propArea = document.querySelector(`.proposeds`);

const askNewQuestion = function() {

    let randomTaskNumber = window.randomiser.getRandomFromInterval(0, 9);
    let selectedMode = modeSelector.value;
    let questionLang = window.mode[selectedMode].Question;
    let answerLang = window.mode[selectedMode].Answer;
    let questionString = window.vocabulary.Tasks[randomTaskNumber][questionLang];
    let answerString = window.vocabulary.Tasks[randomTaskNumber][answerLang];
    
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

