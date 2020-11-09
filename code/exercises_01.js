// 一、将下边异步代码使用Promise的方式改进
setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
        var b = 'lagou'
        setTimeout(function () {
            var c = 'I ❤ U'
            console.log(a + b + c)
        }, 10)
    }, 10)
}, 10);

// 答：
function fn(msg) {
    var promise = new Promise((resolved) => {
        setTimeout(() => {
            resolved(msg)
        }, 10)
    });
    return promise;
}

fn().then(function () {
    return fn("hello")
}).then(val => {
    return fn(val + "lagou")
}).then(val => {
    return fn(val + "I ❤ U")
}).then(val => {
    console.log(val)
})
