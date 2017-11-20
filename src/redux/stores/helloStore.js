import { createStore, applyMiddleware } from 'redux';
import helloReducers from '../reducers/helloReducer';
import thunkMiddleware from 'redux-thunk';

// middleware可以自己定义，例如下面的logger
// 写一个自定义的middleware遵循下面的格式：
const logger = store => next => action => {
    console.log("action", action);
 	next(action);
 	console.log('next state', store.getState())
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);

export default createStoreWithMiddleware(helloReducers);