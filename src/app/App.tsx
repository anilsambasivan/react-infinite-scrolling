import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import QuestionList from './components/questionList'

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <QuestionList></QuestionList>
        </div>
      </Provider>
    );
  }
}

export default App;