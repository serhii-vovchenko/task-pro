import { useState } from 'react';
import sprite from '../../img/icons.svg';
import ReusableModal from '../ReusableModal/ReusableModal';
import TaskForm from '../TaskForm/TaskForm';
import s from './AddCard.module.css';

const initialValue = {
  title: '',
  description: '',
  priority: 'none',
  deadline: '',
};

const AddCard = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => handleOpen()} className={s.btnAddCard}>
        <span className={s.btnInnerWrapper}>
          <span className={s.iconWrapper}>
            <svg width="14px" height="14px">
              <use href={`${sprite}#icon-plus`} />
            </svg>
          </span>
          <span>Add another card</span>
        </span>
      </button>
      <ReusableModal
        isOpen={isOpen}
        onClose={() => handleClose()}
        children={
          <TaskForm
            columnId={columnId}
            handleClose={handleClose}
            initialTaskValue={initialValue}
            typeOfPopUp={'Add'}
          />
        }
      />
    </>
  );
};

export default AddCard;
