var createHashHistory =  require('history/lib/createHashHistory');
import { useRouterHistory } from 'react-router'

/*
* 设置hashHistory的配置
* @param {String} queryKey hash键名
* @param {String} dirname 文件空间名
* @return {Function}
* */
export default function (queryKey='', dirname='') {
  return useRouterHistory(createHashHistory)({ queryKey: queryKey,basename:dirname})
}
