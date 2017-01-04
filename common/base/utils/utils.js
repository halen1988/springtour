/**
 * 万里通商城项目工具
 **/
import {Popup} from '../../base/components/popup/popup.js';
import React, {Component, PropTypes} from 'react';
import cacheTypes, {memoryCache, sessionCache, localCache} from './../../base/utils/cache';
import login from './../../base/utils/login';
import {ACCOUNTINVALID} from '../../base/configs/common'
import {SESSION_KEY_LOGIN_DATA ,SESSION_KEY_MZONE_SESSION_ID,APIERROR_LOGIN_TIMEOUT} from '../../base/constants/Enum'
import {eraseLoginData} from "./../../base/actions/login/LoginAction";
import browser from './browser'
import api from './../configs/api';
import * as Enum from "../constants/Enum";
import '../../../plugins/fixXdr'
import 'fetch-ie8'
/*import fetchIe8 from './../../base/utils/fetch-ie8-cors.js';
if(!window.fetch){
    window.fetch = fetchIe8;
}*/
/*var fetch = require('cb-fetch');
if(!window.fetch){
    window.fetch = fetchIe8;
}*/
//jsonp接口-勿删
import fetchJsonp from 'fetch-jsonp';

// REM单位计算宽度
(function () {
    let calculate_size = function () {
        let BASE_FONT_SIZE = 100;
        let docEl = document.documentElement;
        let clientWidth = docEl.clientWidth;

        if (!clientWidth) return;
        docEl.style.fontSize = BASE_FONT_SIZE * (clientWidth / 750) + 'px';
    }

    if (document.addEventListener && browser.versions.mobile && !browser.versions.iPad) {
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let docBody = document.body;
        window.addEventListener(resizeEvt, calculate_size, false);
        document.addEventListener('DOMContentLoaded', calculate_size, false);
        calculate_size();
        docBody.style.display = 'block';
    }
})()

// 合并对象操作
/**
 * [DeepExtends description]
 * @param {[type]} destination [description]
 * @param {[type]} source      [description]
 * var destination = { foo: "bar", baz: { bang: "zoom" } };
 * var source = { baz: { thud: "narf" } };
 * Extends.extend(destination, source);
 */
const Extends = function (target, source, deep) {
    let key;
    let isWindow = function (obj) {
        return obj != null && obj == obj.window
    }
    let isArray = function (value) {
        return value instanceof Array
    }
    let isPlainObject = function (obj) {
        return typeof(obj) == "object" && !isWindow(obj) && obj.__proto__ == Object.prototype
    }

    for (key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                target[key] = {}
            if (isArray(source[key]) && !isArray(target[key]))
                target[key] = []

            Extends(target[key], source[key], deep)
        }
        else if (source[key] !== undefined) {
            target[key] = source[key]
        }
    }

    return target
}

// 统计打点
const Track = function (id) {
    let [TRACK_SITE, TRACK_DOMAIN] = ['wlt', 'wanlitong.com']
    let memberId = id ? id : '';
    let loginUserId = memberId;

    if (loginUserId === '') {
        loginUserId = '0'
    }

    let _paq = {
        site: TRACK_SITE,
        domain: TRACK_DOMAIN,
        userId: loginUserId,
        userType: 1
    };

    window._paq = _paq;

    let elScript = document.createElement('script');
    /*if (location.protocol.toLowerCase() == 'http:') {
        elScript.setAttribute('src', '//webstat.wanlitong.com/webstat/pa_beacon_cdn.js');
    } else {
        elScript.setAttribute('src', '//webstat.wanlitong.com/js/pa_beacon_https.js');
    }*/
    document.body.appendChild(elScript);
}()


//检查token是否异常
const Check_Token = function (result) {
    var flag_token = true;
    var ENUM = {
        MESSAGE: {
            API_RESP_STATUS: {
                UNKNOWN: '未知错误',
                NETWORK_ERROR: '请求失败',
                TIMEOUT: '网络异常，请稍后再试！',
                INIT: {
                    '9010': '网络超时，请重新访问。',
                    '9011': '网络超时，请重新访问。',
                    '9012': '网络超时，请重新访问。',
                    '9013': '尊敬的用户，您本次登录地区与上次登录非同一区域，为了您的账号安全，请重新登录，谢谢。'
                }
            }
        }
    };
    var rsp = result.head;
    if (rsp.rspCode != 0) {
        var message = '',
            flag_token = false;
        if (ENUM.MESSAGE.API_RESP_STATUS.INIT.hasOwnProperty(rsp.rspCode)) {
            message = ENUM.MESSAGE.API_RESP_STATUS.INIT[rsp.rspCode];
        } else {
            message = ENUM.MESSAGE.API_RESP_STATUS.UNKNOWN;
        }

    }
    return flag_token;

}

