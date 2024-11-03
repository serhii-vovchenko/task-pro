import { useSelector, useDispatch } from 'react-redux';
import { createBoard } from '../../redux/actions/boardActions';
import s from './Sidebar.module.css';
import sprite from '../../../src/img/icons.svg';
import plant from '../../img/plant_2x.webp';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../redux/auth/operations';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  // const boards = useSelector(state => state.board.boards);
  // const [newBoardName, setNewBoardName] = useState('');
  // const [selectedIcon, setSelectedIcon] = useState('icon1');
  // const [selectedBackground, setSelectedBackground] = useState('none');
  // const [error, setError] = useState('');

  // const handleCreateBoard = () => {
  //   if (!newBoardName) {
  //     setError('Board name is required');
  //     return;
  //   }

  //   dispatch(
  //     createBoard({
  //       name: newBoardName,
  //       icon: selectedIcon,
  //       background: selectedBackground,
  //     })
  //   );
  //   setNewBoardName('');
  //   setError('');
  //   toggleSidebar();
  // };

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <aside className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      <div>
        <div className={s.logoBox}>
          <svg className={s.logoIcon} height="32" width="32">
            <use href={`${sprite}#icon-logo`} />
          </svg>
          <h2 className={s.title}>Task Pro</h2>
        </div>
        <h3 className={s.subTitle}>My boards</h3>

        <div className={s.createBoardBox}>
          <p className={s.text}>Create a new board</p>
          {/* <button className={s.addButton} onClick={handleCreateBoard}>
              +
            </button> */}
          <button className={s.addButton}>
            <svg className={s.plusIconBtn} height="20" width="20">
              <use href={`${sprite}#icon-plus`} />
            </svg>
          </button>
        </div>
      </div>
      <ul className={s.boardList}>
        <li className={s.boardItem}>
          <div className={s.titleBox}>
            <svg className={s.titleBoxIcon} height="18" width="18">
              <use href={`${sprite}#icon-project`} />
            </svg>
            <p className={s.titleBoxTitle}>Project office</p>
          </div>
          <div className={s.btnBox}>
            <button className={s.btnBoxButton}>
              <svg className={s.btnBoxIcon} height="16" width="16">
                <use href={`${sprite}#icon-pencil`} />
              </svg>
            </button>
            <button className={s.btnBoxButton}>
              <svg className={s.btnBoxIcon} height="16" width="16">
                <use href={`${sprite}#icon-trash`} />
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <div>
        <div className={s.helpBox}>
          <img
            src={plant}
            alt="WelcomeIMG"
            className={s.plantImg}
            width="54"
            height="78"
          />
          <p className={s.helpBoxText}>
            If you need help with <span>TaskPro</span>, check out our support
            resources or reach out to our customer support team.
          </p>
          <button className={s.helpButton}>
            <svg className={s.helpBtnIcon} height="20" width="20">
              <use href={`${sprite}#icon-help-circle`} />
            </svg>
            <span>Need help?</span>
          </button>
        </div>
        <button className={s.logoutButton} onClick={handleLogOut}>
          <svg className={s.logoutBtnIcon} height="32" width="32">
            <use href={`${sprite}#icon-logout`} />
          </svg>
          <span>Log out</span>
        </button>
      </div>
      {/* <h3 className={s.subTitle}>My boards</h3>
        <div className={s.createBoard}>
          <input
            type="text"
            placeholder="Create a new board"
            value={newBoardName}
            onChange={e => setNewBoardName(e.target.value)}
            className={s.boardInput}
          />
          <button className={s.addButton} onClick={handleCreateBoard}>
            +
          </button>
          {error && <span className={s.error}>{error}</span>}
        </div>
        <ul className={s.boardList}>
          {boards.map(board => (
            <li key={board.id} className={s.boardItem}>
              <a href={`#${board.name}`} className={s.boardLink}>
                {board.name}
                <button className={s.editButton}>✎</button>
                <button className={s.deleteButton}>🗑️</button>
              </a>
            </li>
          ))}
        </ul>
        <h3 className={s.projectTitle}>Neon Light Project</h3>
        <div className={s.supportSection}>
          <p>
            If you need help with TaskPro, check out our support resources or
            reach out to our customer support team.
          </p>
          <button className={s.helpButton}>Need help?</button>
        </div>
        <button className={s.logoutButton}>Log out</button> */}
    </aside>
  );
};

export default Sidebar;
