import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MovieList from './movies_list';
import ListaPeliculas from '../containers/ListaPeliculas';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={MovieList} />
            <Route exact path="/movies" component={ListaPeliculas} />
          </div>
        </BrowserRouter>
      
      </div>
    )
  }
}


export default App;
