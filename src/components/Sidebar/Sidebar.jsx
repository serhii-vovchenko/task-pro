import s from './Sidebar.module.css';
import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import CreateBoard from './CreateBoard/CreateBoard';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';

const Sidebar = () => {
  return (
    <aside className={s.sidebar}>
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

export default Sidebar;
