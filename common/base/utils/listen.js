/*
* author: 马卫
* 事件委托接口
* */
//所有事件集合
const eventName = 'click dbClick blur focus touchStart touchEnd touchMove touchCancel mouseDown mouseMove mouseUp';
const events = eventName.split(' ');
const eventApi = {};

//生成所有事件接口
events.forEach(function (event) {
    eventApi[event] = function (dom, selector, fn){
        addEventListener(dom, event.toLowerCase(), selector, fn);
    }
});
/*
* 判断是否为某个元素的子元素
* @param {Element} parent 父元素
* @param {Element} child 子元素
* */
const contains  = function(parent, child) {
    if (parent.compareDocumentPosition)
        return parent === child || !!(parent.compareDocumentPosition(child) & 16);
    if (parent.contains && child.nodeType === 1){
        return parent.contains(child) && parent !== child;
    }
    while ((child = child.parentNode))
        if (child === parent) return true;
    return false;
}
/*
 * 根据选择器获取元素集合, 注意ie8中支持tagName class id三种选择器
 * @param {Element} dom 元素
 * @param {String} selector 选择器 如 tag .class #id
 * */
const handleSelector = function (dom, selector) {
    if(!selector){
        return [dom];
    }
    if(dom.querySelectorAll){
        return dom.querySelectorAll(selector);
    }
    if(selector.match(/^[\w\-\_]+$/)){
        return dom.getElementsByTagName(selector);
    }
    if(selector.match(/^#/)){
        return [dom.getElementById(selector.slice(1))];
    }
    if(selector.match(/^\./)){
        return dom.getElementsByClassName(selector.slice(1));
    }
    return [];
}
/*
* 添加事件和事件委托接口
* @param {Element} dom 需要添加事件的元素对象
* @param {String} eventName 事件名称
* @param {String} [selector] 子元素委托,可选
* @param {Function} fn 回调方法
* @return undefined
* */
function addEventListener(dom, eventName, selector, fn) {
    if(typeof selector === 'function'){
        fn = selector;
        selector = null;
    }
    if(dom && eventName){
        var handle = selector ? function (event) {
            var target = event.srcElement || event.target;
            if(target){
                //对支持子元素查询接口的进行委托处理, 默认低版本浏览器包括ie8不支持委托
                var querys = handleSelector(dom, selector),
                    length = querys.length,
                    query;
                if(length){
                    for(var i = 0; i < length; i++){
                        query = querys[i];
                        if(query == target || contains(query, target)){
                            fn.call(query, event);
                            break;
                        }
                    }
                }
            }
        } : fn;
        if(dom.addEventListener){
            dom.addEventListener(eventName, handle, false);
        }
        else if ( dom.attachEvent ) {
            dom.attachEvent( "on" + eventName, handle );
        }
    }
}

/*
 * 移除事件接口
 * @param {Element} dom 需要添加事件的元素对象
 * @param {String} eventName 事件名称
 * @param {Function} fn 回调方法
 * @return undefined
 * */
function removeEventListener(dom, eventName, fn) {
    if(dom.removeEventListener){
        dom.removeEventListener(eventName, fn, false);
    }
    else if ( dom.detachEvent ) {
        dom.detachEvent( "on" + eventName, fn);
    }
}
/*
 * 添加一次事件和事件委托接口，事件触发后移除事件
 * @param {Element} dom 需要添加事件的元素对象
 * @param {String} eventName 事件名称
 * @param {Function} fn 回调方法
 * @return undefined
 * */
function once(dom, eventName, fn){
    function wrapFn(event){
        fn.call(dom, event);
        removeEventListener(dom, eventName, wrapFn);
    }
    addEventListener(dom, eventName, wrapFn);
}

export default {
    ...eventApi,
    addEventListener,
    removeEventListener,
    once
};



