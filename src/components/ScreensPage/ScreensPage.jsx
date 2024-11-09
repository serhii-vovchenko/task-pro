import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../../src/redux/dashboard/currentBoard/selectors';
import { useEffect } from 'react';
import s from './ScreensPage.module.css';
import MainDashboard from '../MainDashboard/MainDashboard';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard.jsx'; 

const ScreensPage = () => {
  const { currentBoard } = useSelector(selectCurrentBoard);
  const headBoard = "Project Office";
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
      <div className={s.headBoard}>
        <HeaderDashboard title={headBoard} />
      </div>
      <MainDashboard />
    </div>
  );
};

export default ScreensPage;
