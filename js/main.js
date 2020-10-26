"use strict";

const taskString = document.querySelector(`#task-string`);
const answerString = document.querySelector(`#answer-string`);
const chechButton = document.querySelector(`#check-button`);

const askNewQuestion = function() {

};
askNewQuestion();

let str = `${window.vocabulary.Tasks[0].Spanish}`;
console.log(Array.from(str.toLowerCase().split(' ')));
/*
console.log(window.vocabulary.Tasks[0][window.mode.EnglishByRussian.Question]);
VM317:1 It is entertaining because students learn robotics and also learn computer programming.

 */