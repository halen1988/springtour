/*
 * author: 马卫
 * 预取下一个页面资源
 * */
import history, {Actions} from '../history/createHashHistory';
//import routes from '../config/routes'
import createTransitionManager, {match} from '../../node_modules/react-router/lib/createTransitionManager'

//配置 默认为空
let routers = [];
//页面跳转管理器,在setRouters中初始化
let transitionManager;
/*
 * 添加router配置
 * */
function setRouters(router) {
    routers.push(router);
    //初始化页面跳转管理器
    transitionManager = createTransitionManager(history, routers);
}
//空方法
function noop(){}

export default function (router) {
    var location = history.createLocation(router, Actions.PREFETCH, ''),
    //延迟时间,单位ms
        delay = 1000;
    //根据delay值延迟执行, 以保证动态数据返回
    transitionManager && setTimeout(()=>{
        transitionManager.match(location, noop);
    }, delay);
}

export {
    setRouters
};

