/*
 * author: 马卫
 * 添加material设计的点击效果,
 * dom属性data-click, 值为色值, 默认属性值为rgba(0, 0, 0, 0.5)
 * data-click-radius,为圆的半径
 * data-click-forbit="true",禁止点击效果
 * data-click-only 只有粗发元素本身,即非子元素,有点击效果
 * data-click-active-delay 设置touch后到触发点击效果的时间
 * data-click-delay 设置touch后触发click的时间
 * data-click-must 必须触发属性
 * */

import Cross from "../cross";
import supportCss from "../supportCss";
import browser from "../browser";
import position from "../element/positon";

import "./click.less";
//是否为ie
var isIE = browser.versions.trident;
//判断是否支持动画
var isSupportTransition = supportCss('transition');
/*
 * 添加material设计点击效果
 * @param {Element} dom 根元素
 * */
function addMaterialClick(dom){
    var startEvent, timer;
    Cross.touchStart(dom, '[data-click]', function (event) {
        var self = this;
        var curEvent = startEvent = {
            pageX: event.pageX,
            pageY: event.pageY,
            srcElement: event.srcElement || event.target
        };
        //var keycode = event.which || event.keycode;
        timer = setTimeout(function () {
            handle(self, curEvent);
        }, curEvent.srcElement.getAttribute('data-click-active-delay') || 100);
        var href = this.getAttribute('href');
        if(isSupportTransition && href && href.match(/^[\.\/\w]/) && !href.match(/javascript/) && !this.onclick){
            this.onclick = function (event) {
                if ( event && event.preventDefault )
                //阻止默认浏览器动作(W3C)
                    event.preventDefault();
                else
                //IE中阻止函数器默认动作的方式
                    window.event.returnValue = false;
                return false;
            }
        }

    });
    Cross.touchMove(dom, '[data-click]', function (event) {
        if(isSupportTransition && timer &&
            (Math.abs(startEvent.pageX - event.pageX) > 0
            && Math.abs(startEvent.pageY - event.pageY) > 0)){
            clearTimeout(timer);
            timer = null;
        }
    });
    Cross.touchCancel(dom, '[data-click]', function (event) {
        if(isSupportTransition && timer){
            clearTimeout(timer);
            timer = null;
        }
    });
    Cross.touchEnd(dom, '[data-click]', function (event) {
        if(isSupportTransition && (Math.abs(startEvent.pageX - event.pageX) <= 3
            && Math.abs(startEvent.pageY - event.pageY) <= 3)){
            //对有data-click效果的href进行事件的延迟处理
            var href = this.getAttribute('href'),
                self = this;
            setTimeout(function () {
                if(href && href.match(/^[\.\/\w]/) && !href.match(/javascript/)){
                    if(self.getAttribute('target') == '_blank'){
                        window.open(href);
                    }
                    else{
                        window.location.href = href;
                    }
                }
                else{
                    var isMust = self.hasAttribute('data-click-must');
                    try{
                        if(isMust && document.createEvent && self.dispatchEvent){
                            var event = document.createEvent('HTMLEvents');
                            // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
                            event.initEvent && event.initEvent("click", true, false);
                            self.dispatchEvent(event);
                        }
                        else if(isMust && document.createEventObject){
                            // IE浏览器支持fireEvent方法
                            var event = document.createEventObject();
                            return element.fireEvent('onclick', event)
                        }
                    }
                    catch (e){
                    }
                }
            }, this.getAttribute && this.getAttribute('data-click-delay') || 300);
        }

    });

    /*
     * 点击效果处理器
     * 通过属性data-click-radius，设置点击效果区域大小，默认不限制显示区域
     * @param {Element} element 点击元素
     * @param {Object} event 事件对象
     * */
    function handle(element, event) {

        if(isSupportTransition
            && event
            && window.getComputedStyle
            && element.getClientRects){
            //禁止点击效果
            if(element.getAttribute('data-click-forbit')
                || element.hasAttribute('data-click-only')
                && !(event.srcElement.hasAttribute('data-click-only')
                || event.srcElement.hasAttribute('data-click-wave'))){
                return;
            }

            //增加点击效果
            var style = window.getComputedStyle(element, null),
                color = element.getAttribute('data-click') || '',
                width = style.getPropertyValue("width"),
                height = style.getPropertyValue("height"),
                maxSide = element.getAttribute('data-click-radius'),
                rect = element.getBoundingClientRect();
            color = color.match(/^rgb|#\w+/)? color : "rgba(0, 0, 0, 0.5)";
            maxSide = maxSide && maxSide * 2|| getCircleSide(width, height);
            var scrollTop = window.scrollY || document.documentElement.scrollTop,
                scrollLeft = window.scrollX || document.documentElement.scrollLeft ;
            var div = document.createElement('div'),
                css = {
                    top: (-scrollTop + event.pageY - rect.top - maxSide/2) + 'px',
                    left: (-scrollLeft + event.pageX - rect.left - maxSide/2) + 'px',
                    height: maxSide + 'px',
                    width: maxSide + 'px',
                    backgroundColor: color
                };


            Object.assign(div.style, css);
            div.setAttribute('data-click-wave', '');
            div.setAttribute('class', 'material-click');
            element.appendChild(div);
            setTimeout(function () {
                div.setAttribute('class', 'material-click material-click-end');
                setTimeout(function () {
                    element.removeChild(div);
                }, 2000);
            }, 30);

        }
    }
}

/*
 * 根据被几点元素大小计算圆的直径
 * @param {String} width 元素的宽,带有px
 * @param {String} height 元素的高,带有px
 * */
function getCircleSide(width, height){
    var widthNum = width.match(/[\-\d\.]+/) - 0,
        heightNum = height.match(/[\-\d\.]+/) - 0,
        maxSide = Math.max(widthNum, heightNum);
    //直径最小值50px
    if(maxSide < 20){
        return 50;
    }
    else{
        //放大1.5倍,但小于200
        maxSide = (maxSide > 50? maxSide : 50) * 1.5;
        if(maxSide > 200){
            maxSide = 200;
        }
        return maxSide;
    }
}

function addMaterialClickBg(){
    var timer = new Date();
    var body = document.body;
    if(body.querySelectorAll){
        var elements = body.querySelectorAll('[data-click]'),
            length = elements.length,
            element;
        console.log(length);
        for(var i=0; i<length; i++){
            element = elements[i];
            if(!element.hasAttribute('data-click-hasload') || true){
                addWrap(element);
            }

        }
    }
}

function addWrap(element){
    var span = document.createElement('span');
    span.setAttribute('data-click-wrap', '');
    Object.assign(span.style, {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0px",
        left: "0px",
        "z-index": 10
    });

    if(element.childNodes.length){
        element.insertBefore(span, element.childNodes[0]);
    }
    else{
        element.appendChild(span);
    }
    element.setAttribute('data-click-hasload', '');
}


function addIntervalClickBg(){
    if(window.getComputedStyle && document.body.getClientRects){
        /*setTimeout(function () {
         addMaterialClickBg();
         }, 4000)*/
        /*setTimeout(function () {
         addMaterialClickBg();
         }, 3000);*/
        /*setTimeout(function () {
         addMaterialClickBg();
         }, 4000);*/
    }
}
addIntervalClickBg();

export  {
    addMaterialClick
}



