// 四、手写实现MyPromise源码

// 要求：尽可能还原Promise中的每一个API，并通过注释的方式描述思路和原理

/**
 * 1、promise是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 * 2、Promise中有三个状态，分别为 成功 resolve、失败 reject、等待 pedding
 *    状态一旦确定就不能被改变
 *    pedding->resolve
 *    pedding->reject
 * 3、resolve和reject函数是用来更改状态的
 *    resolve:fufilled
 *    reject:rejected
 * 4、then方法做的事情就是判断状态，如果状态是成功，调用成功回调函数，如果是失败，调用失败函数，then方法是被定义在原型对象中
 * 5、then成功回调有一个参数，表示成功之后的值，失败回调有一个参数，表示失败的原因
 */
const PEDDING = 'pedding' //等待
const FUFILLED = 'fufilled' //成功
const REJECT = 'reject' //失败

class MyPromise {
    constructor(exeuctor) {
        try {
            exeuctor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    status = PEDDING
    //成功之后的值
    value = undefined
    //失败之后的原因
    reason = undefined
    //成功回调
    // successCallback = undefined  只能处理一个回调函数
    successCallback = []
    //失败回调
    // failCallback = undefined
    failCallback = []


    //使用箭头函数定义是为了执行方法的时候让this指向MyPromise的实例对象
    resolve = value => {
        //如果状态不是等待，向下执行
        if (this.status !== PEDDING) return
        this.status = FUFILLED
        //保存成功之后的值
        this.value = value
        //判断成功回调是否存在，如果存在则调用
        // this.successCallback && this.successCallback(this.value)
        while (this.successCallback.length) {
            // this.successCallback.shift()(this.value)
            this.successCallback.shift()()
        }
    }

    reject = reason => {
        if (this.status !== PEDDING) return
        this.status = REJECT
        //保存失败后的原因
        this.reason = reason
        // this.failCallback && this.failCallback(this.reason)
        while (this.failCallback.length) {
            // this.failCallback.shift()(this.reason)
            this.failCallback.shift()()
        }
    }

    then(successCallback, failCallback) {
        successCallback = successCallback ? successCallback : value => value
        failCallback = failCallback ? failCallback : reason => { throw reason }
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FUFILLED) {
                // let x = successCallback(this.value)
                /**
                 * 需要判断x的值是普通值还是promise对象,如果是普通值，直接调用resolve，
                 * 如果是promise对象，查看promise的结果，根据promise对象返回的结果决定调用resolve，reject
                 */
                // resolvePromise(x,resolve,reject)
                //防止循环调用,但是此时promise2并不能获取到，所以现在需要使其变成异步执行代码
                // resolvePromise(promise2,x,resolve,reject)
                //使用try-catch捕获异常
                try {
                    setTimeout(() => {
                        let x = successCallback(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                } catch (error) {
                    reject(error)
                }
            } else if (this.status === REJECT) {
                setTimeout(() => {
                    let x = failCallback(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                }, 0)
            } else {
                //状态为pedding，等待
                // 将成功回调和失败回调存储起来
                // this.successCallback.push(successCallback)
                this.successCallback.push(() => {
                    setTimeout(() => {
                        let x = successCallback(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                })
                // this.failCallback.push(failCallback)
                this.failCallback.push(() => {
                    setTimeout(() => {
                        let x = failCallback(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                })
            }
        })
        return promise2
    }

    finally(callback){
        return this.then(value=>{
            return MyPromise.resolve(callback()).then(()=>value)
        },reason=>{
            return MyPromise.resolve(callback()).then(()=>{throw reason})
        })
    }

    catch(failCallback){
        return this.then(undefined,failCallback)
    }


    static all(array) {
        let result = []
        
        return new MyPromise((resolve, reject) => {
            let count = 0
            function addData(index,value){
                result[index] = value
                count++
                console.log(count,array.length)
                if(count === array.length){
                    resolve(result) 
                }   
            }
            for(let i= 0;i<array.length;i++){
                let current = array[i]
                if(current instanceof MyPromise){
                    //Promise对象
                    current.then((value)=>{
                        addData(i,value)
                    },(reason)=>{
                        reject(reason)
                    })
                }else{//普通值
                    addData(i,current)
                }
            }
        })
    }


    static resolve(value){
        if(value instanceof MyPromise){
            return value
        }
        return new MyPromise(resolve=>resolve(value))
    }

}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(new TypeError("Chaining cycle detected for promise #<Promise>    "))
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

module.exports = MyPromise
