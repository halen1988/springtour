/**
 * Created by wanglitong on 16/3/16.
 */
/**
 * 加载
 */
import './loading.less';
import React from 'react';


//<Loading className='hide' />

const Loading_msg = function(type) {
    let loading = document.getElementById("loadingPop");
    if(type == 'open') {
        if (loading) {
            loading.style.display = 'block';
        }
        else{
            let _div = document.createElement('div');
            _div.id = 'loadingPop';
            let img = '<img alt="正在努力加载..." src="http://www.wanlitong.com/app_images/wanlitong/v40/wap/life/mobilerecharge/spinn.gif" />';
            _div.innerHTML = img;
            let divPop = document.getElementById("reactInit");
            document.body.insertBefore(_div,divPop);
        }
    }else{
        if (loading) {
            loading.style.display = 'none';
        }
    }
}


export {Loading_msg}