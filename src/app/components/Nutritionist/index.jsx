'use client'
import { fetchNutritionists } from '@/app/Store/ReduxSlice/nutritionistSlice';
import { bookNutritionist, resetBookingState } from '@/app/Store/ReduxSlice/bookingSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import BookingModal from './BookingModal';
import { openModal } from '@/app/Store/ReduxSlice/modalSlice';

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
const {isAuthenticated} = useSelector((state)=>state.userData)
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
    if(isAuthenticated){

      setSelectedNutritionist(nutritionist);
      setIsModalOpen(true);
    }else{
      dispatch(openModal());
    }
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
       <BookingModal
       selectedNutritionist={selectedNutritionist}
       handleSubmit={handleSubmit}
       handleCloseModal={handleCloseModal}
       formData={formData}
       handleInputChange={handleInputChange}
       bookingLoading={bookingLoading}
       />
      )}
    </>
  )
}

export default Nutritionist