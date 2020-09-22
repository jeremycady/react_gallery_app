import React from 'react';
import { Consumer } from './Context';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoList = () => (
  <Consumer>
    {context => {
      let photoList;

      if (context.length > 0) {
        photoList = context.map(photo => <Photo url={photo} />);
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