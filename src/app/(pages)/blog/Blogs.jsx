'use client'
import React from 'react'

const Blogs = () => {
    const articles = [
        {
          title: "Nutrition Tips for Healthier Lifestyle",
          content:
            "Explore expert nutrition advice to fuel your body right. Eating well is one of the simplest and most effective ways to enhance both your physical and mental health. A balanced diet, rich in whole foods, helps maintain energy levels, supports immune function, and promotes overall well-being...",
        },
        {
          title: "Delicious and Healthy Recipes for Busy People",
          content:
            "Try these nutritious and easy-to-make recipes that will make healthy eating enjoyable and satisfying. Whether you're looking to boost your energy, support your fitness goals, or simply eat better, these dishes offer something for everyone...",
        },
        {
          title: "Comprehensive Fitness Advice for Every Level",
          content:
            "From beginners to pros, everyone can benefit from practical fitness tips that enhance performance, promote safety, and make workouts more effective. Fitness is a journey, and finding the right balance for your level helps prevent injuries...",
        },
        {
          title: "The Power of Consistency in Fitness",
          content:
            "Achieving fitness goals isn’t just about intensity; it’s about consistency. Whether you're aiming to build muscle, improve endurance, or develop healthy habits, regular efforts can yield impressive results over time...",
        },
      ];
    
      const workouts = [
        {
          title: "HIIT (High-Intensity Interval Training)",
          description:
            "A quick, intense workout that combines bursts of activity with short rest periods for fat-burning results.",
          image: "/assets/ab1.jpg",
        },
        {
          title: "Yoga",
          description:
            "Improve flexibility, balance, and mental focus with this low-impact workout suitable for all fitness levels.",
          image: "/assets/yoga.jpg",
        },
        {
          title: "Strength Training",
          description:
            "Build muscle and increase strength with resistance exercises using weights, bands, or body weight.",
          image: "/assets/strenghth.jpg",
        },
        {
          title: "Pilates",
          description:
            "Enhance core stability and posture through controlled movements designed to build a strong foundation.",
          image: "/assets/pilates.jpg",
        },
      ];
  return (
    <>
    {/* heroSection blog*/}
    <div className='w-screen h-screen flex justify-center flex-col items-center bg-blog bg-no-repeat bg-cover overflow-hidden relative font-serif'>
<div className='h-screen w-screen inset-1 absolute top-0 bg-black/50  z-0'>
</div>
<div className='z-10 flex justify-center flex-col items-center'>

<h1 className='text-3xl font-bold text-yellow mb-6'>Welcome to the Fit Fusion Blog</h1>
<p className='max-w-xl w-full mx-auto text-center text-lg text-white'>Explore the latest fitness trends, wellness tips, and workout insights to fuel your journey towards a healthier lifestyle.</p>
<button className='px-6 py-2 rounded-lg border mx-auto border-yellow text-white mt-6'>
Read Our Articles
</button>
</div>

    </div>
      {/* Latest Articles Section */}
      <section className="text-center  max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-yellow mb-2">Latest Articles</h2>
        <p className="text-gray-700">Explore our latest articles for practical tips on nutrition, fitness, and building lasting healthy habits.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-dark text-yellow p-6 rounded-lg border border-yellow">
              <h3 className="font-bold text-lg mb-2">{article.title}</h3>
              <p className="text-gray text-sm">{article.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Workouts Section */}
      <section className="text-center  max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-yellow mb-2">Trending Workouts</h2>
        <p className="text-gray-700">Discover the latest workout trends that are transforming fitness routines and helping people reach their health goals faster and smarter!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {workouts.map((workout, index) => (
            <div key={index} className="bg-dark text-yellow rounded-lg border border-yellow overflow-hidden">
              <img src={workout.image} alt={workout.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{workout.title}</h3>
                <p className="text-gray-300 text-sm">{workout.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Blogs
