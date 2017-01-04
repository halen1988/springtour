/**
 * Created by: 史元君
 Desc: styleMode 有2个值
 white：黑字 默认白底
 reverse ：白字 默认黑底
 */
//公共模块
import React, {Component, PropTypes} from 'react';
import "../../styles/less/pcBaseComp/simpleFooter.less";

class SimpleFooter extends Component {

    static propTypes = {};
    static defaultProps = {
        styleMode:"",
        style:{}
    };

    static styleMode="";
    static styleObj={};

    constructor(props) {
        super(props);
    }

    /*这是用来在router中预设样式的入口 如果有更好的方法请指正*/
    static setStyle(styleMode,styleObj){
        SimpleFooter.styleMode = styleMode||"";
        SimpleFooter.styleObj = styleObj||{};
    }

    render() {
        let {styleMode,style,...others} = this.props;
        let mode  = styleMode?styleMode:SimpleFooter.styleMode?SimpleFooter.styleMode:"white";
        let newstyle = Object.assign({},style,SimpleFooter.styleObj) ;
        SimpleFooter.styleObj = {};
        SimpleFooter.styleMode = "";

        return (
            <div className={`simple-footer border-handle ${mode}`} {...others} style={newstyle}>
                <div className="line"></div>
                <div className="sf-content-wrapper">
                    <ul className="left">
                        <li className="logo"></li>
                        <li><span>Copyright©2013-2016 壹钱包版权所有 粤ICP备11100138号-5</span></li>
                    </ul>
                    <ul className="right">
                        <li><a target="_blank" href="http://www.1qianbao.com/aboutus">关于我们</a></li>
                        <li style={{display: "none" }}><a href="javascript:;">加入我们</a></li>
                        <li><a target="_blank" href="http://www.1qianbao.com/helpcenter/question">帮助中心</a></li>
                        <li><a target="_blank" href="http://www.1qianbao.com/consumer/questionnaireSurvey/qnspreload ">意见反馈</a></li>
                        <li><a target="_blank" href="https://www.1qianbao.com/yqb">下载客户端</a></li>

                        <li><a href="javascript:;" className="wechat">
                            <div className="borderBG">
                                <div className="QR wechatQR"></div>
                            </div>
                        </a></li>
                        <li><a href="javascript:;" className="sina">
                            <div className="borderBG">
                                <div className="QR sinaQR"></div>
                            </div>
                        </a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SimpleFooter;