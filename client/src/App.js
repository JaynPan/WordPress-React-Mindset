import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Books from './components/Books'
import BookPage from './components/BookPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router basename="/react-wordpress">
        <Route exact path="/" component={Books} />
        <Route exact path="/book/:id" component={BookPage} />
      </Router>
    </div>
  );
}

export default App;
