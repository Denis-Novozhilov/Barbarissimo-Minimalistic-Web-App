"use strict";

(function () {

    window.render = {
    
        renderWord: function(word, area, style) {
            let element = document.createElement(`span`);
            element.style = style;
            element.innerText = word;
            area.insertAdjacentElement(`afterbegin`, element);
        },

        renderFragment: function(arr, area, style) {
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < arr.length; i++) {
                let element = document.createElement(`span`);
                element.style = style;
                element.innerText = ` ${arr[i]} `;
                fragment.appendChild(element);
            }
            area.appendChild(fragment);
        },
    
    };

})();

