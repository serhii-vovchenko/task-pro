import sprite from '../../../../src/img/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards } from '../../../redux/dashboard/boards/selectors';
import { useEffect, useRef } from 'react';
import {
  deleteBoard,
  getBoardThunk,
} from '../../../redux/dashboard/boards/operations';
import SvgIcon from '../../SvgIcon/SvgIcon';
import clsx from 'clsx';
import { getCurrentBoard } from '../../../redux/dashboard/currentBoard/operations';
import { selectCurrentBoard } from '../../../redux/dashboard/currentBoard/selectors';
import { clearCurrentBoard } from '../../../redux/dashboard/currentBoard/slice';
import { setActiveBoard } from '../../../redux/dashboard/boards/slice';
import { toggleUpdateBoar } from '../../../redux/dashboard/modals/slice';
import { selectIsLoggedIn, selectLoading } from '../../../redux/auth/selectors';
import s from './BoardList.module.css';

const BoardList = () => {
  const { boards } = useSelector(selectBoards);
  const { currentBoard } = useSelector(selectCurrentBoard);
  const hasFetchedOnce = useRef(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const getBoardInfo = id => {
    dispatch(getCurrentBoard(id));
  };

  useEffect(() => {
    const fetchBoardsAndSetActive = async () => {
      if (!isLoggedIn || isLoading || hasFetchedOnce.current) return;

      dispatch(getBoardThunk())
        .then(res => {
          const boards = res.payload;
          if (Array.isArray(boards) && boards.length > 0) {
            const currentBoardId = localStorage.getItem('currentId');

            if (currentBoardId) {
              const currentBoard = boards.find(
                board => board._id === JSON.parse(currentBoardId)
              );

              if (currentBoard) {
                dispatch(getCurrentBoard(currentBoard._id));
              } else {
                dispatch(clearCurrentBoard());
                localStorage.removeItem('currentId');
              }
            } else {
              const activeBoard = boards.find(board => board.isActive);

              if (activeBoard) {
                dispatch(getCurrentBoard(activeBoard._id));
              } else {
                dispatch(getCurrentBoard(boards[0]._id));
                localStorage.setItem(
                  'currentId',
                  JSON.stringify(boards[0]._id)
                );
              }
            }
          } else {
            dispatch(clearCurrentBoard());
            localStorage.removeItem('currentId');
          }
        })
        .catch(error => {
          console.error('Error fetching boards:', error);
          dispatch(clearCurrentBoard());
          localStorage.removeItem('currentId');
        });
    };
    if (!hasFetchedOnce.current) {
      fetchBoardsAndSetActive();
      hasFetchedOnce.current = true;
    }
  }, [dispatch, isLoggedIn, isLoading]);

  const handleDelete = boardId => {
    const isLastBoard = boards.length === 1;
    const boardIndex = boards.findIndex(board => board._id === boardId);

    if (isLastBoard) {
      dispatch(deleteBoard(boardId)).then(() => dispatch(clearCurrentBoard()));
    } else {
      dispatch(deleteBoard(boardId)).then(() => {
        if (boardIndex === 0 && boards.length > 1) {
          dispatch(setActiveBoard(boards[1]._id));
          dispatch(getCurrentBoard(boards[1]._id));
        } else if (boardIndex === boards.length - 1) {
          dispatch(setActiveBoard(boards[boards.length - 2]._id));
          dispatch(getCurrentBoard(boards[boards.length - 2]._id));
        } else {
          dispatch(setActiveBoard(boards[boardIndex - 1]._id));
          dispatch(getCurrentBoard(boards[boardIndex - 1]._id));
        }
      });
    }
  };

  const handleEdit = () => {
    dispatch(toggleUpdateBoar());
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
              <SvgIcon
                url={board.icon?.iconUrl}
                active={board._id === currentBoard?._id}
              />
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
    </div>
  );
};

export default BoardList;
