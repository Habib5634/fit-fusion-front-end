'use client'
import React, { useEffect, useState } from 'react'
import { FiUsers, FiUserCheck, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl'

const DashboardPage = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/dashboard-stats`,getAuthHeaders())
        setStats(response.data.data)
      } catch (error) {
        toast.error('Failed to load dashboard data')
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-4 text-red-500">
        Failed to load dashboard data
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 font-medium">Total Members</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.userStats.total}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="text-blue-500 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" />
              All Users
            </span>
          </div>
        </div>

        {/* Nutritionists Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 font-medium">Nutritionists</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.userStats.nutritionist}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiUserCheck className="text-green-500 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" />
              {Math.round((stats.userStats.nutritionist / stats.userStats.total) * 100)}% of total
            </span>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 font-medium">Total Bookings</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.bookingStats.total}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiCalendar className="text-purple-500 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" />
              All Time
            </span>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 font-medium">Total Earnings</p>
              <h3 className="text-2xl font-bold text-gray-800">
                ${stats.paymentStats.totalEarnings.toFixed(2)}
              </h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiDollarSign className="text-yellow-500 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-green-500 flex items-center">
              <FiTrendingUp className="mr-1" />
              From {stats.paymentStats.count} payments
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Stats Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Admins</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">{stats.userStats.admin}</span>
                <span className="text-sm text-gray-500">
                  ({Math.round((stats.userStats.admin / stats.userStats.total)) * 100}%)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nutritionists</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">{stats.userStats.nutritionist}</span>
                <span className="text-sm text-gray-500">
                  ({Math.round((stats.userStats.nutritionist / stats.userStats.total)) * 100}%)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Members</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">{stats.userStats.member}</span>
                <span className="text-sm text-gray-500">
                  ({Math.round((stats.userStats.member / stats.userStats.total)) * 100}%)
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-gray-100 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full" 
              style={{
                width: '100%',
                backgroundImage: `linear-gradient(to right, 
                  #3b82f6 ${(stats.userStats.admin / stats.userStats.total) * 100}%, 
                  #10b981 ${(stats.userStats.admin / stats.userStats.total) * 100}% ${((stats.userStats.admin + stats.userStats.nutritionist) / stats.userStats.total) * 100}%, 
                  #6366f1 ${((stats.userStats.admin + stats.userStats.nutritionist) / stats.userStats.total) * 100}%`
              }}
            ></div>
          </div>
        </div>

        {/* Booking Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Status</h2>
          <div className="space-y-4">
            {stats.bookingStats.breakdown.map((status) => (
              <div key={status.status} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{status.status}</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{status.count}</span>
                  <span className="text-sm text-gray-500">
                    ({Math.round((status.count / stats.bookingStats.total)) * 100}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gray-100 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-2.5 rounded-full" 
              style={{
                width: '100%',
                backgroundImage: stats.bookingStats.breakdown.reduce((acc, status, index, array) => {
                  const percentage = (status.count / stats.bookingStats.total) * 100
                  const prevPercentages = array.slice(0, index).reduce((sum, s) => sum + (s.count / stats.bookingStats.total) * 100, 0)
                  
                  const colors = {
                    pending: '#8b5cf6',
                    accepted: '#ec4899',
                    rejected: '#f59e0b',
                    completed: '#10b981'
                  }
                  
                  return `${acc}, ${colors[status.status]} ${prevPercentages}% ${prevPercentages + percentage}%`
                }, '')
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Earnings Summary</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-800">
              ${stats.paymentStats.totalEarnings.toFixed(2)}
            </h3>
            <p className="text-green-500 flex items-center mt-1">
              <FiTrendingUp className="mr-1" />
              All completed payments
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <FiDollarSign className="text-2xl mr-2" />
              <div>
                <p className="font-medium">Average per payment</p>
                <p className="text-xl font-bold">
                  ${(stats.paymentStats.totalEarnings / stats.paymentStats.count).toFixed(2) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage