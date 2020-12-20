// 二、基于以下代码完成下面的四个练习
const fp = require('lodash/fp');
const cars = [
    { name: 'Ferrair FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jafuar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
];

// 1：使用函数组合fp.flowRight()重新实现下面的函数
let isLaskInStock = function (cars) {
    let last_car = fp.last(cars)
    return fp.prop('in_stock', last_car)
};

let fr1 = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log('2-1:', fr1(cars)) // false

// 2：使用函数组合fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
let fr2 = fp.flowRight(fp.prop('name'), fp.first)
console.log('2-2:', fr2(cars)) // Ferrair FF

// 3：使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} // 无需改动

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
        return car.dollar_value
    }, cars)
    return _average(dollar_values)
}

let a = averageDollarValue(cars)
// console.log(a);

// 答：
let averageDollarValueR = function (cars) {
    let arr = fp.flowRight(_average, fp.map(car => car.dollar_value));
    return arr(cars);
};

let b = averageDollarValueR(cars)
console.log('2-3:', b);

// 4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式，例如：sanitizeNames([‘Hello World’]) => [‘Hello_world’]
let _underscore = fp.replace(/\W+/g, "_") // 无需改动

// 答：
function sanitizeNames() {
    return fp.flowRight(fp.map(name => _underscore(name)))
}

var name = ["hello world", "kai hei"]
console.log('2-4:', sanitizeNames()(name)) // 結果[ 'hello_world', 'bei_jing' ]







