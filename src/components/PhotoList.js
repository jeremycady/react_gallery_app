import React from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoList = (props) => {

  let photoList;

  // checks if there are photos returned from the fetch and returns photos or NotFound if no photos
  if (props.photos.length > 0) {

    // returns an array of photo components
    photoList = props.photos.map(photo => {

      // checks of farm 0 is returned (creates a console error) and updates to another farm
      if (photo.farm === 0) {
        return <Photo url={`https://farm66.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}/>
      } else {
        return <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}/>
      }
    });
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


export default PhotoList;