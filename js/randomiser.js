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

    };
    
})();