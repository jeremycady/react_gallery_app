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
import Loading from './components/Loading';

class App extends Component {

  state = {
    photos: [],
    loading: true
  };

  handleFetchPhotos = (query) => {

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
  };

  handleLoading = () => {
    this.setState({ loading: true})
  };

  componentDidMount() {
    this.handleFetchPhotos(this.state.query);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm changeLoading={this.handleLoading}/>
          <MainNav changeLoading={this.handleLoading}/>
          <Switch>
            <Route exact path="/" render={() => {
              if (this.state.loading) {
                return <Loading 
                  tag={"sunsets"}
                  fetchPhotos={this.handleFetchPhotos}
                />;
              } else {
                return <PhotoList photos={this.state.photos} />
              }
            }}/>
            <Route path="/:tag" render={({match}) => {
              console.log('hello');
              if (this.state.loading) {
                return <Loading 
                  tag={match.params.tag}
                  fetchPhotos={this.handleFetchPhotos}
                />;
              } else {
                return (
                  <PhotoList 
                    photos={this.state.photos} 
                  />
                );
              }
            }}/>
            <Route component={noPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
