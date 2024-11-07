import s from './Sidebar.module.css';
import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import CreateBoard from './CreateBoard/CreateBoard';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import { useState } from 'react';
import sprite from '../../img/icons.svg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const openAddBoard = () => setIsAddBoardOpen(true);
  const closeAddBoard = () => setIsAddBoardOpen(false);

  return (
    <aside className={`${s.sidebar} ${isOpen ? s.isOpen : ''}`}>
      <div>
        <Logo />
      </div>
      <h2 className={s.sidebarTitle}>My boards</h2>
      <div className={s.createBoard}>
        <p className={s.createBoardTitle}>Create new board</p>
        <button type="submit" className={s.addBtn} onClick={openAddBoard}>
          <svg className={s.addBtnIcon} height="32" width="32">
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
