'use client'

import { setScrollTrigger } from '@/app/Store/ReduxSlice/scrollSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const useScrollTrigger = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      dispatch(setScrollTrigger(scrollPosition));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);
};

export default useScrollTrigger;