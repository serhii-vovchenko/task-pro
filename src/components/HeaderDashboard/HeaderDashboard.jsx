import React from 'react';
import s from '../HeaderDashboard/HeaderDashboard.module.css';
import Filters from '../HeaderDashboard/Filters/Filters.jsx';

const HeaderDashboard = ({ title }) => {
    return (
      <div className={s.headBoard}>
        {title}
        <Filters />
      </div>
    );
  };
  
  export default HeaderDashboard;