import s from './ThemeSwitcher.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import sprite from '../../../img/icons.svg';
import { updateThemeInDatabase } from '../../../redux/auth/operations';
import { changeTheme } from '../../../redux/auth/slice';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    dispatch(changeTheme(currentTheme));
  }, [currentTheme, dispatch]);

  const handleThemeChange = async newTheme => {
    setCurrentTheme(newTheme);
    setIsOpen(false);
    await dispatch(updateThemeInDatabase(newTheme));
    dispatch(changeTheme(newTheme));
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const getActiveThemeColor = () => {
    switch (currentTheme) {
      case 'light':
      case 'dark':
        return '#BEDBB0';
      case 'violet':
        return '#8A63B9';
      default:
        return '#000';
    }
  };

  return (
    <div className={s.themeContainer} onClick={() => setIsOpen(!isOpen)}>
      <span className={s.themeLabel}>Theme</span>
      <svg className={s.arrowIcon} width="16" height="16">
        <use href={`${sprite}#icon-chevron-down`} />
      </svg>
      {isOpen && (
        <div ref={dropdownRef} className={s.dropdownMenu}>
          {['light', 'dark', 'violet'].map(theme => (
            <span 
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={s.themeText}
              style={{
                color:
                  currentTheme === theme
                    ? getActiveThemeColor()
                    : currentTheme === 'dark'
                    ? '#FFF'
                    : '#000',
                cursor: 'pointer',
              }}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
