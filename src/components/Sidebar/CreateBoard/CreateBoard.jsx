import s from './CreateBoard.module.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import sprite from '../../../img/icons.svg';
import noBack from '../../../img/bg/bg-10-desk.jpg';
import { addBoard } from '../../../redux/dashboard/boards/operations.js';

const icons = [
  { id: 'icon-project', name: 'Project' },
  { id: 'icon-star', name: 'Star' },
  { id: 'icon-loading', name: 'Loading' },
  { id: 'icon-container', name: 'Container' },
  { id: 'icon-lightning', name: 'Lightning' },
  { id: 'icon-colors', name: 'Colors' },
  { id: 'icon-hexagon', name: 'Hexagon' },
  { id: 'icon-pencil', name: 'Pencil' },
];

const backgrounds = [
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vlk8bztf90uy6itveqjl.png',
    alt: 'cappodocia',
    key: 'cappodocia',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/v0wt4bwax3bhdlag1ziv.png',
    alt: 'baloon',
    key: 'baloon',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/c08fbwcqicwfqwksxsyx.png',
    alt: 'clouds',
    key: 'clouds',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sey0nharzdv7uzxpt98w.png',
    alt: 'fullMoon',
    key: 'full-moon',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220069/backgrounds/mini/lfrtnx9rqh3koliovr7h.png',
    alt: 'halfMoon',
    key: 'half-moon',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/oyfwjk41qpxsud8g8ri9.png',
    alt: 'magnolia',
    key: 'magnolia',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjuxoyg5cjxzpk30oeoe.png',
    alt: 'mountains',
    key: 'mountains',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjyionahp9lthpybw5sg.png',
    alt: 'nightTrailer',
    key: 'night-trailer',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sce6oy35czbj7yb9osoe.png',
    alt: 'palmLeaves',
    key: 'palm-leaves',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/whne8ssdvejvamukn7sc.png',
    alt: 'rockyBeach',
    key: 'rocky-beach',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/womdt7hq0ngnofzbuhgu.png',
    alt: 'sakura',
    key: 'sakura',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/tqbovopj2qyuln6ing9o.png',
    alt: 'sea',
    key: 'sea',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/csxhywowypy9arxzig17.png',
    alt: 'starrySky',
    key: 'starry-sky',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vaxhftlahpyrpje3itvb.png',
    alt: 'violetCircle',
    key: 'violet-circle',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/pgjqswykxm1qukwfyic0.png',
    alt: 'yacht',
    key: 'yacht',
  },
];

export const NewBoard = ({ closeModal }) => {
  const [iconsSelected, setIconsSelected] = useState('icon-project');
  const [backgroundSelected, setBackgroundSelected] = useState('no-background');
  const [title, setTitle] = useState('');
  const modalRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTitleChange = event => setTitle(event.target.value);
  const handleIconChange = event =>
    setIconsSelected(event.currentTarget.dataset.source);
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
      document.removeEventListener('mousedown', handleClickOutside); // Очищаем обработчик при размонтировании
    };
  }, [closeModal]);

  const newBoardObject = {
    title,
    icon: iconsSelected,
    background: backgroundSelected,
  };

  const createNewBoard = () => {
    dispatch(addBoard(newBoardObject));
    closeModal();
    navigate(`/${title}`);
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
          <h2 className={s.textNew}>New board</h2>
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
            {icons.map(icon => (
              <li key={icon.id}>
                <input
                  type="radio"
                  value={icon.id}
                  name="icons"
                  className={s.inputRad}
                  checked={iconsSelected === icon.id}
                  onChange={handleIconChange}
                />
                <svg className={s.svgIcon} width="24" height="24">
                  <use href={`${sprite}#${icon.id}`} />
                </svg>
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
            {backgrounds.map(bg => (
              <li
                key={bg.key}
                className={
                  backgroundSelected === bg.key ? s.listItemActive : s.listItem
                }
              >
                <input
                  type="radio"
                  name="backgrounds"
                  data-source={bg.key}
                  className={s.inputBack}
                  checked={backgroundSelected === bg.key}
                  onChange={handleBackgroundChange}
                />
                <img src={bg.source} alt={bg.alt} className={s.img_back} />
              </li>
            ))}
          </ul>
          <button className={s.mainButton} onClick={createNewBoard}>
            <div className={s.plusBtnOff}>
              <svg className={s.addBtnIcon} height="32" width="32">
                <use href={`${sprite}#icon-plus`} />
              </svg>
            </div>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBoard;
