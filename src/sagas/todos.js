import { delay } from 'redux-saga';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import Api from '../middleware/api';
import { 
  getTodosSuccess,
  getTodosFailure,
  addTodoSuccess,
  addTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateCompletedSuccess,
  updateCompletedFailure,
  updateTodoSuccess,
  updateTodoFailure  
} from '../actions/todos';



const ROUTE = '/todos';


// get todos
function* getTodos(action) {
  try {
    const res = yield call( Api(ROUTE).read );
    yield put( getTodosSuccess(res.data) );

  } catch (error) {
    yield put( getTodosFailure(error) );
  }
}

export function* watchGetTodos() {
  yield takeEvery('GET_TODOS_REQUEST', getTodos);
}


// add a todo
function* addTodo(action) {
  try {
    const res = yield call( Api(ROUTE).create, action.data );
    yield delay(500);
    yield put( addTodoSuccess(res.data) );
    console.log("here");
    return res;

  } catch (error) {
    yield put( addTodoFailure(error) );
  }
}

export function* watchAddTodo() {
  yield takeLatest('ADD_TODO_REQUEST', addTodo);
}


// delete a todo
function* deleteTodo(action) {
  try {
    yield call( Api(ROUTE).delete, action.data );
    yield delay(500);
    yield put( deleteTodoSuccess(action.data) );

  } catch (error) {
    yield put( deleteTodoFailure(error) );
  }
}

export function* watchDeleteTodo() {
  yield takeLatest('DELETE_TODO_REQUEST', deleteTodo);
}


// update completed status
function* updateCompledted(action) {
  const data = action.data;
  data.completed = !data.completed;
  
  try {
    const res = yield call( Api(ROUTE).update, data );
    
    yield delay(500);
    yield put( updateCompletedSuccess(res.data) );

  } catch (error) {
    yield put( updateCompletedFailure(error) );
  }
}

export function* watchUpdateCompledted() {
  yield takeLatest('UPDATE_COMPLETED_REQUEST', updateCompledted);
}


// update a todo's text
function* updateTodo(action) {
    try {
    const res = yield call( Api(ROUTE).update, action.data );
    yield delay(500);
    yield put( updateTodoSuccess(res.data) );

  } catch (error) {
    yield put( updateTodoFailure(error) );
  }
}

export function* watchUpdateTodo() {
  yield takeLatest('UPDATE_TODO_REQUEST', updateTodo);
}

export default function* todos () {
  yield all([
    watchGetTodos(),
    watchAddTodo(),
    watchDeleteTodo(),
    watchUpdateCompledted(),
    watchUpdateTodo()
  ]);
}