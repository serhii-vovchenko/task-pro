import s from './Header.module.css';
import sprite from '../../../src/img/icons.svg';
import ThemeSwitcher from '../Themes/ThemeSwitcher/ThemeSwitcher';
import UserInfo from '../UserInfo/UserInfo';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/dashboard/modals/slice';
const Header = () => {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header className={s.header}>
      <div className={s.menuIconBox} onClick={handleToggleSidebar}>
        <svg className={s.menuIcon} height="32" width="32">
          <use href={`${sprite}#icon-menu`} />
        </svg>
      </div>
      <div className={s.userBox}>
        <ThemeSwitcher />
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
