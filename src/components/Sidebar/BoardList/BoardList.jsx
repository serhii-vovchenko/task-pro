import s from './BoardList.module.css';
import sprite from '../../../../src/img/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards } from '../../../redux/dashboard/boards/selectors';
import { useEffect } from 'react';
import {
  getBoardById,
  getBoardThunk,
} from '../../../redux/dashboard/boards/operations';
import SvgIcon from '../../SvgIcon/SvgIcon';
import clsx from 'clsx';

const BoardList = () => {
  const { boards } = useSelector(selectBoards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardThunk());
  }, [dispatch]);

  return (
    <ul className={s.boardList}>
      {boards.map(board => (
        <li
          key={board._id}
          className={clsx(s.boardItem, board.isActive && s.activeBoard)}
          onClick={() => dispatch(getBoardById(board._id))}
        >
          <div className={s.titleBox}>
            {board.isActive ? (
              <SvgIcon url={board.icon.iconUrl} active />
            ) : (
              <SvgIcon url={board.icon.iconUrl} />
            )}
            <p
              className={clsx(
                s.titleBoxTitle,
                board.isActive && s.titleBoxTitleActive
              )}
            >
              {board.title}
            </p>
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
