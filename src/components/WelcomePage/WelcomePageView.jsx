// src/components/WelcomePage/welcomePageView.jsx
import React, { useState } from 'react';
import s from './WelcomePageView.module.css';
import { Link } from 'react-router-dom';
import welcomeImage from '../../img/welcomePageImg.png';
import sprite from '../../../src/img/icons.svg';

const WelcomePageView = () => {
  return (
    <section className={s.welcomeSection}>
      <div className={s.container}>
        <img src={welcomeImage} alt="WelcomeIMG" className={s.welcomeImg} />

        <div className={s.logoWrapper}>
          <svg className={s.logoIcon} height="40" width="40">
            <use href={`${sprite}#icon-icon`} />
          </svg>

          <p className={s.logoText}>Task Pro</p>
        </div>
        <p className={s.welcomeParagraph}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>
        <div className={s.btnWrapper}>
          <Link to="/auth/register" className={s.registerBtn}>
            Registration
          </Link>
          <Link to="/auth/login" className={s.loginBtn}>
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomePageView;
