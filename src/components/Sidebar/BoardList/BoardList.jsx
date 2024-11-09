import s from './BoardList.module.css';
import sprite from '../../../../src/img/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards } from '../../../redux/dashboard/boards/selectors';
import { useEffect } from 'react';
import {
  deleteBoard,
  getBoardThunk,
} from '../../../redux/dashboard/boards/operations';
import SvgIcon from '../../SvgIcon/SvgIcon';
import clsx from 'clsx';
import { getCurrentBoard } from '../../../redux/dashboard/currentBoard/operations';
import { selectCurrentBoard } from '../../../redux/dashboard/currentBoard/selectors';
import { clearCurrentBoard } from '../../../redux/dashboard/currentBoard/slice';
import EditBoard from '../EditBoard/EditBoard';
import { useState } from 'react';

const BoardList = () => {
  const { boards, selectLoading } = useSelector(selectBoards);
  const { currentBoard } = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const getBoardInfo = id => {
    dispatch(getCurrentBoard(id));
  };

  useEffect(() => {
    dispatch(getBoardThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!selectLoading) {
      if (boards.length > 0) {
        const activeBoard = boards.find(board => board.isActive);
        const boardToDispatch = activeBoard || boards[0];
        getBoardInfo(boardToDispatch._id);
      }
    } else {
      dispatch(clearCurrentBoard());
    }
  }, [dispatch, boards, selectLoading]);

  const handleDelete = boardId => {
    dispatch(deleteBoard(boardId))
      .then(res => {
        if (res.type.includes('fulfilled') && boards.length > 0) {
          getBoardInfo(boards[0]._id);
        }
      })
      .catch(error => {
        console.error('Error during board delete:', error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <ul className={s.boardList}>
        {boards.map((board, index) => (
          <li
            key={board._id || index}
            className={clsx(
              s.boardItem,
              board._id === currentBoard?._id && s.activeBoard
            )}
            onClick={event => {
              if (!event.target.closest(`.${s.btnBoxButton}`)) {
                getBoardInfo(board._id);
              }
            }}
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
                  board._id === currentBoard?._id && s.titleBoxTitleActive
                )}
              >
                {board.title}
              </p>
            </div>
            {board._id === currentBoard?._id && (
              <div className={s.btnBox}>
                <button className={s.btnBoxButton} onClick={handleEdit}>
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
      {isEditing && <EditBoard closeModal={closeEditModal} />}
    </div>
  );
};

export default BoardList;
