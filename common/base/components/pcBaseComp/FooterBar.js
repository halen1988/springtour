/**
 * Created by: 史元君
 Desc: 页脚  带有breadcrumbs(只在2级以下页面显示)

 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Breadcrumbs from "./Breadcrumbs";
import {footerData} from "../../configs/IndexFooterData";

import "../../styles/less/pcBaseComp/footerbar.less";

class FooterBar extends Component {
    static propTypes = {};
    static defaultProps = {
        data: footerData,
        hasBreadcrumbs:false,
        //跟路径名称
        pathName:"",
    };

    constructor(props) {
        super(props);
        this.state = {
            qrSelect: "app"
        }
    }

    select = (which)=> {
        this.setState({qrSelect: which})
    };
    /*构建所有的数据页脚部分，然后插入大logo层 和 分享层*/
    getFooterBody() {
        let groups = this.props.data.reduce((ulArr, group)=> {
            ulArr.push(
                <ul className="" key={`key-footer-ul-${group.item}`}>
                    { group.child.reduce((liArr, liEle)=> {
                        liArr.push(<li key={`key-footer-li-${liEle.item}`}><a
                            href="javascript:void(0);">{liEle.item}</a></li>)
                        return liArr;
                    }, [
                        <li key={`key-footer-ul-${group.item}-header`} className="li-first-of-type"><a
                            href="javascript:void(0);">{group.item}</a></li>,
                        <li key={`key-footer-ul-${group.item}-header-line`}>
                            <div className="line  border-handle moveleft"/>
                        </li>
                    ])
                    }
                </ul>
            );
            return ulArr;
        }, []);

        groups.splice(3, 0, this.getLogoPart());
        groups.splice(6, 0, this.getSharePart());
        return groups;
    }

    getLogoPart() {
        return (
            <ul className="footerLogo" key="key-footerLogoElement">
                <div className="footerLogoWrapper">
                    <div className="logopart"></div>
                    <div className="info">壹钱包－中国平安集团成员</div>
                    <div className="signpart"></div>
                </div>
            </ul>
        )
    }

    getSharePart() {
        return (
            <ul className="share" key="key-footer-share">
                <div className="borderBG">
                    <div className={`QR ${this.state.qrSelect}QR`}></div>
                </div>
                <div className="focusUs" >
                    <span className={`app ${this.state.qrSelect=="app"?"selected":""}`} onClick={this.select.bind(this, "app")}>App</span>
                    <span className={ `wechat ${this.state.qrSelect=="wechat"?"selected":""}`} onClick={this.select.bind(this, "wechat")}></span>
                    <span className={ `sina ${this.state.qrSelect=="sina"?"selected":""}`} onClick={this.select.bind(this, "sina")}></span>
                </div>
            </ul>
        )
    }

    getBreadcrumbs() {
        let {routePath,hasBreadcrumbs,pathName} = this.props;
        // 添加breadcrumb下面添加一根透明线 div实现的
        return hasBreadcrumbs ? (
            <div><Breadcrumbs pathName={pathName} />
                <div className="line border-handle"></div>
            </div>) : null;
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-content-wrapper">
                    {this.getBreadcrumbs()}
                    <div className="footer-body"  style={{display: "none" }}>
                        {this.getFooterBody() }
                    </div>
                    <div className="line border-handle"></div>
                    <div className="footer-tail">
                        <div className="left">
                            <ul>
                                <li><span>中国平安集团：</span></li>
                                <li><a target="_blank" href="http://www.pingan.com">中国平安官网</a></li>
                                <li><a target="_blank" href="http://www.eka.cn">壹卡会</a></li>
                                <li><a target="_blank" href="http://www.baoxian.pingan.com">平安直通保险</a></li>
                                <li><a target="_blank" href="http://www.pahaoche.com">平安好车</a></li>
                                <li><a target="_blank" href="http://www.pinganfang.com">平安好房</a></li>
                                <li><a target="_blank" href="http://www.one.pingan.com">一账通</a></li>
                            </ul>
                        </div>
                        <div className="right">
                            <span>Copyright©2013-2016  壹钱包版权所有  粤ICP备11100138号-5</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterBar;
