/**
 * Created by: 史元君
 Desc:顶层导航栏的空壳子
 把props.chidren的序号分为左中右3部分
 0，left
 1,center
 2...,right
 */

import React, {Component, PropTypes} from "react";

import "../../styles/less/pcBaseComp/baseNavibar.less" ;

class BaseNaviBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let  [left,center,...right] =React.Children.map(this.props.children||[],(e)=>e);
        let {className,...others}=this.props;
        return (
            <div className={`navibar ${className?className:""}`}  {...others}>
                <div className="navibar-content">
                    <div className="leftLogo">
                        {left}
                    </div>

                    <div className="center">
                        {center}
                    </div>

                    <div className="right">
                        {right}
                    </div>
                </div>

            </div>
        )
    }
}

export default BaseNaviBar;