/**
 * 作者：马卫
 * 模态框最基础功能
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './modal-base.less';

class ModalBase extends React.Component {
    constructor(props){
        super();
        this.state = {
        };
    }

    hide(className){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.setState({
                hideClassName: className || 'modal-hide',
                showClassName: ''
            });
        }, 400);
        document.body.style.overflowY = '';

        this.setState({
            contentSlideIn: '',
            contentSlideOut: 'content-slide-out',
            bgSlideIn: '',
            bgSlideOut: 'bg-slide-out'
        });
    }

    show(className){
        clearTimeout(this.timer);
        document.body.style.overflowY = 'hidden';

        this.setState({
            hideClassName: '',
            showClassName: className || 'modal-show'
        });
        this.timer = setTimeout(()=>{
            this.setState({
                contentSlideIn: 'content-slide-in',
                contentSlideOut: '',
                bgSlideIn: 'bg-slide-in',
                bgSlideOut: ''
            });
        }, 10)
    }

    render() {
        let {
                hideClassName,
                showClassName,
                contentSlideIn,
                contentSlideOut,
                bgSlideIn,
                bgSlideOut,
            } = this.state;
        return(
            <div className={"modal-box"
            + (this.props.className ? ' ' + this.props.className : '')
            + (showClassName ? ' ' + showClassName : '')
            + (hideClassName ? ' ' + hideClassName : '')}>
                <div className={"modal-bg"
            + (bgSlideIn ? ' ' + bgSlideIn : '')
            + (bgSlideOut ? ' ' + bgSlideOut : '')}></div>
                <div className={"modal-content"
            + (contentSlideIn ? ' ' + contentSlideIn : '')
            + (contentSlideOut ? ' ' + contentSlideOut : '')} style={{
                    top: (window.screen.availHeight - (this.props.height||320))/2
                }}>
                    {this.props.children}
                </div>
            </div>
        )
    }

}


export default ModalBase;