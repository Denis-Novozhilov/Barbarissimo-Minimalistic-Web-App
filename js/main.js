"use strict";

const taskArea = document.querySelector(`#task-string`);
const answerArea = document.querySelector(`#answer-string`);
const chechButton = document.querySelector(`#check-button`);
const modeSelector = document.querySelector(`#mode`);
const propArea = document.querySelector(`.proposeds`);

const renderFragment = function(arr) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
        let element = document.createElement(`span`);
        element.style = `${window.randomiser.proposedStyle}`;
        element.innerText = ` ${arr[i]} `;
        fragment.appendChild(element);
    }
    propArea.appendChild(fragment);

};

const askNewQuestion = function() {

    let selectedMode = modeSelector.value;
    let questionLang = window.mode[selectedMode].Question;
    let answerLang = window.mode[selectedMode].Answer;
    let questionString = window.vocabulary.Tasks[9][questionLang];
    let answerString = window.vocabulary.Tasks[9][answerLang];
    
    taskArea.innerText = `${questionString}`;
    


    let arrQuestion = window.randomiser.getArrFromString(questionString);

    let arrAnswer = window.randomiser.getArrFromString(answerString);
    let errorsQuantity = window.randomiser.getRandomFromInterval((arrAnswer.length) / 3 , (arrAnswer.length) / 2);
    let arrWithErrors1st = window.randomiser.getRandomSetFromArrayInQuantity( window.vocabulary.AddWords[answerLang] , errorsQuantity);
    let arrWithErrors2nd = window.randomiser.getRandomSetFromArrayInQuantity( window.vocabulary.AddWords[answerLang] , errorsQuantity);
    let encryptedArray1st = window.randomiser.arrayShaker(arrAnswer, arrWithErrors1st.slice(1, 2));
    let encryptedArray2nd = window.randomiser.arrayShaker(arrAnswer, arrWithErrors2nd.slice(2, -1));
    let encryptedArray = window.randomiser.arrayShaker(encryptedArray1st, encryptedArray2nd);



    renderFragment(encryptedArray);



    // let startValidation = function() {

        let proElems = propArea.querySelectorAll('span');
        for (let proElem of proElems) {
            proElem.addEventListener('click', function(evt){

                window.render.renderWord(evt.target.innerText, answerArea, window.randomiser.answerWordStyle);

                // !!!
                // answerElems = answerArea.querySelectorAll('span');
                // let answerElems = answerArea.querySelectorAll('span');
                // for (let answerElem of answerElems) {
                //     answerElem.addEventListener('click', function(evt){
                //         proElems = propArea.querySelectorAll('span');
                //         console.log(proElems);
                //         window.render.renderWord(evt.target.innerText, propArea, window.randomiser.proposedStyle);
                //         evt.target.style = `display: none`;
                //     });
                // }
                // !!!

                evt.target.style = `display: none`;
            });
        };
        
    // };
    // startValidation();


};

askNewQuestion();
