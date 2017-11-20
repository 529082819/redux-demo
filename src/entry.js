import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, IndexRedirect, hashHistory, browserHistory} from 'react-router';
import Store from '../src/redux/stores/helloStore.js';

import App from './app.js'
import IndexPage from '../src/view/Index/index.js'
import DataPage from '../src/view/Data/index.jsx'
import HomePage from '../src/view/Home/index.jsx'


// const Home = React.createClass({
//   render() {
//     return <h3>Home - welcome</h3>
//   }
// })
// const About = React.createClass({
//   render() {
//     return <h3>About</h3>
//   }
// })

ReactDOM.render(
    <Provider store={Store}>
        <Router history={hashHistory}>
            <Route path="/">
                <Route component={App}>
                    <IndexRoute  component={IndexPage} /> 
                    <Route path="home" component={HomePage}  />
                    <Route path="data" component={DataPage} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
);
