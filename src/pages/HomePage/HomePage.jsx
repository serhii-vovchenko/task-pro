import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../../components/ScreensPage/ScreensPage';
import { useState } from 'react';
import s from './HomePage.module.css';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <div className={s.homePage}>
      <Header toggleSidebar={toggleSidebar} /> 
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> 
      <ScreensPage />
    </div>
  );
};

export default HomePage;
