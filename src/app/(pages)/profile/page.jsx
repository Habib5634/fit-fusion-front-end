'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { FiEdit, FiSave, FiLock, FiUser, FiPhone, FiHome, FiTarget, FiInfo, FiMail } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl'
import { fetchUserData } from '@/app/Store/Actions/userAction'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'

const ProfilePage = () => {
  const { userData } = useSelector((state) => state.userData)
  const [editMode, setEditMode] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [formData, setFormData] = useState({
    userName: userData?.userName || '',
    fullName: userData?.fullName || '',
    email: userData?.email || '',
    contact: userData?.contact || '',
    address: userData?.address || '',
    height: userData?.height || '',
    weight: userData?.weight || '',
    goals: userData?.goals || '',
    specialization: userData?.specialization || '',
    description: userData?.description || ''
  })
  const dispatch = useDispatch()
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${API_URL}/user/update`, formData,getAuthHeaders())
      toast.success('Profile updated successfully')
      dispatch(fetchUserData())
      setEditMode(false)
      // You might want to update the userData in Redux store here
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
      console.error('Error updating profile:', error)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    try {
      await axios.post(`${API_URL}/user/updatePassword`, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      },getAuthHeaders())
      toast.success('Password updated successfully')
      dispatch(fetchUserData())
      setShowPasswordModal(false)
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password')
      console.error('Error updating password:', error)
    }
  }

  // if (!userData) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   )
  // }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative">
              <img 
                src={userData?.profile || "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              {editMode && (
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md">
                  <FiEdit size={16} />
                </button>
              )}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-800">{userData?.fullName || userData?.userName}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                userData?.userType === 'admin' ? 'bg-purple-100 text-purple-800' :
                userData?.userType === 'nutritionist' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {userData?.userType}
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FiEdit className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FiSave className="mr-2" />
                  Save Changes
                </button>
              </>
            )}
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiLock className="mr-2" />
              Change Password
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <FiUser className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{userData?.userName}</p>
                    )}
                  </div>
                </div>

                {/* Full Name */}
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <FiUser className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{userData?.fullName || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <FiMail className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-gray-800">{userData?.email}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <FiPhone className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{userData?.contact || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <FiHome className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{userData?.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Nutritionist Specific Fields */}
                {userData?.userType === 'nutritionist' && (
                  <>
                    {/* Specialization */}
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FiTarget className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Specialization</label>
                        {editMode ? (
                          <input
                            type="text"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">{userData?.specialization || 'Not provided'}</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FiInfo className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                        {editMode ? (
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                          />
                        ) : (
                          <p className="text-gray-800">{userData?.description || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Member Specific Fields */}
                {userData?.userType === 'member' && (
                  <>
                    {/* Height */}
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FiTarget className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Height (cm)</label>
                        {editMode ? (
                          <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">{userData?.height || 'Not provided'}</p>
                        )}
                      </div>
                    </div>

                    {/* Weight */}
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FiTarget className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Weight (kg)</label>
                        {editMode ? (
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">{userData?.weight || 'Not provided'}</p>
                        )}
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FiTarget className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Goals</label>
                        {editMode ? (
                          <select
                            name="goals"
                            value={formData.goals}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select your goal</option>
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Improve Endurance">Improve Endurance</option>
                            <option value="Weight Gain">Weight Gain</option>
                            <option value="Boost Immunity">Boost Immunity</option>
                          </select>
                        ) : (
                          <p className="text-gray-800">{userData.goals || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
<Footer/>
    </>
  )
}

export default ProfilePage