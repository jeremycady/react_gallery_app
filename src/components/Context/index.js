import React, { Component } from 'react';

const GalleryContext = React.createContext();

export class Provider extends Component {
  state = {
    photos: [
      "https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg",
      "https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg",
      "https://farm5.staticflickr.com/4343/37175099045_0d3a249629.jpg",
      "https://farm5.staticflickr.com/4425/36337012384_ba3365621e.jpg"
    ]
  };

  fetchPhotos = () => {
    fetch()
  }

  render() {
    return (
      <GalleryContext.Provider value={this.state.photos}>
        {this.props.children}
      </GalleryContext.Provider>
    );
  }
}

export const Consumer = GalleryContext.Consumer;