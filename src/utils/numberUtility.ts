
/**
 * 计算两个数的乘积并保留小数点后的位数
 * @param arg1 第一个数
 * @param arg2 第二个数
 * @returns 两个数的乘积
 */
function accMul(arg1: number | string, arg2: number):number {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//给Number类型增加一个mul方法，调用起来更加方便。 
Number.prototype.mul = function (arg:any) {
    return accMul(arg, this.valueOf());
}