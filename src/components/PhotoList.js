import React, { Component } from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

class PhotoList extends Component {

  render() {
    let photoList;

    console.log(this.props.query);
    console.log('hello');

    if (this.props.query !== this.props.tag) {
      this.props.fetchPhotos(this.props.tag);
    } else if (this.props.photos.length > 0) {
      photoList = this.props.photos.map(photo => <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}/>);
    } else {
      photoList = <NotFound />;
    }
    
    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {photoList}
        </ul>
      </div>
    );
  };
}

export default PhotoList;