import s from './BoardList.module.css';
import sprite from '../../../../src/img/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
// import { selectBoards } from '../../../redux/dashboard/boards/selectors';
import { useEffect } from 'react';
import { getBoardThunk } from '../../../redux/dashboard/boards/operations';

const BoardList = () => {
  // const { boards } = useSelector(selectBoards);
  const boards = [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardThunk());
  }, [dispatch]);

  return (
    <ul className={s.boardList}>
      {boards.map(board => (
        <li key={board.id} className={s.boardItem}>
          <div className={s.titleBox}>
            <svg className={s.titleBoxIcon} height="18" width="18">
              <use href={`${sprite}#icon-project`} />
            </svg>
            <p className={s.titleBoxTitle}>{board.title || 'Project office'}</p>
          </div>
          <div className={s.btnBox}>
            <button className={s.btnBoxButton}>
              <svg className={s.btnBoxIcon} height="16" width="16">
                <use href={`${sprite}#icon-pencil`} />
              </svg>
            </button>
            <button className={s.btnBoxButton}>
              <svg className={s.btnBoxIcon} height="16" width="16">
                <use href={`${sprite}#icon-trash`} />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BoardList;
