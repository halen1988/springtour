/**
 * Created by: 马卫
 * 菜单，可结合MenuTrigger用于动画
 * 组件使用通过配置属性：
 *     class配置： classIn, classOut
 *     style配置： styleIn, styleOut
 */
//公共模块
import React, {Component, PropTypes} from 'react';


/*
 * 添加class
 * @param {String} className 当前class名称
 * @param {String} addClass 即将添加的class名称
 * */
function addClass(className, addClass){
    //元素、name为空或非字符串类型
    if(!addClass || !addClass.match || addClass.match(/\s+/)){
        return;
    }
    var curClass = className ||'';
    //判断已包含 (/\s+xxx\s+|^xxx\s+|\s+xxx$/)
    if(curClass.match(new RegExp('\\s+' + addClass + '\\s+|^'+ addClass + '\\s+|\\s+' + addClass + '$'))){
        return curClass;
    }
    return (curClass + ' ' + addClass).trim();
}
/*
 * 移除class
 * @param {String} className 当前class名称
 * @param {String} addClass 即将移除的class名称
 * */
function removeClass(className, removeClass){
    if(!className) {
        return '';
    }
    if(!removeClass) {
        return className;
    }
    return className.replace(new RegExp('^' + removeClass + '\\s+|\\s+' + removeClass + '$'), '')
        .replace(new RegExp('\\s+' + removeClass + '\\s'), ' ')
}


class Menu extends Component {
    constructor(props){
        super(props);
        //定时器
        this.timer = 0;
        //is the menu ishow
        this.show = false;
    }
    isShow=()=>{
        return  this.show;
    };
    getSlideState(){
        let {classIn, classOut, styleIn, styleOut, className} = this.props;
        if(!classIn){
            styleIn = styleIn || {
                display: 'block',
                opacity: 1,
                transform: 'translateY(0) scale(1)'
            }
        }
        if(!classOut){
            styleOut = styleOut || {
                display: 'block',
                opacity: 0,
                transform: 'translateY(0) scale(1)'
            }
        }
        let replaceClass;
        if(className){
            replaceClass = classIn && removeClass(className, classIn);
            replaceClass = classOut && removeClass(replaceClass, classOut);
            if(replaceClass){
                classIn = replaceClass + (classIn? ' '+ classIn : '');
                classOut = replaceClass + (classOut? ' '+ classOut : '');
            }
        }
        styleIn = Object.assign({display: 'block'}, styleIn);
        styleOut = Object.assign({display: 'block'}, styleOut);
        return {
            classIn,
            classOut,
            styleIn,
            styleOut
        }
    }
    /*
    * 展示菜单
    * */
    slideDown(){
        clearTimeout(this.timer);
        this.setState({
            style: {
                display: 'block'
            }
        });
        let slide = this.getSlideState();
        /*if(slide.classIn.match(/qrpart-in/)){
            return;
        }*/
        this.timer = setTimeout(()=>{
            this.show = true;
            this.setState({
                style: slide.styleIn,
                className: slide.classIn
            });
        }, 30);
    }
    /*
     * 收起菜单
     * */
    slideUp(){
        clearTimeout(this.timer);
        let slide = this.getSlideState();
        this.setState({
            style: slide.styleOut,
            className: slide.classOut
        });
        this.timer = setTimeout(()=>{
            this.show = false;
            this.setState({
                style: {
                    display: 'none'
                }
            });
        }, this.props.animateTime || 310);
    }

    render(){
        let {classIn, classOut, styleIn, styleOut, tagName,className,...htmlProps} = this.props;
        let style = this.state && this.state.style;
            className = this.state && this.state.className;
            tagName = tagName || 'div';
        let props = Object.assign({}, htmlProps,
                {
                    style,
                    className: addClass(className, this.props.className)
                });
        return React.createElement(
            tagName,
            props,
            this.props.children
        )
    }
}

export default Menu;