import { useSelector } from 'react-redux';
import Filters from './Filters/Filters';
import s from './HeaderDashboard.module.css';
import sprite from '../../img/icons.svg';
import { useState } from 'react';
import { currentBoard } from '../../redux/dashboard/currentBoard/selectors';

const HeaderDashboard = () => {
  const [isOpen, setOpen] = useState(false);

  const activeBoard = useSelector(currentBoard);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={s.headBoard}>
      <h2>{activeBoard?.title}</h2>

      <div className={s.wrapper} onClick={handleOpen}>
        <svg className={s.icon}>
          <use xlinkHref={`${sprite}#icon-filter`} />
        </svg>
        <span className={s.text}>Filters</span>
      </div>
      {isOpen && <Filters handleClose={handleClose} />}
    </div>
  );
};

export default HeaderDashboard;
