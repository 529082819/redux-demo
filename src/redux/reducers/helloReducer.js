import { combineReducers } from 'redux';
import { ADD_COUNT, ADD_PERSON, DELETE_PERSON, FETCH_START, FETCH_SUCCESS, FETCH_FAUILE } from '../actions/helloAction.js';

// store中可以定义页面中的初始状态
const initialState = {
    count : 0,      // count = 0
    loaded : '', // 异步请求是否加载
    personList : [  // 人员列表
        {"id": 0, "name" : "lily", "age" : 21}
    ],
};

// count的初始状态以及处理之后返回的state值
function count(state = initialState.count, action) {
    switch (action.type) {
        case ADD_COUNT : 
            return state + 1;
        default : 
            return state;
    }
}

function personList(state = initialState, action) {
    switch (action.type) {
        case ADD_PERSON : 
            return Object.assign({}, ...state, {
                personList : [...state.personList, action.person]
            });
        case DELETE_PERSON :
            return Object.assign({}, ...state, {
                personList : state.personList.filter((s, i) => {
                    return action.idx !== s.id;
                })
            });
        case FETCH_START :
        case FETCH_SUCCESS : 
        case FETCH_FAUILE : 
            return fetchDataFromServer(state, action);
        default : 
            return state;
    }
}

function fetchDataFromServer(state, action) {
    switch (action.type) {
        case FETCH_START : 
        return Object.assign({}, state, {
                loaded : '正在加载数据...'
            });
        case FETCH_SUCCESS : 
             return Object.assign({}, ...state, {
                personList : [...state.personList, ...action.list],
                loaded : '加载完成'
            });
        default :
           return state; 
    }
}

const helloReducers = combineReducers({
    count,
    personList
});

export default helloReducers;