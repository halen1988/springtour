/*
* author:mawei
* 创建history,并为history添加事件监听,
* 可判断当前页面处于返回还是前进
* */
import hashHistoryFactory from './HashHistoryFactory';
import utils from '../utils/utils';
import pubSub from '../utils/pubSub';
import { HISTORY_EVENT_CHANGE } from '../constants/serviceConstant';

const history = hashHistoryFactory();


history.historyEvent = {};
const Actions = {
    //返回
    POP: 'POP',
    //添加url记录
    PUSH: 'PUSH',
    //替换url
    REPLACE: "REPLACE",
    //预取js操作
    PREFETCH: "PREFETCH"
}
let init = true;
/*
 * 添加历史记录，根据 util.getHistoryEvent可获取当前页面 前进/后退 状态
 * */
history.listen(function (event) {
    event = Object.assign({}, event);
    //修复初始化action值为POP的bug，值应为PUSH
    if(init){
        event.action = Actions.PUSH;
    }
    event = Object.assign(event, {
        isPOP: event.action == Actions.POP,
        isPUSH: event.action == Actions.PUSH,
        isREPLACE: event.action == Actions.REPLACE,
        //增加时间戳, localstorage缓存时间
        createTime: Date.now(),
        ...Actions
    });
    init && (init = false);
    history.historyEvent = event;
   // utils.saveHistoryEvent(event);
    //触发事件
    pubSub.trigger(HISTORY_EVENT_CHANGE, event);
})
export default history;
export {Actions};
