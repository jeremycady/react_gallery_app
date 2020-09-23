import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { Consumer } from './components/Context';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoList from './components/PhotoList';

const App = () => (
  <Consumer>
    {context => {
      return (
        <div className="container">
          <BrowserRouter>
            <SearchForm />
            <MainNav />
            <Switch>
              <Route exact path="/" component={PhotoList}/>
              <Route path="/:tag" component={PhotoList}/>
            </Switch>
          </BrowserRouter>
        </div>
      );
    }}
  </Consumer>
);

export default App;
