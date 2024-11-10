import { useEffect, useState } from 'react';
import sprite from '../../../img/icons.svg';
import s from './Filters.module.css';
import { Formik } from 'formik';

const Filters = ({ handleClose }) => {
  const [modalClass, setModalClass] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('option1');
  const handleChange = event => {
    setSelectedFilter(event.target.value);
  };

  const initialValues = {
    label: selectedLabel,
  };

  const priorityOptions = ['without', 'low', 'medium', 'high'];
  const handleLabelSelection = label => {
    setSelectedLabel(label);
  };
  // useEffect(() => {
  //   if (name === 'Filters') {
  //     setModalClass(s.filter);
  //   } else {
  //     setModalClass('');
  //   }
  // }, [name]);

  if (!open) return null;

  return (
    <div className={s.modalWindow} onMouseDown={handleClose}>
      <div
        className={`${s.modalField} ${modalClass}`}
        onMouseDown={e => e.stopPropagation()}
      >
        <svg className={s.closeModal} onClick={handleClose}>
          <use xlinkHref={`${sprite}#icon-x-close`} />
        </svg>
        <div className={s.container}>
          <h2 className={s.containerTitle}>Filters</h2>
          <Formik initialValues={initialValues}>
            <form className={s.modalForm}>
              <div className={s.formWrapper}>
                <h3 className={s.formTitle}>Label color</h3>
                <p
                  className={s.showAllLabel}
                  // onClick={() => dispatch(selectPriority('show all'))}
                >
                  Show all
                </p>
                <div className={s.radioBtnWrapper}>
                  {priorityOptions.map((priority, idx) => (
                    <div
                      className={s.wrapper}
                      key={idx}
                      onClick={() => {
                        // handleLabelSelection(priority);
                        // dispatch(selectPriority(priority));
                      }}
                    >
                      <label
                        className={`${s.label} ${
                          selectedLabel === priority ? 'active' : ''
                        }`}
                        value={priority}
                      >
                        <div
                          className={`${s.labelItem} ${
                            selectedLabel === priority ? 'active' : ''
                          } ${
                            priority === 'without'
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
                        />
                      </label>

                      <p
                        className={`${s.labelText} ${
                          selectedLabel === priority ? 'active' : ''
                        }`}
                      >
                        {priority === 'without'
                          ? `${
                              priority[0].toUpperCase() + priority.slice(1)
                            } priority`
                          : priority[0].toUpperCase() + priority.slice(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Filters;
