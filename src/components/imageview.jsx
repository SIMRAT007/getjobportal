import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ImageView = ({ bigImage, smallImage }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 458px)' }); // Adjust breakpoint as needed

  return (
    <div>
      <img
        src={isBigScreen ? bigImage : smallImage}
        alt="Responsive View"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default ImageView;