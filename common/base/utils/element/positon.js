/*
* author:马卫
* 获取元素的坐标
* */
/*
* 获取x绝对坐标
* @param {Element} element 元素对象
* @return {Number}
* */
function getPositionLeft(element){
    if(element.getBoundingClientRect){
        return element.getBoundingClientRect().left;
    }
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
/*
 * 获取y绝对坐标
 * @param {Element} element 元素对象
 * @return {Number}
 * */
function getPositionTop(element){
    if(element.getBoundingClientRect){
        return element.getBoundingClientRect().top;
    }
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
/*
 * 获取x相对坐标
 * @param {Element} element 元素对象
 * @return {Number}
 * */
function getRelativeLeft(element){
    return getPositionLeft(element) - getScrollLeft();
}
/*
 * 获取y相对坐标
 * @param {Element} element 元素对象
 * @return {Number}
 * */
function getRelativeTop(element){
    return getPositionTop(element) - getScrollTop();
}

function getScrollLeft(){
    if (document.compatMode == "BackCompat"){
        return document.body.scrollLeft;
    } else {
        return document.documentElement.scrollLeft;
    }
}
function getScrollTop(){
    if (document.compatMode == "BackCompat"){
        return document.body.scrollTop;
    } else {
        return document.documentElement.scrollTop;
    }
}

export default {
    getPositionLeft,
    getPositionTop,
    getRelativeLeft,
    getRelativeTop
}