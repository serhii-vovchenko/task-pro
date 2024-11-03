import { useState, useEffect } from 'react';
import s from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [theme]);

  const handleThemeChange = event => {
    setTheme(event.target.value);
  };

  return (
    <div className={s.themeSwitcher}>
      <label htmlFor="theme-select" className={s.themeLabel}></label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleThemeChange}
        className={s.themeSelector}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="violet">Violet</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
