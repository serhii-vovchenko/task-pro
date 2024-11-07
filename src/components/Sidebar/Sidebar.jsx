import s from './Sidebar.module.css';
import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import CreateBoard from './CreateBoard/CreateBoard';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/dashboard/modals/slice';
import { useState } from 'react';
import sprite from '../../img/icons.svg';

const Sidebar = () => {
  const isSidebarOpen = useSelector(state => state.modals.isSidebarOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };

  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const openAddBoard = () => setIsAddBoardOpen(true);
  const closeAddBoard = () => setIsAddBoardOpen(false);

  return (
    <aside className={clsx(s.sidebar, isSidebarOpen && s.sidebarIsOpen)}>
      <div>
        <Logo />
        <CreateBoard />
      </div>
      <h2 className={s.sidebarTitle}>My boards</h2>
      <div className={s.createBoard}>
        <p className={s.createBoardTitle}>Create new board</p>
        <button type="submit" className={s.addBtn} onClick={openAddBoard}>
          <svg className={s.logoIcon} height="32" width="32">
            <use href={`${sprite}#icon-plus`} />
          </svg>
        </button>
      </div>
      <BoardList />
      <div>
        <NeedHelp closeModal={closeModal} />
        <Logout />
      </div>
      {isAddBoardOpen && (
        <div>
          <CreateBoard closeModal={closeAddBoard} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
