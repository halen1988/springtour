/**
 * author:马卫
 * 解决火狐点击事件兼容问题
 */
import React, { Component, PropTypes } from 'react';

/*
* 组件定义, 通过继承Component实现
* */
class WrapClick extends Component {
    constructor(options){
        super(options);

    }
    render() {
        const { height, width} = this.props;
        let clickWraps = [1, 1, 1];
        return (
            <span data-click-wrap="" style={{
                    position: 'absolute',
                    height: height || '100%',
                    width: width || '100%',
                    top: '0px',
                    left: '0px'
                }}></span>
        )
    }
}

export default WrapClick;
