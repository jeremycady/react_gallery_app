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
    current: 'sunsets',
    loading: true
  };

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

  handleChangeLoading = () => {
    this.setState({ loading: true})
  };

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

  componentDidMount() {
    this.handleFetchPhotos(this.state.query);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm changeLoading={this.handleChangeLoading}/>
          <MainNav changeLoading={this.handleChangeLoading}/>
          <Switch>
            <Route exact path="/" render={() => this.handleLoading("sunsets")}/>
            <Route exact path="/cats" render={() => this.handleLoading("cats")}/>
            <Route exact path="/dogs" render={() => this.handleLoading("dogs")}/>
            <Route exact path="/computers" render={() => this.handleLoading("computers")}/>
            <Route path="/search/:tag" render={({match}) => this.handleLoading(match.params.tag)}/>
            <Route component={noPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
