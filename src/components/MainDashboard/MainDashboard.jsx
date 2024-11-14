import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Column from '../Column/Column.jsx';
import AddColumn from '../AddColumn/AddColumn.jsx';
import ReusableModal from '../ReusableModal/ReusableModal.jsx';
import sprite from '../../img/icons.svg';
import { deleteColumn } from '../../redux/dashboard/columns/operations.js';
import {
  currentBoard,
  selectBoardColumns,
  selectCurrentBoard,
} from '../../redux/dashboard/currentBoard/selectors.js';
import { useNavigate } from 'react-router-dom';
import s from './MainDashboard.module.css';

const ColumnList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const columns = useSelector(selectBoardColumns);
  const activeBoard = useSelector(currentBoard);
  const isLoading = useSelector(state => selectCurrentBoard(state).isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if ((isLoading && activeBoard?._id) || activeBoard === null) {
      navigate(`/home`);
    } else if (activeBoard?._id) {
      navigate(`/home/${activeBoard._id}`, { replace: true });
    }
  }, [activeBoard, isLoading, navigate]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        <AnimatePresence>
          {columns.map(item => (
            <motion.li
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Column
                title={item.title}
                id={item._id}
                onDelete={() => dispatch(deleteColumn(item._id))}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <button className={s.button} type="button" onClick={openModal}>
        <svg className={s.icon} height="28" width="28">
          <use href={`${sprite}#icon-plus`} />
        </svg>
        <span className={s.text}>Add another column</span>
      </button>
      <ReusableModal isOpen={isModalOpen} onClose={closeModal}>
        <AddColumn closeModal={closeModal} />
      </ReusableModal>
    </div>
  );
};

export default ColumnList;
