// import TaskLIst from ""
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReusableModal from '../../ReusableModal/ReusableModal';
import sprite from '../../../../src/img/icons.svg';
import EditColumn from '../EditColumn/EditColumn';
import { setSelectedColumnId } from '../../../redux/dashboard/columns/slice';
import s from './Column.module.css';

const Column = ({ title, id, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
    dispatch(setSelectedColumnId(id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.column}>
      <div className={s.wrapper}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.icons}>
          <div>
            <button type="button" onClick={openModal}>
              <svg className={s.icon} width="16" height="16">
                <use href={`${sprite}#icon-pencil`} />
              </svg>
              <ReusableModal isOpen={isModalOpen} onClose={closeModal}>
                <EditColumn />
              </ReusableModal>
            </button>
          </div>
          <button type="button" onClick={() => onDelete(id)}>
            <svg className={s.icon} width="16" height="16">
              <use href={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>
      {/* <TaskList/> */}

      <button type="button" className={s.button}>
        <svg className={s.plus}>
          <use href={`${sprite}#icon-plus`} />
        </svg>
        <span className={s.text}>Add another card</span>
      </button>
    </div>
  );
};

export default Column;
