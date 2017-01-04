/**
 * Created by: 史元君
 Desc:
 */

import screenResize from "../actions/ScreenResizeAction"

export default (dispatch)=> {

    let large = 1270, normal = 950;

    let timer = null;

    const setRootCls = ()=> {
        // console.log(window.innerWidth, document.documentElement.clientWidth);
        let currentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let currentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let append = null;
        if (currentWidth >= large) {
            append = "w" + large;
        } else if(currentWidth<large&&normal<=currentWidth)  {
            append = "w" + normal;
        }else{
            append = "w" + normal+" lt"+normal
        }

        document.body.className= append ;
        dispatch(screenResize({height:currentHeight,width:currentWidth}))
        // document.body.style=`min-height:${currentHeight}px;height:${currentHeight}px`
        // document.body.style.height= currentHeight+"px" ;
    }
    setRootCls();

    window.onresize = ()=> {

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(setRootCls, 100);
    }

};