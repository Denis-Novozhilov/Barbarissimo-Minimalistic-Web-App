'use strict';

(function () {
    window.render = {

        renderWord: function (word, area, className) {
            const element = document.createElement(`span`);
            element.classList.add(className);
            element.innerText = word;
            area.insertAdjacentElement(`beforeend`, element);
        },

        renderFragment: function (arr, area, className) {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < arr.length; i++) {
                const element = document.createElement(`span`);
                element.classList.add(className);
                element.innerText = `${arr[i]} `;
                fragment.appendChild(element);
            }
            area.appendChild(fragment);
        }

    };
})();