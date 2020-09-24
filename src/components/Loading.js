import React from 'react';

const Loading = (props) => {
  props.fetchPhotos(props.tag);
  
  return (
    <h3>Loading...</h3>
  );
}

export default Loading;