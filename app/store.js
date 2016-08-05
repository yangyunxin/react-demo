import { createStore } from 'redux';

//初始化state
var defaultState = {
	todo: {
		item: []
	}
}
function todoApp(state, action) {

}
var store = redux.createStore(todoApp, defaultState);