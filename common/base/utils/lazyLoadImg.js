/**
 * Created by wangxianfa on 16/07/20.
 */
import React, { Component, PropTypes } from 'react'
import util from './utils';
import Event from './listen';
import pubSub from './pubSub';
import { HISTORY_EVENT_CHANGE } from './../constants/serviceConstant';
import positon from './element/positon';
import {addClass, removeClass} from './element/dom';

/*
* 懒加载图片
* */

const lazyLoadImg = {
    start() {
        this.body = null;
        this.dom = null;
        this.winHeight = 0;
        //判断是否加载滚动事件
        this.hasAddEvent = false;
        //判断是否首屏加载
        this.firstScreen = true;
        this.addEvent();
    },
    /*
    * 处理滚动加载
    * @param {Boolean} delay 是否延迟200ms
    * @param {String} lazyAttr 加载属性
    * @param {Array} lazyImages 懒加载图片, 同时移除懒加载属性lazyAttr
    * */
    handlerScroll(delay, lazyAttr, lazyImages) {
        var self = this, body = document.body;
        lazyAttr = lazyAttr || 'data-src';
        clearTimeout(this.loadImgTimer);
        var winHeight = window.outerHeight|| screen.availHeight || document.body.clientHeight,
            firstScreen = this.firstScreen;

        let handle = () => {

            let imgs = lazyImages || body.querySelectorAll('[' + lazyAttr + ']');

            //全部加载完毕return
            if(!imgs.length){
                return;
            }
            let historyEvent = util.getHistoryEvent(),
                img, isImg, src,lazyLoadClass;
            //图像懒加载
            for(let i = 0,len = imgs.length;i < len;i++) {
                img = imgs[i];
                if(positon.getPositionTop(img) < (winHeight + body.scrollTop)){
                    isImg = img.tagName.toLowerCase() == 'img';
                    lazyLoadClass = img.getAttribute("data-class");

                    src = img.getAttribute(lazyAttr);
                    //img.style.height = "auto";
                    let parent = img.parentElement;
                    addClass(parent, 'img-bg-use');
                    addClass(img, 'fade-in');
                    img.removeAttribute(lazyAttr);
                    //添加懒加载效果
                    if(isImg){
                        var loadSuccess = 'img-lazy-load-success',
                            loadFail = 'img-lazy-load-fail';
                        //事件只触发一次，防止内存泄露
                        Event.once(img, 'load', function(){
                            addClass(this, loadSuccess);
                        });
                        Event.once(img, 'error', function(){
                            addClass(this, loadFail);
                            var srcFail = this.getAttribute('data-src-fail');
                            if(srcFail){
                                var clone = this.cloneNode();
                                Event.once(clone, 'load', function(){
                                    addClass(this, loadSuccess);
                                });
                                clone.setAttribute('src', srcFail);
                                this.parentElement.replaceChild(clone, this);
                            }
                        });
                        img.setAttribute('src', src);

                    }
                    else{
                        src &&addClass(img, src || 'lazy-load-success');
                    }
                    lazyLoadClass && addClass(img, lazyLoadClass);
                }
            }
            this.firstScreen = false;
        }

        if(delay){
            this.loadImgTimer = setTimeout(handle, 200);
        }
        else{
            handle();
        }
    },

    addEvent(){
        let hasAddEvent = this.hasAddEvent;
        //添加前进后退事件监听
        !hasAddEvent && pubSub.on(HISTORY_EVENT_CHANGE, (historyEvent)=>{
            this.firstScreen = true;
        })
        //绑定滚动事件
        !hasAddEvent
        && (hasAddEvent = true)
        && Event.addEventListener(window, 'scroll', ()=>{this.handlerScroll(true);});
    }
}
export default lazyLoadImg;
