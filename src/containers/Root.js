import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getTodosRequest } from '../actions/todos';
import App from './App';

class Root extends React.Component {

  componentDidMount = () => {
    this.props.getTodos();
  }

  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({ 
  getTodos: () => dispatch( getTodosRequest() ) 
});

export default connect(null, mapDispatchToProps)(Root);