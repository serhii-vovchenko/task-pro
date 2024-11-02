import React from 'react';
import TaskCard from './TaskCard'; 
import s from './ScreensPage.module.css';

const Column = ({ title }) => {
  return (
    <div className={s.column}>
      <h2>{title}</h2>
      <TaskCard />
      <TaskCard />
      {}
    </div>
  );
};

export default Column;

