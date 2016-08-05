import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';

//初始化数据
var defaultState = {
	todo: {
		items: [
			{
				type: 'ADD_TODO',
				message: 'test'
			}	
		]
	}
};
/*action*/
function addTodo(message) {
	return {
		type: 'ADD_TODO',
		message: message,
		completed: false
	}
}
//completed this
function completeTodo(index) {
	return {
		type: 'COMPLETE_TODO',
		index: index
	}
}
function deleteTodo(index) {
	return {
		type: 'DELETE_TODO',
		index: index
	}
}
function clearTodo() {
	return {
		type: 'CLEAR_TODO'
	}
}
/*把action派发给store*/
function todoApp(state, action) {
	console.log('旧state' + action.type, state);
	switch (action.type) {
		case 'ADD_TODO':
		var items = [].concat(state.todo.items);
		console.log('------开始派发-----')
			return Object.assign({}, state, {
				todo: {
					items: items.concat([{
						message: action.message,
						completed: false
					}])
				}	
			});
		case 'COMPLETE_TODO':
			var items = [].conact(state.todo.items);
			items[action.index].completed = true;
			return Object.assign({}, state, {
				todo: {
					items: items
				}
			});
		case 'DELETE_TODO':
			var items = [].concat(state.todo.items);
			items.splice(action.index, 1);
			return Object.assign({}, state, {
				todo: {
					items: items
				}
			});
		case 'CLEAR_TODO':
			return Object.assign({}, state, {
				todo: {
					items: []
				}
			});
		default:
			return state
	}
}
/*store部分*/
var store = createStore(todoApp, defaultState);

class AddTodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {message: ''}
	}
	onFormSubmit(e) {
		e.preventDefault();
		console.log(this.state.message)
		store.dispatch(addTodo(this.state.message));
		console.log('----')
		this.setState({ message: '' });
	}
	onMessageChanged(e) {
		var node = this.refs.input;
		var message = node.value.trim();
		this.setState({ message: message });
	}
	render() {
		return (
			<form onSubmit={this.onFormSubmit.bind(this)}>
				<input type="text" ref="input" placeholder="Todo..." 
					onChange={this.onMessageChanged.bind(this)} value={this.state.message}/>
				<button type="submit">add</button>
			</form>
		);
	}
}
class TodoItem extends Component {
	onDeleteClick() {
		store.dispatch(deleteTodo(this.props.index));
	}
	onCompletedClick() {
		store.dispatch(completeTodo(this.props.index));
	}
	render() {
		return (
			<li>
				<a href="#" onClick={this.onDeleteClick.bind(this)}>[x]</a>
				<a href="#" onClick={this.onCompletedClick.bind(this)}>{this.props.message}</a>
			</li>
		);
	}
}
class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {items: []}
	}
	componentWillMount() {
		store.subscribe( () => {
			console.log('--组件开始挂载------------')
			var state = store.getState();
			this.setState({
				items: state.todo.items
			});
		console.log(state)

		} );
	}
	render() {
		var items = [];
		console.log(this.state.items)
		this.state.items.map((item, index) => {
			items.push(<TodoItem key={index} index={index} message={item.message} completed={items.completed} />)
		});

		return (
			<ol>{items}</ol>
		);
	}
}
render(
	<div>
		<AddTodoForm />
		<TodoList />
	</div>,
	document.getElementById('app')
)