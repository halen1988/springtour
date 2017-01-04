/**
 * Created by 史元君
 * 接口 ：maskShown（boolean）告知mask是否已经显示
 *        maskStyle: {style obj}
 *        menuClick 点击以触发
 * 顶层栏.
 */
import React, {Component, PropTypes} from "react";
import {IndexLink, Link,withRouter} from  "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//不要删除只是暂时功能没开放
import Menu from "./MenuTrigger";
import BackgroundComp from "./BackgroundComp";
import SiteRoadMapMenu from "./SiteRoadMapMenu";
import {getLogoutUrl} from "../../reducers/login/LoginReducer"
import { LOGIN_MODE} from "../../constants/Enum"
import { toLoginWithoutReturnUrlList,tokenNeededPages} from "../../constants/WhiteList"
import {logout,addLogoutToUrl} from "../../actions/login/LoginAction"
import {getLoginDataFromCache} from "../../utils/utils"
import {toMine} from "../../utils/handleToUserPage"
//css
import "../../styles/less/pcBaseComp/topbar.less";

class IndexTopbar extends Component {
    static  propTypes = {};
    static  defaultProps = {
        //需不需要跳转时添加当前路径作为returnUrl
        appendReturnUrl:true,
        //只有商城目前是wlt
        businessMode:LOGIN_MODE.YQB,
        /*在当前页面点击顶层的登录时 登陆后不应该返回
        被这个数组中的表达式匹配的URL 在点击登录时候是不会添加returnUrl的，防止操作完后返回登录
        *   忘记密码    ，注册  ，绑定  ，我的 页面
        * */
        toLoginWithoutReturnUrlList:toLoginWithoutReturnUrlList,
        /*这里显示需要登录态才能显示的页面， 这些页面中退出时必须跳转到首页*/
        tokenNeededPages:[
            ...toLoginWithoutReturnUrlList,
            ...tokenNeededPages
        ]
        //判断2级页面和首页用 头部显示内容不同
        ,isFirstLvlPage:false

    };

    constructor(props) {
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.count=1;
        this.hashQuery = window.location.hash&&window.location.hash.split("?")[1]
    }

    showMenu() {
        this.props.menuClick && this.props.menuClick();
    }

    logout=()=>{
        this.props.logout().then(ok=>{
           this.jump()
        },fail=>{
            this.jump()
        });
    };

    jump=()=>{
        if(this.props.logoutUrl){
            window.location.replace(this.props.logoutUrl)
            this.props.addLogoutToUrl("");
        }else{
            let matchUrl = window.location.href.split(/\?/)[0];
            let shouldReload  =this.props.tokenNeededPages.every((ele)=>{
                return !((ele instanceof RegExp)&&ele.test(matchUrl))
            })
            shouldReload?window.location.reload():window.location.replace("/")
        }
    };

    getLoginPath=()=>{
        let matchUrl = window.location.href.split(/\?/)[0];
        let shouldAppend = this.props.toLoginWithoutReturnUrlList.every((ele,indx)=>{
            //有命中则说明 当前链接不应该添加returnURl
            return !((ele instanceof RegExp)&&ele.test(matchUrl))
        });
        return `/account/#/login?loginMode=${this.props.businessMode}${this.props.appendReturnUrl&&shouldAppend?("&returnUrl="+encodeURIComponent(window.location.href)):""}`
    };
    getSignupPath=()=>{
        return `/account/#/signup${this.props.appendReturnUrl?("?returnUrl="+encodeURIComponent(window.location.href)):""}`
    };

    trytoMine=()=>{
        toMine();
    };

    getMaskUserName=()=>{
        let name= this.props.userData.getUserInfo().userName||this.props.userData.getUserInfo().realName||"";
        if(name.length>=11){
            name = name.slice(0,3)+"****"+name.slice(-4);
        }else if(name.length>=5){
            name = name.slice(0,2)+"**"+name.slice(-2);
        }else{
            name = name.slice(0,1)+"*"+name.slice(-1);
        }
        return name;
    }

