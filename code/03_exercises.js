// 三、基于下面提供的代码，完成后续的四个练习
class Container {
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}

class MayBe {
    static of(x) {
        return new MayBe(x)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(x) {
        this._value = x
    }
    map(fn) {
        return this.isNothing() ? this : MayBe.of(fn(this._value))
    }
}
module.exports = { MayBe, Container };

// 1：使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
const fp = require('lodash/fp')
const { parseInt } = require("lodash")

let maybe = MayBe.of([5, 6, 1])
// let ex1 = () =>{
//       //补充
// }
// console.log(ex1(3))

// 答：
let ex1 = (num) => {
    let fn = fp.flowRight(fp.map(fp.add(num)))
    return maybe.map(fn);
}
console.log('3-1:', ex1(3));

// 2:实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
// let ex2 = () => {
//     //你要实现的函数
// };

// 答：
let ex2 = () => {
    return xs.map(fp.first)._value
}
console.log('3-2:', ex2()); // do

// 3:实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x, o){
    return MayBe.of(o[x]);
})
let user = {id: 2, name: 'Albert'}

// 答：
let ex3 = () => {
    return safeProp('name',user).map(fp.first)._value
}
console.log('3-3:', ex3());  // A


// 4:使用MayBe重写ex4，不要有if语句
// let  ex4 = function(n){
//     if(n){
//         return parseInt (n)
//     }
// };

let  ex4 = function(n){
    let m1 = new MayBe(n)
    let m2 = m1.map(parseInt)
    return m2._value
};

console.log('3-4:', ex4(1)); 

