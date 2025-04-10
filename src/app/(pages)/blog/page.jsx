import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import Blogs from './Blogs'

const BlogPage = () => {
  return (
    <div className="relative " >
       <Navbar />
       <Blogs/>

       <Footer/>
       </div>
  )
}

export default BlogPage
