import { useState, useEffect } from 'react';
import sprite from '../../../../img/icons.svg';
import s from './CoreModal.module.css';

const CoreModal = ({ children, name, open, closeModal }) => {
  const [modalClass, setModalClass] = useState('');

  useEffect(() => {
    if (name === 'Filters') {
      setModalClass(s.filter);
    } 
    else {
      setModalClass('');
    }
  }, [name]);

  if (!open) return null;

  return (
    <div className={s.modalWindow} onMouseDown={closeModal}>
      <div
        className={`${s.modalField} ${modalClass}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <svg className={s.closeModal} onClick={closeModal}>
          <use xlinkHref={`${sprite}#icon-x-close`} />
        </svg>
        {children}
      </div>
    </div>
  );
};

export default CoreModal;
