import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import TodoList from '../components/TodoList';
import TodoDetail from '../components/TodoDetail';
import TodoEdit from '../components/TodoEdit';

import { 
  addTodoRequest,
  deleteTodoRequest,
  updateCompletedRequest,
  updateTodoRequest
} from '../actions/todos';


class App extends React.Component {

  componentDidUpdate = (prevProps, prevState) => {
    const { todos } = this.props;

    if (prevProps.todos.requesting !== todos.requesting) {
      if (!todos.requesting.status && !todos.requesting.action.includes('GET_TODOS') ) {
        alert(todos.requesting.action);
      }
    }
  }

  addTodo = text => {
    this.props.addTodo(text);
  }

  deleteTodo = data => {
    this.props.deleteTodo(data);
  }

  updateCompleted = data => {
    this.props.updateCompleted(data);
  }

  updateTodo = data => {
    this.props.updateTodo(data);
  }
  
  render() {
    const { todos } = this.props;

    if (todos.error) return <div>Please contact administrator</div>;
    if (!todos.isFetched) return <div>Loading...</div>;

    return (
      <div>
        <Header />

        <Switch>
          <Route path='/todos/:id/edit' component={() => <TodoEdit data={todos.data} updateTodo={this.updateTodo} />} />
          <Route path='/todos/:id' component={() => <TodoDetail data={todos.data} />} />
          <Route path='/' component={() => <TodoList childProps={{ 
            data: todos.data,
            addTodo: this.addTodo,
            deleteTodo: this.deleteTodo,
            updateCompleted: this.updateCompleted
          }} />} />
        </Switch>
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});


const mapDispatchToProps = dispatch => ({
  addTodo: text => dispatch( addTodoRequest(text) ),
  deleteTodo: data => dispatch( deleteTodoRequest(data) ),
  updateCompleted: data => dispatch( updateCompletedRequest(data) ),
  updateTodo: data => dispatch( updateTodoRequest(data) )
});


App.propTypes = {
  todos: PropTypes.shape({
    requesting: PropTypes.object.isRequired,
    isFetched: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );