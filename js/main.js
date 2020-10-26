"use strict";

const taskString = document.querySelector(`#task-string`);
const answerString = document.querySelector(`#answer-string`);
const chechButton = document.querySelector(`#check-button`);
const modeSelector = document.querySelector(`#mode`);

const askNewQuestion = function() {
    let selectedMode = modeSelector.value;
    let questionLang = window.mode[selectedMode].Question;
    let answerLang = window.mode[selectedMode].Answer;

    taskString.innerText = `${window.vocabulary.Tasks[0][questionLang]}`;
    
};
askNewQuestion();

// let str = `${window.vocabulary.Tasks[0].Spanish}`;
// console.log(Array.from(str.toLowerCase().split(' ')));
/*
console.log(window.vocabulary.Tasks[0][window.mode.EnglishByRussian.Question]);
VM317:1 It is entertaining because students learn robotics and also learn computer programming.

 */