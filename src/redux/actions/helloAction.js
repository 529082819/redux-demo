//import fetch from 'isomorphic-fetch';
import "babel-polyfill";
import 'whatwg-fetch';


// 纯事件定义
export const ADD_COUNT = 'ADD_COUNT';
export const ADD_PERSON = 'ADD_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';

// async
// 异步的请求定义
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAUILE = 'FETCH_FAUILE';

// pure functions
export function addCount() {
    return {
        type : ADD_COUNT
    }
}

export function addPerson(person) {
    return {
        type : ADD_PERSON,
        person
    }
}

export function deletePerson(idx) {
    return {
        type : DELETE_PERSON,
        idx
    }
}

/** 
  * 异步
**/
export function refreshStart() {
    return {
        type : FETCH_START
    }
}

export function refreshSuccess(list) {
    return {
        type : FETCH_SUCCESS,
        list
    }
} 

export function refreshFauile() {
    return {
        type : FETCH_FAUILE
    }
}

//封装fetch请求
function Fetch(url,type,param){
    return fetch(url,{
        method: type || 'GET',
        body: param && JSON.stringify(param) 
    }).then(response => response.json()).then(data => data)
}

// 定义的非纯函数，提供异步请求支持
// 需要在sotre中使用thunkMiddleware
/** 请求的 async await 方案 **/
export function refresh() {
    return dispatch => {
        dispatch(refreshStart());
        (async () => {
            try {
                // 获取产品数据
                // const responseData = await Fetch('src/mock/fetch-data-mock.json');http:
                const responseData = await Fetch('http://localhost:6001/comment/getList.action');
                setTimeout(() => {
                     dispatch(refreshSuccess(responseData && responseData.list));
                 }, 2000);
            } catch (error) {
                dispatch(refreshFauile());
            }
        })();
        
    }
}

// 定义的非纯函数，提供异步请求支持
// 需要在sotre中使用thunkMiddleware
/** 请求的一种方案 **/
/*
export function refresh() {
    return dispatch => {
        dispatch(refreshStart());
        return fetch(`src/mock/fetch-data-mock.json`)
            .then(response => response.json())
            .then(json => {
                setTimeout(() => {
                    dispatch(refreshSuccess(json && json.list));
                }, 3000);
            });
    }
}
*/