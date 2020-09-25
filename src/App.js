import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoList from './components/PhotoList';
import NoPage from './components/NoPage';
import Loading from './components/Loading';

//add your Flickr API key to configCopy.js and rename the file to config.js
import apiKey from './config';

class App extends Component {

  state = {
    photos: [],
    defaultLinks: [
      'cats', 
      'dogs', 
      'computers'
    ],
    current: 'sunsets',
    loading: true
  };

  // fetches photos matching the query and updates the photo array, current query, and the loading states
  handleFetchPhotos = (query) => {

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ 
          photos: responseData.photos.photo,
          current: query,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  // changes the loading state to true
  handleChangeLoading = () => {
    this.setState({ loading: true})
  };

  // checks if the loading state is true or if the path changes, forcing a fetch
  handleLoading = (path) => {
    if (this.state.loading || this.state.current !== path) {
      return <Loading 
        tag={path}
        fetchPhotos={this.handleFetchPhotos}
      />;
    } else {
      return <PhotoList photos={this.state.photos} />
    }
  };

  // initializes the photo array on load
  componentDidMount() {
    this.handleFetchPhotos(this.state.query);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm changeLoading={this.handleChangeLoading}/>
          <MainNav changeLoading={this.handleChangeLoading} links={this.state.defaultLinks}/>
          <Switch>
            <Route exact path="/" render={() => this.handleLoading("sunsets")}/>
            {this.state.defaultLinks.map(link => {
              return <Route exact path={`/${link}`} render={() => this.handleLoading(link)} key={link}/>
            })}
            <Route path="/search/:tag" render={({match}) => this.handleLoading(match.params.tag)}/>
            <Route component={NoPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
