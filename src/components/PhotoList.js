import React from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoList = (props) => {

  let photoList;

  if (props.photos.length > 0) {
    photoList = props.photos.map(photo => {
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