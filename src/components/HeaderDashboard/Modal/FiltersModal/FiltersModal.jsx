import { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectPriority } from '../../../../redux/dashboard/boards/slice';
import { updateBoard } from '../../../../redux/dashboard/boards/operations';
import { selectCurrentBoard } from '../../../../redux/dashboard/boards/selectors';
import s from './FiltersModal.module.css';

const priorityOptions = ['without', 'low', 'medium', 'high'];

const FiltersModal = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);

  const [selectedLabel, setSelectedLabel] = useState('');

  const initialValues = {
    label: selectedLabel,
  };

  const handleLabelSelection = label => {
    setSelectedLabel(label);
  };

  return (
<div className={s.container}>
  <h2 className={s.containerTitle}>Filters</h2>
  <Formik initialValues={initialValues}>
    <form className={s.modalForm}>
      <div className={s.formWrapper}>
        <h3 className={s.formTitle}>Label color</h3>
        <p className={s.showAllLabel} onClick={() => dispatch(selectPriority('show all'))}>
          Show all
        </p>
        <div className={s.radioBtnWrapper}>
          {priorityOptions.map((priority, idx) => (
            <div
              className={s.wrapper}
              key={idx}
              onClick={() => {
                handleLabelSelection(priority);
                dispatch(selectPriority(priority));
              }}
            >
              <label
                className={`${s.label} ${selectedLabel === priority ? 'active' : ''}`}
                value={priority}
              >
                <div
                  className={`${s.labelItem} ${selectedLabel === priority ? 'active' : ''} ${
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
                <input type="radio" className={s.defaultRadioBtn} value={priority} name="label" />
              </label>

              <p className={`${s.labelText} ${selectedLabel === priority ? 'active' : ''}`}>
                {priority === 'without'
                  ? `${priority[0].toUpperCase() + priority.slice(1)} priority`
                  : priority[0].toUpperCase() + priority.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </form>
  </Formik>
</div>
  );
};

export default FiltersModal;
