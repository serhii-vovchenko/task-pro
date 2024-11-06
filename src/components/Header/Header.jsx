import s from './Header.module.css';
import sprite from '../../../src/img/icons.svg';
import ThemeSwitcher from '../Themes/ThemeSwitcher/ThemeSwitcher';
import PropTypes from 'prop-types';
import UserInfo from '../UserInfo/UserInfo';
const Header = ({ toggleSidebar, onUserPhotoClick }) => {
  return (
    <header className={s.header}>
      <div className={s.menuIconBox} onClick={toggleSidebar}>
        <svg className={s.menuIcon} height="32" width="32">
          <use href={`${sprite}#icon-menu`} />
        </svg>
      </div>
      <div className={s.userBox}>
        <ThemeSwitcher />
        <UserInfo onUserPhotoClick={onUserPhotoClick} />
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  onUserPhotoClick: PropTypes.func.isRequired,
};

export default Header;
