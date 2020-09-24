import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoList from './components/PhotoList';
import noPage from './components/NoPage';
import apiKey from './config';

class App extends Component {

  state = {
    photos: [],
    query: "sunset"
  };

  handleFetchPhotos = (query) => {
    
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ 
          photos: responseData.photos.photo,
          query: query
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  componentDidMount() {
    this.handleFetchPhotos(this.state.query);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <MainNav fetchPhotos={this.handleFetchPhotos}/>
          <Switch>
            <Route exact path="/" render={() => 
              <PhotoList 
                photos={this.state.photos} 
                loading={this.state.loading}
              />
            }/>
            <Route path="/:tag" render={({match}) => {
              return (
                <PhotoList 
                  photos={this.state.photos} 
                  query={this.state.query}                  
                  tag={match.params.tag}
                  fetchPhotos={this.handleFetchPhotos}
                />
              );
            }}/>
            <Route component={noPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
