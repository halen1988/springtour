
/*
 *
 * 设置/获取/清除 cookie，因安全和性能问题 严禁使用，除非有必要
 *
 *设置
 * cookie('name', 'tobi')
 *  cookie('name', 'tobi', { path: '/' })
 *  cookie('name', 'tobi', { maxage: 60000 }) // in milliseconds
 *  cookie('species', 'ferret')
 *  获取单个名称的值
 *  var name = cookie('name')
 *  获取所有cookies
 * var cookies = cookie()
 *  清除
 * cookie('name', null)
* */

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
    options = options || {};
    var str = encode(name) + '=' + encode(value);

    if (null == value) options.maxage = -1;

    if (options.maxage) {
        options.expires = new Date(+new Date + options.maxage);
    }

    if (options.path) str += '; path=' + options.path;
    if (options.domain) str += '; domain=' + options.domain;
    if (options.expires) str += '; expires=' + options.expires.toUTCString();
    if (options.secure) str += '; secure';

    document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
    var str;
    try {
        str = document.cookie;
    } catch (err) {
        if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error(err.stack || err);
        }
        return {};
    }
    return parse(str);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
    return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
    var obj = {};
    var pairs = str.split(/ *; */);
    var pair;
    if ('' == pairs[0]) return obj;
    for (var i = 0; i < pairs.length; ++i) {
        pair = pairs[i].split('=');
        obj[decode(pair[0])] = decode(pair[1]);
    }
    return obj;
}

/**
 * Encode.
 */

function encode(value){
    try {
        return encodeURIComponent(value);
    } catch (e) {
        console.log('error `encode(%o)` - %o', value, e)
    }
}

/**
 * Decode.
 */

function decode(value) {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        console.log('error `decode(%o)` - %o', value, e)
    }
}

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */
function cookie(name, value, options){
    switch (arguments.length) {
        case 3:
        case 2:
            return set(name, value, options);
        case 1:
            return get(name);
        default:
            return all();
    }
};

export default cookie;