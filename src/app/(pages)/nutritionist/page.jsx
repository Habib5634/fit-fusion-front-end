import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import TeamSection from './TeamSection'
import StatisticsAchievements from './StatisticsAchievements'
import MealPlanCalculator from './PlanCalculator'

const NutritionistPage = () => {
  return (
    <div className="relative font-serif" >
       <Navbar />
       <TeamSection/>
       <StatisticsAchievements/>
       <MealPlanCalculator/>
       <Footer/>
       </div>
  )
}

export default NutritionistPage
