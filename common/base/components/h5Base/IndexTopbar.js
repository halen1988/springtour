/**
 * Created by: 史元君
 Desc:H5首页顶部工具栏
 */
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {bindActionCreators} from 'redux';
import utils from "../../utils/utils";
import handleToUserPage from "../../utils/handleToUserPage";
import {getLoginDataFromCache} from "../../../../common/base/utils/utils"
import {SESSION_KEY_LOGIN_MODE} from "../../../../common/base/constants/Enum";
import cookie from "../../../../common/base/utils/cookie";
import {sessionCache,localCache} from "../../utils/cache";
import {logout,addLogoutToUrl, requestYqbUserInfoData} from "../../actions/login/LoginAction"
import {getLogoutUrl} from "../../reducers/login/LoginReducer"
import { LOGIN_MODE} from "../../constants/Enum"
import { toLoginWithoutReturnUrlList} from "../../constants/WhiteList"
//CSS
import "../../styles/less/h5BaseComp/indexTopbar.less";

class IndexTopbar extends Component {

    static defaultProps={
        //h5特有 是否在登陆后显示退出功能项
        logoutable:false,
        //左侧菜单是否显示
        isMenuDispaly:true,
        // 登录功能是否显示
        isLoginDisplay:true,

        appendReturnUrl:true,
        businessMode:LOGIN_MODE.YQB,
        toLoginWithoutReturnUrlList:toLoginWithoutReturnUrlList,
        nvaiItems: [
            {item: "理财", url: "/#/building"},
            , {item: "购物商城", url: "/mall/index.shtml"}
            , {item: "生活服务", url: "/#/building"}
            , {item: "积分", url: "/#/building"}
            ,{item: "娱乐", url: "/#/building"}
           // {item: "娱乐", url: "javascript:void(0)"}
        ],
        downloadAndroidVer:"http://d.1qianbao.com/youqian/app/1qb_60007.apk",
        downloadIOS:"http://itunes.apple.com/app/id745097904",
        //收起动画持续时间
        minClickDur:0.2*1000
    };

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            height:0,
            isLogin: false
        };
        this.menuClick = this.menuClick.bind(this);
        this.userInfo = this.userInfo.bind(this);
        this.inClicking = false;

        this.getUserInfo();
    }

    getUserInfo(){
        if(!getLoginDataFromCache().isLogin()){
            //打开新tab时候 么有登录就尝试做登录请求
            let loginMode = sessionCache.get(SESSION_KEY_LOGIN_MODE) || localCache.get(SESSION_KEY_LOGIN_MODE) || cookie(SESSION_KEY_LOGIN_MODE);
            this.props.requestYqbUserInfoData("", loginMode, true)
        }
    }

    menuClick() {
        //防止连续点击，或者动画未完由于某些情况有出发点击
        if(this.inClicking){
            return ;
        }
        this.inClicking = true;
        setTimeout(()=>{//700m后可以再次点击
            this.inClicking = false;
        },this.props.minClickDur);

        if(this.state.expanded){
            this.setState({expanded: !this.state.expanded,height:0} )
        }else{
            let height = window.innerHeight || document.documentElement.clientHeight;
            this.setState({expanded: !this.state.expanded,height:height})
        }
    }

    userInfo = ()=> {
        handleToUserPage();
    };

    logout=()=>{
        this.props.logout().then(ok=>{
            this.jump()
        },fail=>{
            this.jump()
        });
    }

    jump=()=>{
        if(this.props.logoutUrl){
            window.location.replace(this.props.logoutUrl)
            this.props.addLogoutToUrl("");
        }else{
            window.location.reload()
        }
    }

    getLoginPath = ()=> {
        let matchUrl = window.location.href.split(/\?/)[0];
        let shouldAppend = this.props.toLoginWithoutReturnUrlList.every((ele,indx)=>{
            //有命中则说明 当前链接不应该添加returnURl
            return !((ele instanceof RegExp)&&ele.test(matchUrl))
        })
        return `/account/#/login?loginMode=${this.props.businessMode}${(this.props.businessMode==LOGIN_MODE.WLT)?"&requestToken=appServer":""}${this.props.appendReturnUrl&&shouldAppend?("&returnUrl="+encodeURIComponent(window.location.href)):""}`
    };
    toLogin = ()=> {
        let url = this.getLoginPath();
        window.location.href = url;
    };
    backToIndex = ()=> {
        window.location.href = `/`
    }

    render() {
        let clzAppend = this.state.expanded ? "expanded" : "";

        return (
            <div className="mobile-header">
                <div className={["topbar", clzAppend].join(" ")}>
                    {
                        this.props.isMenuDispaly?
                            <div className="icon menu" data-click data-click-radius="30"
                                                        onClick={this.menuClick}>
                             </div>:null
                    }
                    <div className="icon logo" onClick={this.backToIndex} data-click></div>
                    {
                        this.props.isLoginDisplay
                        &&(
                            this.props.userData.isLogin()
                            ?( this.props.logoutable?
                                <div className="icon login" data-click onClick={this.logout}> 退出 </div>
                                : <div className="icon user" data-click data-click-radius="30"
                                     onClick={this.userInfo}>
                                </div>
                            ) : <div className="icon login" data-click onClick={this.toLogin}> 登录 </div>
                        )
                    }


                </div>

                <nav className={[clzAppend].join(" ")} ref="navs" style={{height:this.state.height}} >
                    <ol onClick={this.menuClick}>
                        {
                            this.props.nvaiItems.map((ele, index)=> {
                                return (
                                    <li key={index} className="border-handle" style={{overflow: 'visible'}}>
                                        <div data-click data-click-radius="200" style={{overflow: 'hidden'}}>
                                            <a href={ele.url}> {ele.item} </a>
                                        </div>
                                    </li>)
                            })
                        }
                    </ol>

                    <div className="btnGroup">
                        <a className=" btn ios" href={this.props.downloadIOS}  >
                            <div  data-click  > iOS</div>
                        </a>
                        <a  className=" btn android"  href={this.props.downloadAndroidVer} >
                            <div data-click >Android</div>
                        </a>

                    </div>

                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: getLoginDataFromCache(),
        logoutUrl: getLogoutUrl(state)
    }
}

let mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({
        logout: logout,
        addLogoutToUrl:addLogoutToUrl,
        requestYqbUserInfoData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndexTopbar));
