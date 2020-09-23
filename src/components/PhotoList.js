import React from 'react';
import { Consumer } from './Context';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoList = ({match}) => (
  

  <Consumer>
    {context => {

      let photoList;
      console.log(match);

      if (match.params.tag) {
        context.actions.fetchPhotos(match.params.tag);
      } else {
        context.actions.fetchPhotos();
      }

     if (context.photos.length > 0) {
        photoList = context.photos.map(photo => <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}/>);
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
    }}
  </Consumer>
);

export default PhotoList;