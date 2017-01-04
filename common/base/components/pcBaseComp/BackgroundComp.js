/**
 * Created by: 史元君
 Desc:请把它当做一个特殊的HTML标签使用
 */


//公共模块
import React, {Component, PropTypes} from 'react';
//css
import "../../styles/less/pcBaseComp/backgroundComp.less";

class BackgroundComp extends Component {
    constructor(props){
        super(props);
        //定时器
        this.timer = 0;

    //    show or hide
        this.show =false;
    }
    isShow=()=>{
        return  this.show;
    };
    onClick=(e)=>{
        e.stopPropagation();
    };
    slideDown(){
        clearTimeout(this.timer);
        this.setState({
            style: {
                display: 'block'
            }
        });
        this.timer = setTimeout(()=>{
            this.show = true;
            this.setState({
                style: {
                    display: 'block',
                    opacity: 1,
                    transform: 'translateY(0) scale(1)'
                }
            });
        }, 30)
    }
    slideUp(){
        clearTimeout(this.timer);
        this.setState({
            style: {
                display: 'block',
                opacity: 0,
                transform: 'translateY(-5px) scale(.8)'
            }
        });
        this.timer = setTimeout(()=>{
            this.show = false;
            this.setState({
                style: {
                    display: 'none'
                }
            });
        }, 310)
    }

    render(){
        let {children, defaultClassName, className, ...otherProp} = this.props;
        var style = this.state && this.state.style;
        return (
            <div className={`${defaultClassName || 'bgMenuComp'} ${className?className:""}`} style={style} {...otherProp} onClick={this.onClick}>
                {children}
            </div>
        )
    }
}

export default BackgroundComp;

