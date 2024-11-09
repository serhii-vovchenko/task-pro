import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../../src/redux/dashboard/currentBoard/selectors';
import { useEffect } from 'react';
import s from './ScreensPage.module.css';
import MainDashboard from '../MainDashboard/MainDashboard';

const ScreensPage = () => {
  const { currentBoard } = useSelector(selectCurrentBoard);

  useEffect(() => {
    console.log('Current Board Updated:', currentBoard);
  }, [currentBoard]);

  return (
    <div
      className={s.screenPage}
      style={{
        backgroundImage: `url(${currentBoard?.backgrounds?.resolution?.desktop})`,
        backgroundSize: 'cover',
      }}
    >
      <h1>Screens Page</h1>
      <MainDashboard />
    </div>
  );
};

export default ScreensPage;
