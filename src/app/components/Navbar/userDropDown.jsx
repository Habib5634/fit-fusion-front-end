import { FaUserCircle } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { openModal } from '@/app/Store/ReduxSlice/modalSlice';
import { useRouter } from 'next/navigation';
import { clearAuth } from '@/app/Store/ReduxSlice/userSlice';
import toast from 'react-hot-toast';

const UserDropdown = ({ handleShowModal }) => {
  const { isAuthenticated, userData } = useSelector((state) => state.userData);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(userData)
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // dispatch(openModal());
    localStorage.removeItem('token')
    dispatch(clearAuth());
    toast.success("Logout Successfully")
    router.push('/');
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.button
        onClick={handleShowModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`anim1 rounded-lg text-center text-[12px] py-1.5 px-5 font-semibold uppercase bg-transparent border-2 border-yellow`}
      >
        Get Started
      </motion.button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 focus:outline-none"
      >
        <FaUserCircle className="text-2xl text-yellow hover:text-yellow-dark cursor-pointer" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 origin-top-right"
          >
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => {
                router.push('/profile');
                setIsOpen(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Profile
            </motion.button>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => {
                router.push('/my-bookings');
                setIsOpen(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              My Bookings
            </motion.button>
            {userData?.userType !== "member" && (
              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => {
                  router.push("/dashboard");
                  setIsOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Dashboard
              </motion.button>
            )}
            <motion.button
              whileHover={{ x: 5 }}
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default UserDropdown