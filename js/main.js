'use strict';

const taskArea = document.querySelector('#task-string');
const answerArea = document.querySelector('#answer-string');
const checkButton = document.querySelector('#check-button');
const modeSelector = document.querySelector('#mode');
const propArea = document.querySelector('.proposeds');

const askNewQuestion = function () {
  answerArea.innerHTML = '';
  propArea.innerHTML = '';

  const randomTaskNumber = window.randomiser.getRandomFromInterval(0, window.vocabulary.Tasks.length - 1);
  const selectedMode = modeSelector.value;
  const questionLang = window.mode[selectedMode].Question;
  const answerLang = window.mode[selectedMode].Answer;

  checkButton.value = window.mode[selectedMode].ChekWord;

  const currentTask = window.vocabulary.Tasks[randomTaskNumber];

  window.currentTaskItem = currentTask;

  const questionString = currentTask[questionLang];
  const answerString = currentTask[answerLang];

  taskArea.innerText = `${questionString}`;

  const arrQuestion = window.randomiser.getArrFromString(questionString);
  const arrAnswer = window.randomiser.getArrFromString(answerString);

  const errorsQuantity = window.randomiser.getRandomFromInterval((arrAnswer.length) / 3, (arrAnswer.length) / 2);
  const arrWithErrors1st = window.randomiser.getRandomSetFromArrayInQuantity(window.vocabulary.AddWords[answerLang], errorsQuantity);
  const arrWithErrors2nd = window.randomiser.getRandomSetFromArrayInQuantity(window.vocabulary.AddWords[answerLang], errorsQuantity);

  const encryptedArray1st = window.randomiser.arrayShaker(arrAnswer, arrWithErrors1st.slice(1, 2));
  const encryptedArray2nd = window.randomiser.arrayShaker(arrAnswer, arrWithErrors2nd.slice(2, -1));
  const encryptedArray = window.randomiser.arrayShaker(encryptedArray1st, encryptedArray2nd);

  window.render.renderFragment(encryptedArray, propArea, 'proposeds-words');
};

askNewQuestion();

propArea.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'SPAN') {
    window.render.renderWord(evt.target.textContent, answerArea, 'answer-words');
    evt.target.remove();
  }
});

answerArea.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'SPAN') {
    window.render.renderWord(evt.target.textContent, propArea, 'proposeds-words');
    evt.target.remove();
  }
});

modeSelector.addEventListener('change', function () {
  askNewQuestion();
});

checkButton.addEventListener('click', window.testings.CheckAnswer(modeSelector, answerArea, taskArea, propArea, askNewQuestion, checkButton));
