/**
 * Created by zhiyong on 16/12/7.
 */
/**
 * Created by: 史元君
 Desc:H5页脚组件
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//CSS
import "../../styles/less/h5BaseComp/simpleFooter.less";
//页脚的数据配置项
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class SimpleFooter extends Component {
    constructor(props) {
        super(props)
    }

    toPcVer() {
        var newSite = window.location.host.replace("m", "www");
        return window.location.protocol + "//" + newSite + "?from=wap"

    }

    render() {
        return <div className="simple-footer">
            <ol className="container">
                <li className="border-handle">{/*下载栏*/}
                    <div className="leftgroup">
                        <div className="inlineBlock logo"></div>
                        <div className="inlineBlock corp">
                            <div className="corp-name">
                                中国平安集团
                            </div>
                            <div className="corp-url">
                                1qianbao.com
                            </div>
                        </div>
                    </div>
                    <a href="https://www.1qianbao.com/yqb">
                        <div className="downloadBtn" data-click>
                            App下载
                        </div>
                    </a>
                </li>

                <li className=" ">{/*最底访问网站栏*/}
                    <a className="link" href={this.toPcVer()}>访问网站版 →</a>
                    <span className="copyright">Copyright©2013-2016  壹钱包版权所有  粤ICP备11100138号-5</span>
                </li>
            </ol>
        </div>
    }
}

export default SimpleFooter;