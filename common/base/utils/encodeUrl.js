/**
 * Created by zhiyong on 12/23/16.
 */
import utils from './utils';
/**
 * 当时i是偶数（包括0）的时候，encodeURIComponent
 * @param i
 * @param str
 * @returns {*}
 */
function handleEven(i,str) {
    if(i%2==0){
        return str
    }
    return encodeURIComponent(str)
}
/**
 * 分隔字符串
 * @param str
 * @param splitWith
 * @param insertStr
 * @returns {string}
 */
function splitWith(str,splitWith, insertStr) {
    insertStr = insertStr || '=';
    var temp = str.split(splitWith);
    var resultStr='';
    for(var i=0; i<temp.length;i++){
        if(i==0){
            resultStr =handleEven(i,temp[i])
        }else if(i>0 && i<temp.length-1){
            resultStr =resultStr + handleEven(i,temp[i])
        }else if(i == temp.length-1) {
            resultStr =resultStr + insertStr + handleEven(i,temp[i])
        }
    }
    return resultStr
}
/**
 * 首先 split '&'
 * @param arr
 * @param str
 * @returns {string}
 */
function split(arr,str) {
    let result = '' ;
    for(var i= 0; i < arr.length; i++){
        if(i == arr.length -1){
            result = result + splitWith(arr[i],'=','=');
            continue
        }
        result = result + splitWith(arr[i],'=','=') +str;
    }
    return result
}
/**
 * 处理返回值
 * @param url
 * @returns {string}
 */
function handleEncode(url) {
    /*console.log(url.split('&'));*/
    let result = split(url.split('&'),'&');
    return result
}
export {handleEncode}