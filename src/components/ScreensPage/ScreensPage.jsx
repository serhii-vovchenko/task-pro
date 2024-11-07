import ColumnList from './ColumnsList/ColumnsList';
import s from './ScreensPage.module.css';

const ScreensPage = () => {
  return (
    <div className={s.screenPage}>
      <h1>Screens Page</h1>
      <ColumnList />
      {/* <Column title="To Do" />
      <Column title="In Progress" />
      <Column title="Done" /> */}
    </div>
  );
};

export default ScreensPage;
