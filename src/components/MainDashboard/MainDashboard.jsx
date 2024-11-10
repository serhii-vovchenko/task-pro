import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Column from '../Column/Column.jsx';
import AddColumn from '../AddColumn/AddColumn.jsx';
import ReusableModal from '../ReusableModal/ReusableModal.jsx';
import sprite from '../../img/icons.svg';
import { deleteColumn } from '../../redux/dashboard/columns/operations.js';
import {
  currentBoard,
  selectBoardColumns,
  selectCurrentBoard,
} from '../../redux/dashboard/currentBoard/selectors.js';
import s from './MainDashboard.module.css';
import { useNavigate } from 'react-router-dom';

const ColumnList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const columns = useSelector(selectBoardColumns);

  const activeBoard = useSelector(currentBoard);
  const isLoading = useSelector(state => selectCurrentBoard(state).isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading && activeBoard?._id) {
      navigate(`/home`);
    } else if (activeBoard?._id) {
      navigate(`/home/${activeBoard._id}`, { replace: true });
    }
  }, [activeBoard, isLoading, navigate]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {columns.map(item => (
          <li key={item._id}>
            <Column
              title={item.title}
              id={item._id}
              onDelete={() => dispatch(deleteColumn(item._id))}
            />
          </li>
        ))}
      </ul>
      <button className={s.button} type="button" onClick={openModal}>
        <svg className={s.icon} height="28" width="28">
          <use href={`${sprite}#icon-plus`} />
        </svg>
        <span className={s.text}>Add another column</span>
      </button>
      <ReusableModal isOpen={isModalOpen} onClose={closeModal}>
        <AddColumn closeModal={closeModal} />
      </ReusableModal>
    </div>
  );
};

export default ColumnList;