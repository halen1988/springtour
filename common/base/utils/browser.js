/*
* author: 马卫
* 比较全面的浏览器检查函数
* 使用方法：
*   判断是否IE内核
*   if(browser.versions.trident){ alert("is IE"); }
*   判断是否webKit内核
*   if(browser.versions.webKit){ alert("is webKit"); }
*   判断是否移动端
*   if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }
* */
var browser = {
    versions: function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            //IE内核
            trident: u.indexOf('Trident') > -1,
            //opera内核
            presto: u.indexOf('Presto') > -1,
            //苹果、谷歌内核
            webKit: u.indexOf('AppleWebKit') > -1,
            //火狐内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            //是否为移动终端
            mobile: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1,
            //ios终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            //android终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            //是否为iPhone或者QQHD浏览器
            iPhone: u.indexOf('iPhone') > -1 ,
            //是否iPad
            iPad: u.indexOf('iPad') > -1,
            //是否web应该程序，没有头部与底部
            webApp: u.indexOf('Safari') == -1,
            //是否微信 （2015-01-22新增）
            weixin: u.indexOf('MicroMessenger') > -1,
            //是否QQ
            qq: u.match(/\sQQ/i) == " qq",
            IE8: navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8."
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
export default browser;
