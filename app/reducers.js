/*把action派发给store*/
function todoApp(state, action) {
	switch (action.type) {
		case 'ADD_TODO':
			return Object.assign({}, state, {
				todo: {
					items: items.conact([{
						message: action.message,
						completed: false
					}])
				}	
			});
		case: 'COMPLETE_TODO':
			var items = [].conact(state.todo.items);
			items[action.index].completed = true;
			return Object.assign({}, state, {
				todo: {
					items: items
				}
			});
		case: 'DELETE_TODO':
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