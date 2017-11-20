import React, {PureComponent} from 'react';
// import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd';
import Mock from 'mockjs';
import {Map,is} from 'immutable'
import "babel-polyfill";
import 'whatwg-fetch';
// import '../asset/css/style.scss';


class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount() {}

	componentDidMount() {}

	shouldComponentUpdate(nextProps, nextState) {
        const prevProps = Map(this.props);
        const nextProps2 = Map(nextProps);
        return !is(prevProps,nextProps2);
    }
    render() {
        return (
	        <div>
	        	<div style={{marginBottom:'10px'}}>
	        		<Menu mode="horizontal">
		        		<Menu.Item key="index"><Link to="/">index</Link></Menu.Item>
		        		<Menu.Item key="home"><Link to="/home">Home</Link></Menu.Item>
		        		<Menu.Item key="data"><Link to="/data">Data</Link></Menu.Item>
		        	</Menu>
	        	</div>
	        	
	        	{this.props.children}
	        </div>
        )
    }
}
export default App;




