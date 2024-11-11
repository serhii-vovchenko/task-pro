import s from './CreateBoard.module.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import sprite from '../../../img/icons.svg';
import {
  addBoard,
  getBoardThunk,
} from '../../../redux/dashboard/boards/operations.js';
import { icons } from '../../../../public/db/icons.js';
import { backgrounds } from '../../../../public/db/backgrounds.js';

import SvgIcon from '../../SvgIcon/SvgIcon';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too short!')
    .max(70, 'Too Long!')
    .required('This field is required!'),
});

export const NewBoard = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [iconsSelected, setIconsSelected] = useState(
    icons[0]?.name || '1_icon-project'
  );
  const [backgroundSelected, setBackgroundSelected] = useState('bg-0');
  const modalRef = useRef(null);

  const handleIconChange = (event, setFieldValue) => {
    const newIcon = event.currentTarget.dataset.source;
    setIconsSelected(newIcon);
    setFieldValue('iconName', newIcon);
  };

  const handleBackgroundChange = (event, setFieldValue) => {
    const newBackground = event.currentTarget.dataset.source;
    setBackgroundSelected(newBackground);
    setFieldValue('backgroundName', newBackground);
  };

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

  const createNewBoard = async values => {
    try {
      await dispatch(addBoard(values));
      closeModal();
      dispatch(getBoardThunk());
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const reorderedBackgrounds = backgrounds.sort((a, b) => {
    if (a.name === 'bg-0') return -1;
    if (b.name === 'bg-0') return 1;
    const nameA = parseInt(a.name.replace('bg-', ''), 10);
    const nameB = parseInt(b.name.replace('bg-', ''), 10);
    return nameA - nameB;
  });

  return (
    <div className={s.modalOverlay} ref={modalRef}>
      <div
        className={s.modalOverlay}
        onClick={e => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <Formik
          initialValues={{
            title: '',
            iconName: iconsSelected,
            backgroundName: backgroundSelected,
          }}
          onSubmit={createNewBoard}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className={s.divCard}>
                <h2 className={s.textNew}>New board</h2>
                <button onClick={closeModal}>
                  <svg className={s.iconClose} height="32" width="32">
                    <use href={`${sprite}#icon-x-close`} />
                  </svg>
                </button>
                <div className={s.fieldCont}>
                  <Field
                    className={s.titleInput}
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={s.errorMsg}
                  />
                </div>

                <h3 className={s.textIcons}>Icons</h3>
                <ul className={s.listDarkIcons}>
                  {icons.map((icon, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        value={icon.name}
                        name="iconName"
                        className={s.inputRad}
                        data-source={icon.name}
                        checked={values.iconName === icon.name}
                        onChange={event =>
                          handleIconChange(event, setFieldValue)
                        }
                      />
                      <SvgIcon
                        url={icon.iconUrl}
                        active={values.iconName === icon.name}
                      />
                    </li>
                  ))}
                </ul>
                <h3 className={s.textBackground}>Background</h3>
                <ul className={s.listColorIcons}>
                  {reorderedBackgrounds.map((bg, index) => (
                    <li
                      key={index}
                      className={
                        values.backgroundName === bg?.name
                          ? s.listItemActive
                          : s.listItem
                      }
                    >
                      <input
                        type="radio"
                        name="backgroundName"
                        data-source={bg.name}
                        className={s.inputBack}
                        checked={values.backgroundName === bg.name}
                        onChange={event =>
                          handleBackgroundChange(event, setFieldValue)
                        }
                      />
                      <img
                        src={bg.modalUrl}
                        alt={bg.name}
                        className={s.img_back}
                      />
                    </li>
                  ))}
                </ul>
                <button className={s.mainButton} type="submit">
                  <div className={s.plusBtnOff}>
                    <svg className={s.addBtnIcon} height="32" width="32">
                      <use href={`${sprite}#icon-plus`} />
                    </svg>
                  </div>
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewBoard;
