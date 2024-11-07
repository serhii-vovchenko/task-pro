import s from './CreateBoard.module.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import sprite from '../../../img/icons.svg';
import noBack from '../../../img/bg/bg-10-desk.jpg';
import { addBoard } from '../../../redux/dashboard/boards/operations.js';

const icons = [
  { id: 'icon-project', name: 'Project', iconName: '1_icon-project' },
  { id: 'icon-star', name: 'Star', iconName: '2_icon-star' },
  { id: 'icon-loading', name: 'Loading', iconName: '3_icon-loading' },
  { id: 'icon-container', name: 'Container', iconName: '3_icon-container' },
  { id: 'icon-lightning', name: 'Lightning', iconName: '3_icon-lightning' },
  { id: 'icon-colors', name: 'Colors', iconName: '3_icon-colors' },
  { id: 'icon-hexagon', name: 'Hexagon', iconName: '3_icon-hexagon' },
  { id: 'icon-pencil', name: 'Pencil', iconName: '3_icon-pencil' },
];

const backgrounds = [
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vlk8bztf90uy6itveqjl.png',
    alt: 'cappodocia',
    key: 'bg-1',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/v0wt4bwax3bhdlag1ziv.png',
    alt: 'baloon',
    key: 'bg-2',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/c08fbwcqicwfqwksxsyx.png',
    alt: 'clouds',
    key: 'bg-3',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sey0nharzdv7uzxpt98w.png',
    alt: 'fullMoon',
    key: 'bg-4',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220069/backgrounds/mini/lfrtnx9rqh3koliovr7h.png',
    alt: 'halfMoon',
    key: 'bg-5',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/oyfwjk41qpxsud8g8ri9.png',
    alt: 'magnolia',
    key: 'bg-6',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjuxoyg5cjxzpk30oeoe.png',
    alt: 'mountains',
    key: 'bg-7',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjyionahp9lthpybw5sg.png',
    alt: 'nightTrailer',
    key: 'bg-8',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sce6oy35czbj7yb9osoe.png',
    alt: 'palmLeaves',
    key: 'bg-9',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/whne8ssdvejvamukn7sc.png',
    alt: 'rockyBeach',
    key: 'bg-10',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/womdt7hq0ngnofzbuhgu.png',
    alt: 'sakura',
    key: 'bg-11',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/tqbovopj2qyuln6ing9o.png',
    alt: 'sea',
    key: 'bg-12',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/csxhywowypy9arxzig17.png',
    alt: 'starrySky',
    key: 'bg-13',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vaxhftlahpyrpje3itvb.png',
    alt: 'violetCircle',
    key: 'bg-14',
  },
  {
    source:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/pgjqswykxm1qukwfyic0.png',
    alt: 'yacht',
    key: 'bg-15',
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
  const handleIconChange = event => {
    const selectedIconId = event.currentTarget.dataset.source;
    const selectedIcon = icons.find(icon => icon.id === selectedIconId);
    setIconsSelected(selectedIcon ? selectedIcon.iconName : '1_icon-project');
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

  const newBoardObject = {
    title,
    iconName: iconsSelected,
    backgroundName: backgroundSelected,
  };

  const createNewBoard = () => {
    dispatch(addBoard(newBoardObject));
    closeModal();
    // navigate(`boards/${title._id}`);
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
