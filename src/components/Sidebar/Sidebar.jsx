import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCreateBoard,
  toggleSidebar,
} from '../../redux/dashboard/modals/slice';
import sprite from '../../img/icons.svg';
import s from './Sidebar.module.css';

const Sidebar = () => {
  const isSidebarOpen = useSelector(state => state.modals.isSidebarOpen);

  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };

  const toggleAddBoard = () => {
    dispatch(toggleCreateBoard());
  };

  return (
    <>
      <aside className={clsx(s.sidebar, isSidebarOpen && s.sidebarIsOpen)}>
        <div>
          <div>
            <Logo />
          </div>
          <h2 className={s.sidebarTitle}>My boards</h2>
          <div className={s.createBoard}>
            <p className={s.createBoardTitle}>Create a new board</p>
            <button type="submit" className={s.addBtn} onClick={toggleAddBoard}>
              <svg className={s.logoIcon} height="32" width="32">
                <use href={`${sprite}#icon-plus`} />
              </svg>
            </button>
          </div>
        </div>
        <BoardList />
        <div>
          <NeedHelp />
          <Logout />
        </div>
      </aside>
      <div
        className={clsx(s.overlay, isSidebarOpen && s.overlayIsVisible)}
        onClick={closeSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
