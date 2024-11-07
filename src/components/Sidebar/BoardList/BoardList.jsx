import s from './BoardList.module.css';
import sprite from '../../../../src/img/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBoards,
  selectLoading,
} from '../../../redux/dashboard/boards/selectors';
import { useEffect } from 'react';
import {
  deleteBoard,
  getBoardById,
  getBoardThunk,
} from '../../../redux/dashboard/boards/operations';
import SvgIcon from '../../SvgIcon/SvgIcon';
import clsx from 'clsx';
import { getCurrentBoard } from '../../../redux/dashboard/currentBoard/operations';

const BoardList = () => {
  const { boards, selectLoading } = useSelector(selectBoards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardThunk());
    console.log('getBoardThunk');
  }, [dispatch]);

  useEffect(() => {
    if (!selectLoading && boards.length > 0) {
      const activeBoard = boards.find(board => board.isActive)?._id || null;
      console.log('activeBoard');

      if (activeBoard) {
        dispatch(getCurrentBoard(activeBoard));
      }
    }
  }, [dispatch, boards, selectLoading]);

  // const handleDeleteBoard = id => {
  //   dispatch(deleteBoard(id));
  // };

  return (
    <ul className={s.boardList}>
      {boards.map((board, index) => (
        <li
          key={board._id || index}
          className={clsx(s.boardItem, board.isActive && s.activeBoard)}
          onClick={() => dispatch(getBoardById(board._id))}
        >
          <div className={s.titleBox}>
            {board.isActive ? (
              <SvgIcon url={board.icon?.iconUrl} active />
            ) : (
              <SvgIcon url={board.icon?.iconUrl} />
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

          {board.isActive && (
            <div className={s.btnBox}>
              <button className={s.btnBoxButton}>
                <svg className={s.btnBoxIcon} height="16" width="16">
                  <use href={`${sprite}#icon-pencil`} />
                </svg>
              </button>
              <button
                type="button"
                className={s.btnBoxButton}
                // onClick={handleDeleteBoard(board._id)}
              >
                <svg className={s.btnBoxIcon} height="16" width="16">
                  <use href={`${sprite}#icon-trash`} />
                </svg>
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BoardList;
