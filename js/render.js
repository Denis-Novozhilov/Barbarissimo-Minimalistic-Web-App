"use strict";

(function () {

    window.render = {
    
        renderWord: function(word, area, style) {
            let element = document.createElement(`span`);
            element.style = `${style}`;
            element.innerText = word;
            area.insertAdjacentElement(`afterbegin`, element);
        },
    
    };

})();

