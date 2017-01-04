/*
* 加载数字动画
* */
import React, {Component, PropTypes} from 'react';
import utils from '../../../utils/utils'

import './load-number-scroll.less';


class LoadNumberScroll extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    getScrollText(){
            //起始值
        let from = this.props.from,
            //最终值
            to = this.props.to,
            //动画时间，毫秒
            time = this.props.time || 1000,
            //参与的动画元素数量
            step = this.props.step || 6,
            //最小滚动值
            minScrollValue = this.props.minScrollValue;
        //小数点位数
        let points = (to + '').match(/\.(\d+)/);

        if(points && points[1]){
            points = points[1] && points[1].length;
        }
        else{
            points = 0;
        }
        //最小滚动值
        //let minScrollValue = minScrollValue || points ? 1 : '' ;
        let scrollValue = (to - from) / step,
            list = [],
            length = step + 1,
            value;
        while (length--){
            value = utils.decimalFormat(to - scrollValue * length, points);
            list.push(<dd ref={'item'+length}>{value}</dd>);
        }
        return list;
    }

    componentDidMount(){
        var move = this.refs.context.scrollHeight - this.refs.item0.scrollHeight,
            value = 'translateY(-' + move + 'px)';
        this.setState({
            animate: this.props.animate || 'load-number-scroll-ani',
            animateStyle:{
                webkitTransform: value,
                msTransform: value,
                mozTransform: value,
                oTransform: value,
                transform: value,
            }
        });
        console.log(this.refs.context.scrollHeight);
    }

    render(){
        let {to, from, className} = this.props,
            {animate, animateStyle} = this.state;
        return <div ref="box" className={'load-number-scroll' + (className? ' ' + className : '') + (animate? ' ' + animate : '')}>
                <dl ref="context" className="context" style={animateStyle}>
                    {
                        /^[\d\.]+$/.test(this.props.to) && to - from ?
                            this.getScrollText()
                            : this.props.to
                    }
                </dl>
        </div>

    }
}

export default LoadNumberScroll;