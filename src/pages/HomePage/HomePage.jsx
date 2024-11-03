import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../../components/ScreensPage/ScreensPage';
import { useState } from 'react';
import s from './HomePage.module.css';
import ThemeSwitcher from '../../components/Themes/ThemeSwitcher/ThemeSwitcher';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={s.homePage}>
      <ThemeSwitcher />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={s.columnTwo}>
        <Header toggleSidebar={toggleSidebar} />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
