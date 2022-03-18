function resolveData(data) {
    var arr = []
    for(var k in data){
        var str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}

function Gxio(options) {
    var xhr = new XMLHttpRequest()
    // 把外界传过来的参数对象，转化为查询字符串
    var qs = resolveData(options.data)

    if(options.method.toUpperCase() === 'GET'){
        // 发起GET请求
        xhr.open('GET',options.url+'?'+qs)
        xhr.send()
    }else if (options.method.toUpperCase() === 'POST'){
        // 发起POST请求
        xhr.open('POST',options.url)
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(qs)
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            options.success(result) 
        }
    }
}
