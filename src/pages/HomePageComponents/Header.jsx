import React from 'react';

const TextDisplay = ({ text1, text2, text3 }) => {
  return (
    <div className="text-center p-4 pt-40 max-md:pt-20 max-md:pb-10 max-sm:pt-20">
      <h1 className="text-6xl text-[#173a96] max-md:text-6xl">{text1}</h1>
      {/* <h2 className="text-8xl text-[#A07F07] mt-2 max-md:text-6xl">{text2}</h2> */}
      <h3 className="text-2lg text-gray-500 mt-8 max-w-[900px] text-center m-auto">{text3}</h3>
    </div>
  );
};

export default TextDisplay;