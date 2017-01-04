/**
 * 判断浏览器是否支持某一个CSS3属性
 * author: 马卫
 * @param {String} 属性名称
 * @return {Boolean} true/false
 */
function supportCss(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };
    for (i in prefix){
        humpString.push(_toHumb(prefix[i] + '-' + style));
    }
    humpString.push(_toHumb(style));

    //对不同的prefix进行循环判断是否支持
    for (i in humpString){
        if (humpString[i] in htmlStyle) return true;
    }

    return false;
}

export default supportCss;