import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Books from './components/Books'
import BookPage from './components/BookPage'
import Head from './components/head'
import './App.css';

function App() {
  return (
    <div className="App">
      <Head title="Home" />
      <Router basename="/react-wordpress">
        <Route exact path="/" component={Books} />
        <Route exact path="/book/:id" component={BookPage} />
      </Router>
    </div>
  );
}

export default App;
