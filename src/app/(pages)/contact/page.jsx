import React from 'react'
import ContactUs from './Contact'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const ContactPage = () => {
  return (
    <div className="relative " >
       <Navbar />
       <ContactUs/>

       <Footer/>
       </div>
  )
}

export default ContactPage
