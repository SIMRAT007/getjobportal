import ImageView from '@/components/imageview'
import React from 'react'
import CTAWeb from '../../../public/CTA_web.png'
import CTAMobile from '../../../public/CTA_mobile.png'
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <div className="relative container mt-20 max-md:mt-20 max-md:p-0">
      <ImageView 
        bigImage={CTAWeb}
        smallImage={CTAMobile}
      />
      <Link to={"/jobs"}>
      <button 
        className="absolute bottom-[30%] left-[5%] max-md:bottom-10 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 bg-white text-blue-500 hover:text-white px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600"
      >
        Get Started
      </button>
      </Link>
    </div>
  )
}

export default Cta