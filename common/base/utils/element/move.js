/**
 *author zhiyong
 *date  16/9/28
 * banners 效果中,图片随着鼠标移动而移动
 */
import position from './positon';


/**
 * 计算鼠标相对于中心点偏移量百分比,event是鼠标事件
 * @param {object} target - 父层元素对象
 */
function calcOffsetPercent(target, event) {
    if (target) {
        //获取元素的高度,宽度
        let height = target.clientHeight,
            width = target.clientWidth,
            //获取元素的相对位置
            relativeX = position.getRelativeLeft(target),
            relativeY = position.getRelativeTop(target),
            //获取中心点相对距离
            centerX = width / 2,
            centerY = height / 2,
            //获取鼠距离父层元素的距离
            mouseX = event.clientX - relativeX,
            mouseY = event.clientY - relativeY,
            //获取鼠标位置相对中心点的偏移量
            subX = mouseX - centerX,
            subY = mouseY - centerY;
        return {
            offsetPercentX: subX / centerX,
            offsetPercentY: subY / centerY
        }
    }
}

/**
 * 父层随着鼠标移动变化,event是鼠标事件,元素需要配置data-rotatex,data-rotatey属性
 * @param {object} target - 父层元素对象
 * @param {number} offsetPercentX - x偏移量百分比
 */
function panentLayMove(target, offsetPercentX, offsetPercentY, smooth = `all 0.2s linear`) {
    if (target&&target.style) {
        var maxRotateX = target.getAttribute('data-rotatex') || 0,
            maxRotateY = target.getAttribute('data-rotatey') || 0,
            //计算旋转值
            rotateX = maxRotateY * offsetPercentY,
            rotateY = maxRotateX * offsetPercentX;
        var transformPoster = 'rotateX(' + -rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        target.style.transition = smooth;
        target.style.transform = transformPoster;
    }
}

/**
 * 子层随着鼠标移动变化,event是鼠标事件,元素需要有data-offsetx,data-offsety属性
 */
function childrenLayMove(targets,layer0, offsetPercentX, offsetPercentY, smooth = `all 0.2s linear`) {
    if (targets&&targets[1]&&targets[1].style) {
        layer0.style.opacity = 0.5;
        //类数组对象转换成数组
        if (Array.isArray(targets) == false) {
            targets = Array.from(targets);
        }
        targets.map(function (item, index) {
            if (index > 0) {
                let offsetLayer = item.getAttribute('data-offset') || 0,
                    offsetX = item.getAttribute('data-offsetx'),
                    offsetY = item.getAttribute('data-offsety'),
                    translateX = offsetPercentX * offsetX,
                    translateY = offsetPercentY * offsetY,
                    transformLayer = `translateX(${translateX}px) translateY(${translateY}px)`;
                item.style.transition = smooth;
                item.style.transform = transformLayer;
            }
        });
    }

}
/**
 * 鼠标移出时还原父层
 * @param
 */
function panentLayMoveUndo(target, smooth = `all 0.6s linear`) {
    if (target&&target.style) {
        target.style.transition = smooth;
        target.style.transform = ``;
    }
}
/**
 * 鼠标鼠标移出时,还原子层
 * @param
 */

function childrenLayMoveUndo(targets,layer0, smooth = `all 0.6s linear`) {
    if (targets&&targets[1]&&targets[1].style) {
        //还原背景阴影效果
        layer0.style.opacity = 0;
        //类数组对象转换成数组
        if (Array.isArray(targets) == false) {
            targets = Array.from(targets);
        }
        //复原层
        targets.map(function (item, index) {
            if (index > 0) {
                item.style.transition = smooth;
                item.style.transform = ``;
            }
        });
    }
}
export default {
    calcOffsetPercent,
    panentLayMove,
    childrenLayMove,
    panentLayMoveUndo,
    childrenLayMoveUndo
}