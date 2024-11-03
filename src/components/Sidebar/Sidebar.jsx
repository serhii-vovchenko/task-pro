import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBoard } from '../../redux/actions/boardActions';
import s from './Sidebar.module.css';
import { logoutThunk } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(state => state.board.boards);
  const [newBoardName, setNewBoardName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('icon1');
  const [selectedBackground, setSelectedBackground] = useState('none');
  const [error, setError] = useState('');

  const handleCreateBoard = () => {
    if (!newBoardName) {
      setError('Board name is required');
      return;
    }

    dispatch(
      createBoard({
        name: newBoardName,
        icon: selectedIcon,
        background: selectedBackground,
      })
    );
    setNewBoardName('');
    setError('');
    toggleSidebar();
  };

  const handleLogOut = () => {
    dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <aside className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      <h2 className={s.title}>Task Pro</h2>
      <h3 className={s.subTitle}>My boards</h3>
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
      <button className={s.logoutButton} onClick={handleLogOut}>
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
