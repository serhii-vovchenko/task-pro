import ColumnList from '../ColumnsList/ColumnsList';
import s from './ScreensPage.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../../src/redux/dashboard/currentBoard/selectors';
import { useEffect } from 'react';

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
      <ColumnList />
    </div>
  );
};

export default ScreensPage;
