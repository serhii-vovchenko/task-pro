import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../redux/dashboard/currentBoard/selectors';
import MainDashboard from '../MainDashboard/MainDashboard';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import DefaultTextHome from '../DefaultTextHome/DefaultTextHome';
import s from './ScreensPage.module.css';

const ScreensPage = () => {
  const { currentBoard } = useSelector(selectCurrentBoard);

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
    </div>
  ) : (
    <DefaultTextHome />
  );
};

export default ScreensPage;