/*
 * 获取缓存成功
 * @param {String} url 地址
 * @param {Object} params 参数对象
 * @param {Object} option 请求配置
 * return {Boolean}
 * */
const getCacheSuccess = function (url, params, option) {
    let resData;
    //获取缓存
    if (!option.noCache && (resData = getResponse(url, params, option.cache))) {
        return new Promise(resolve=> {
            resolve(resData);
        });
    }
    else {
        return false;
    }
}

/**
 * fetch方法扩展 Fetch(url, data, option).then(function(res){console.log(res)})
 * @param {String} url api url
 * @param {Object} data 传入扩展数据
 * @param {Object} option 原生fetch option
 */
const Fetch = function (url, paramsObj = {}, option = {}) {
    //debugger;
    //cacheParams为缓存参数对象，取缓存或保存缓存使用，使用assign防止污染
    let cacheParams = Object.assign({}, paramsObj),
        cachePromise = getCacheSuccess(url, cacheParams, option);
    //取缓存成功后返回
    if (cachePromise) {
        return cachePromise;
    }

    option = Object.assign({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        ...option
    });


    //是否有缓存数据
    let paramsKey = Object.assign({}, paramsObj);

    let requestData,
        userDataUrl = '';

    let baseData = {
        authType: 'SHA1_1',
        coordinate: '168.49679,28.82855',
        custString: '1.36',
        machineNo: '864375028810514',
        msgVersion: '3.6.1',
        platform: 'ios',
        reqAppId: 'ios_app_wanlitong',
        reqTime: new Date().getTime(),
        screenSize: '960*480'
    };

    requestData = Extends(paramsObj, baseData)

    /*requestData = Extends(requestData, {
        sign: Sign(requestData)
    })*/
    //对encrypToken中出现特殊字符（+）提交丢失进行encode
    if (requestData.encrypToken) {
        requestData.encrypToken = encodeURIComponent(requestData.encrypToken);
    }
    let _requestData
    for (let key in requestData) {
        if (key == 'productName') {
            requestData[key] = encodeURIComponent(requestData[key]);
        }
        _requestData = requestData[key] ? requestData[key] : '';
        userDataUrl += '&' + key + '=' + _requestData
    }

    userDataUrl = userDataUrl.slice(1);
    let _option = option;
    //分别设置post和get的参数
    if (_option.method.toUpperCase() == 'POST') {
        _option.body = userDataUrl;
    }
    else {
        url += '?' + userDataUrl;
    }

    //token失效提示文案
    let msg = {
        '9010': '会话标识不合法',
        '9011': '会话过期，请重新登录',
        '9012': '用户重新登录',
        '9013': '尊敬的用户，您本次登录地区与上次登录非同一区域，为了您的账号安全，请重新登录',
    };
    return fetch(url, _option)
        .then(res => res.json())
        .then(json => {
            if (json && json.head && ['9010', '9011', '9012', '9013'].indexOf(json.head.rspCode) != -1) {

                //重新登录
                Popup(msg[json.head.rspCode]);
                setTimeout(function () {
                    login.isDeviceVersion();
                }, 2000);
                throw new Error(ACCOUNTINVALID);
            }
            //数据返回的状态码正确进行缓存
            if (json/* && json.body*/) {
                //noCache禁用数据缓存
                //cache 启用缓存和缓存类型，默认cacheTypes.SESSION, 可设置为cacheTypes.LOCAL
                //cacheTime 当缓存为cacheTypes.LOCAL时，数据缓存时间
                /*if(!option.noCache && json.body.statusCode == '0000'){
                 saveResponse(url, cacheParams, json, option.cache, option.cacheTime);
                 }*/
                return json;
            }
        });

};

