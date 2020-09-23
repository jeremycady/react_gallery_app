import React, { Component } from 'react';
import apiKey from '../../config';

const GalleryContext = React.createContext();

export class Provider extends Component {
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

  render() {
    return (
      <GalleryContext.Provider 
        value={{
          photos: this.state.photos,
          actions: {
            fetchPhotos: this.handleFetchPhotos,
            resetLoading: this.handleSetLoading
          }
        }}
      >
        {this.props.children}
      </GalleryContext.Provider>
    );
  }
}

export const Consumer = GalleryContext.Consumer;