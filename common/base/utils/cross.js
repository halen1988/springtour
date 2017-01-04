/*
* author: 马卫
* 跨浏览器兼容处理
* 主要 touchstart touchEnd touchMove 和 mousedown mousemove mouseup 的兼容处理
* */
import browser from "./browser";
import Listen from "./listen";

const mobile = browser.versions.mobile;

/*
 * 对pc和touch端回调的事件进行统一格式处理
 * @param {Element} dom 需要添加事件的元素对象
 * @param {String} eventName 事件名称
 * @param {String} [selector] 子元素委托,可选
 * @param {Function} fn 回调方法
 * @return undefined
 *
 * */
const touchBase = function (dom, eventName, selector, fn) {
    //参数调整
    if(typeof selector == 'function'){
        fn = selector;
        selector = null;
    }
    //回调类型为方法时做添加事件操作
    if(typeof fn == 'function'){
        Listen[eventName].call(Listen, dom, selector, function (event) {
            var evt = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0] || event;
            fn.call(this, mobile ? {
                type: event.type,
                which: event.which,
                clientX: evt.clientX,
                clientY: evt.clientY,
                pageX: evt.pageX,
                pageY: evt.pageY,
                screenX: evt.screenX,
                screenY: evt.screenY,
                target: evt.target || evt.srcElement
            }: event);
        });
    }
}

const cross = {
    //扩展Listen的事件接口
    ...Listen,
    /*
     * 事件开始, 对pc和touch端touchStart事件进行替换
     * @param {Element} dom 需要添加事件的元素对象
     * @param {String} [selector] 子元素委托,可选
     * @param {Function} fn 回调方法
     * */
    touchStart: function (dom, selector, fn) {
        touchBase(dom, mobile ? 'touchStart' : 'mouseDown', selector, fn)
    },
    /*
     * 移动或拖拉, 参数同touchStart
     * */
    touchMove: function (dom, selector, fn) {
        touchBase(dom, mobile ? 'touchMove' : 'mouseMove', selector, fn)
    },
    /*
     * 事件结束, 参数同touchStart
     * */
    touchEnd: function (dom, selector, fn) {
        touchBase(dom, mobile ? 'touchEnd' : 'mouseUp', selector, fn)
    },
    /*
     * 事件取消, 参数同touchStart
     * */
    touchCancel: function (dom, selector, fn) {
        touchBase(dom, 'touchCancel', selector, fn)
    }
}

export default cross;