/**
 *
 * @param url
 * @param paramsObj
 * @param option
 * @returns {*}
 */
const mzoneFetch = function (url, paramsObj = {}, option = {}) {


    option = Object.assign({
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        ...option
    });
    paramsObj.deviceId = getDeviceId();
    option.body = JSON.stringify(paramsObj);
    return (fetch)(url, option).then(res => {
        return res.json();
    }).then(res=>{
        if(res&&res.resultCode&&(res.resultCode==APIERROR_LOGIN_TIMEOUT))
        {
            eraseLoginData();
        }
        return res;
    })

};

/*获取服务器的js文件并且返回执行结果js*/
const getScript = function (src, exeCallbackName, timeout = 2000) {
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = false;
    el.src = src;
    el.id=exeCallbackName+new Date().getTime()
    /**
     * Ensures callbacks work on older browsers by continuously
     * checking the readyState of the request. This is defined once
     * and reused on subsequeent calls to getScript.
     * @param  {Element}   el      script element
     * @param  {Function} callback onload callback
     */
    getScript.ieCallback = getScript.ieCallback || function (el, callback) {
            if (el.readyState === 'loaded' || el.readyState === 'complete') {
                callback();
            } else {
                setTimeout(function () {
                    getScript.ieCallback(el, callback);
                }, 100);
            }
        };

    document.getElementsByTagName('head')[0].appendChild(el);
    return new Promise(function (resolve, reject) {

        let timeoutId = null;
        let id= el.id;
        getScript.callback = function () {
                var result = window[exeCallbackName]();
                resolve(result);
                clearTimeout(timeoutId)
                getScript.removeScript(id);
                getScript.clearFunction(exeCallbackName)
            }

        if (typeof getScript.callback === 'function') {
            if (typeof el.addEventListener !== 'undefined') {
                el.addEventListener('load', getScript.callback, false);
            } else {
                el.onreadystatechange = function () {
                    el.onreadystatechange = null;
                    getScript.ieCallback(el, getScript.callback);
                };
            }
        }

        // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined'
        // error if request timeout
        getScript.clearFunction =  function (exeCallbackName) {
                // IE8 throws an exception when you try to delete a property on window
                // http://stackoverflow.com/a/1824228/751089
                try {
                    delete window[exeCallbackName];
                } catch (e) {
                    window[exeCallbackName] = null;
                }
            };

        getScript.removeScript =  function (scriptId) {
                var script = document.getElementById(scriptId);
                script&& document.getElementsByTagName('head')[0].removeChild(script);
            };

        timeoutId = setTimeout(function () {
            getScript.clearFunction(exeCallbackName);
            getScript.removeScript(id);
            reject(new Error('JSONP request timed out'));
        }, timeout);
    })
};

/*

 使用方式
 getJSToken().then(
 ({jsToken，jsResult})=>{},
 (failMsg)=>alert(failMsg)
 )

 return {
 jsToken: jsToken是获取js文件时得到的那个verrifyNo,
 jsResult: js文件运行后的返回
 }
 * */
const getJSToken = function () {
    let host = window.riskPatch;
    return mzoneFetch(api.jsQuery)
        .then(function (res) {
            if (res.resultCode === '1000') {
                return getScript(host + res.data.fileName, "antiCheat").then(returnVal=> {
                    return {
                        jsToken: res.data.verifyNo,
                        jsResult: returnVal
                    }
                })
            }
            else {
                return Promise.reject(res.resultMsg)
            }
        })
}

/**
 * jsonp 方法扩展 FetchJsonp(url, data, option).then(function(res){console.log(res)})
 * @param url api url
 * @param data 传入扩展数据
 * @param option 原生fetch option
 * callback 与 jsonpCallbackFunction 需要自定义必须一致，因为加签需要匹配
 */
