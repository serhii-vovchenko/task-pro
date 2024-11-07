import s from './Sidebar.module.css';
import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import CreateBoard from './CreateBoard/CreateBoard';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/dashboard/modals/slice';

const Sidebar = () => {
  const isSidebarOpen = useSelector(state => state.modals.isSidebarOpen);

  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <aside className={clsx(s.sidebar, isSidebarOpen && s.sidebarIsOpen)}>
        <div>
          <Logo />
          <CreateBoard />
        </div>
        <BoardList />
        <div>
          <NeedHelp />
          <Logout />
        </div>
      </aside>
      {isSidebarOpen && (
        <div className={s.overlay} onClick={closeSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
