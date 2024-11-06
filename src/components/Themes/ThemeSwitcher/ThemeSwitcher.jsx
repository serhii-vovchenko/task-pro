import s from './ThemeSwitcher.module.css';

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../../redux/actions/themeActions';
import sprite from '../../../img/icons.svg';

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

  const handleThemeChange = event => {
    setCurrentTheme(event.target.value);
    setIsOpen(false);
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

  return (
    <div className={s.themeContainer} onClick={() => setIsOpen(!isOpen)}>
      <span className={s.themeLabel}>Theme</span>
      <svg className={s.arrowIcon} width="16" height="16">
        <use href={`${sprite}#icon-chevron-down`} />
      </svg>
      {isOpen && (
        <div ref={dropdownRef} className={s.dropdownMenu}>
          {['light', 'dark', 'violet'].map(theme => (
            <button
              key={theme}
              value={theme}
              onClick={handleThemeChange}
              className={s.themeButton}
              style={{
                color:
                  currentTheme === theme
                    ? '#BEDBB0'
                    : currentTheme === 'dark'
                    ? '#FFF'
                    : '#000', // Текст зеленый для выбранной темы, белый для темной темы, черный для остальных
                backgroundColor: 'transparent', // Фон прозрачный
                border: 'none', // Убираем границу
                cursor: 'pointer', // Курсор указывает на возможность клика
              }}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
