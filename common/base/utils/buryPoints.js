/**
 * Created by zhiyong on 12/29/16.
 */
/**
 *
 * @param config {Object}
 */
function commonConfig(data){
    console.log(data);
    var buryConfig = {
        'clickName':'品牌专区-商品位',//大数据来配置
        'cardId': data.pid,//表示正个card
        'cardName': '',//为空
        'goodsId': data.id,//data.id
        'cardUrl':data.linkBean && data.linkBean.pcUrl || data.link && data.link.pcUrl
    };
    commonBury(buryConfig);
}
function commonBury(config) {
    console.log(config)
    var params = new HashMap();
    for (var i in config) {
        if (config[i]) {
            params.put(i, config[i]);
        }
    }
    Agent.customizeEvent(null, params, null);
}
export {commonBury,commonConfig};