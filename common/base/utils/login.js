/**
 * 登录
 * 创建者：wangxianfa
 * 日期：2016.8.9
 */
import API from '../configs/api'
import {queryParam, Fetch, CloseWebView} from './utils';
import { Popup, globalDialog } from '../components/popup/popup.js';

let login =  {
    versionType: {
        'native420': 420, //nvative4.2.0
        'native430': 430, //nvative4.3.0
        'native431': 431  //nvative4.3.1
    },
    /**
     *解密token
     * @param {String} encrypToken H5登录状态加密token
     * @param {Function} callback 解密成功回调方法
     * @return {String} 返回token值
     */
    decryptionToken(encrypToken,callback) {
        let vData = {
            encrypToken: encrypToken
        };
        Fetch(API.decrypToken, vData).then(function (result) {
            if (result.body.statusCode == '0000') {
                let oUser = {};
                oUser.token = result.body.result.token;
                sessionStorage.setItem('wlt.user', JSON.stringify(oUser));
                if('undefined' != typeof callback){
                    //执行回调方法
                    callback();
                }
            } else {
                Popup(result.body.message);
                //1030登录态失效
                if(result.body.statusCode === '1030'){
                    setTimeout(function(){
                        this.isDeviceVersion();
                    }.bind(this),2000)
                }
            }
        }.bind(this))
    },
    /**
     * 获取壹钱包客户端版本和设备系统名
     * @return {Object}
     **/
    getYQBNativeVersion() {
        let ua = window.YqbNativeUserAgentForTest || window.navigator.userAgent,
            androidRegExp = /1qianbao-android-(\d+)(\.\d+)+/,
            iosRegExp = /1qianbao-ios-(\d+)(\.\d+)+/,
            version = "",
            systemName = "";
        if (androidRegExp.test(ua)) {
            version = ua.match(androidRegExp)[0].replace(/1qianbao-android-/, "");
            systemName = "android";
        } else if (iosRegExp.test(ua)) {
            version = ua.match(iosRegExp)[0].replace(/1qianbao-ios-/, "");
            systemName = "ios";
        } else {
            return false;
        }
        return {
            system: systemName,
            version: version
        };
    },
    /**
     *判断native版本
     * @return {undefined}
     */
    isDeviceVersion() {
        //获取native版本
        let YQB = this.getYQBNativeVersion() || {},
            YQBVersion = YQB.version && parseInt(YQB.replace(/\./g,'').replace(/^([\s\S]{3})([\s\S]+)/,'$1'));

        if(YQBVersion　&&　YQBVersion <= this.versionType.native420) {
            //壹钱包客户端小于等于4.2.0
            this.handlerLogin(this.versionType.native420);
        }else if(YQBVersion　&& YQBVersion <= this.versionType.native430) {
            //壹钱包客户端小于等于4.3.0
            this.handlerLogin(this.versionType.native430);
        }else if(YQBVersion && YQBVersion >= this.versionType.native431){
            //壹钱包客户端大于等于4.3.1
            this.handlerLogin(this.versionType.native431);
        }else{
            //外部h5
            this.handlerLogin('h5');
        }
    },
    /**
     *跳转登录页面
     * @param {String} type 状态native|h5
     * @return {undefined}
     */
    handlerLogin(type) {
        if(type === this.versionType.native420){
            //壹钱包客户端小于等于4.2.0 提示去下载最新版本
            globalDialog.show({
                title: false,
                content: '您的系统需要升级您的系统需要升级您的系统需要升级您的系统需要升级您的系统需要升级您的系统需要升级您的系统需要升级您的系统需要升级您的系统需要升级您的！',
                button: ['知道了'],
                buttonCallback: [
                    function () {

                    }
                ],
                isShowMask: true
            });
        }else if(type === this.versionType.native430){
            //壹钱包客户端等于4.3.0 SSO登录
            let loadUrl = encodeURIComponent(location.origin + location.pathname + location.hash);
            location.href = 'ewap://1qianbao/loginactivity/wltSSOneedLogin?loadURL=' + loadUrl;
        }else if(type === this.versionType.native431){
            //壹钱包客户端大于等于4.3.1
            window.YiQianBao.UniversalJSFunction('getWLTToken','window.NativeLogin.success("[token]")','window.NativeLogin.error()');
        }else{
            //h5登录
            let domain = 'http://test3-h5.stg.1qianbao.com:8092/zwBind/index.html#/index';//测试环境p3
            //let domain = 'http://test5-h5.stg.1qianbao.com:8092/zwBind/index.html#/index';//测试环境p5
            //let domain = 'http://h5-uat.1qianbao.com/zwBind/index.html#/index';//预发环境
            //let domain = 'http://h5.1qianbao.com/zwBind/index.html#/index';//生产环境
            let title = encodeURIComponent('商城登录绑定');
            let url = location.href.replace(/encrypToken=([\s\S]+(?=\&)|[\s\S]+)/g, '').replace(/\&+$/,'');
            let returnURL = encodeURIComponent(url);//成功跳转
            let cancelURL = encodeURIComponent(url);//失败跳转
            let uid = queryParam('uid');
            let activityId = queryParam('activityId');
            let mallActivityId = queryParam('mallActivityId');
            let URL_LOGIN = `${domain}?pageTitle=${title}&returnURL=${returnURL}&cancelURL=${cancelURL}&sessionType=WLT&uid=${uid}&activityId=${activityId}&mallActivityId=${mallActivityId}`;
            location.href = URL_LOGIN;
        }
    },
    /**
     *判断是否登录入口
     * @param {String} token native登录状态
     * @param {String} encrypToken H5登录状态加密token
     * @param {Function} callback 解密成功回调方法
     * @return {String} 返回token值
     */
    isToken(token,encrypToken,callback) {
        //native getWLTToken回调
        window.NativeLogin = {
            success: function (token) {
                let oUser = {};
                oUser.token = token;
                sessionStorage.setItem('wlt.user', JSON.stringify(oUser));
                if('undefined' != typeof callback){
                    //执行回调方法
                    callback();
                }
            },
            error: function(){
            }
        };

        token = token || JSON.parse(sessionStorage.getItem('wlt.user') || '{}').token;
        if(token){
            //已登录
            let wltuser = {token: token};
            sessionStorage.setItem('wlt.user', JSON.stringify(wltuser));
            return token;
        }else if(encrypToken){
            //h5登录成功解密token
            this.decryptionToken(encrypToken,callback);
        }else{
            //未登录
            this.isDeviceVersion();
        }
        return '';
    }
};

export default login;