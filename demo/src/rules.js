export function validCname(rule, value, callback) {
    //中文汉字
    const str = value.trim();
    // const reg = /^[\u2E80-\u9FFF]+$/
    const reg=/^[\u0391-\uFFE5A-Za-z]+$/
    if (value !== "" && !reg.test(value)) {
        callback(new Error("只能输入中文"))
    }
    if (str.length > 4) {
        console.log("多少？", str.length)
        callback(new Error("最多输入4个中文"))
    }
}

export function validIdCard(rule, value, callback) {
    //身份证
    const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (!value) {
        callback(new Error('请输入身份证号码'));
    } else {
        if (!reg.test(value)) {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    }
}