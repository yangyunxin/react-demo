function addTodo(message) {
	return {
		type: 'ADDTODO',
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