/**
 * Created by luojianzong on 16/9/26.
 */
import React, {Component, PropTypes}  from "react";
import {localCache} from '../utils/cache';
import * as Enum from '../constants/Enum';



export default class BaseComponent extends Component {
    constructor() {
        super();
        this.hashcode = this._hashCode(new Date().getMilliseconds());
    }

    componentWillMount(){
        let wltTokenBase = this.props.location.query.token;
        if(wltTokenBase){
            localCache.put(Enum.SESSION_KEY_WLT_TOKEN,{token:wltTokenBase})
        }
    }

    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }

    _hashCode(str) {
        var h = 0;
        var len = str.length;
        var t = 2147483648;
        for (var i = 0; i < len; i++) {
            h = 31 * h + str.charCodeAt(i);
            if(h > 2147483647) h %= t;
        }
        return h;
    }
}