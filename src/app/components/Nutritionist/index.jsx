'use client'
import { fetchNutritionists } from '@/app/Store/ReduxSlice/nutritionistSlice';
import { bookNutritionist, resetBookingState } from '@/app/Store/ReduxSlice/bookingSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Nutritionist = () => {
  const dispatch = useDispatch();
  const { data: nutritionists, loading, error } = useSelector((state) => state.nutritionists);
  const { loading: bookingLoading, error: bookingError, success: bookingSuccess } = useSelector((state) => state.booking);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNutritionist, setSelectedNutritionist] = useState(null);
  const [formData, setFormData] = useState({
    problems: '',
    details: ''
  });

  useEffect(() => {
    dispatch(fetchNutritionists());
  }, [dispatch]);

  useEffect(() => {
    if (bookingSuccess) {
      toast.success('Booking created successfully!');
      dispatch(resetBookingState());
      setIsModalOpen(false);
    }
    if (bookingError) {
      toast.error(bookingError);
      dispatch(resetBookingState());
    }
  }, [bookingSuccess, bookingError, dispatch]);

  const handleOpenModal = (nutritionist) => {
    setSelectedNutritionist(nutritionist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNutritionist(null);
    setFormData({ problems: '', details: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedNutritionist) return;
    
    const bookingData = {
      nutritionistId: selectedNutritionist._id,
      problems: formData.problems,
      details: formData.details
    };
    
    dispatch(bookNutritionist(bookingData));
  };

  return (
    <>
      <div className='w-full max-w-5xl mx-auto py-16 lg:py-20 px-6 text-center font-serif'>
        <h1 className='text-3xl lg:text-4xl font-bold text-yellow mb-6'>Welcome to Fit Fusion</h1>
        <p>Your ultimate fitness companion! Our platform bridges the gap between fitness enthusiasts and expert nutritionists, empowering you to achieve your health goals. Whether you're looking to lose weight, gain muscle, or simply adopt a healthier lifestyle, our personalized nutrition plans and consultations are tailored just for you. Join our community of health-minded individuals and take the first step toward a healthier you!</p>
      </div>
      <div className="bg-dark text-white py-12">
        <div className='container mx-auto py-16 lg:py-20 px-6 text-center font-serif'>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow">Featured Nutritionists</h2>
            <p className="text-gray-300 mt-2">
              Our team of certified nutritionists is here to help you achieve your health goals
              with personalized guidance and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8 px-4">
            {nutritionists.map((nutritionist, index) => (
              <div key={index} className="bg-gray rounded-xl  shadow-lg p-6 text-center max-w-sm">
                <img
                  src={nutritionist.profile}
                  alt={nutritionist.fullname}
                  className="w-full h-[330px] mx-auto rounded-2xl object-cover"
                />
                <h3 className="text-xl text-black capitalize font-semibold mt-4">{nutritionist.fullName}</h3>
                <p className="text-yellow font-medium mt-2">{nutritionist.specialization}</p>
                <p className="text-gray-600 mt-2 text-sm">{nutritionist.description}</p>
                <button
                  onClick={() => handleOpenModal(nutritionist)}
                  className="bg-yellow text-white  px-4 py-2 rounded-full mt-4 font-semibold  hover:bg-yellow-600 transition"
                >
                  Book Consultation
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={'/nutritionist'}>
              <button className="bg-yellow text-dark px-6 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-600 transition">
                Meet Our Experts
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedNutritionist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-dark">Book {selectedNutritionist.fullName}</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 text-2xl hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="problems">
                  Health Problems/Goals
                </label>
                <input
                  type="text"
                  id="problems"
                  name="problems"
                  value={formData.problems}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
                  Additional Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="px-4 py-2 bg-yellow text-dark rounded-md hover:bg-yellow-600 disabled:opacity-50"
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Nutritionist