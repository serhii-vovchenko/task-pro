import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../../src/redux/dashboard/currentBoard/selectors';
import { selectLoading } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import s from './ScreensPage.module.css';
import MainDashboard from '../MainDashboard/MainDashboard';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import DefaultTextHome from '../DefaultTextHome/DefaultTextHome';

const ScreensPage = () => {
  const { currentBoard } = useSelector(selectCurrentBoard);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    // console.log('Current Board Updated:', currentBoard);
  }, [currentBoard]);

  return currentBoard ? (
    isLoading || (
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
    )
  ) : (
    <DefaultTextHome />
  );
};

export default ScreensPage;
