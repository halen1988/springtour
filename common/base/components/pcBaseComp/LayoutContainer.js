/**
 * Created by: 史元君
 Desc:整体布局格式利用NAMED COMPONENT形式配置

 格式： 命名||默认
 ————————————
 {topbar||<Topbar/>}        = 顶层工具栏   注入props : routePath:Array
 ————————————

 ————————————
 {content }  = 除了头尾之外的中间部分全部
 或者可以用预定义的结构填充content
 —————content———————
 {navibar }      = 导航配置 无默认组件   注入props : routePath:Array
 ————————————
 {mainBody||this.props.children} = 主页面配置及默认组件
 —————content end———————


 ————————————
 {footerbar }      =页脚配置 无默认组 可选组件有<FooterBar> <SimpleFooter>   注入props : routePath:Array

 注入props的  routePath:Array  保存当前路由路径，用于识别是否首页 2级页面，方便生成breadcrumbs
 用法有

 {
     topbar：ReactComponent
     content：ReactComponent
     footerbar：ReactComponent
 }
 或者
 { topbar：ReactComponent
     navibar：ReactComponent
     mainBody：ReactComponent
   footerbar：ReactComponent
 }
 */
import React, {Component, PropTypes} from "react";
import {findDOMNode} from "react-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Topbar from "./Topbar";
import {getScreenSize} from "../../reducers/ScreenResizeReducer";
import {isIE,getLoginDataFromCache} from "../../utils/utils";
import {sessionCache,localCache} from "../../utils/cache";
import {SESSION_KEY_LOGIN_MODE} from "../../constants/Enum";
import updateRoutePath from "../../actions/updateRoutePathAction";
import {requestYqbUserInfoData} from "../../actions/login/LoginAction";
import Topic from "./Topic";
import "../../styles/less/pcBaseComp/layoutContainer.less";
//不变的工具栏

//倒入主题


//css

class LayoutContainer extends Component {
    static defaultProps = {
        isIE8: isIE(8),
        isIE9: isIE(9)
    }

    constructor(props) {
        super(props);
        let {path, pathString}= this.resolveRoutes(this.props.routes);
        //used to compare when the path changes
        this.pathString = pathString;
        this.state = {
            path: path
            , fitToMask: {}
            , maskShown: false
            , maskStyle: {}
            , iEPromptShow: true
        };
        this.dispatchRoutesPathUpdate(path);
        this.menuClick = this.menuClick.bind(this);

        this.footerbar = null;
        this.topbar = null;

        this.renderCount = 1;

    }

    stripCurrentUrl(queryObj) {
        let {m, mode, ...newquery}=queryObj;
        let search = [];
        for (let k in newquery) {
            search.push(`${k}=${newquery[k]}`)
        }
        window.location.replace(`${window.location.href.split(/\?/)[0]}?${search.join("&")}`)
    }

    componentWillMount() {
        let loc = this.props.location;
        /*from=wap&m=bWpVqKnCAmybp5XgEdDaWC&mode=yqb*/
        if (loc && loc.query && loc.query.m&&(loc.query.from=="wap")) {
            //移动端跳转做来 尝试做登录
            this.props.requestYqbUserInfoData(loc.query.m, loc.query.mode).then(
                (okData)=> {
                    this.stripCurrentUrl(loc.query)
                }, fail=> {
                    this.stripCurrentUrl(loc.query)
                })

        }else if(!getLoginDataFromCache().isLogin()){
            //打开新tab时候 么有登录就尝试做登录请求
            let loginMode=(loc.query&&loc.query.mode)||sessionCache.get(SESSION_KEY_LOGIN_MODE)||localCache.get(SESSION_KEY_LOGIN_MODE)
            loginMode&&this.props.requestYqbUserInfoData("",loginMode).then(
                (okData)=> {
                    window.location.replace(window.location.href)
                }, fail=> {
                    window.location.replace(window.location.href)
                }
            )
        }
    }

