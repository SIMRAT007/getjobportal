import React from 'react';
import { useMediaQuery } from 'react-responsive';

const VideoView = ({ bigVideo, smallVideo }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' }); // Adjust breakpoint as needed

  return (
    <div>
      <video
        src={isBigScreen ? bigVideo : smallVideo}
        autoPlay
        loop
        muted
        style={{ width: '90%', height: 'auto' }}
        className='rounded-3xl shadow-lg mx-auto'
      />
    </div>
  );
};

export default VideoView;