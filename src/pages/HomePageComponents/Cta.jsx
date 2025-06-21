import ImageView from '@/components/imageview'
import React from 'react'
import CTAWeb from '../../assets/CTA_web.png'
import CTAMobile from '../../assets/CTA_mobile.png'

const Cta = () => {
  const handleNavigation = () => {
    window.location.href = '/jobs';
  };

  return (
    <div className="relative container mt-20 max-md:mt-20 max-md:p-0">
      <ImageView 
        bigImage={CTAWeb}
        smallImage={CTAMobile}
      />
      <button 
        onClick={handleNavigation}
        className="absolute bottom-[30%] left-[5%] max-md:bottom-10 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 bg-white text-blue-500 hover:text-white px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600"
      >
        Get Started
      </button>
    </div>
  )
}

export default Cta