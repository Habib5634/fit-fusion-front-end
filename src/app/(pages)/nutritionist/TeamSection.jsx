'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchNutritionists } from "@/app/Store/ReduxSlice/nutritionistSlice";
import toast from "react-hot-toast";
import { bookNutritionist, resetBookingState } from "@/app/Store/ReduxSlice/bookingSlice";
import BookingModal from "@/app/components/Nutritionist/BookingModal";
import { openModal } from "@/app/Store/ReduxSlice/modalSlice";
const teamMembers = [
  {
    name: "Dr. Wafa Noor",
    specialization: "Plant-Based Nutrition",
    description:
      "Dr. Wafa is a certified nutritionist focused on promoting plant-based diets for health and wellness.",
    image: "/assets/wafa-noor.png",
  },
  {
    name: "Dr. Farhan Malik",
    specialization: "Pediatric Nutrition",
    description:
      "Dr. Farhan focuses on pediatric nutrition, ensuring that children get nutrients they need for development.",
    image: "/assets/nut4.png",
  },
  {
    name: "Dr. Ayesha Khan",
    specialization: "Clinical and Metabolic Health",
    description:
      "Dr. Ayesha is a leading expert in clinical nutrition with over a decade of experience in metabolic health.",
    image: "/assets/nut5.png",
  },
  {
    name: "Dr. Wafa Noor",
    specialization: "Plant-Based Nutrition",
    description:
        "Dr. Wafa Noor is a certified nutritionist focused on promoting plant-based diets for health and wellness.",
    image: "/assets/wafa-noor.png",
},
{
    name: "Dr. Abbas Qureshi",
    specialization: "Sports Nutrition",
    description:
        "Dr. Abbas Qureshi has over 10 years of experience in helping athletes optimize their diets for peak performance.",
    image: "/assets/abbas-qurashi.png",
},
{
    name: "Dr. Umme-Farwa",
    specialization: "Weight Management",
    description:
        "Dr. Farwa specializes in creating personalized meal plans that help clients achieve sustainable weight goals.",
    image: "/assets/umme-farwa.png",
},
];

const TeamSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
      };
      const dispatch = useDispatch();
      const { data: nutritionists, loading, error } = useSelector((state) => state.nutritionists);
      const { loading: bookingLoading, error: bookingError, success: bookingSuccess } = useSelector((state) => state.booking);
      const {isAuthenticated} = useSelector((state)=>state.userData)
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
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-yellow">Your Personalized Path to Wellness</h2>
        <p className="text-gray-700 mt-2 max-w-3xl mx-auto">
          Discover a team of dedicated experts, personalized plans, and resources designed
          to empower your health journey with confidence and support.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-dark py-12 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-yellow">Meet Our Team</h3>
          <p className="text-gray-300 mt-2 max-w-3xl mx-auto">
            Our team of certified nutritionists is dedicated to helping you achieve your health goals with personalized expertise and care.
          </p>
        </div>

        {/* Slider */}
        <div className="mt-8 max-w-3xl mx-auto">
        <Slider {...settings}>
            {nutritionists?.map((member, index) => (
              <div key={index} className="p-6">
                <div className="bg-white border-2 border-yellow rounded-lg p-6 text-center">
                  <img
                    src={member.profile}
                    alt={member.fullName}
                    className="w-24 h-24 mx-auto rounded-full"
                  />
                  <h4 className="text-lg font-bold text-gray-900 mt-4">
                    {member.fullName}
                  </h4>
                  <p className="text-sm text-gray-700 font-semibold mt-1">
                    Specialization: {member.specialization}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    {member.description}
                  </p>
                  <button onClick={() => handleOpenModal(member)} className="mt-4 bg-orange text-white font-bold py-2 px-4 rounded">
                    BOOK CONSULTATION
                  </button>
                </div>
              </div>
            ))}
          </Slider>
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
    </section>
  );
};

export default TeamSection;
