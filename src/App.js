import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoList from './components/PhotoList';
import apiKey from './config';

class App extends Component {

  state = {
    photos: [],
    loading: true
  };

  handleSetLoading = () => {
    this.setState({ loading: true });
  };

  handleFetchPhotos = (query = 'sunsets') => {
    
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ 
          photos: responseData.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  componentDidMount() {
    this.handleFetchPhotos();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <SearchForm />
          <MainNav />
          <PhotoList 
            photos={this.state.photos} 
            loading={this.state.loading}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
