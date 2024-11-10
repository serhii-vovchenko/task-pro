import { useState } from 'react';
import Modal from 'react-modal';
import NeedHelpForm from "../../NeedHelpForm/NeedHelpForm"
import sprite from '../../../img/icons.svg'
import plant from '../../../img/plant_2x.webp';
import s from './NeedHelp.module.css';
import ReusableModal from '../../ReusableModal/ReusableModal';

Modal.setAppElement('#root');

const NeedHelp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={s.helpBox}>
      <img
        src={plant}
        alt="WelcomeIMG"
        className={s.plantImg}
        width="54"
        height="78"
      />
      <p className={s.helpBoxText}>
        If you need help with <span>TaskPro</span>, check out our support
        resources or reach out to our customer support team.
      </p>
      <button className={s.helpButton} onClick={openModal}>
        <svg className={s.helpBtnIcon} height="20" width="20">
          <use href={`${sprite}#icon-help-circle`} />
        </svg>
        <span>Need help?</span>
      </button>
      {isModalOpen && <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <NeedHelpForm onClose={closeModal} />
      </ReusableModal>}

    </div>
  );
};

export default NeedHelp;

