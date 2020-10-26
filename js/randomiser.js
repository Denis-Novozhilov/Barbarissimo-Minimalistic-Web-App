(function(){

    window.randomiser = {

        getRandomFromInterval: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    
        getRandomFromArray: function (dataArr) {
            return dataArr[window.randomiser.getRandomFromInterval(0, dataArr.length - 1)];
        },
    
        getSetFromArrayItems: function (arr) {
            let newArr = [];
            let quantityVar = window.randomiser.getRandomFromInterval(1, arr.length);
            for (let i = 0; i < quantityVar; i++) {
            newArr.push(arr[i]);
            }
            return newArr;
        },

        getRandomSetFromArrayInQuantity: function (arr, quantity) {
            let newArr = [];
            for (let i = 0; i < quantity; i++) {
                let item = arr[window.randomiser.getRandomFromInterval(1, arr.length-1)];
                if (newArr.includes(item)) {
                    i--;
                    continue;
                }
                newArr.push(item);
            }
            return newArr;
        },

        getArrFromString: function(str) {
            let arr1 = Array.from(str.toLowerCase().split(`, `));
            let arr2 = [];
            let arr3 = [];
            arr1.forEach(function(value) {
                arr2.push(value.split(` `));
            });
            arr2.forEach(function(value) {
                arr3 = arr3.concat(value);
            });
            arr3[arr3.length-1] = arr3[arr3.length-1].replace(`.`,``);
            return arr3;
        },

        arrayShaker: function( arrClean, arrDirty ) {

            let shakedLength = (arrClean.length + arrDirty.length) * window.randomiser.getRandomFromInterval(1,2);
        
            let arrCleanPart1 = arrClean.slice(0, (arrClean.length / 3));
            arrCleanPart1 = arrCleanPart1.reverse();
            let arrCleanPart2 = arrClean.slice(arrClean.length / 3, (arrClean.length / 3) * 2);
            let arrCleanPart3 = arrClean.slice((arrClean.length / 3) * 2 , arrClean.length);
            arrCleanPart3 = arrCleanPart3.reverse();
        
            arrClean = [];
            arrClean = arrClean.concat(arrCleanPart1).concat(arrCleanPart2).concat(arrCleanPart3);
        
            let shakedArray = [];
            for (let i = 0; i <shakedLength; i++) {
                if(window.randomiser.getRandomFromInterval(0,10)%2){
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
        
            return shakedArray;
        },

        proposedStyle: `
            border: 1px solid rgba(255, 255, 255);
            padding: 0 0.5em;
            margin: 0 0.3em;
            border-radius: 5px;
            font-family: arial,sans-serif;
            font-size: 1em;
            text-align: center;
            color: rgb(153, 84, 34);
            vertical-align: super;
            transition: .8s ease-out;
        `,

        answerWordStyle: `
            border: 1px solid rgb(208, 195, 195);
            padding: 0 0.5em;
            margin: 0 0.3em;
            border-radius: 5px;
            font-family: arial,sans-serif;
            font-size: 1em;
            text-align: center;
            color: rgb(153, 84, 34);
            vertical-align: super;
            transition: .8s ease-out;
        `,

    };
    
})();