/**
 * Created by: 史元君
 Desc:H5页脚组件
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//CSS
import "../../styles/less/h5BaseComp/indexFooter.less";
//页脚的数据配置项
import {footerData}  from "../../../../common/base/configs/IndexFooterData";
import {getLoginDataFromCache}  from "../../../../common/base/utils/utils";
import { sessionCache}  from "../../../../common/base/utils/cache";
import { SESSION_KEY_LOGIN_MODE}  from "../../../../common/base/constants/Enum";
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


class IndexFooter extends Component {

    static propTypes = {
        footerContent: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                item: React.PropTypes.string,
                child: React.PropTypes.array
            })
        )
    };
    static defaultProps = {
        downloadPage:"http://d.1qianbao.com/youqian/index.html",
        footerContent: footerData
    };

    constructor(props) {
        super(props);
        this.state = {
            show: Array(props.footerContent.length)
        }
        this.showChild.bind(this);

    }

    /*点击后显示详细列表*/
    showChild(index) {
        let newState = Array(this.state.show.length);
        newState[index] = !this.state.show[index];
        this.setState({show: newState});
    }

    toPcVer() {
        let loc = window.location;
        let newSite = loc.host.replace('m', 'www');
        console.log(newSite);
        let newPath = loc.pathname.replace('h5', 'pc').replace('index.shtml', 'index.html');
        console.log(newPath);
        let loginCache = getLoginDataFromCache();
        let append = loginCache.isLogin() ? `&m=${loginCache.getToken()}&mode=${sessionCache.get(SESSION_KEY_LOGIN_MODE)}` : '';
        console.log(append);
        return `${loc.protocol}//${newSite}${newPath}${loc.hash}?from=wap${append}`;

    }

    render() {
        let contentdata = this.props.footerContent;
        let content = [], pre = 'menu';
        if (!this.props.simpleFooter) {
            contentdata.forEach((ele, index)=> {
                let ChildPart = [];
                let isEixstChild = ele.child && ele.child.length > 0;
                let clzShow = this.state.show[index] ? "show" : "";

                if (isEixstChild) {/*添加详细展开部分*/
                    ChildPart.push(
                        <div key={pre + index}
                             className={clzShow ? 'it to-exp item-show-animate' : 'it to-exp '}
                             style={{height: clzShow ? (ele.child.length * 0.88) + 'rem' : 0, overflow: 'hidden'}}>
                            <ol className="innerList">
                                {
                                    ele.child.map((child)=> {
                                        return (
                                            <li key={child.item} className="border-handle">
                                                <div data-click style={{overflow: 'hidden'}}>
                                                    <a href="javascript:;"> {child.item} </a>
                                                </div>
                                            </li>);
                                    })
                                }
                            </ol>
                        </div>
                    )
                }

                content.push(
                    /*绑定他们自己的序列号，方便直接更改状态数组*/
                    <li key={index} data-test="1" onClick={this.showChild.bind(this, index)}
                        className={["border-handle", clzShow].join(" ")}>
                        <div className="item-spread" data-click data-click-delay="30">
                            <span>{ele.item}</span>
                            <div className="right">+</div>
                        </div>
                    </li>
                );
                content.push(ChildPart);
            });
        }
        return (

            <div className="footer">
                <ol className="container">
                    {content}
                    <li className="it border-handle">{/*下载栏*/}
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
                        <a href={this.props.downloadPage} target="_blank">
                            <div className="downloadBtn" data-click>
                                App下载
                            </div>
                        </a>
                    </li>

                    <li className="it ">{/*最底访问网站栏*/}
                        <a className="link" href={this.toPcVer()}>访问网站版 →</a>
                        <span className="copyright">Copyright©2013-2016  壹钱包版权所有  粤ICP备11100138号-5</span>
                    </li>
                </ol>
            </div>
        )
    }
}

export default connect()(IndexFooter);