    /*当mask出现时候需要,计算当前浏览器窗口大小，设置遮罩高度完全掩盖，达到屏蔽滚动条的目的*/
    menuClick() {
        let {
            topbarHeight,
            windowHeight
        } = this.getHeightSet();
        let nextMaskState = !this.state.maskShown,
            maskHeight = windowHeight - topbarHeight,
            transform = nextMaskState ? 'translateY(-35px)' : 'translateY(-75px)';
        let fitToMask = nextMaskState ? {height: windowHeight, overflow: 'hidden'} : {};
        this.setState({
            fitToMask: fitToMask,
            maskShown: nextMaskState,
            maskStyle: {height: maskHeight, transform: transform, top: "-35px"},
            contentAnimateStyle: {
                transform: nextMaskState ? 'translateY(0)' : 'translateY(-25px)',
                opacity: nextMaskState ? 1 : 0.5
            }
        })
        this.menuTimer && clearTimeout(this.menuTimer);
        if (!nextMaskState) {

            this.hidemask = this.hidemask || (this.props.isIE8 ? ()=> {
                    this.setState({
                        maskStyle: {height: 0}
                    })
                } : ()=> {
                    this.menuTimer = setTimeout(()=> {
                        this.setState({
                            maskStyle: {height: 0}
                        })
                    }, 400);
                });

            this.hidemask();
        }
    }


    getHeightSet() {
        let topbardom = findDOMNode(this.topbar),
            topbarHeight = topbardom.clientHeight,
            windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        return {
            topbarHeight,
            windowHeight
        }
    }


    /* 集中解析路由信息然后分发到redux,给感兴趣的组件使用比如<Breadcrumbs/>
     * */
    resolveRoutes(routes) {
        routes = routes || [];
        let pathString = "";
        let path = routes.reduce((resultArr, route, index)=> {
            if (route.path) {
                let isLast = index == routes.length - 1;
                resultArr.push({
                    path: isLast ? (route.path + this.props.location.search) : route.path,
                    name: route.name
                });
                pathString += route.path;
            }
            return resultArr;
        }, []);
        return {
            path,
            pathString
        }
    }

    dispatchRoutesPathUpdate(data) {
        this.props.updateRoutePath(data);
    }

    /*当路由变化时候
     1及时更新redux中的数据
     *  2 收起菜单
     * */
    componentWillReceiveProps(nextProps) {
        let {path, pathString}= this.resolveRoutes(nextProps.routes);
        //路由变化
        if (pathString != this.pathString) {
            this.setState({path})
            this.pathString = pathString;
            this.dispatchRoutesPathUpdate(path);
            //如果菜单还是弹出状态 需要收起
            if (this.state.maskShown) {
                this.menuClick("componentWillReceiveProps");
            }
        }
    }

    closePrompt = ()=> {
        this.setState({iEPromptShow: false})
    }

    render() {
        const {topbar, navibar, mainBody, footerbar, content} = this.props;
        let routeProps = {routePath: this.state.path};
        let contentAnimateStyle = this.state.contentAnimateStyle;
        let topbarProps = {
            ...routeProps,
            contentAnimateStyle: contentAnimateStyle,
            maskShown: this.state.maskShown,
            maskStyle: this.state.maskStyle,
            menuClick: this.menuClick,
            ref: ((topbar)=> {
                this.topbar = topbar
            }).bind(this)
        };
        // console.log(this.state.path)
        let footerbarProps = {
            ...routeProps,
            ref: ((footer)=> {
                this.footerbar = footer
            }).bind(this)
        };

        let mintopbarHeight = 35, minfooterbarHeight = 64;
        let minheight = this.props.screenSize.height - mintopbarHeight - minfooterbarHeight - 13;
        let contentStyle = {
            minHeight: minheight
            , hegith: "auto !important"
            , height: minheight
        };
        return (
            <div className={this.props.className ? this.props.className.type : "pageWrapper"}
                 style={this.state.fitToMask} data-count={this.renderCount++}>
                {(this.props.isIE8 || this.props.isIE9) && this.state.iEPromptShow ?
                    <div className="IEPrompt">
                        抱歉，使用IE8/IE9等低版本浏览器访问本站体验欠佳，建议使用更高版本的IE浏览器或者其他浏览器
                        <i className="yqbfont_gg_guanbi" onClick={this.closePrompt} style={{marginLeft: 50}}></i>
                    </div> : null
                }
                {
                    this.state.path[1] && this.state.path[1].name == 404 ? null : <Topic/>
                }

                {
                    topbar && React.cloneElement(topbar, topbarProps)
                    || <Topbar {...topbarProps} />
                }

                {content ?
                    content
                    :
                    <div className="content" style={contentStyle}>
                        {
                            navibar && React.cloneElement(navibar, routeProps)
                        }

                        {mainBody || this.props.children}
                    </div>
                }

                {
                    footerbar && React.cloneElement(footerbar, footerbarProps)
                }
            </div>
        )
    }
}

let mapStateToProps = (state)=> {
    return {
        screenSize: getScreenSize(state)
    }
}

let mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({
        updateRoutePath: updateRoutePath,
        requestYqbUserInfoData: requestYqbUserInfoData
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutContainer);
