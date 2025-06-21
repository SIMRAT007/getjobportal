import React from 'react'
import LandingPage from './HomePageComponents/landing'
import Companies from './HomePageComponents/Companies'
import Faq from './HomePageComponents/Faq'
import Blogs from './HomePageComponents/Blogs'
import Testimonials from './HomePageComponents/Testimonials'
import Header from '../pages/HomePageComponents/Header'
import Stats from './HomePageComponents/Stats'
import Feature1 from './HomePageComponents/Feature1'
import WhyUs from './HomePageComponents/WhyUs'
import Cta from './HomePageComponents/Cta'
import JobList from './HomePageComponents/joblist'

const Main = () => {
  return (
    <>
      {/* Landing Section */}
      <div className='bg-gradient-to-t from-blue-300 to-tranparent'>
      <LandingPage />
      </div>
    
      {/* Companies Section */}
      <Companies />

      {/* Feature Section */}
      <Feature1 />

      {/* Stats */}
      <Stats />

      {/* Why Us Section */}
      <Header
        text1="Why Us?"
        text3="Unlock your true potential with a seamless experience to post jobs, hire top talent, search for opportunities, and apply effortlessly. Discover a world of possibilities that align with your skills, interests, and aspirations."
      />
      <WhyUs/>

      {/* Jobs List */}
      <Header
        text1="Latest Jobs"
        text3="We Empower Job Seekers Like You To Streamline And Supercharge Your Job Search"
      />
      <JobList/>

      {/* Testimonials Section */}
      <Header
        text1="Testimonials"
        text3="Hear from our users about how we helped them achieve their career goals. Real stories from real people."
      />
      <Testimonials />
      

      {/* Blogs Section */}
      <Header
        text1="Our Blogs"
        text3="Explore expert tips and insights to advance your career. Stay updated with the latest trends in the job market."
      />
      <Blogs />

     {/* Call to Action Section xx */}
      <Cta/>

      {/* FAQ Section */}
      <Header
        text1="FAQ"
        text3="Have questions? Find answers to the most common queries about our platform and services."
      />
      <Faq />

    </>
  )
}

export default Main