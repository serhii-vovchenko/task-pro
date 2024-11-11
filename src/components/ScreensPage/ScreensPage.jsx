import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectCurrentBoard } from '../../redux/dashboard/currentBoard/selectors';
import MainDashboard from '../MainDashboard/MainDashboard';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import DefaultTextHome from '../DefaultTextHome/DefaultTextHome';
import s from './ScreensPage.module.css';
import {
  toggleCreateBoard,
  toggleUpdateBoar,
} from '../../redux/dashboard/modals/slice';
import CreateBoard from './../Sidebar/CreateBoard/CreateBoard';
import { setActiveBoard } from '../../redux/dashboard/boards/slice';
import { getCurrentBoard } from '../../redux/dashboard/currentBoard/operations';
import EditBoard from '../Sidebar/EditBoard/EditBoard';

const ScreensPage = () => {
  const { currentBoard } = useSelector(selectCurrentBoard);

  useEffect(() => {}, [currentBoard]);

  const getBackgroundImageUrl = () => {
    if (currentBoard?.backgrounds?.name === 'bg-0') {
      return 'none';
    }

    const screenWidth = window.innerWidth;
    let resolution;

    if (screenWidth < 768) {
      resolution = 'mobile';
    } else if (screenWidth < 1280) {
      resolution = 'tablet';
    } else {
      resolution = 'desktop';
    }

    return `url(${currentBoard?.backgrounds?.resolution?.[resolution]})`;
  };

  // ===============================================================================
  // const [isEditing, setIsEditing] = useState(false);
  const isAddBoardOpen = useSelector(state => state.modals.isCreateBoardOpen);
  const updateBoardIsOpen = useSelector(
    state => state.modals.isUpdateBoardOpen
  );

  const dispatch = useDispatch();
  const toggleAddBoard = () => {
    dispatch(toggleCreateBoard());
  };

  const closeEditModal = async () => {
    // setIsEditing(false);
    dispatch(toggleUpdateBoar());

    const updatedBoardId = currentBoard?._id;
    if (updatedBoardId) {
      dispatch(setActiveBoard(updatedBoardId));
      dispatch(getCurrentBoard(updatedBoardId));
    }
  };

  // =================================================================================

  return !currentBoard?.loading ? (
    <div
      className={s.screenPage}
      style={{
        backgroundImage: getBackgroundImageUrl(),
        backgroundSize: 'cover',
      }}
    >
      <HeaderDashboard />
      <MainDashboard />
      {isAddBoardOpen && <CreateBoard closeModal={toggleAddBoard} />}
      {updateBoardIsOpen && <EditBoard closeModal={closeEditModal} />}
    </div>
  ) : (
    <>
      <DefaultTextHome />
      {updateBoardIsOpen && <CreateBoard closeModal={toggleAddBoard} />}
    </>
  );
};

export default ScreensPage;
