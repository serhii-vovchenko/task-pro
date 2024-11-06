import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../../components/ScreensPage/ScreensPage';
import { useState, useEffect } from 'react';
import s from './HomePage.module.css';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';


const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar')) {
        setIsSidebarOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isDesktop]);


  
  return (
    <div className={s.homePage}>
      <Sidebar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={s.columnTwo}>
        <Header toggleSidebar={toggleSidebar} onUserPhotoClick={openModal} />
        <ScreensPage />
      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={closeModal} /> 
    </div>
  );
};

export default HomePage;
