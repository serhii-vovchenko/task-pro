import { useState } from 'react';
import ReusableModal from '../ReusableModal/ReusableModal';
import sprite from '../../img/icons.svg';
import EditColumn from '../EditColumn/EditColumn';
import TaskList from '../TaskList/TaskList';
import AddCard from '../AddCard/AddCard';
import s from './Column.module.css';

const Column = ({ title, id, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
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
            <button className={s.buttons} type="button" onClick={openModal}>
              <svg className={s.icon} width="16" height="16">
                <use href={`${sprite}#icon-pencil`} />
              </svg>
              <ReusableModal isOpen={isModalOpen} onClose={closeModal}>
                <EditColumn columnId={id} closeModal={closeModal} />
              </ReusableModal>
            </button>
          </div>
          <button
            className={s.buttons}
            type="button"
            onClick={() => onDelete(id)}
          >
            <svg className={s.icon} width="16" height="16">
              <use href={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>
      <TaskList columnId={id} />

      <AddCard columnId={id} />
    </div>
  );
};

export default Column;
