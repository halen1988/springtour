/*
* pub/sub工具
* */
let eventCounter = 0;
const pubSub = {
    _events:{},
    /*
     * 根据name 绑定事件
     * @param {String} name 事件名称
     * @param {Function} callback 事件回调
     * @param {Boolean} forever 是否永久,永久不可删除
     * @return {Object}
     * */
    on: function(name, callback, forever){
        if(name){
            if(!this._events[name]){
                this._events[name] = [];
            }
            if(!callback)return;
            this._events[name].push({
                name: name,
                callback: callback,
                counter:++eventCounter,
                forever: !!forever
            });
        }
        return this;
    },
    /*
     * 根据name 触发事件
     * @param {String} name 事件名称
     * @return {undefined}
     * */
    trigger: function(name){
        var eventers = this._events[name] || [],
            eventer,
            callback,
            ret;
        var length = eventers.length;
        while(length--){
            eventer = eventers[length];
            callback = eventer.callback;
            if(callback){
                ret = callback.apply(this, Array.prototype.slice.call(arguments, 1));
                if(ret === true){
                    return ret;
                }
            }
        }
    },
    /*
     * 根据name 销毁事件绑定
     * @param {String} name 事件名称
     * @param {[Function]} callback 事件回调
     * @return {Object}
     * */
    off: function(name, callback){
        if(name){
            var eventers = this._events[name],
                eventer,
                eventCallback;
            if(eventers){
                var length = eventers.length;
                while(length--){
                    eventer = eventers[length];
                    eventCallback = eventer.callback;
                    if((callback === eventCallback || !callback) && !eventer.forever){
                        this._events[name] = eventers = eventers.slice(0, length).concat(eventers.slice(length+1));
                    }
                }
            }
        }
        else{
            for(var name in this._events){
                this.off(name);
            }
        }
        return this;
    }
}
export default pubSub;
