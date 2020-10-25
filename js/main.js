"use strict";

const taskString = document.querySelector(`#task-string`);
const answerString = document.querySelector(`#answer-string`);
const chechButton = document.querySelector(`#check-button`);

const askNewQuestion = function() {
    // taskString.innerText = `${window.vocabulary.TasksAndAnswers[0].question}`;
    // let str = window.vocabulary.TasksAndAnswers[0].question;
    // return str;
    // taskString.innerText = str.toArray();
};
askNewQuestion();

let str = `${window.vocabulary.TasksAndAnswers[0].question}`;
console.log(Array.from(str.toLowerCase().split(' ')));