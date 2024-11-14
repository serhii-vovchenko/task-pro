import Modal from 'react-modal';
import s from './ReusableModal.module.css';
import sprite from '../../img/icons.svg';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '24px',
    overflow: 'auto',
    borderRadius: '8px',
    borderColor: 'var(--modal-border)',
    borderWidth: '1px',
    backgroundColor: 'var(--modal-bg)',
  },
  overlay: {
    backgroundColor: 'var(--backdrop)',
    zIndex: '100',
  },
};

Modal.setAppElement('#root');

function ReusableModal({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      closeTimeoutMS={200} 
      style={customStyles}
      contentLabel="Modal"
    >
      <button onClick={onClose} className={s.button}>
        <svg className={s.icon}>
          <use href={`${sprite}#icon-x-close`} />
        </svg>
      </button>
      {children}
    </Modal>
  );
}

export default ReusableModal;
