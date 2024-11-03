import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Header.module.css';
import { changeTheme } from '../../redux/actions/themeActions';
import { FaBars } from 'react-icons/fa';
import ThemeSwitcher from '../Themes/ThemeSwitcher/ThemeSwitcher';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name) || 'Guest';
  const userPhoto =
    useSelector(state => state.user.photo) || 'path/to/default-avatar.png';

  const handleThemeChange = event => {
    dispatch(changeTheme(event.target.value));
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        {/* <div className={s.menuIcon} onClick={toggleSidebar}>
          <FaBars />
        </div> */}
        <ThemeSwitcher />
        {/* <div className={s.userInfo}>
          <img src={userPhoto} alt={userName} className={s.userAvatar} />
          <span className={s.userName}>{userName}</span>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
