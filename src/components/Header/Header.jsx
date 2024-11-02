import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Header.module.css'; 
import { changeTheme } from '../../redux/actions/themeActions'; 
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name) || 'Guest';
  const userPhoto = useSelector((state) => state.user.photo) || 'path/to/default-avatar.png'; 

  const handleThemeChange = (event) => {
    dispatch(changeTheme(event.target.value));
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.menuIcon} onClick={toggleSidebar}>
          <FaBars />
        </div>
        <select onChange={handleThemeChange} className={s.themeSelector}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="violet">Violet</option>
        </select>
        <div className={s.userInfo}>
          <img src={userPhoto} alt={userName} className={s.userAvatar} />
          <span className={s.userName}>{userName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

