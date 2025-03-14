import React from 'react'
import LandingPage from './landing'
import Companies from './HomePageComponents/Companies'
import Faq from './HomePageComponents/Faq'
import Blogs from './HomePageComponents/Blogs'
import Testimonials from './HomePageComponents/Testimonials'
// import GalleryVideos from './HomePageComponents/GalleryVideos'
// import ContactUs from './HomePageComponents/ContactUs'
// import WhyChooseUs from './HomePageComponents/WhyChooseUs'
import Header from '../pages/HomePageComponents/Header'
// import About from './HomePageComponents/About'
import Stats from './HomePageComponents/Stats'
import Feature1 from './HomePageComponents/Feature1'
import Feature2 from './HomePageComponents/Feature2'

const Main = () => {
  return (
    <>
      {/* Landing Section */}
      <LandingPage />
      <Companies />
      <Feature1 />
      <Stats />

      {/* Testimonials Section */}
      <Header
        text1="Testimonials"
        text3="Hear from our users about how we helped them achieve their career goals. Real stories from real people."
      />
      <Testimonials />
      <Feature2 />

      {/* Blogs Section */}
      <Header
        text1="Our Blogs"
        text3="Explore expert tips and insights to advance your career. Stay updated with the latest trends in the job market."
      />
      <Blogs />

      {/* FAQ Section */}
      <Header
        text1="FAQ"
        text3="Have questions? Find answers to the most common queries about our platform and services."
      />
      <Faq />



      {/* Contact Us Section */}
      {/* <Header 
        text1="Contact Us" 
        text3="Need assistance? Reach out to us for support, inquiries, or feedback. We are here to help you succeed." 
      /> */}
      {/* <ContactUs /> */}

      {/* Companies Section */}
      {/* <Header 
        text1="Top Companies" 
        text3="Discover job opportunities from the most reputable companies. Start your career journey with trusted employers." 
      /> */}

      {/* Why Choose Us Section */}
      {/* <Header 
        text1="Why Choose Us" 
        text3="We connect job seekers with the best opportunities and employers with top talent. Your success is our priority." 
      /> */}
      {/* <WhyChooseUs /> */}

      {/* Gallery Videos Section */}
      {/* <Header 
        text1="Gallery Videos" 
        text3="Watch inspiring stories and success journeys of our users. See how we make a difference in their lives." 
      /> */}
      {/* <GalleryVideos /> */}

      {/* About Us Section */}
      {/* <Header 
        text1="About Us" 
        text3="Learn more about our mission to bridge the gap between job seekers and employers. We are here to empower careers." 
      />
     <About/> */}


    </>
  )
}

export default Main