const initialState = {
  requesting: {
    status: false,
    action: ''
  },
  isFetched: false,
  data: {},
  error: ''
};

// preprocessing data
const filterData = data => ({
  completed: data.filter(todo => todo.completed === true),
  incomplete: data.filter(todo => todo.completed === false),
  all: data,
  byId: data.reduce((obj, todo) => {
    obj[todo.id] = todo;
    return obj;
  }, {})
});


const todos = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_TODOS_REQUEST':
    case 'ADD_TODO_REQUEST':
    case 'DELETE_TODO_REQUEST':
    case 'UPDATE_COMPLETED_REQUEST':
    case 'UPDATE_TODO_REQUEST':
      return {
        ...state,
        requesting: {
          status: true,
          action: action.type
        }
      };

    case 'GET_TODOS_SUCCESS':
      return {
        ...state,
        requesting: {
          status: false,
          action: action.type
        },
        isFetched: true,
        data: filterData(action.data)
      };

    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        requesting: {
          status: false,
          action: action.type
        },
        data: filterData( [...state.data.all, action.data] )
      };

    case 'DELETE_TODO_SUCCESS':
      return {
        ...state,
        requesting: {
          status: false,
          action: action.type
        },
        data: filterData( state.data.all.filter(todo => todo.id !== action.data.id) )
      };

    case 'UPDATE_COMPLETED_SUCCESS':
      return {
        ...state,
        requesting: {
          status: false,
          action: action.type
        },
        data: filterData( state.data.all.map(todo => todo.id === action.data.id ? action.data : todo) )
      };

    case 'UPDATE_TODO_SUCCESS':
      return {
        ...state,
        requesting: {
          status: false,
          action: action.type
        },
        data: filterData( state.data.all.map(todo => todo.id === action.data.id ? action.data : todo) )
      };

    case 'GET_TODOS_FAILURE':
    case 'ADD_TODO_FAILURE':
    case 'DELETE_TODO_FAILURE':
    case 'UPDATE_COMPLETED_FAILURE':
    case 'UPDATE_TODO_FAILURE':
      return {
        ...state,
        requesting: {
          status: false,
          action: action.type
        },
        error: action.error
      }

    default:
      return state;
  }
};

export default todos;