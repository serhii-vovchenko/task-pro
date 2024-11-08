import s from './BoardList.module.css';
import sprite from '../../../../src/img/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards } from '../../../redux/dashboard/boards/selectors';
import { useEffect } from 'react';
import {
  deleteBoard,
  getBoardById,
  getBoardThunk,
} from '../../../redux/dashboard/boards/operations';
import SvgIcon from '../../SvgIcon/SvgIcon';
import clsx from 'clsx';
import { getCurrentBoard } from '../../../redux/dashboard/currentBoard/operations';
import { selectCurrentBoard } from '../../../redux/dashboard/currentBoard/selectors';
import { clearCurrentBoard } from '../../../redux/dashboard/currentBoard/slice';

const BoardList = () => {
  const { boards, selectLoading } = useSelector(selectBoards);
  const { currentBoard } = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const getBoardInfo = id => {
    dispatch(getCurrentBoard(id)); // Dispatch getCurrentBoard instead of getBoardById
  };

  useEffect(() => {
    dispatch(getBoardThunk());
    console.log('getBoardThunk');
  }, [dispatch]);

  useEffect(() => {
    if (!selectLoading) {
      if (boards.length > 0) {
        const activeBoard = boards.find(board => board.isActive);
        const boardToDispatch = activeBoard || boards[0];

        dispatch(getCurrentBoard(boardToDispatch._id));
      }
    } else {
      dispatch(clearCurrentBoard());
    }
  }, [dispatch, boards, selectLoading]);

  const handleDelete = boardId => {
    dispatch(deleteBoard(boardId))
      .then(() => {
        dispatch(getBoardById(boards[0]._id));
      })
      .catch(error => {
        console.error('Error during board delete:', error);
      });
  };

  return (
    <ul className={s.boardList}>
      {boards.map((board, index) => (
        <li
          key={board._id || index}
          className={clsx(
            s.boardItem,
            board._id === currentBoard?._id && s.activeBoard
          )}
          onClick={() => getBoardInfo(board._id)}
        >
          <div
            className={s.titleBox}
            onClick={() => dispatch(getBoardById(board._id))}
          >
            {board.isActive ? (
              <SvgIcon url={board.icon?.iconUrl} active />
            ) : (
              <SvgIcon url={board.icon?.iconUrl} />
            )}
            <p
              className={clsx(
                s.titleBoxTitle,
                board._id === currentBoard?._id && s.titleBoxTitleActive // Apply active class based on currentBoard
              )}
            >
              {board.title}
            </p>
          </div>
          {board._id === currentBoard?._id && ( // Use currentBoard to check for active board
            <div className={s.btnBox}>
              <button className={s.btnBoxButton}>
                <svg className={s.btnBoxIcon} height="16" width="16">
                  <use href={`${sprite}#icon-pencil`} />
                </svg>
              </button>
              <button
                type="button"
                className={s.btnBoxButton}
                onClick={() => handleDelete(board._id || index)}
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
