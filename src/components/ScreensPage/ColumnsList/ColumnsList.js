import React, { useState } from 'react';
import s from './ColumnsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumns } from '../../../redux/dashboard/columns/selectors.js';
import Column from '../Column/Column.jsx';
import AddColumn from '../AddColumn/AddColumn.jsx';
import ReusableModal from '../../ReusableModal/ReusableModal.jsx';
import sprite from '../../../../src/img/icons.svg';
import { deleteColumn } from '../../../redux/dashboard/columns/operations.js';

const ColumnList = () => {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
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
          <li key={item.id}>
            <Column
              title={item.title}
              id={item.id}
              onDelete={() => dispatch(deleteColumn(item.id))}
            />
          </li>
        ))}
      </ul>
    
        <button className={s.button} type="button" onClick={openModal}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-plus`} />
          </svg>
          <span className={s.text}>Add another column</span>
        </button>
        <ReusableModal
          isOpen={isModalOpen}
          onClose={closeModal}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <AddColumn />
        </ReusableModal>
      
    </div>
  );
};

export default ColumnList;
