import { useState } from 'react';
import sprite from '../../../img/icons.svg';
import s from './Filters.module.css';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedPriority } from '../../../redux/dashboard/currentBoard/selectors';
import { setSelectedPriority } from '../../../redux/dashboard/currentBoard/slice';

const Filters = ({ handleClose }) => {
  const [modalClass, setModalClass] = useState('');
  const dispatch = useDispatch();
  const selectedPriority = useSelector(selectSelectedPriority);

  const initialValues = {
    label: selectedPriority,
  };

  const priorityOptions = ['none', 'low', 'medium', 'high'];

  const handleLabelSelection = label => {
    dispatch(setSelectedPriority(label));
  };

  if (!handleClose) return null;

  return (
    <div className={s.modalWindow} onMouseDown={handleClose}>
      <div
        className={`${s.modalField} ${modalClass}`}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className={s.headerWrapper}>
          <h3 className={s.containerTitle}>Filters</h3>
          <svg
            className={s.closeModal}
            width="18"
            height="18"
            onClick={handleClose}
          >
            <use xlinkHref={`${sprite}#icon-x-close`} />
          </svg>
        </div>
        <Formik initialValues={initialValues}>
          <form className={s.modalForm}>
            <div className={s.colorWrapper}>
              <p className={s.formTitle}>Label color</p>
              <p
                className={s.showAllLabel}
                onClick={() => handleLabelSelection('all')}
              >
                Show all
              </p>
            </div>

            <ul className={s.listWrapper}>
              {priorityOptions.map((priority, idx) => (
                <li
                  className={s.listItem}
                  key={idx}
                  onClick={() => handleLabelSelection(priority)}
                >
                  <label
                    className={`${s.label} ${
                      selectedPriority === priority ? 'active' : ''
                    }`}
                    value={priority}
                  >
                    <div
                      className={`${s.labelItem} ${
                        selectedPriority === priority ? 'active' : ''
                      } ${
                        priority === 'none'
                          ? s.priorityWithout
                          : priority === 'low'
                          ? s.priorityLow
                          : priority === 'medium'
                          ? s.priorityMedium
                          : s.priorityHigh
                      }`}
                      value={priority}
                    />
                    <input
                      type="radio"
                      className={s.defaultRadioBtn}
                      value={priority}
                      name="label"
                      checked={selectedPriority === priority}
                      onChange={() => handleLabelSelection(priority)}
                    />
                  </label>

                  <p
                    className={`${s.labelText} ${
                      selectedPriority === priority ? 'active' : ''
                    }`}
                  >
                    {priority === 'none'
                      ? `Without priority`
                      : priority[0].toUpperCase() + priority.slice(1)}
                  </p>
                </li>
              ))}
            </ul>
          </form>
        </Formik>
      </div>
    </div>
  );
};

export default Filters;
