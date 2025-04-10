import AboutUs from '@/app/components/Aboutus'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const AboutPage = () => {
  return (
    <>
       <div className="relative " >
       <Navbar />
       <AboutUs/>

       <Footer/>
       </div>
    </>
  )
}

export default AboutPage
