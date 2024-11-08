import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { selectColumns } from '../../redux/dashboard/columns/selectors.js';
import Column from '../Column/Column.jsx';
import AddColumn from '../AddColumn/AddColumn.jsx';
import ReusableModal from '../ReusableModal/ReusableModal.jsx';
import sprite from '../../img/icons.svg';
import { deleteColumn } from '../../redux/dashboard/columns/operations.js';
import { currentBoard } from '../../redux/dashboard/currentBoard/selectors.js';
import s from './ColumnsList.module.css';

const ColumnList = () => {
  const dispatch = useDispatch();
  // const columns = useSelector(selectColumns);
  const { columns = [] } = useSelector(currentBoard);
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
              id={item.id}
              onDelete={() => dispatch(deleteColumn(item.id))}
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
