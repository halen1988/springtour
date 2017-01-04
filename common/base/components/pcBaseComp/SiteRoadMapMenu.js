/**
 * Created by: 史元君
 Desc:站点的导航
 */
//公共模块
import React, {Component, PropTypes} from 'react';
//css
import "../../styles/less/pcBaseComp/siteRoadMapMenu.less";

let topMenuData  =[
    {category:"购物"
        ,link:""
        ,tip:"hot"
        ,lists:[[{title:"家居百货",link:"http://www.baidu.com", tip:"new"}
        ,{title:"日用／家纺",link:"", tip:"new"}
        ,{title:"厨具／餐具",link:""}
        ,{title:"洗晒／收纳",link:""}
        ,{title:"美容护肤",link:""}
        ,{title:"礼品箱包",link:""}
    ] ,
        [
            {title:"数码家电",link:"" ,tip:"hot"}
            ,{title:"生活电器",link:"" ,tip:"hot"}
            ,{title:"厨房电器",link:"" ,tip:"hot"}
            ,{title:"个护健康",link:"" ,tip:"hot"}
            ,{title:"数码影音",link:"" ,tip:"hot"}
        ] ,
        [
            {title:"汽车用品",link:""}
            ,{title:"汽车装饰",link:""}
            ,{title:"汽车配件",link:""}
            ,{title:"车载智能",link:""}
            ,{title:"救援／拖车",link:""}
        ] ,
        [
            {title:"运动户外",link:""}
            ,{title:"户外用品",link:"",tip:"new"}
            ,{title:"运动保健",link:""}
        ] ,
        [{title:"饮食健康",link:""}
            ,{title:"酒水饮料",link:""}
            ,{title:"保健食品",link:""}
            ,{title:"生鲜粮油",link:""}
        ]]
    }
    ,{category:"理财",
        link:"",
        lists:[{title:"定期理财",link:""}
            ,{title:"活期",link:""}
            ,{title:"任性理财",link:"",tip:"new"}
            ,{title:"积分金融",link:""}
        ]}
    ,{category:"生活",   tip:"new",
        link:"",
        lists:[
            {title:"话费充值",link:""}
            ,{title:"油卡充值",link:""}
            ,{title:"信用卡还款",link:""}
            ,{title:"转账",link:""}
            ,{title:"电影票",link:""}
            ,{title:"彩票",link:""}
            ,{title:"店面兑换",link:""}
        ]}
    ,{category:"积分",link:"",
        lists:[{title:"积分充值",link:""}
            ,{title:"积分换入",link:""}
            ,{title:"积分换出",link:""}
            ,{title:"积分互通",link:""}
        ]}

    /*  ,{category:"娱乐",link:"",
     lists:[
     {title:"疯狂扑克",link:"" ,tip:"new"}
     ,{title:"疯狂斗地主",link:"",tip:"new"}
     ,{title:"疯狂猜大小",link:"",tip:"new"}
     ,{title:"更多游戏",link:"",tip:"new"}
     ,{title:"充值中心",link:"",tip:"new"}
     ]}*/
];

class  SiteRoadMapMenu extends Component {

    static propTypes = {};
    static defaultProps = {
        data:topMenuData,
        className:""
    };

    onClick(e){
        if(e.target.localName!="div"){
            this.props.itemClick&&this.props.itemClick();
        }
    }

    renderSectionList(list,sectionIndex, isSubCate){
        return (
            <ul className={isSubCate?"items subcate":"items"} key={`section-${sectionIndex}`}>
                {
                    list.map((item,index)=> {
                        let {tip,clzName}=this.renderTip(item);
                        return  <li key={`${item.title}-${index}`}><a href={item.link?item.link:"javascript:;"} className={clzName}>{item.title}{tip}</a></li>
                    })
                }
            </ul>
        );
    }

    renderTip(item){
        return item.tip?{tip:<i className={ ["tips",item.tip].join(" ")}></i>,clzName:"tipContainer"}:{tip:null,clzName:null};
    }

    render() {
        let contentAnimateStyle = this.props.contentAnimateStyle;
        return (
            <div className={`siteRoadmap ${this.props.className}`} onClick={this.onClick.bind(this)}>
                <div className="siteRoadmap-navi" style={contentAnimateStyle} >
                    {
                        this.props.data.map((cate,index)=>{
                            let lists =[];
                            if(cate.lists[0] instanceof Array){
                                lists=  cate.lists.map((list,sectionIndex)=> {
                                    return this.renderSectionList(list,index+"-"+sectionIndex,true)
                                });
                            }else{
                                lists = this.renderSectionList(cate.lists,index);
                            }

                            let {tip,clzName}=this.renderTip(cate);
                            let clzname=index==0?"section-first-of-type":"";
                            return (
                                <div className={ `section ${clzname}`} key={ `section${index+cate.category}`}>
                                    <a className={["navi-category","color"+(index+1),clzName].join(" ")} href={cate.link?cate.link:"javascript:void(0)"}>{cate.category}{tip}</a>
                                    <div className="details">
                                        {lists}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default SiteRoadMapMenu;