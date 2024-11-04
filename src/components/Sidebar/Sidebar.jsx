import s from './Sidebar.module.css';
import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import CreateBoard from './CreateBoard/CreateBoard';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleSidebar]);

  const Sidebar = () => {
    return (
      <aside
        ref={sidebarRef}
        className={`${s.sidebar} ${isOpen ? s.isOpen : ''}`}
      >
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
    );
  };
  Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  };
};

export default Sidebar;
