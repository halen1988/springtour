/*
* 加载数字动画
* */
import React, {Component, PropTypes} from 'react';
import utils from '../../../utils/utils'

import './load-number-rise.less';


class LoadNumberScroll extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    getRaiseList(){
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
            list.push(value);
        }
        return list;
    }

    componentDidMount(){

        var list = this.getRaiseList(), length = list.length;
        if(/[\d\.]+$/.test('123')){
            var timer = setInterval(()=>{

                this.setState({
                });
            }, 50)

        }
        /*/^[\d\.]+$/.test(this.props.to) && to - from ?
            this.getScrollText()
            :
            console.log(this.refs.context.scrollHeight);*/
    }

    render(){
        let {to, from, className} = this.props,
            {raise} = this.state;
        raise = /[\d\.]+$/.test(to) ? (raise || from) : to;
        return <p ref="box" className={'load-number-scroll' + (className? ' ' + className : '')}>
            {raise}
        </p>

    }
}

export default LoadNumberScroll;