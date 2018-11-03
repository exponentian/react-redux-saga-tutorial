import uuid from 'uuid/v4';

// get todos
export const getTodosRequest = () => ({ type: 'GET_TODOS_REQUEST' });
export const getTodosSuccess = data => ({ type: 'GET_TODOS_SUCCESS', data });
export const getTodosFailure = error => ({ type: 'GET_TODOS_FAILURE', error: error.message });


// add a todo
export const addTodoRequest = text => ({ 
  type: 'ADD_TODO_REQUEST', 
  data: { id: uuid(), text, completed: false } 
});
export const addTodoSuccess = data => ({ type: 'ADD_TODO_SUCCESS', data });
export const addTodoFailure = error => ({ type: 'ADD_TODO_FAILURE', error: error.message });


// delete a todo
export const deleteTodoRequest = data => ({ type: 'DELETE_TODO_REQUEST', data });
export const deleteTodoSuccess = data => ({ type: 'DELETE_TODO_SUCCESS', data });
export const deleteTodoFailure = error => ({ type: 'DELETE_TODO_FAILURE', error: error.message });


// update completed
export const updateCompletedRequest = data => ({ type: 'UPDATE_COMPLETED_REQUEST', data });
export const updateCompletedSuccess = data => ({ type: 'UPDATE_COMPLETED_SUCCESS', data });
export const updateCompletedFailure = error => ({ type: 'UPDATE_COMPLETED_FAILURE', error: error.message });

// update a todo's text
export const updateTodoRequest = data => ({ type: 'UPDATE_TODO_REQUEST', data });
export const updateTodoSuccess = data => ({ type: 'UPDATE_TODO_SUCCESS', data });
export const updateTodoFailure = error => ({ type: 'UPDATE_TODO_FAILURE', error: error.message });