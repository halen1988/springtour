/**
 * 弹窗
 */

import './popup.less';

const Popup = function (messages) {
    let _div = document.createElement('div');
    let _inner = document.createElement('div');
    _div.id = 'popup';
    let _textnode = document.createTextNode(messages);
    _inner.appendChild(_textnode);
    _div.appendChild(_inner);
    document.body.appendChild(_div);
    setTimeout(function () {
        document.body.removeChild(_div);
    }, 2000);
}


const PopupLoading = function (messages, type) {
    if (type == 'open') {
        let _div = document.createElement('div');
        let _inner = document.createElement('div');
        _div.id = 'popup';
        let _textnode = document.createTextNode(messages);
        _inner.appendChild(_textnode);
        _div.appendChild(_inner);
        document.body.appendChild(_div);
    } else {
        let obj = document.getElementById("popup");
        if (obj) {
            document.body.removeChild(obj);
        }

    }
}

//全局对话框-类
class PopupDialog {
    constructor() {
        /*默认值
        *@param {String|boolean} title 弹窗标题
        * param {String} content 弹窗提示信息
        * param {Array} button 弹窗按钮
        * param {Array} buttonCallback 弹窗按钮回调方法
        * param {isShowMask} isShowMask 是否显示遮罩层
        *
        */

        this.defaults = {
            title: false,
            content: '',
            button: ['确认', '取消'],
            buttonCallback: [
                function () {
                    //按钮1

                }, function () {
                    //按钮2
                }
            ],
            isShowMask: false
        };
        this.bin = [];
    }

    addElement() {
        let body = document.body;
        this.element = document.createElement('div');
        this.element.className = 'popup-dialog';

        //判断是否显示遮罩
        let isShowMask = 'display:none';
        if(this.options.isShowMask){
            isShowMask = 'dispaly:block';
        }

        //判断是否显示标题
        let isShowTitle = 'display:none';
        if(this.options.isShowTitle){
            isShowTitle = 'dispaly:block';
        }

        this.element.innerHTML = `<div class="popup-dialog-main">							
							<div class="popup-dialog-content">
							    <div class="popup-dialog-title" style="${isShowTitle}">${this.options.title}</div>
							    <div class="popup-dialog-text">${this.options.content}</div>
							</div>
							<div class="popup-dialog-botton border-handle"></div>
						 </div>
						 <div class="popup-dialog-mask" style="${isShowMask}">&nbsp;</div>`;
        body.appendChild(this.element);

        let eButton = '';
        for (let i = 0, len = this.options.button.length; i < len; i++) {
            eButton += `<span class="btn border-handle">${this.options.button[i]}</span>`;
        }
        this.element.querySelector('.popup-dialog-botton').innerHTML = eButton;
        this.offset();
        this.addEvent();
        return this.element;
    }

    //绑定事件
    addEvent(){
        //按钮
        let eButton = this.element.querySelectorAll('.popup-dialog-botton span'),
            self = this;
        for(let i = 0, len = eButton.length; i < len; i++){
            eButton[i].addEventListener('click', function(event){
                event.stopPropagation();
                let elem = self.bin.pop();
                document.body.removeChild(elem);
                self.options.buttonCallback[i]();
            }, false);
        }

        //遮罩
        this.element.querySelector('.popup-dialog-mask').addEventListener('click', function(event){
            event.stopPropagation();
            let elem = self.bin.pop();
            document.body.removeChild(elem);
        }, false);
    }

    //位置
    offset(){
        let winHeight = window.innerHeight,
            popup = this.element.querySelector('.popup-dialog-main');
        popup.style.top = (winHeight - popup.clientHeight) / 2 + 'px';
    }

    //显示弹窗

    show(options) {
        this.options = Object.assign(this.defaults, options);
        this.bin.push(this.addElement());
    }
}
let globalDialog = new PopupDialog();

export {Popup, PopupLoading, globalDialog}