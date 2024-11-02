import React from 'react';
import { useParams } from 'react-router-dom';
import s from './BoardPage.module.css';

const BoardPage = () => {
  const { boardName } = useParams(); 
  return (
    <div className={s.boardPag}>
      <h1>{boardName}</h1>
      
      <div className={s.column}>
        <h2>To Do</h2>
        <div className={s.taskCard}>Task 1</div>
        <div className={s.taskCard}>Task 2</div>
      </div>
      <div className={s.column}>
        <h2>In Progress</h2>
        <div className={s.taskCard}>Task 3</div>
      </div>
      <div className={s.column}>
        <h2>Done</h2>
        <div className={s.taskCard}>Task 4</div>
      </div>
    </div>
  );
};

export default BoardPage;
