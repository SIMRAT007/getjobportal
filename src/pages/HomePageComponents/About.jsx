import React from 'react'

const About = () => {
  return (
    <>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div
              className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <img className="rounded-xl object-cover grayscale hover:grayscale-0 transition delay-300 duration-300 ease-in-out" src="https://i.pinimg.com/736x/4e/87/9d/4e879d6df714d14c7cbacce380dc67c6.jpg" alt="about us image" />
              </div>
              <img className="sm:ml-0 ml-auto rounded-xl object-cover grayscale hover:grayscale-0 transition delay-300 duration-300 ease-in-out" src="https://i.pinimg.com/736x/cd/97/0f/cd970f42273b24c8febdf4ed8d924cd9.jpg"
                alt="about us image" />
            </div>
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2
                    className="text-gray-200 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Empowering Careers, Connecting Talent
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Our mission is to bridge the gap between job seekers and employers by creating a platform that 
                    fosters meaningful connections. Whether you're looking for your dream job or the perfect candidate, 
                    we are here to make the process seamless and efficient.
                  </p>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    With cutting-edge technology and a user-friendly interface, we empower individuals to unlock their 
                    potential and help businesses find the talent they need to thrive. Together, we are shaping the future 
                    of work.
                  </p>
                </div>
                <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <h3 className="text-gray-300 text-4xl font-bold font-manrope leading-normal">1000+</h3>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Active job seekers</h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-300 text-4xl font-bold font-manrope leading-normal">800+</h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">JEmployers hiring</h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-300 text-4xl font-bold font-manrope leading-normal">2000+</h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Successful hires annually</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About