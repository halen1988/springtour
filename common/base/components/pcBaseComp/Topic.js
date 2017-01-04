/**
 *author zhiyong
 *date  16/10/9
 * 使用此组件,请勿在500毫秒内连续触发两次,因为此组件使用了,异步改变state的方法,来达到淡进淡出效果.连续触发,会有意想不到的错误发生
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {getChangeTopic} from '../../reducers/topicReducer';
import '../../styles/less/pcBaseComp/topic.less';

class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgTopic1: {
                opacity: 0,
            },
            bgTopic2: {opacity: 0}
        }
    }

    componentWillReceiveProps(nextProps) {
        var changeSelf = nextProps.topicData.change;
        if (nextProps.topicData.change) {
            if (this.state.bgTopic1.opacity == 0) {
                const self = this;
                nextProps.topicData.change.opacity = 1
                this.setState({
                    bgTopic1: nextProps.topicData.change,
                    bgTopic2: Object.assign({}, this.state.bgTopic2, {opacity: 0})
                })

                setTimeout(function () {
                    self.setState({
                        bgTopic2: {opacity: 0}
                    })
                }, 500)
            } else if (this.state.bgTopic2.opacity == 0) {
                const self = this;
                nextProps.topicData.change.opacity = 1
                this.setState({
                    bgTopic1: Object.assign({}, this.state.bgTopic1, {opacity: 0}),
                    bgTopic2: nextProps.topicData.change,
                })
                setTimeout(function () {
                    self.setState({
                        bgTopic1: {opacity: 0},
                    })
                }, 500)
            }
        }
    }

    componentWillUnmount() {
        this.setState({
                bgTopic1: {
                    opacity: 0,
                },
                bgTopic2: {opacity: 0}
            }
        )
    }

    render() {
        return (
            <div className="topic"
                 data-datas={(this.props.topicData && this.props.topicData.topicBackground)}>
                {this.state.bgTopic1 && <div className="bg-topic" ref="bgTopic1" style={this.state.bgTopic1}></div>}
                {this.state.bgTopic2 && <div className="bg-topic" ref="bgTopic2" style={this.state.bgTopic2}></div>}
            </div>
        )
    }
}
Topic.defaultProps = {
    topicData: {
        topicBackground: '',
    }
};

/*
 * state数据映射后转换成组件属性
 * */
function

mapStateToProps(state) {
    return {
        topicData: getChangeTopic(state),
    }
}

export
default

connect(mapStateToProps)

(
    Topic
)
;