/*
* author: 马卫
* 数据模拟器
* */

import utils from "./utils";

//开启模拟器
simulation.on = false;

/*
 * 模拟器
 * */
function simulation(success, fail, callback){
    var callback;
    if(!callback){
        callback = fail;
        fail = undefined;
    }
    /*if(simulation.on){
        return [callback, callback]
    }
    else{
        return [success, fail];
    }*/
    return success;
}

/*var then = window.Promise.prototype.then;
Promise.prototype.then = function () {
    if(utils.isArray(arguments[0])){
        then.apply(this, arguments[0]);
    }
    else{
        then.apply(this, Array.prototype.slice.apply(arguments));
    }
    return this;
}*/

export default simulation;



