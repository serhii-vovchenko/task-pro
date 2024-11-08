import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumns } from '../../../redux/dashboard/columns/selectors.js';
import Column from '../Column/Column';
import AddColumn from '../AddColumn/AddColumn';
import ReusableModal from '../../ReusableModal/ReusableModal';
import sprite from '../../../../src/img/icons.svg';
import { deleteColumn } from '../../../redux/dashboard/columns/operations.js';
import s from './ColumnsList.module.css';
import { currentBoard } from '../../../redux/dashboard/currentBoard/selectors.js';

const ColumnList = () => {
  const dispatch = useDispatch();
  const currentBoardData = useSelector(currentBoard);
  const columns = currentBoardData ? currentBoardData.columns : [];
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <AddColumn />
      </ReusableModal>
    </div>
  );
};

export default ColumnList;
