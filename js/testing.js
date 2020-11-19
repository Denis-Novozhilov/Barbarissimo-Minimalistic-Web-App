'use strict';

(function () {
    window.answerIsCorrect = false;

    window.testings = {

        CheckAnswer: function (modeSelector, answerArea, taskArea, propArea, askNewQuestion, checkButton) {
            return function () {
                const currentTask = window.currentTaskItem;
                const selectedMode = modeSelector.value;
                const answerLang = window.mode[selectedMode].Answer;
                const rightAnswer = (currentTask[answerLang].toLowerCase());

                let cleanRightAnswer = rightAnswer.slice(0, rightAnswer.length - 1);
                cleanRightAnswer = cleanRightAnswer.replace(/, /g, ' ');

                console.log(`HERE IS ANSWER->[${cleanRightAnswer}]`);

                const usersAnswer = answerArea.textContent;
                const cleanAnswer = (usersAnswer.replace(/ {2}/g, ' ').slice(1));
                const cleanUserAnswer = cleanAnswer.slice(0, cleanAnswer.length - 1);

                const scoreRank = document.querySelector('#scoreRank').querySelector('.rank');
                const failRank = document.querySelector('#failRank').querySelector('.rank');

                if (window.answerIsCorrect) {
                    console.log('(window.answerIsCorrect == true)');

                    checkButton.classList.remove('victory');
                    window.answerIsCorrect = false;
                    propArea.innerHTML = '';
                    askNewQuestion();
                } else {
                    if (cleanRightAnswer === cleanUserAnswer) {
                        window.answerIsCorrect = true;
                        scoreRank.textContent = +(scoreRank.textContent) + 1;
                        taskArea.classList.add('victory');
                        answerArea.classList.add('victory');
                        propArea.classList.add('victory');
                        propArea.innerHTML = '=^_^=';
                        setTimeout(function () {
                            taskArea.classList.remove('victory');
                            answerArea.classList.remove('victory');
                            propArea.classList.remove('victory');
                            checkButton.classList.add('victory');
                            checkButton.value = window.mode[selectedMode].NextWord;
                        }, 600);
                    } else {
                        window.answerIsCorrect = false;
                        failRank.textContent = +(failRank.textContent) + 1;
                        taskArea.classList.add('fail');
                        answerArea.classList.add('fail');
                        setTimeout(function () {
                            taskArea.classList.remove('fail');
                            answerArea.classList.remove('fail');
                        }, 400);
                    }
                }
            };
        }

    };
})();