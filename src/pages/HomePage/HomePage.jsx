import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../../components/ScreensPage/ScreensPage';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <Sidebar />
      <div className={s.columnTwo}>
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
