/* eslint-disable no-useless-escape */
'use strict';

(function () {
    window.randomiser = {

        getRandomFromInterval: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        getRandomFromArray: function (dataArr) {
            return dataArr[window.randomiser.getRandomFromInterval(0, dataArr.length - 1)];
        },

        getSetFromArrayItems: function (arr) {
            const newArr = [];
            const quantityVar = window.randomiser.getRandomFromInterval(1, arr.length);
            for (let i = 0; i < quantityVar; i++) {
                newArr.push(arr[i]);
            }
            return newArr;
        },

        getRandomSetFromArrayInQuantity: function (arr, quantity) {
            const newArr = [];
            for (let i = 0; i < quantity; i++) {
                const item = arr[window.randomiser.getRandomFromInterval(1, arr.length - 1)];
                if (newArr.includes(item)) {
                    i--;
                    continue;
                }
                newArr.push(item);
            }
            return newArr;
        },

        getIndexedArrFromString: function (str) {
            const arr1 = Array.from(str.toLowerCase().split(` `));

            return arr1;
        },

        arrayShaker: function (arrClean, arrDirty) {
            const arrMidle = [];

            arrClean.forEach(function (value, index) {
                arrMidle.push(`###${index}###${value}`);
            });
            arrClean = arrMidle;

            const shakedLength = (arrClean.length + arrDirty.length) * window.randomiser.getRandomFromInterval(1, 2);

            let arrCleanPart1 = arrClean.slice(0, (arrClean.length / 3));
            arrCleanPart1 = arrCleanPart1.reverse();
            const arrCleanPart2 = arrClean.slice(arrClean.length / 3, (arrClean.length / 3) * 2);
            let arrCleanPart3 = arrClean.slice((arrClean.length / 3) * 2, arrClean.length);
            arrCleanPart3 = arrCleanPart3.reverse();

            arrClean = [];
            arrClean = arrClean.concat(arrCleanPart1).concat(arrCleanPart2).concat(arrCleanPart3);

            let shakedArray = [];
            for (let i = 0; i < shakedLength; i++) {
                if (window.randomiser.getRandomFromInterval(0, 10) % 2) {
                    if (arrClean[i]) {
                        shakedArray.push(arrClean[i]);
                        continue;
                    } else {
                        shakedArray.push(arrDirty[i]);
                        continue;
                    }
                } else {
                    if (arrDirty[i]) {
                        shakedArray.push(arrDirty[i]);
                        continue;
                    } else {
                        shakedArray.push(arrClean[i]);
                        continue;
                    }
                }
            }

            shakedArray = shakedArray.filter(function (el) {
                return el != null;
            });

            shakedArray = shakedArray.concat(arrClean);
            shakedArray = shakedArray.concat(arrDirty);

            shakedArray = shakedArray.filter(function (word, index) {
                return shakedArray.indexOf(word) === index;
            });

            let cleanedShakedArray = [];

            shakedArray.forEach(function (value, index) {
                cleanedShakedArray.push(value.replace(/###[0-9]###|###[0-9][0-9]###|###[0-9][0-9][0-9]###/g, ``));
            });

            const middleArray = [];

            cleanedShakedArray.forEach(function (value) {
                const regexp = /[!"#$%&*+,\./:;<=>?@[\]^_`{|}~]/g;

                const middleValue = value.replace(regexp, ``);

                middleArray.push(middleValue);
            });
            cleanedShakedArray = middleArray;

            return cleanedShakedArray;
        }

    };
})();