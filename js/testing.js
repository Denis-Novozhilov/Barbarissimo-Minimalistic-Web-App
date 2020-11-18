'use strict';

(function () {

    window.answerIsCorrect = false;

    window.testings = {
        
        CheckAnswer: function(modeSelector, answerArea, taskArea, propArea, askNewQuestion, checkButton) {
            return function () {

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

                
                if (window.answerIsCorrect) {

                    console.log(`(window.answerIsCorrect == true)`);

                    checkButton.classList.remove(`victory`);
                    window.answerIsCorrect = false;
                    propArea.innerHTML = ``;
                    askNewQuestion();

                } else {

                    if (cleanRightAnswer === cleanUserAnswer) {

                        window.answerIsCorrect = true;
                        scoreRank.textContent = +(scoreRank.textContent) + 1;
                        taskArea.classList.add(`victory`);
                        answerArea.classList.add(`victory`);
                        propArea.classList.add(`victory`);
                        // scoreRank.classList.add(`victory`);
                        propArea.innerHTML = `=^_^=`;
                        setTimeout(function(){
                            taskArea.classList.remove(`victory`);
                            answerArea.classList.remove(`victory`);
                            propArea.classList.remove(`victory`);
                            // scoreRank.classList.remove(`victory`);
                            // propArea.innerHTML = ``;
                            // askNewQuestion();
                            checkButton.classList.add(`victory`);
                            checkButton.value = window.mode[selectedMode].NextWord;
                            // checkButton.addEventListener(`click`, function(){
                                // checkButton.classList.remove(`victory`);
                                // askNewQuestion();
                            // },{once: true});
                        },600);
    
    
                    } else {
    
                        window.answerIsCorrect = false;
                        failRank.textContent = +(failRank.textContent) + 1;
                        taskArea.classList.add(`fail`);
                        answerArea.classList.add(`fail`);
                        setTimeout(function(){
                            taskArea.classList.remove(`fail`);
                            answerArea.classList.remove(`fail`);
                        },400);
                        
                    }

                }


            }
        },
    
    };

})();