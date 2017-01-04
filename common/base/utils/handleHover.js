/**
 * Created by zhiyong on 12/21/16.
 */
import {removeClass} from './element/dom';
function isMovingEnd() {
     let result = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
    return result
}

function handleHover() {
    if(isMovingEnd()){
        document.querySelector('html').className = '';
    }
}

export {isMovingEnd,handleHover};