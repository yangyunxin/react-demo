认识redux，首先要了解redux的数据格式是什么，它是一个json数据，一个树，所以数据的改变是json的改变。例如如下就是一个state。

````
{
  todo: {
    items: [
      {
        message: "Finish Redux blog post...",
        completed: false
      }
    ]
  }
}
````

redux由三个部分组成

1. action，action是什么，行为，就是定义要做什么，一般定义成一个函数，返回一个对象给reducer函数，其中一个type，就是你定义了什么类型的action，也就是说你要做什么，然后其他部分，自己定义。

````
{
		type: 'ADD_TODO',
		message: message,
		completed: false
	}
````

2.  reducer,reducer英文翻译减速器，其实我觉得reducer起来一个缓冲作用，不像reflux，action触发函数直接返回给store，reducer有两个参数，lastState,action，即上一个state,和对应的acion，当然reducer可以有多个，这个我还没想通。

````
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
````

3. store 数据存储，
* 维持应用的 state；
* 提供 getState() 方法获取 state；
* 提供 dispatch(action) 方法更新 state；
* 通过 subscribe(listener) 注册监听器;
* 通过 subscribe(listener) 返回的函数注销监听器
