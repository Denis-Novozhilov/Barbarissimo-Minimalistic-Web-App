"use strict";

(function () {

    window.render = {
    
        renderWord: function(word, area) {
            let element = document.createElement(`span`);
            element.style = `${window.randomiser.proposedStyle}`;
            element.innerText = word;
            console.log(element);
            console.log(area);
            area.appendChild(element);
            // document.body.answerString.appendChild(element);
        },
    
    };

})();

