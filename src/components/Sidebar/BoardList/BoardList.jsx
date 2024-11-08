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
import { clearCurrentBoard } from '../../../redux/dashboard/currentBoard/slice';

const BoardList = () => {
  const { boards, selectLoading } = useSelector(selectBoards);

  const dispatch = useDispatch();
  const getBoardInfo = id => {
    dispatch(getBoardById(id));
  };

  useEffect(() => {
    dispatch(getBoardThunk());
    console.log('getBoardThunk');
  }, [dispatch]);

  useEffect(() => {
    if (!selectLoading) {
      if (boards.length > 0) {
        const firstBoardId = boards[0]?._id;

        if (firstBoardId) {
          dispatch(getCurrentBoard(firstBoardId));
        }
      } else {
        dispatch(clearCurrentBoard());
      }
    }
  }, [dispatch, boards, selectLoading]);

  const handleDelete = boardId => {
    dispatch(deleteBoard(boardId))
      .then(() => {
        dispatch(getBoardThunk());
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
          className={clsx(s.boardItem, board.isActive && s.activeBoard)}
          onClick={() => getBoardInfo(board._id)}
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