const FetchJsonp = function (url, paramsObj = {}, option = {}) {
    //cacheParams为缓存参数对象，取缓存或保存缓存使用，使用assign防止污染
    let cacheParams = Object.assign({}, paramsObj),
        cachePromise = getCacheSuccess(url, cacheParams, option);
    //取缓存成功后返回
    if (cachePromise) {
        return cachePromise;
    }

    paramsObj = Object.assign({
        callback: 'wanlitong_jsonp',
        ...paramsObj
    });
    option = Object.assign({
        jsonpCallbackFunction: 'wanlitong_jsonp',
        ...option
    });
    //是否有缓存数据
    let paramsKey = Object.assign({}, paramsObj);

    let requestData,
        userDataUrl = '',
        key;

    let baseData = {
        authType: 'SHA1_1',
        coordinate: '168.49679,28.82855',
        custString: '1.36',
        machineNo: '864375028810514',
        msgVersion: '3.6.1',
        platform: 'ios',
        reqAppId: 'ios_app_wanlitong',
        reqTime: new Date().getTime(),
        callback: paramsKey.callback ? paramsKey.callback : 'wanlitong_jsonp'
    };
    requestData = Extends(paramsObj, baseData)

    /*requestData = Extends(requestData, {
        sign: Sign(requestData)
    })*/

    if (paramsObj.callback) {
        delete requestData['callback']
    }

    for (key in requestData) {
        userDataUrl += '&' + key + '=' + requestData[key]
    }

    userDataUrl = url + '?' + userDataUrl.slice(1);
    //token失效提示文案
    let msg = {
        '9010': '会话标识不合法',
        '9011': '会话过期，请重新登录',
        '9012': '用户重新登录',
        '9013': '尊敬的用户，您本次登录地区与上次登录非同一区域，为了您的账号安全，请重新登录',
    };
    return fetch(userDataUrl, option)
        .then(res => res.json())
        .then(json => {
            if (json && json.head && ['9010', '9011', '9012', '9013'].indexOf(json.head.rspCode) != -1) {
                //重新登录
                Popup(msg[json.head.rspCode]);
                setTimeout(function () {
                    login.isDeviceVersion();

                }, 2000);

                throw new Error(ACCOUNTINVALID);
            }
            //数据返回的状态码正确进行缓存
            if (json && json.body && json.body.statusCode == '0000') {
                saveResponse(url, cacheParams, json, option.cache, option.cacheTime);
            }
            return json;
        });

}

/**
 * 获取登录token并且保存起来
 * @param {String} token [token]
 */

const SaveToken = function (token) {
    if (token) {
        let _token = {
            token: token
        };
        window.sessionStorage.setItem('wlt.user', JSON.stringify(_token));
    }
}

/**
 * 检查是否存在壹钱包native方法
 * @param {function} 成功回调
 * @param {function} 失败回调
 */

const NativeInjectReady = function (successCallback, failCallback) {
    let t = 0,
        timeout = 1000 * 30,
        intervalId = setInterval(function () {
            if (typeof window.YiQianBao !== 'undefined') {
                typeof successCallback !== 'undefined' && successCallback();
                window.clearInterval(intervalId);
            } else if (t >= timeout) {
                typeof failCallback !== 'undefined' && failCallback();
                window.clearInterval(intervalId);
            } else {
                t += 100;
            }
        }, 100);
}

/**
 * 壹钱包头部配置方法简版
 * @param title {string} 标题
 * @param btn {string} 按钮文案
 * @param btnevent {string} 按钮事件
 * @param isexist {boolean} 是否需要检测window.YiQianBao存在
 */

const NativeHeaderConfig = function (title, btn, btnevent, isexist) {
    let Header = {
        "title": {
            "type": "TitleNormal",
            "value": title,
            "widthClassName": "rb0rt1"
        },
        "right": [
            {
                "type": "OnlyTitle",
                "txtValue": btn,
                "onClickCallBackEval": btnevent
            }
        ]
    }
    if (isexist) {
        let n = 0;
        const timer = setInterval(()=> {
            n++;
            if (n == 1000) {
                clearInterval(timer);
            }
            if (window.YiQianBao != undefined) {
                document.title = title;
                window.YiQianBao.UniversalJSFunction('getNavigationConfig', JSON.stringify(Header));
                clearInterval(timer);
            }
        }, 1)
    } else {
        document.title = title;
        window.YiQianBao.UniversalJSFunction('getNavigationConfig', JSON.stringify(Header));
    }
};

const getYQBNativeVersion = function () {
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
};

const type = function (v) {
    return Object.prototype.toString.call(v);
};

const isObject = function (v) {
    return !!v && type(v) === '[object Object]';
};

