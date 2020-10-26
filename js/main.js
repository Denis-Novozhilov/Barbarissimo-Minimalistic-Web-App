"use strict";

const taskString = document.querySelector(`#task-string`);
const answerString = document.querySelector(`#answer-string`);
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

const arrayShaker = function( arrClean, arrDirty ) {
    let shakedLength = (arrClean.length + arrDirty.length) * window.randomiser.getRandomFromInterval(1,2);
    console.log(`shakedLength is ${shakedLength}`);

    console.log(`arrClean is ${arrClean}`);
    console.log(`arrDirty is ${arrDirty}`);

    let arrCleanPart1 = arrClean.slice(0, (arrClean.length / 3));
    arrCleanPart1 = arrCleanPart1.reverse();
    let arrCleanPart2 = arrClean.slice(arrClean.length / 3, (arrClean.length / 3) * 2);
    let arrCleanPart3 = arrClean.slice((arrClean.length / 3) * 2 , arrClean.length);
    arrCleanPart3 = arrCleanPart3.reverse();

    console.log(`arrCleanPart1 is ${arrCleanPart1}`);
    console.log(`arrCleanPart2 is ${arrCleanPart2}`);
    console.log(`arrCleanPart3 is ${arrCleanPart3}`);

    arrClean = [];
    arrClean = arrClean.concat(arrCleanPart1).concat(arrCleanPart2).concat(arrCleanPart3);
    console.log(`AND NOW arrClean is ${arrClean}`);

    let shakedArray = [];
    for (let i = 0; i <shakedLength; i++) {
        if(window.randomiser.getRandomFromInterval(0,10)%2){
            if (arrClean[i]) {
                shakedArray.push(arrClean[i]);
                continue;
            } else {
                shakedArray.push(arrDirty[i]);
                continue;
            }
        } else {
            if (arrDirty[i]) {
                shakedArray.push(arrDirty[i]);
                continue;
            } else {
                shakedArray.push(arrClean[i]);
                continue;
            }
        }
    }
    shakedArray = shakedArray.filter(function (el) {
        return el != null;
    });
    shakedArray = shakedArray.concat(arrClean);
    shakedArray = shakedArray.concat(arrDirty);
    
    shakedArray = shakedArray.filter(function (word, index) {
        return shakedArray.indexOf(word) === index;
    });

    console.log(`arrClean is ${arrClean}`);
    console.log(`arrDirty is ${arrDirty}`);
    console.log(`shakedArr is ${shakedArray}`);

    return shakedArray;
}

const askNewQuestion = function() {

    let selectedMode = modeSelector.value;
    let questionLang = window.mode[selectedMode].Question;
    let answerLang = window.mode[selectedMode].Answer;
    // let questionString = window.vocabulary.Tasks[taskNumber][questionLang];
    let questionString = window.vocabulary.Tasks[9][questionLang];
    let answerString = window.vocabulary.Tasks[9][answerLang];
    
    taskString.innerText = `${questionString}`;
    
    let arrQuestion = window.randomiser.getArrFromString(questionString);
    let arrAnswer = window.randomiser.getArrFromString(answerString);

    let errorsQuantity = window.randomiser.getRandomFromInterval((arrAnswer.length) / 3 , (arrAnswer.length) / 2);
    let arrWithErrors1st = window.randomiser.getRandomSetFromArrayInQuantity( window.vocabulary.AddWords[answerLang] , errorsQuantity);
    let arrWithErrors2nd = window.randomiser.getRandomSetFromArrayInQuantity( window.vocabulary.AddWords[answerLang] , errorsQuantity);
    
    console.log(arrAnswer);
    console.log(errorsQuantity);
    console.log(`arrWithErrors1st is ${arrWithErrors1st}`);
    console.log(`arrWithErrors2nd is ${arrWithErrors2nd}`);

    let encryptedArray1st = arrayShaker(arrAnswer, arrWithErrors1st.slice(1, 2));
    let encryptedArray2nd = arrayShaker(arrAnswer, arrWithErrors2nd.slice(2, -1));

    let encryptedArray = arrayShaker(encryptedArray1st, encryptedArray2nd);

    console.log(encryptedArray);
    // console.log(arrQuestion);
    // renderFragment(arrAnswer);
    renderFragment(encryptedArray);


};
askNewQuestion();

// let str = `${window.vocabulary.Tasks[0].Spanish}`;
// console.log(Array.from(str.toLowerCase().split(' ')));
/*
console.log(window.vocabulary.Tasks[0][window.mode.EnglishByRussian.Question]);
VM317:1 It is entertaining because students learn robotics and also learn computer programming.

 */