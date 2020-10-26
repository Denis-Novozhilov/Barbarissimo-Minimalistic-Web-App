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
        `,

    };
    
})();