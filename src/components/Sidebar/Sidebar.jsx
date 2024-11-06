import s from './Sidebar.module.css';
import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import CreateBoard from './CreateBoard/CreateBoard';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import PropTypes from 'prop-types';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`${s.sidebar} ${isOpen ? s.isOpen : ''}`}>
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

export default Sidebar;
