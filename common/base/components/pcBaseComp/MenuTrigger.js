/**
 * Created by 史元君
 * 接口 ：maskShown（boolean）告知mask是否已经显示
 *        maskStyle: {style obj}
 *        menuClick 点击以触发
 * 顶层栏.
 */
import React, {Component, PropTypes} from "react";


class MenuTrigger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clzName: ""
        };
        this.timerFlag=null;
    }

    render() {
        var {tagName, getMenuContext,minStayDuri, ...pureProps} = this.props;
        tagName = tagName || 'div';
        //停留200毫秒才显示菜单
        minStayDuri=minStayDuri||200;
        var props = Object.assign({
            //鼠标移入事件
            onMouseEnter: ()=> {
                this.timerFlag = setTimeout(()=> {
                    this.setState({clzName: "hover"});
                    var menuContext = getMenuContext();
                    menuContext && menuContext.slideDown();
                }, minStayDuri)

            },
            //鼠标移出事件
            onMouseLeave: ()=> {
                this.timerFlag && clearTimeout(this.timerFlag)
                this.setState({clzName: ""});
                var menuContext = getMenuContext();
                menuContext && menuContext.slideUp();
            }
            // //再次点击
            , onClick: ()=> {
                var menuContext = getMenuContext();
                if (menuContext && menuContext.isShow()) {
                    this.setState({clzName: ""});
                    menuContext.slideUp();
                } else if (menuContext && !menuContext.isShow()) {
                    this.setState({clzName: "hover"});
                    menuContext.slideDown();
                }

            }
        }, pureProps, {className: `${this.props.className} ${this.state.clzName}`,});

        return React.createElement(
            tagName,
            props,
            this.props.children
        )
    }
}


export default MenuTrigger;
