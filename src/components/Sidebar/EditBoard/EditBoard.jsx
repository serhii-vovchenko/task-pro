import s from './EditBoard.module.css'; // Create EditBoard.module.css for styling
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import sprite from '../../../img/icons.svg';
import noBack from '../../../img/bg/bg-10-desk.jpg';
import {
  updateBoard,
  getBoardThunk,
} from '../../../redux/dashboard/boards/operations.js';
import { icons } from '../../../../public/db/icons.js';
import { backgrounds } from '../../../../public/db/backgrounds.js';
import { selectCurrentBoard } from '../../../redux/dashboard/currentBoard/selectors';

import SvgIcon from '../../SvgIcon/SvgIcon';

export const EditBoard = ({ closeModal }) => {
  const { currentBoard } = useSelector(selectCurrentBoard);
  const [iconsSelected, setIconsSelected] = useState(
    currentBoard?.iconName || icons[0]?.name || '1_icon-project'
  );
  const [backgroundSelected, setBackgroundSelected] = useState(
    currentBoard?.backgroundName || backgrounds[0]?.name || 'bg-2'
  );
  const [title, setTitle] = useState(currentBoard?.title || '');
  const modalRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTitleChange = event => setTitle(event.target.value);
  const handleIconChange = event => {
    setIconsSelected(event.currentTarget.dataset.source);
  };
  const handleBackgroundChange = event =>
    setBackgroundSelected(event.currentTarget.dataset.source);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const updatedBoardObject = {
    _id: currentBoard?._id,
    title,
    iconName: iconsSelected,
    backgroundName: backgroundSelected,
  };

  const updateExistingBoard = async () => {
    try {
      await dispatch(updateBoard(updatedBoardObject)); // Pass the entire object
      closeModal();
      dispatch(getBoardThunk());
    } catch (error) {
      console.error('Error updating board:', error);
      // Handle the error, maybe display an error message to the user
    }
  };

  return (
    <div className={s.modalOverlay} ref={modalRef}>
      <div
        className={s.modalOverlay}
        onClick={e => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className={s.divCard}>
          <h2 className={s.textNew}>Edit board</h2>
          <button onClick={closeModal}>
            <svg className={s.iconClose} height="32" width="32">
              <use href={`${sprite}#icon-x-close`} />
            </svg>
          </button>
          <input
            className={s.titleInput}
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />

          <h3 className={s.textIcons}>Icons</h3>
          <ul className={s.listDarkIcons}>
            {icons.map((icon, index) => (
              <li key={index}>
                {' '}
                <input
                  type="radio"
                  value={icon.name}
                  name="icons"
                  className={s.inputRad}
                  data-source={icon.name}
                  checked={iconsSelected === icon.name}
                  onChange={handleIconChange}
                />
                <SvgIcon
                  url={icon.iconUrl}
                  active={iconsSelected === icon.name}
                />
              </li>
            ))}
          </ul>
          <h3 className={s.textBackground}>Background</h3>
          <ul className={s.listColorIcons}>
            <li
              className={
                backgroundSelected === 'no-background'
                  ? s.listItemActive
                  : s.listItem
              }
            >
              <input
                type="radio"
                name="backgrounds"
                data-source="no-background"
                className={s.inputBack}
                checked={backgroundSelected === 'no-background'}
                onChange={handleBackgroundChange}
              />
              <img src={noBack} alt="no-background" className={s.img_back} />
            </li>
            {backgrounds.map((bg, index) => (
              <li
                key={index}
                className={
                  backgroundSelected === bg.name ? s.listItemActive : s.listItem
                }
              >
                <input
                  type="radio"
                  name="backgrounds"
                  data-source={bg.name}
                  className={s.inputBack}
                  checked={backgroundSelected === bg.name}
                  onChange={handleBackgroundChange}
                />
                <img src={bg.modalUrl} alt={bg.name} className={s.img_back} />
              </li>
            ))}
          </ul>
          <button className={s.mainButton} onClick={updateExistingBoard}>
            <div className={s.plusBtnOff}>
              <svg className={s.addBtnIcon} height="32" width="32">
                <use href={`${sprite}#icon-plus`} />
              </svg>
            </div>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
