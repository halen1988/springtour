/**
 * Created by: 史元君
 Desc:面包屑 用于底部导航
 */
//公共模块
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
//获取state
import {getRoutePath} from "../../reducers/routePathReducer";
//css
import "../../styles/less/pcBaseComp/breadcrumbs.less";

class Breadcrumbs extends Component {

    static propTypes = {};
    static defaultProps = {
        root: `/`,
        rootName: "壹钱包",
        fullPath: `${window.location.pathname}`,
        pathName: "|pathName Prop|"
    };

    constructor(props) {
        super(props);
    }

    getPrepend = ()=> {
        return [<li key="root-bc"><a href={this.props.root} className="indexLogo"></a></li>
            , <li className="seperate" key="line--0"></li>
            , <li key="path-bc"><a href={this.props.fullPath}>{this.props.pathName}</a></li>
        ]
    };

    render() {
        let {routePath}=this.props;
        let lastIndex = routePath.length - 1;
        return (
            <div className="breadcrumbs">
                <ul className="breadcrumbs-wrapper">
                    {
                        routePath.reduce((result, route, index)=> {
                            //第一个应该被舍弃一般都是 / 这个是被 props中的pathName和fullPath所定义
                            if(index == routePath.length - 1){
                                //最后一个直接用当前地址   先这么做绕过 （／：product）参数问题 之后找办法
                                result.push(<li className="seperate" key={`line-${index}`}></li>);
                                result.push(<li key={route.path}><a href={window.location.href}>{route.name}</a></li>);
                            }else if (index != 0) {
                                result.push(<li className="seperate" key={`line-${index}`}></li>);
                                result.push(<li key={route.path}><a href={this.props.fullPath+"#"+route.path}>{route.name}</a></li>);
                            }
                            return result;
                        }, this.getPrepend())
                    }
                </ul>
            </div>
        )
    }
}

let mapStateToProps = (state)=> {
    return {
        routePath: getRoutePath(state)
    }
}
let mapDispatchToProps = (dispatch)=> {
    return {};
}
/*
 * 通过调用mapStateToProps mapDispatchToProps回调的配置,分别绑定到Page组件
 * */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Breadcrumbs)






