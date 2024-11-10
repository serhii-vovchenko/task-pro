import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../redux/dashboard/currentBoard/selectors';
import MainDashboard from '../MainDashboard/MainDashboard';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import DefaultTextHome from '../DefaultTextHome/DefaultTextHome';
import s from './ScreensPage.module.css';

const ScreensPage = () => {
  const { currentBoard } = useSelector(selectCurrentBoard);

  return !currentBoard?.loading ? (
    <div
      className={s.screenPage}
      style={{
        backgroundImage: `url(${currentBoard?.backgrounds?.resolution?.desktop})`,
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
