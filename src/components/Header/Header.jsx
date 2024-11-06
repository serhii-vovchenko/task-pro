import React from 'react';
import { useSelector } from 'react-redux';
import s from './Header.module.css';
import { FaBars } from 'react-icons/fa';
import ThemeSwitcher from '../Themes/ThemeSwitcher/ThemeSwitcher';
import PropTypes from 'prop-types';
import UserInfo from '../UserInfo/UserInfo';
const Header = ({ toggleSidebar, onUserPhotoClick  }) => {
  // const userName = useSelector((state) => state.user.name) || 'Guest';
  const userPhoto = useSelector((state) => state.user.photo) || 'path/to/default-avatar.png'; 

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
      <div className={s.menuIcon} onClick={toggleSidebar}>
          <FaBars />
        </div>
        <ThemeSwitcher /> 
        <div className={s.userInfo} onClick={onUserPhotoClick}>
        <UserInfo onUserPhotoClick={onUserPhotoClick} />
          {/* <span className={s.userName}>{userName}</span>        
          <img src={userPhoto} alt={userName} className={s.userAvatar} /> */}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  onUserPhotoClick: PropTypes.func.isRequired, 
};

export default Header;

