function remSize() {
    //获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerHeight
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    //规定好<html>的字体大小
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    //定义<body>的字体大小为0.3rem，这里的1rem就是上面定义的<html>的字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

//调用函数
remSize()
//监听窗口变化，变化时调用函数
window.onresize = function () {
    remSize()
}
