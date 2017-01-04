/**
 *author 马卫
 * dom基本操作方法集合
 */

/*
 * 元素添加class
 * @param {DomElement} element 文档元素
 * @param {String} className 类名称
 * */
function addClass(element, className){
    //元素、name为空或非字符串类型
    if(!element ||!className || !className.match || className.match(/\s+/)){
        return;
    }
    var curClass = element.getAttribute('class')||'';
    //判断已包含 (/\s+xxx\s+|^xxx\s+|\s+xxx$/)
    if(curClass.match(new RegExp('\\s+' + className + '\\s+|^'+ className + '\\s+|\\s+' + className + '$'))){
        return;
    }
    element.setAttribute('class', (curClass + ' ' + className).trim());
}

/*
 * 移除元素class
 * @param {DomElement} element 文档元素
 * @param {String} className 类名称
 * */
function removeClass(element, className){
    //name为空或非字符串类型
    if(!element || !className || !className.match || className.match(/\s+/)){
        return;
    }
    var curClass = element.getAttribute('class')||'',
        replaceClass;
    //判断已包含
    replaceClass = curClass.replace(new RegExp('^' + className + '\\s+|\\s+' + className + '$'), '')
                .replace(new RegExp('\\s+' + className + '\\s'), ' ');
    if(curClass != replaceClass){
        element.setAttribute('class', replaceClass.trim());
    }
}
export {
    addClass,
    removeClass
}