'use client'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSmile, FaBriefcaseMedical, FaUtensils, FaChartLine, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

const StatisticsAchievements = () => {
  const statistics = [
    {
      icon: <FaSmile size={60} className=" " />,
      title: "Over 1,000 Happy Clients Served",
      description: "Thousands of satisfied clients reached their health goals with our guidance."
    },
    {
      icon: <FaBriefcaseMedical size={60} className=" " />,
      title: "20+ Years of Combined Experience",
      description: "Our experts bring decades of knowledge and expertise to every consultation."
    },
    {
      icon: <FaUtensils size={60} className=" " />,
      title: "1,500+ Customized Nutrition Plans",
      description: "Each client receives a tailored plan crafted by our certified nutritionists."
    },
    {
      icon: <FaChartLine size={60} className=" " />,
      title: "80% Client Retention Rate",
      description: "Our clients stay with us long-term for sustainable and consistent results."
    },
    {
      icon: <FaUsers size={60} className=" " />,
      title: "Community of 10,000+ Health Enthusiasts",
      description: "Join a growing community dedicated to wellness and a healthy lifestyle."
    },
    {
      icon: <FaChalkboardTeacher size={60} className=" " />,
      title: "100+ Interactive Health Workshops",
      description: "Regular workshops and events to empower you with latest health insights."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };
  const items = [
    "Vegetables", "Fruits", "Proteins", "Carbohydrates", "Fats", "Vitamins",
    "Water", "Dietary Fiber", "Nuts", "Whole Grain", "Lipids", "Dairy Products"
  ];
  return (
    <div>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-2">Statistics and Achievements</h2>
        <p className="text-gray-600 mb-6">These are the Highlights of Performance and Key Milestones we have achieved so far...</p>
        <Slider {...settings}>
          {statistics.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="bg-dark text-white p-6 h-full min-h-[180px] rounded-lg shadow-lg border-2 border-orange-500 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold mt-2 text-yellow">{stat.title}</h3>
                <div className='flex gap-2 text-gray'>

                  {stat.icon}
                  <p className="text-sm mt-1">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="bg-dark text-center p-6 text-white mt-12">
        <h2 className="text-2xl font-bold text-yellow mb-2">Discover Our Nutritional Pyramid</h2>
        <p className="text-gray mb-6">Hover over each item to learn about nutritional benefits!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className=" w-full text-white px-8 py-4 rounded-lg border border-yellow-500 text-sm cursor-pointer hover:bg-yellow hover:text-white transition">
              {item}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default StatisticsAchievements
