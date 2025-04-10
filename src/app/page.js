'use client'
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import Aos from "aos";
import Nutritionist from "./components/Nutritionist";
import SuccessStories from "./components/SuccessStories";
import LatestArticles from "./components/LatestArticles";
import Footer from "./components/Footer";
export default function Home() {
  
  
  useEffect(() => {
    Aos.init({
      // Global settings here...
    });
  }, []);
  
  
  return (
    <>
   
      <div className="relative " >
        <Navbar />

        <HeroSection />
<Nutritionist/>
<SuccessStories/>
<LatestArticles/>
<Footer/>
      </div>
    </>
  );
}
