/**
 * 加载
 */
import './loading.less';  
import React from 'react';

const Loading = React.createClass({
	render:function(){
		return(
			<div id="loadingDiv" className={this.props.LoadName} >
		        <img alt="正在努力加载..." src="http://www.wanlitong.com/app_images/wanlitong/v40/wap/life/mobilerecharge/spinn.gif" />
		    </div>
		)
	}
})

//<Loading className='hide' />

export default Loading;