    render() {
        let menuClz = "menu", containerClz = "menuContainer";
        if (this.props.maskShown) {
            menuClz = "menu  show ";
            containerClz = "menuContainer show";
        }


        return (
            <div className="topbar" data-count={this.count++}>
                <div className="bg"></div>
                <div className={menuClz} onClick={this.showMenu}  style={{display: "none" }}>
                </div>
                <div className="menu-animate-box" style={{height: this.props.maskStyle.height}}>
                    <div className={containerClz} style={this.props.maskStyle}>
                        <div className="mask" onClick={this.showMenu}></div>
                        <div className="empty-placeholder"></div>
                        <SiteRoadMapMenu className="dropdown"
                                         itemClick={this.showMenu}
                                         contentAnimateStyle={this.props.contentAnimateStyle}/>
                    </div>
                </div>

                {
                    !this.props.isFirstLvlPage
                        ?
                        <ul className="left">
                            <li>
                                <div><a href={`/${this.hashQuery?("?"+this.hashQuery):""}`} data-event="壹钱包首页入口">壹钱包</a></div>
                            </li>
                            <li>
                                <div><a href={`/mall${this.hashQuery?("?"+this.hashQuery):""}`} data-event="商城首页入口">商城</a></div>
                            </li>
                            <li  style={{display: "none" }}>
                                <div><a href="/finance">理财</a></div>
                            </li>
                            <li  style={{display: "none" }}>
                                <div><a href="">积分</a></div>
                            </li>
                        </ul>
                        :
                        <ul className="left">
                            <li>
                                <div ><a href="/" data-event="个人">个人</a></div>
                            </li>
                            <li>
                                <div data-event="企业"><a href="https://business.1qianbao.com/merchant/" target="_blank" data-event="企业">企业</a></div>
                            </li>
                        </ul>
                }

                <ul className="right">
                    <li>
                        <div><a href="https://www.1qianbao.com/yqb" target="_blank" data-event="下载壹钱包客户端">下载壹钱包客户端</a></div>
                    </li>
                    <li>
                        <div><a href="https://www.wanlitong.com/searchPurchaseCardView.do" target="_blank" data-event="礼品券使用">礼品券使用</a></div>
                    </li>
                    <Menu tagName="li" getMenuContext={()=>this.refs.custService}   style={{display: "none" }}>
                        <div>
                            <a href="javascript:void(0)">客户服务 </a>
                            <span className="arrow"></span>
                        </div>
                        {/*//不要删除只是暂时功能没开放*/}
                        <BackgroundComp ref="custService" className="custService" >
                            <ul>
                                <li><a href="javascript:;">公告</a></li>
                                <li><a href="javascript:;">在线客服</a></li>
                                <li><a href="javascript:;">意见反馈</a></li>
                                <li><a href="javascript:;">帮助中心</a></li>
                                <li><a href="javascript:;">联系我们</a></li>
                            </ul>
                        </BackgroundComp>
                    </Menu>
                    <li>
                        <div>
                            <a href="https://www.1qianbao.com/selfcenter/showSafeLevel" target="_blank" data-event="安全中心">安全中心 </a>
                            {/*<span className="arrow"></span>*/}
                        </div>

                    </li>
                    <li>
                        <div className="seperateBar">|</div>
                    </li>
                    {
                        this.props.userData.isLogin() ?
                            [
                                <li key="loginuserinfo">
                                    <div onClick={this.trytoMine} style={{cursor:"pointer"}} data-event="手机号我的入口">
                                        <span className="din">{this.getMaskUserName()}</span>
                                        <span className="arrow" style={{visibility:"hidden"}}></span>
                                    </div>
                                </li>,
                                <li key="logout">
                                    <div><a  href="javascript:void(0)" onClick={this.logout.bind(this)} data-event="退出登录入口">安全退出</a></div>
                                </li>
                            ]
                            :
                            [
                                <li key="login">
                                    <div><a href={this.getLoginPath()} data-event="登录">登录</a></div>
                                </li>,
                                <li key="signup">
                                    <div><a href={this.getSignupPath()} data-event="注册">注册</a></div>
                                </li>
                            ]
                    }

                </ul>
            </div>
        )
    }
}

let mapStateToProps = (state)=> {
    return {
        // loginUtil: getLoginUtils(state),
        userData:  getLoginDataFromCache(),
        logoutUrl: getLogoutUrl(state)
    };
}
let mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({
        logout:logout,
        addLogoutToUrl:addLogoutToUrl
    },dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(IndexTopbar))