const isNumber = function (v) {
    return typeof v === 'number';
};

const isBoolean = function (v) {
    return typeof v === 'boolean';
};

const isDate = function (v) {
    return type(v) === '[object Date]';
};

const isString = function (v) {
    return typeof v === 'string';
};

const isArray = function (v) {
    return type(v) === '[object Array]';
};
const isFunction = function (v) {
    return type(v) === '[object Function]';
};


const forEach = function (obj, iterator, context) {
    var key, length;
    if (obj) {
        if (isFunction(obj)) {
            for (key in obj) {
                if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (isArray(obj) && obj.length) {
            var isPrimitive = typeof obj !== 'object';
            for (key = 0, length = obj.length; key < length; key++) {
                if (isPrimitive || key in obj) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (obj.forEach && obj.forEach !== forEach) {
            obj.forEach(iterator, context, obj);
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        }
    }
    return obj;
}

const isLoginWLT = function () {
    let URL_CALLBACK = encodeURIComponent(window.location.href + '&success=y'),
        URL_LOGIN = '/wap/login/login_otp.shtml' + '?yztHidden=1&callback=' + URL_CALLBACK,
        version = parseFloat(getYQBNativeVersion().version) || 4.1,
        loadUrl = encodeURIComponent(location.origin + location.pathname + location.hash);
    if (version < 4.2) {
        location.href = URL_LOGIN;
    } else {
        location.href = 'ewap://1qianbao/loginactivity/wltSSOneedLogin?loadURL=' + loadUrl;
    }
}

/*
 * decimalFormat 格式化金额保留小数 1,000.00
 * @param {Number} number 金额
 * @param {Number} len 小数位数
 * */
const decimalFormat = function (number = 0, len = 0) {
    number = parseFloat(number).toFixed(len);
    let int = parseInt(number).toString(), //整数
        decimal = number.replace(/^(\d+)/, ''); //小数
    return int.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,') + decimal;
};

const formatDate = function (date, format) {
    var self = date;
    return format.replace(/([a-z]+)/ig, function (a, b, c, d) {
        if (/Y{2,4}/.test(b)) {
            return b.length === 4 ? self.getFullYear() : ('' + self.getFullYear()).substr(2);
        } else if (/M{2}/.test(b)) {
            return (self.getMonth() + 1) < 10 ? '0' + (self.getMonth() + 1) : self.getMonth() + 1;
        } else if (/D{2}/.test(b)) {
            return (self.getDate()) < 10 ? '0' + self.getDate() : self.getDate();
        } else if (/h{2}/.test(b)) {
            return self.getHours() < 10 ? '0' + self.getHours() : self.getHours();
        } else if (/m{2}/.test(b)) {
            return self.getMinutes() < 10 ? '0' + self.getMinutes() : self.getMinutes();
        } else if (/s{2}/.test(b)) {
            return self.getSeconds() < 10 ? '0' + self.getSeconds() : self.getSeconds();
        } else {
            return 0;
        }
    })
};


/*
 * 根据url和params获取缓存key值
 * @param {String} url 地址
 * @param {Object} params 参数对象
 * return {String}
 * */
const getUrlKey = function (url, params) {
    let subUrl = url.match(/^https?:\/\/(\w+)[^/]*\/([\d\D]*)/),
        paramsStr = '';
    for (var key in params) {
        if (paramsStr == '') {
            paramsStr += '?';
        }
        else {
            paramsStr += '&';
        }
        paramsStr += key + '=' + params[key];
    }
    return (subUrl && subUrl[1] && (subUrl[1] + '/' + subUrl[2]) || url) + paramsStr;
}
/*
 * 根据 url/请求参数 2个条件 保存数据
 * @param {String} url url地址
 * @param {Object} params 请求参数
 * @param {Object} value 要缓存的数据
 * @param {String} cacheType 缓存类型，默认session缓存
 * @param {Number} cacheTime 缓存时间设置， 默认 1天 单位ms
 * @return {undefined}
 * */
const saveResponse = (url, params, value, cacheType = cacheTypes.SESSION, cacheTime = 86400000) => {
    let key = getUrlKey(url, params),
        cacheObj = sessionCache;
    //获取缓存接口对象
    if (cacheType === cacheTypes.LOCAL) {
        cacheObj = localCache;
    }
    cacheObj.put(key, value, cacheTime);
}
/*
 * 根据 url/请求参数 2个条件 获取缓存数据
 * @param {String} url url地址
 * @param {Object} params 请求参数
 * @param {String/Boolean} cacheType true代表直接取缓存，cacheTypes值代表 缓存类型
 * @return {[JSON]}
 * */
const getResponse = (url, params, cacheType) => {
    let historyEvent = getHistoryEvent();
    //当前页面是回退页,且 回退时间在300ms内取缓存数据
    let current = Date.now();
    if (historyEvent.isPOP && current - historyEvent.createTime < 300 || cacheType) {
        let cacheObj = sessionCache;
        //获取缓存接口对象
        if (cacheType === cacheTypes.LOCAL) {
            cacheObj = localCache;
        }
        let key = getUrlKey(url, params);
        return cacheObj.get(key);
    }
}

/**
 * 获取设备系统和浏览器类型
 *@return {Object} device设备系统、browser浏览器类型
 */
const getDeviceBrowser = function () {
    let ua = window.navigator.userAgent;
    //设备系统
    let device = {
        ios: false,
        android: false
    };

    //浏览器
    let browser = {
        wx: false, //微信
        qq: false, //qq
        uc: false, //uc浏览器
        safari: false, //safari浏览器
        chrome: false //chrome浏览器
    };

    //判断设备系统
    if (/mac/i.test(ua)) device.ios = true;
    if (/android/i.test(ua)) device.android = true;

    //判断浏览器
    if (/safari/i.test(ua) && !/mqqbrowser/i.test(ua)) browser.safari = true;
    if (/chrome/i.test(ua) && !/mqqbrowser/i.test(ua)) browser.chrome = true;
    if (/ucbrowser/i.test(ua)) browser.uc = true;
    if (/micromessenger/i.test(ua)) browser.wx = true;
    if (/mqqbrowser|qq/i.test(ua)) browser.qq = true;

    return {
        device: device,
        browser: browser
    }
};


const getDeviceId = function () {

    let ua = window.navigator.userAgent;

    // 判断设备系统
    if (/iPhone/i.test(ua)) return 'iphone';
    if (/android/i.test(ua)) return 'android';

    return 'pc';
};


/*
 * 获取URL参数
 * @param {String} key
 * @return {String}
 **/
const queryParam = function (key) {
    let url = location.href;
    url = url.substr(url.indexOf('?') + 1);
    let array = url.split('&');
    let param = {};
    for (let i = 0, len = array.length; i < len; i++) {
        let split = array[i].split('=');
        param[split[0]] = split[1];
    }
    return param[key] || '';

};
/**
 * [url解析]
 * @param  {[string]} url [decodeURIComponent,]
 * @return {[type]}     [description]
 */
const parseURL = function (url) {
    if (url.substr(0,4) !== 'http') url = 'http://'+url;
    let a = document.createElement('a');
    a.href = decodeURIComponent(url);
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
                let ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i <len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

const queryWhiteList = function (url, whiteList) {
    let host = parseURL(url).host;
    let len = whiteList.length;
    for(let i = 0; i < len; i++) {
        if (!whiteList[i]) return false;
        if (host === whiteList[i]) {
            return true;
        } else {
            return false;
        }
    }

}
/**
 * [安全域名检查，判断壹钱包域/万里通域，仅匹配.com 一级域名]
 * @param  {[Array]} url           [需要过滤的url]
 * @param  {[Array]} domainList    [信任域名白名单,可不传取默认值]
 * @param  {[Array]} YQBDomainList [壹钱包域名清单,可不传取默认值]
 * @param  {[Array]} WLTDomainList [万里通域名清单,可不传取默认值]
 * @return {[object]}     url是否信任  域名类型
 */
const checkSecurityDomain = function (url, domainList,YQBDomainList, WLTDomainList) {

    if (!url) return{ isSecurity:false }

    let isSecurity = false,
        domainMode = null,
        host = parseURL(url).host,
        _domainList = domainList || ['yqb','1qianbao','wanlitong'],
        _YQBDomainList = YQBDomainList || ['yqb','1qianbao'],
        _WLTDomainList = WLTDomainList || ['wanlitong'];

    //安全域名匹配
    if (host.match(new RegExp('\.('+ _domainList.join('|') +')\.com$'))) isSecurity = true;

    //域名类型匹配
    if (host.match(new RegExp('\.('+ _YQBDomainList.join('|') +')\.com$'))) domainMode = 'yqb';
    if (host.match(new RegExp('\.('+ _WLTDomainList.join('|') +')\.com$'))) domainMode = 'wlt';

    return{
        isSecurity: isSecurity,   //是否信任 true, false
        domainMode: domainMode    //域名类型 'yqb','wlt'
    }
}


/*
 * 获取历史记录事件
 * @return {Object} 事件对象
 * */
const getHistoryEvent = ()=> {
    return memoryCache.get('_historyEvent') || {};
}


export function getLoginDataFromCache(state){
    //data  sessionCache.get(SESSION_KEY_LOGIN_DATA)
    return {
        getToken(){
            return localCache.get(SESSION_KEY_MZONE_SESSION_ID);
        },
        isLogin(){
            // return this.data&&this.data.userName;
            var sess_id=  this.getToken();
            return sess_id!=null;
        },
        getUserInfo(){
            return sessionCache.get(SESSION_KEY_LOGIN_DATA);
        }
    }
}
/*一个通用的检测IE版本的函数了：*/
export function isIE(ver){
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}
/*
* Detect touch screen
* works on most browsers
* works on IE10/11 and Surface
* */
export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

/**
 * 判断需不需要绑定
 * @param params  入参格式： {"wltToken":`${wltToken}`};
 * @param url : 跳转完绑定页面的会跳地址
 * @returns {Promise.<TResult>}
 */
export function isBinded(params, url){
    let reqUrl = api.getBindOption;
    let bindRedirect = `${window.location.protocol}//${window.location.host}/account/#/bind?returnUrl=${url}&wltToken=${params.wltToken}`;
    let loginRedirect = `${window.location.protocol}//${window.location.host}/account/#/login?returnUrl=${url}`;
    return mzoneFetch(addTokenUrl(reqUrl), params, {method: 'post'}).then((res)=> {
        if (res.resultCode == Enum.API_SUCCESS_CODE) {

            //if(!res.data.token) window.location.replace(`${url}`);
            // 需要调绑定页面
            if(res.data.token){
                // /account/#/login
                window.location.href = bindRedirect;
            }else{
                // TODO: 调取换mzone token
                mzoneFetch(api.exchangeMzoneToken, {'wltToken': `${params.wltToken}`}).then((res)=>{

                    // mzone
                }, (error)=>{

                })

            }

        } else {

            // 接口失败， 跳转登录页面
            window.location.href = loginRedirect;
        }
    }, (error)=>{

        // 接口错误， 跳转登录页面
        window.location.href = loginRedirect;

    });
}
/**
 * 使用m的方式调用接口 （传入token当参数给后台）
 * @param url
 * @returns {*}
 */
export function addTokenUrl(url){
    var m = localCache.get(Enum.SESSION_KEY_MZONE_SESSION_ID);
    if(m){
        return url + '?m=' + m;
    }
    else{
        return url;
    }
    return url;
}

/**
 * 从local cache 拿wltToken
 * @returns {string}
 */
export function getWlTtoken(){
    let token = localStorage.getItem('wlt.user') && JSON.parse(localStorage.getItem('wlt.user')).token ? JSON.parse(localStorage.getItem('wlt.user')).token : '';
    return token;
}

export default {
    Track,
    Fetch,
    FetchJsonp,
    mzoneFetch,
    getDeviceId,
    Extends,
    Check_Token,
    SaveToken,
    NativeInjectReady,
    NativeHeaderConfig,
    getYQBNativeVersion,
    forEach,
    isArray,
    isBoolean,
    isDate,
    isFunction,
    isNumber,
    isObject,
    isString,
    formatDate,
    decimalFormat,
    getDeviceBrowser,
    isLoginWLT,
    queryParam,
    getScript,
    getJSToken,
    parseURL,
    checkSecurityDomain,
    queryWhiteList,
    getHistoryEvent,
    isBinded,
    addTokenUrl,
    getWlTtoken
};
